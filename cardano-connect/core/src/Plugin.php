<?php

namespace WPCC;

use WPCC\Connect\PostTypes\StakePool;

class Plugin extends Base
{
    /**
     * @inheritDoc
     */
    public function run(): void
    {
	    add_action( 'init', [$this, 'registerBlocks'] );
	    add_action( 'init', [$this, 'registerPostTypes'] );
	    add_shortcode( 'cardano-connect-connector', [$this, 'registerConnectorShortcode']  );
	    add_shortcode( 'cardano-connect-assets', [$this, 'registerAssetsShortcode']  );
	    add_shortcode( 'cardano-connect-balance', [$this, 'registerBalanceShortcode']  );
	    add_shortcode( 'cardano-connect-pools', [$this, 'registerPoolsShortcode']  );
	    add_shortcode( 'cardano-connect-dreps', [$this, 'registerDrepsShortcode']  );

        (new Settings())->run();
        (new Assets())->run();
	    (new Api())->run();

        if ( is_admin() ) {
            (new Admin())->run();
        }
    }

    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     * @return void
     */
    public function registerBlocks(): void
    {
	    register_block_type( $this->plugin_path . 'blocks/connector/build' );
	    register_block_type( $this->plugin_path . 'blocks/assets/build' );
	    register_block_type( $this->plugin_path . 'blocks/balance/build' );
	    register_block_type( $this->plugin_path . 'blocks/pools/build' );
	    register_block_type( $this->plugin_path . 'blocks/dreps/build' );
    }

    /**
     * Include the connector shortcode template.
     */
    public function registerConnectorShortcode(): string
    {
		return $this->getTemplate('shortcode/cardano-connect-connector');
    }

	/**
	 * Include the assets shortcode template.
	 */
	public function registerAssetsShortcode($attributes = []): string
	{
		$formatted_attributes = shortcode_atts(
			array(
				'whitelist' => null,
				'per_page' => null,
				'hide_titles' => null,
				'not_found' => null,
			), $attributes
		);
		return $this->getTemplate('shortcode/cardano-connect-assets', $formatted_attributes);
	}

	/**
	 * Include the balance shortcode template.
	 */
	public function registerBalanceShortcode(): string
	{
		return $this->getTemplate('shortcode/cardano-connect-balance');
	}

	/**
	 * Include the pools shortcode template.
	 */
	public function registerPoolsShortcode($attributes = []): string
	{
		$formatted_attributes = shortcode_atts(
			array(
				'whitelist' => null,
				'per_page' => null,
				'not_found' => null,
			), $attributes
		);
		return $this->getTemplate('shortcode/cardano-connect-pools', $formatted_attributes);
	}

	/**
	 * Include the DReps shortcode template.
	 */
	public function registerDrepsShortcode($attributes = []): string
	{
		$formatted_attributes = shortcode_atts(
			array(
				'whitelist' => null,
				'per_page' => null,
				'not_found' => null,
			), $attributes
		);
		return $this->getTemplate('shortcode/cardano-connect-dreps', $formatted_attributes);
	}

	public function registerPostTypes(): void
	{
		$stake_pool = new StakePool();
		$testnet_suffix = $this->getSetting( Base::SETTING_PREFIX . 'mainnet_active' ? '' : '_testnet');
		if ($this->getSetting(Base::SETTING_PREFIX.'pools_data_source'.$testnet_suffix) === 'local_wp') {
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
		// Set WP options
        foreach ($this->settings as $setting) {
            $settings_fields = array_column(
                $setting['sections'],
                'fields'
            )[0];
            $defaults = [];
            foreach ($settings_fields as $name => $settings_field) {
				if (isset($settings_field['default'])) {
					$defaults[ $name ] = $settings_field['default'];
				}
            }
            add_option($setting['name'], $defaults);
        }
		// Schedule the Cron job every hour to start fetching the data
	    if (!wp_next_scheduled('cardano_connect_cron_fetch_data')) {
		    wp_schedule_event(time(), 'hourly', 'cardano_connect_cron_fetch_data');
	    }
    }

    /**
     * Ran on deactivation.
     * @return void
     */
    public function onDeactivate(): void {}

	/**
	 * Ran on wp_schedule_event every hour.
	 * @return void
	 */
	public function startFetchBatch(): void {
		$this->fetchBatch();
	}

	/**
	 * Fetch the stake pool data in batches of 100.
	 * @param int $page
	 * @return void
	 */
	public function fetchBatch(int $page = 1): void {
		$response = ( new StakePool() )->syncPools($this->loadProvider(), 100, $page, 10);
		if ($response->success && $response->total === 100) {
			// Schedule next batch
			wp_schedule_single_event(time() + 5, 'cardano_connect_cron_fetch_data_batch', ['page' => $page + 1]);
		}
	}
}