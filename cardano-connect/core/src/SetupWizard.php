<?php

namespace WPCC;

class SetupWizard extends Base {
	public const OPTION_COMPLETED = 'wpcc_setup_wizard_completed';

	public const TOTAL_STEPS = 3;

	/**
	 * @inheritDoc
	 */
	public function run(): void {
		add_action( 'admin_post_wpcc_wizard_step', [ $this, 'handleStep' ] );
		add_action( 'admin_post_wpcc_wizard_skip', [ $this, 'handleSkip' ] );
		add_action( 'admin_post_wpcc_wizard_restart', [ $this, 'handleRestart' ] );
	}

	/**
	 * Admin URL to restart the setup wizard.
	 */
	public static function getRestartUrl(): string {
		return wp_nonce_url(
			admin_url( 'admin-post.php?action=wpcc_wizard_restart' ),
			'wpcc_wizard_restart'
		);
	}

	/**
	 * Whether the setup wizard should display on the dashboard.
	 */
	public function shouldShow(): bool {
		if ( apply_filters( 'wpcc_disable_setup_wizard', WPCC_DISABLE_SETUP_WIZARD ) ) {
			return false;
		}

		return ! (bool) get_option( self::OPTION_COMPLETED, false );
	}

	/**
	 * Current wizard step (1-based).
	 */
	public function getCurrentStep(): int {
		$step = isset( $_GET['step'] ) ? absint( $_GET['step'] ) : 1;

		return min( max( 1, $step ), self::TOTAL_STEPS );
	}

	/**
	 * @return void
	 */
	public function handleStep(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized', 'cardano-connect' ) );
		}

		check_admin_referer( 'wpcc_wizard_step' );

		$step = isset( $_POST['wpcc_wizard_step'] ) ? absint( $_POST['wpcc_wizard_step'] ) : 1;

		foreach ( $this->getStepFieldGroups( $step ) as $option_name => $field_names ) {
			foreach ( $field_names as $field_name ) {
				$this->saveField( $option_name, $field_name );
			}
		}

		if ( $step >= self::TOTAL_STEPS ) {
			update_option( self::OPTION_COMPLETED, true );
			wp_safe_redirect( admin_url( 'admin.php?page=' . Settings::SETTING_PREFIX . 'dashboard&wizard=complete' ) );
			exit;
		}

		wp_safe_redirect(
			admin_url(
				'admin.php?page=' . Settings::SETTING_PREFIX . 'dashboard&step=' . ( $step + 1 )
			)
		);
		exit;
	}

	/**
	 * @return void
	 */
	public function handleSkip(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized', 'cardano-connect' ) );
		}

		check_admin_referer( 'wpcc_wizard_skip' );

		update_option( self::OPTION_COMPLETED, true );
		wp_safe_redirect( admin_url( 'admin.php?page=' . Settings::SETTING_PREFIX . 'dashboard' ) );
		exit;
	}

	/**
	 * Restart the setup wizard from the dashboard.
	 *
	 * @return void
	 */
	public function handleRestart(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized', 'cardano-connect' ) );
		}

		check_admin_referer( 'wpcc_wizard_restart' );

		delete_option( self::OPTION_COMPLETED );

		wp_safe_redirect(
			admin_url(
				'admin.php?page=' . Settings::SETTING_PREFIX . 'dashboard&step=1'
			)
		);
		exit;
	}

	/**
	 * Field names grouped by option for a wizard step.
	 *
	 * @return array<string, string[]>
	 */
	public function getStepFieldGroups( int $step ): array {
		$prefix = self::SETTING_PREFIX;

		return match ( $step ) {
			1       => [
				$prefix . 'main_settings' => [
					$prefix . 'user_role',
					$prefix . 'login_redirect',
					$prefix . 'logout_redirect',
				],
			],
			2       => [
				$prefix . 'assets_settings' => [
					$prefix . 'assets_api_key',
					$prefix . 'assets_api_key_testnet',
				],
			],
			3       => [
				$prefix . 'main_settings' => [
					$prefix . 'mainnet_active',
				],
			],
			default => [],
		};
	}

	/**
	 * @return void
	 */
	private function saveField( string $option_name, string $field_name ): void {
		$current = get_option( $option_name ) ?: [];
		if ( ! is_array( $current ) ) {
			$current = [];
		}

		$field_def = $this->getFieldDefinition( $field_name );
		if ( ! $field_def ) {
			return;
		}

		if ( $field_def['type'] === 'checkbox' ) {
			$current[ $field_name ] = ! empty( $_POST[ $field_name ] );
		} elseif ( isset( $_POST[ $field_name ] ) ) {
			$current[ $field_name ] = sanitize_text_field( wp_unslash( $_POST[ $field_name ] ) );
		}

		update_option( $option_name, $current );
	}

	/**
	 * @return array<string, mixed>|null
	 */
	public function getFieldDefinition( string $field_name ): ?array {
		if ( ! $this->settings ) {
			$this->settings = $this->loadSettings();
		}

		foreach ( $this->settings as $setting ) {
			foreach ( $setting['sections'] as $section ) {
				if ( isset( $section['fields'][ $field_name ] ) ) {
					return $section['fields'][ $field_name ];
				}
			}
		}

		return null;
	}

	/**
	 * @param mixed $default
	 *
	 * @return mixed
	 */
	public function getStoredValue( string $option_name, string $field_name, mixed $default = null ): mixed {
		$stored = get_option( $option_name );

		if ( ! is_array( $stored ) || ! array_key_exists( $field_name, $stored ) ) {
			return $default;
		}

		return $stored[ $field_name ];
	}
}
