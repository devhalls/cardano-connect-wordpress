<?php

use WPCC\SetupWizard;

class SetupWizardTest extends WP_UnitTestCase {

	public function test_should_show_when_not_completed(): void {
		delete_option( SetupWizard::OPTION_COMPLETED );

		$wizard = new SetupWizard();

		$this->assertTrue( $wizard->shouldShow() );
	}

	public function test_should_not_show_when_completed(): void {
		update_option( SetupWizard::OPTION_COMPLETED, true );

		$wizard = new SetupWizard();

		$this->assertFalse( $wizard->shouldShow() );
	}

	public function test_should_not_show_when_disabled_via_filter(): void {
		delete_option( SetupWizard::OPTION_COMPLETED );

		add_filter(
			'wpcc_disable_setup_wizard',
			static function (): bool {
				return true;
			}
		);

		$wizard = new SetupWizard();

		$this->assertFalse( $wizard->shouldShow() );
	}

	public function test_restart_url_is_generated(): void {
		$this->assertStringContainsString( 'wpcc_wizard_restart', SetupWizard::getRestartUrl() );
	}
}
