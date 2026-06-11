<?php

namespace WPCC;

use WPCC\Connect\PostTypes\StakePool;

class Plugin extends Base {

	public const IMPORT_PER_PAGE = 10;

	/**
	 * Registers the plugin modules.
	 * @return void
	 */
	public function registerModules(): void {
		( new Settings() )->run();
		( new SetupWizard() )->run();
		( new Assets() )->run();
		( new Api() )->run();
		if ( is_admin() ) {
			( new Admin() )->run();
		}
	}

	/**
	 * @inheritDoc
	 */
	public function run(): void {
		add_action( 'init', [ $this, 'registerBlocks' ] );
		add_action( 'init', [ $this, 'registerPostTypes' ] );
		add_shortcode( 'cardano-connect-connector', [ $this, 'registerConnectorShortcode' ] );
		add_shortcode( 'cardano-connect-assets', [ $this, 'registerAssetsShortcode' ] );
		add_shortcode( 'cardano-connect-balance', [ $this, 'registerBalanceShortcode' ] );
		add_shortcode( 'cardano-connect-pools', [ $this, 'registerPoolsShortcode' ] );
		add_shortcode( 'cardano-connect-dreps', [ $this, 'registerDRepsShortcode' ] );
		add_action( 'init', [ $this, 'registerModules' ] );
		add_action( 'init', [ $this, 'registerCron' ] );
		add_action( 'plugins_loaded', [ $this, 'maybeUpgrade' ] );

		// WP event triggering the fetch batch process.
		add_action( 'cardano_connect_cron_fetch_data', [ $this, 'cronFetchDataBatch' ] );
		add_action( 'cardano_connect_cron_fetch_data_batch', [ $this, 'cronFetchDataBatch' ] );

		// Register run cron ajax callback.
		add_action( 'wp_ajax_cardano_connect_cron', [ $this, 'cronManualTrigger' ] );
	}

	/**
	 * Registers the plugin cron.
	 * @return void
	 */
	public function registerCron(): void {
		$this->scheduleCronFetchData();
	}

	/**
	 * Ran on wp_schedule_event every hour.
	 * @return void
	 */
	public function scheduleCronFetchData(): void {
		$cron_active = $this->getSetting( self::SETTING_PREFIX . 'pools_data_cron_import' );
		if ( ! $cron_active ) {
			wp_unschedule_hook( 'cardano_connect_cron_fetch_data' );
			wp_unschedule_hook( 'cardano_connect_cron_fetch_data_batch' );

			return;
		}
		$default_args     = [ 'page' => 1, 'total' => self::IMPORT_PER_PAGE ];
		$mainnet_active   = $this->getSetting( self::SETTING_PREFIX . 'mainnet_active' );
		$testnet_suffix   = $mainnet_active ? '' : '_testnet';
		$pool_data_source = $this->getSetting( self::SETTING_PREFIX . 'pools_data_source' . $testnet_suffix ) ?? '';
		if ( $pool_data_source === 'local_wp' && ! wp_next_scheduled( 'cardano_connect_cron_fetch_data', $default_args ) ) {
			wp_schedule_event( time(), 'daily', 'cardano_connect_cron_fetch_data', $default_args );
		}
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * @return void
	 */
	public function registerBlocks(): void {
		register_block_type( $this->plugin_path . 'blocks/connector/build' );
		register_block_type( $this->plugin_path . 'blocks/assets/build' );
		register_block_type( $this->plugin_path . 'blocks/balance/build' );
		register_block_type( $this->plugin_path . 'blocks/pools/build' );
		register_block_type( $this->plugin_path . 'blocks/dreps/build' );
	}

	/**
	 * Include the connector shortcode template.
	 */
	public function registerConnectorShortcode( $attributes = [] ): string {
		return $this->registerBlockShortcode( 'connector', $attributes );
	}

	/**
	 * Register a blocks shortcode, reads params from the block.js file to pass to the template.
	 *
	 * @param string $name the name of the block folder
	 * @param array $attributes
	 *
	 * @return string
	 */
	private function registerBlockShortcode( string $name, array $attributes = [] ): string {
		Assets::requireFrontendAssets();

		$file_path  = $this->plugin_path . 'blocks/' . $name . '/src/block.json';
		$definition = [];
		if ( file_exists( $file_path ) ) {
			$metadata = wp_json_file_decode(
				$file_path,
				[ 'associative' => true ]
			);
			if ( ! empty( $metadata['attributes'] ) ) {
				$definition = array_fill_keys(
					array_keys( $metadata['attributes'] ),
					null
				);
			}
		}
		$attributes = shortcode_atts(
			$definition, $attributes
		);

		return $this->getTemplate(
			'partial/block-shortcode',
			[ 'name' => $name, 'attributes' => $attributes ]
		);
	}

	/**
	 * Include the assets shortcode template.
	 */
	public function registerAssetsShortcode( $attributes = [] ): string {
		$attributes['whitelist'] = isset( $attributes['whitelist'] )
			? str_replace( ',', "\n", $attributes['whitelist'] )
			: null;

		return $this->registerBlockShortcode( 'assets', $attributes );
	}

	/**
	 * Include the balance shortcode template.
	 */
	public function registerBalanceShortcode( $attributes = [] ): string {
		return $this->registerBlockShortcode( 'balance', $attributes );
	}

	/**
	 * Include the pools shortcode template.
	 */
	public function registerPoolsShortcode( $attributes = [] ): string {
		$attributes['whitelist'] = isset( $attributes['whitelist'] )
			? str_replace( ',', "\n", $attributes['whitelist'] )
			: null;

		return $this->registerBlockShortcode( 'pools', $attributes );
	}

	/**
	 * Include the DReps shortcode template.
	 */
	public function registerDRepsShortcode( $attributes = [] ): string {
		$attributes['whitelist'] = isset( $attributes['whitelist'] )
			? str_replace( ',', "\n", $attributes['whitelist'] )
			: null;

		return $this->registerBlockShortcode( 'dreps', $attributes );
	}

	/**
	 * Register plugin post types.
	 */
	public function registerPostTypes(): void {
		$stake_pool       = new StakePool();
		$mainnet_active   = $this->getSetting( Base::SETTING_PREFIX . 'mainnet_active' );
		$testnet_suffix   = $mainnet_active ? '' : '_testnet';
		if ( $this->getSetting( Base::SETTING_PREFIX . 'pools_data_source' . $testnet_suffix ) === 'local_wp' ) {
			register_post_type(
				$stake_pool::NAME,
				$stake_pool->getConfig()
			);
		}
	}

	/**
	 * Ran on activation.
	 * Set default plugin options (existing options will not be updated).
	 * Set up Cron job.
	 * @return void
	 */
	public function onActivate(): void {
		$this->settings = $this->loadSettings();

		foreach ( $this->settings as $setting ) {
			$defaults = [];
			foreach ( $setting['sections'] as $section ) {
				foreach ( $section['fields'] as $name => $settings_field ) {
					if ( isset( $settings_field['default'] ) ) {
						$defaults[ $name ] = $settings_field['default'];
					}
				}
			}
			add_option( $setting['name'], $defaults );
		}

		update_option( 'wpcc_db_version', WPCC_VERSION );
		delete_option( SetupWizard::OPTION_COMPLETED );
	}

	/**
	 * Remove deprecated option keys on upgrade without overwriting user values.
	 *
	 * @return void
	 */
	public function maybeUpgrade(): void {
		$installed = get_option( 'wpcc_db_version', '0' );

		if ( version_compare( $installed, WPCC_VERSION, '>=' ) ) {
			return;
		}

		if ( empty( Base::DEPRECATED_SETTING_KEYS ) ) {
			update_option( 'wpcc_db_version', WPCC_VERSION );

			return;
		}

		$this->settings = $this->loadSettings();

		foreach ( $this->settings as $setting ) {
			$option_name = $setting['name'];
			$values      = get_option( $option_name );

			if ( ! is_array( $values ) ) {
				continue;
			}

			foreach ( Base::DEPRECATED_SETTING_KEYS as $deprecated_key ) {
				unset( $values[ $deprecated_key ] );
			}

			update_option( $option_name, $values );
		}

		update_option( 'wpcc_db_version', WPCC_VERSION );
	}

	/**
	 * Fetch the stake pool data in batches of self::IMPORT_PER_PAGE.
	 * Schedules the next event if total returned === self::IMPORT_PER_PAGE, otherwise ends the batch process.
	 *
	 * @param int $page
	 *
	 * @return void
	 */
	public function cronFetchDataBatch( int $page = 1 ): void {
		$cron_active = $this->getSetting( self::SETTING_PREFIX . 'pools_data_cron_import' );
		if ( ! $cron_active ) {
			return;
		}
		$response = ( new StakePool() )->syncPools( $this->loadProvider(), self::IMPORT_PER_PAGE, $page );
		if ( $response->success && $response->total === self::IMPORT_PER_PAGE ) {
			wp_schedule_single_event(
				time() + 5,
				'cardano_connect_cron_fetch_data_batch',
				[ 'page' => $page + 1, 'total' => $response->total, 'success' => $response->success ]
			);
		}
	}

	/**
	 * Trigger cron manually
	 * @return void
	 */
	public function cronManualTrigger(): void {
		$cron_active = $this->getSetting( self::SETTING_PREFIX . 'pools_data_cron_import' );
		if ( ! $cron_active ) {
			_e( 'Cron import option is disabled.', 'cardano-connect' );
		} else if ( function_exists( 'wp_cron' ) ) {
			wp_cron();
			wp_unschedule_hook( 'cardano_connect_cron_fetch_data' );
			wp_unschedule_hook( 'cardano_connect_cron_fetch_data_batch' );
			_e( 'Cron successfully reset, refresh to view results.', 'cardano-connect' );
		} else {
			_e( 'wp_cron() not available', 'cardano-connect' );
		}
		wp_die();
	}

	/**
	 * Ran on deactivation.
	 * @return void
	 */
	public function onDeactivate(): void {
		wp_unschedule_hook( 'cardano_connect_cron_fetch_data' );
		wp_unschedule_hook( 'cardano_connect_cron_fetch_data_batch' );
	}
}