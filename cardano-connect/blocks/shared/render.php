<?php
/**
 * Render the frontend block HTML.
 * We assign data-* for any configurable block attributes to be read by React.
 * @var $attributes array
 * @var $content string
 * @var $block WP_Block
 */
?>
<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ) ?>
	<?php foreach ( $attributes as $attribute => $value ) : ?>
	    <?php if (!is_null($value)) : ?>
            data-<?php echo $attribute ?>="<?php echo esc_attr( $value ); ?>"
		<?php endif ?>
	<?php endforeach ?>
></div>