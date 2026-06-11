<?php
/**
 * @var WPCC\Settings $this
 * @var WPCC\SetupWizard $wizard
 * @var bool $show_wizard
 * @var int $wizard_step
 */
?>

<div class="wrap">

	<?php $this->getTemplate( 'partial/title', [ 'title' => esc_html( get_admin_page_title() ) ], true ); ?>

	<?php if ( $show_wizard ) : ?>
		<?php
		$this->getTemplate(
			'partial/wizard/shell',
			[
				'wizard'      => $wizard,
				'wizard_step' => $wizard_step,
			],
			true
		);
		?>
	<?php else : ?>
		<?php $this->getTemplate( 'partial/dashboard-content', [], true ); ?>
	<?php endif; ?>

</div>
