<?php

use WPCC\Base;
use WPCC\Tests\TestDouble;

class OptionsTest extends WP_UnitTestCase {

	public function test_label_connect_default_is_connect_wallet_not_array_index(): void {
		$subject = new TestDouble();
		$options = $subject->exposedLoadOptions();

		$this->assertSame( 'Connect Wallet', $options['label_connect'] );
		$this->assertIsString( $options['label_connect'] );
	}

	public function test_load_options_without_stored_settings_uses_field_defaults(): void {
		delete_option( Base::SETTING_PREFIX . 'main_settings' );
		delete_option( Base::SETTING_PREFIX . 'assets_settings' );
		delete_option( Base::SETTING_PREFIX . 'label_settings' );

		$subject = new TestDouble();
		$options = $subject->exposedLoadOptions();

		$this->assertNotSame( 11, $options['label_connect'] );
		$this->assertSame( 'Connect Wallet', $options['label_connect'] );
	}

	public function test_get_setting_merges_defaults_with_stored_values(): void {
		update_option(
			Base::SETTING_PREFIX . 'label_settings',
			[
				Base::SETTING_PREFIX . 'label_connect' => 'Custom Label',
			]
		);

		$subject = new TestDouble();
		$value   = $subject->exposedGetSetting( Base::SETTING_PREFIX . 'label_connect' );

		$this->assertSame( 'Custom Label', $value );
	}
}
