<?php
/**
 * @var WPCC\Settings $this
 * @var WPCC\SetupWizard $wizard
 * @var int $wizard_step
 */
$prefix = WPCC\Base::SETTING_PREFIX;
?>

<div class="wpcc-wizard wpcc-wizard--enter">
	<?php
	$this->getTemplate(
		'partial/wizard/progress',
		[
			'wizard_step' => $wizard_step,
			'total_steps' => WPCC\SetupWizard::TOTAL_STEPS,
		],
		true
	);
	?>

	<form class="wpcc-wizard-form wpcc-section" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
		<?php wp_nonce_field( 'wpcc_wizard_step' ); ?>
		<input type="hidden" name="action" value="wpcc_wizard_step" />
		<input type="hidden" name="wpcc_wizard_step" value="<?php echo esc_attr( (string) $wizard_step ); ?>" />

		<div class="wpcc-wizard-step wpcc-wizard-step--active">
			<?php
			match ( $wizard_step ) {
				1       => $this->getTemplate( 'partial/wizard/step-connect', [ 'wizard' => $wizard ], true ),
				2       => $this->getTemplate( 'partial/wizard/step-data-sources', [ 'wizard' => $wizard ], true ),
				3       => $this->getTemplate( 'partial/wizard/step-mainnet', [ 'wizard' => $wizard ], true ),
				default => null,
			};
			?>
		</div>

		<div class="wpcc-wizard-actions">
			<?php if ( $wizard_step > 1 ) : ?>
				<a class="button" href="<?php echo esc_url( admin_url( 'admin.php?page=' . WPCC\Settings::SETTING_PREFIX . 'dashboard&step=' . ( $wizard_step - 1 ) ) ); ?>">
					<?php esc_html_e( 'Back', 'cardano-connect' ); ?>
				</a>
			<?php endif; ?>

			<button type="submit" class="button button-primary">
				<?php
				echo esc_html(
					$wizard_step >= WPCC\SetupWizard::TOTAL_STEPS
						? __( 'Complete setup', 'cardano-connect' )
						: __( 'Continue', 'cardano-connect' )
				);
				?>
			</button>

			<a class="wpcc-wizard-skip" href="<?php echo esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=wpcc_wizard_skip' ), 'wpcc_wizard_skip' ) ); ?>">
				<?php esc_html_e( 'Skip setup', 'cardano-connect' ); ?>
			</a>
		</div>
	</form>
</div>
