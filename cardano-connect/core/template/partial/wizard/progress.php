<?php
/**
 * @var int $wizard_step
 * @var int $total_steps
 */
?>

<div class="wpcc-wizard-progress" aria-label="<?php esc_attr_e( 'Setup progress', 'cardano-connect' ); ?>">
	<?php for ( $i = 1; $i <= $total_steps; $i++ ) : ?>
		<div class="wpcc-wizard-progress__segment <?php echo $i <= $wizard_step ? 'is-complete' : ''; ?>">
			<span class="wpcc-wizard-progress__label"><?php echo esc_html( sprintf( __( 'Step %d', 'cardano-connect' ), $i ) ); ?></span>
		</div>
	<?php endfor; ?>
</div>
