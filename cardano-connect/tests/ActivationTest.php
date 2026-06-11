<?php

use WPCC\Base;
use WPCC\Plugin;
use WPCC\SetupWizard;

class ActivationTest extends WP_UnitTestCase {

	public function test_on_activate_seeds_option_groups(): void {
		delete_option( Base::SETTING_PREFIX . 'main_settings' );
		delete_option( Base::SETTING_PREFIX . 'assets_settings' );
		delete_option( Base::SETTING_PREFIX . 'label_settings' );

		$plugin = new Plugin();
		$plugin->onActivate();

		$labels = get_option( Base::SETTING_PREFIX . 'label_settings' );

		$this->assertIsArray( $labels );
		$this->assertSame(
			'Connect Wallet',
			$labels[ Base::SETTING_PREFIX . 'label_connect' ]
		);
	}

	public function test_on_activate_resets_setup_wizard_flag(): void {
		update_option( SetupWizard::OPTION_COMPLETED, true );

		$plugin = new Plugin();
		$plugin->onActivate();

		$this->assertFalse( (bool) get_option( SetupWizard::OPTION_COMPLETED, false ) );
	}
}
