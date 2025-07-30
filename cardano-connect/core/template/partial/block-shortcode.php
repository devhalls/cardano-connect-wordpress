<?php
/**
 * Container for blocks shortcode rendering.
 * @var $name string
 * @var $attributes array
 */
?>

<div class="wp-block-cardano-connect-<?php echo $name ?>"
	<?php foreach ( $attributes as $attribute => $value ) : ?>
        <?php if (!is_null($value)) : ?>
            data-<?php echo $attribute ?>="<?php echo esc_attr( $value ); ?>"
        <?php endif ?>
	<?php endforeach ?>
></div>
