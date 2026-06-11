<?php

namespace WPCC;

use JsonException;

class Assets extends Base {
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
		add_filter( 'script_loader_tag', [ $this, 'addModuleTypeToReactScript' ], 10, 3 );
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
		if ( is_admin() || ! $this->shouldEnqueueFrontend() ) {
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
		if ( 'wpcc-react-js' !== $handle || str_contains( $tag, 'type=' ) ) {
			return $tag;
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
		if ( apply_filters( 'wpcc_force_enqueue_assets', false ) ) {
			return true;
		}

		global $post;

		if ( ! $post instanceof \WP_Post ) {
			return false;
		}

		$blocks = [
			'cardano-connect/connector',
			'cardano-connect/assets',
			'cardano-connect/balance',
			'cardano-connect/pools',
			'cardano-connect/dreps',
		];

		foreach ( $blocks as $block ) {
			if ( has_block( $block, $post ) ) {
				return true;
			}
		}

		$shortcodes = [
			'cardano-connect-connector',
			'cardano-connect-assets',
			'cardano-connect-balance',
			'cardano-connect-pools',
			'cardano-connect-dreps',
		];

		foreach ( $shortcodes as $shortcode ) {
			if ( has_shortcode( $post->post_content, $shortcode ) ) {
				return true;
			}
		}

		return false;
	}
}