<?php

namespace WPCC;

use JsonException;

class Assets extends Base {
	private const FRONTEND_BLOCKS = [
		'cardano-connect/connector',
		'cardano-connect/assets',
		'cardano-connect/balance',
		'cardano-connect/pools',
		'cardano-connect/dreps',
	];

	private const FRONTEND_SHORTCODES = [
		'cardano-connect-connector',
		'cardano-connect-assets',
		'cardano-connect-balance',
		'cardano-connect-pools',
		'cardano-connect-dreps',
	];

	/**
	 * Set when a shortcode renders after wp_enqueue_scripts (e.g. theme sidebar).
	 */
	private static bool $frontend_required = false;

	/**
	 * Ends in forward slash.
	 * @var string
	 */
	private string $react_cdn;

	/**
	 * Ends in forward slash.
	 * @var string
	 */
	private string $asset_cdn;

	/**
	 * @inheritDoc
	 */
	public function __construct() {
		parent::__construct();
		$this->settings    = $this->loadSettings();
		$this->options     = $this->loadOptions();
		$this->user_fields = $this->loadUserFields();
		$this->asset_cdn   = $this->plugin_url . 'assets/';
		$this->react_cdn   = $this->plugin_url . 'react/build/';
	}

	/**
	 * @inheritDoc
	 */
	public function run(): void {
		add_action( 'admin_enqueue_scripts', [ $this, 'registerAdminAssets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'registerFrontendAssets' ] );
		add_action( 'wp_footer', [ $this, 'registerFrontendAssetsLate' ], 1 );
		add_filter( 'script_loader_tag', [ $this, 'addModuleTypeToReactScript' ], 10, 3 );
	}

	/**
	 * Mark React assets as required (called from shortcode render callbacks).
	 */
	public static function requireFrontendAssets(): void {
		self::$frontend_required = true;
	}

	/**
	 * Output plugin admin JS and CSS.
	 * @return void
	 */
	public function registerAdminAssets(): void {
		wp_enqueue_style( 'wpcc-settings-css', $this->asset_cdn . 'admin.css', [], $this->version );
		wp_enqueue_script( 'wpcc-settings-js', $this->asset_cdn . 'admin.js', [ 'jquery' ], $this->version, true );
	}

	/**
	 * Output plugin frontend JS and CSS.
	 * Calling wp_localize_script adding wp_create_nonce('wp_rest') for js and reacts scope.
	 * @return void
	 */
	public function registerFrontendAssets(): void {
		if ( is_admin() ) {
			return;
		}

		$this->enqueueFrontendAssets();
	}

	/**
	 * Enqueue React assets when shortcodes render after wp_enqueue_scripts.
	 */
	public function registerFrontendAssetsLate(): void {
		if ( is_admin() ) {
			return;
		}

		$this->enqueueFrontendAssets();
	}

	/**
	 * @return void
	 */
	private function enqueueFrontendAssets(): void {
		if ( ! $this->shouldEnqueueFrontend() || wp_script_is( 'wpcc-react-js', 'enqueued' ) ) {
			return;
		}

		$entrypoints = $this->getReactEntrypoints();
		if ( empty( $entrypoints ) ) {
			return;
		}

		foreach ( $entrypoints as $entrypoint ) {
			if ( str_contains( $entrypoint, '.js' ) ) {
				wp_enqueue_script( 'wpcc-react-js', $this->react_cdn . $entrypoint, [], $this->version, true );
				wp_script_add_data( 'wpcc-react-js', 'type', 'module' );
				wp_localize_script( 'wpcc-react-js', 'wpCardanoConnect', [
					'nonce' => wp_create_nonce( 'wp_rest' ),
				] );
			} elseif ( ! $this->getSetting( self::SETTING_PREFIX . 'disable_styles' ) ) {
				wp_enqueue_style( 'wpcc-react-css', $this->react_cdn . $entrypoint, [], $this->version );
			}
		}
	}

	/**
	 * Vite builds ES modules; ensure WordPress outputs type="module" on WP < 6.3.
	 */
	public function addModuleTypeToReactScript( string $tag, string $handle, string $src ): string {
		if ( 'wpcc-react-js' !== $handle ) {
			return $tag;
		}

		if ( str_contains( $tag, 'type="module"' ) ) {
			return $tag;
		}

		if ( preg_match( '/\stype=(["\']).*?\1/', $tag ) ) {
			return preg_replace( '/\stype=(["\']).*?\1/', ' type="module"', $tag, 1 );
		}

		return str_replace( '<script ', '<script type="module" ', $tag );
	}

	/**
	 * Resolve built React entrypoint assets from the Vite or legacy CRA manifest.
	 *
	 * @return string[]
	 */
	private function getReactEntrypoints(): array {
		$build_dir = $this->plugin_path . 'react/build/';

		$vite_manifest = $build_dir . '.vite/manifest.json';
		if ( is_readable( $vite_manifest ) ) {
			try {
				$json = json_decode( file_get_contents( $vite_manifest ), true, 512, JSON_THROW_ON_ERROR );
			} catch ( JsonException $e ) {
				$this->log( $e->getMessage() );

				return [];
			}

			$entrypoints = [];
			foreach ( $json as $item ) {
				if ( empty( $item['isEntry'] ) ) {
					continue;
				}

				if ( ! empty( $item['css'] ) ) {
					foreach ( $item['css'] as $css ) {
						$entrypoints[] = $css;
					}
				}

				if ( ! empty( $item['file'] ) ) {
					$entrypoints[] = $item['file'];
				}
			}

			return $entrypoints;
		}

		$legacy_manifest = $build_dir . 'asset-manifest.json';
		if ( ! is_readable( $legacy_manifest ) ) {
			return [];
		}

		try {
			$json = json_decode( file_get_contents( $legacy_manifest ), false, 512, JSON_THROW_ON_ERROR );
		} catch ( JsonException $e ) {
			$this->log( $e->getMessage() );

			return [];
		}

		return $json->entrypoints ?? [];
	}

	/**
	 * Whether frontend React assets should load on the current request.
	 */
	private function shouldEnqueueFrontend(): bool {
		if ( apply_filters( 'wpcc_force_enqueue_assets', false ) || self::$frontend_required ) {
			return true;
		}

		global $post;

		if ( $post instanceof \WP_Post ) {
			if ( $this->contentUsesFrontend( $post->post_content ) ) {
				return true;
			}

			if ( $this->postMetaUsesFrontend( (int) $post->ID ) ) {
				return true;
			}
		}

		return $this->navMenusUseFrontend();
	}

	/**
	 * @param string $content
	 *
	 * @return bool
	 */
	private function contentUsesFrontend( string $content ): bool {
		if ( '' === $content ) {
			return false;
		}

		foreach ( self::FRONTEND_BLOCKS as $block ) {
			if ( has_block( $block, $content ) ) {
				return true;
			}
		}

		foreach ( self::FRONTEND_SHORTCODES as $shortcode ) {
			if ( has_shortcode( $content, $shortcode ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Scan post meta (e.g. ACF flexible content) for blocks and shortcodes.
	 *
	 * @param int $post_id
	 *
	 * @return bool
	 */
	private function postMetaUsesFrontend( int $post_id ): bool {
		$meta = get_post_meta( $post_id );
		if ( ! is_array( $meta ) ) {
			return false;
		}

		foreach ( $meta as $values ) {
			if ( ! is_array( $values ) ) {
				continue;
			}

			foreach ( $values as $value ) {
				if ( ! is_string( $value ) || '' === $value ) {
					continue;
				}

				if ( $this->contentUsesFrontend( $value ) ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Scan assigned nav menu items for shortcodes in titles or descriptions.
	 *
	 * @return bool
	 */
	private function navMenusUseFrontend(): bool {
		$locations = get_nav_menu_locations();
		if ( ! is_array( $locations ) ) {
			return false;
		}

		foreach ( $locations as $menu_id ) {
			if ( ! $menu_id ) {
				continue;
			}

			$items = wp_get_nav_menu_items( $menu_id );
			if ( ! is_array( $items ) ) {
				continue;
			}

			foreach ( $items as $item ) {
				if ( ! $item instanceof \WP_Post ) {
					continue;
				}

				if ( $this->contentUsesFrontend( $item->title . $item->description ) ) {
					return true;
				}
			}
		}

		return false;
	}
}