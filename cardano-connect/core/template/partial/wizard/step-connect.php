<?php
/**
 * @var WPCC\SetupWizard $wizard
 */
$prefix       = WPCC\Base::SETTING_PREFIX;
$option_name  = $prefix . 'main_settings';
$user_role    = $wizard->getFieldDefinition( $prefix . 'user_role' );
$login        = $wizard->getFieldDefinition( $prefix . 'login_redirect' );
$logout       = $wizard->getFieldDefinition( $prefix . 'logout_redirect' );
$user_role_val = $wizard->getStoredValue( $option_name, $prefix . 'user_role', $user_role['default'] ?? 'subscriber' );
$login_val    = $wizard->getStoredValue( $option_name, $prefix . 'login_redirect', $login['default'] ?? '' );
$logout_val   = $wizard->getStoredValue( $option_name, $prefix . 'logout_redirect', $logout['default'] ?? '/' );
?>

<h3><?php esc_html_e( 'Connect & user accounts', 'cardano-connect' ); ?></h3>
<p><?php esc_html_e( 'When visitors connect a Cardano wallet, the plugin can create a WordPress account for them. Choose the role new users receive and where they are sent after connecting or disconnecting.', 'cardano-connect' ); ?></p>

<table class="form-table" role="presentation">
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $prefix . 'user_role' ); ?>"><?php echo esc_html( $user_role['label'] ?? '' ); ?></label></th>
		<td>
			<select name="<?php echo esc_attr( $prefix . 'user_role' ); ?>" id="<?php echo esc_attr( $prefix . 'user_role' ); ?>">
				<?php foreach ( $user_role['options'] ?? [] as $option ) : ?>
					<option value="<?php echo esc_attr( $option['value'] ); ?>" <?php selected( $user_role_val, $option['value'] ); ?>>
						<?php echo esc_html( $option['label'] ); ?>
					</option>
				<?php endforeach; ?>
			</select>
			<?php if ( ! empty( $user_role['note'] ) ) : ?>
				<p class="description"><?php echo esc_html( $user_role['note'] ); ?></p>
			<?php endif; ?>
		</td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $prefix . 'login_redirect' ); ?>"><?php echo esc_html( $login['label'] ?? '' ); ?></label></th>
		<td>
			<input type="text" class="regular-text" name="<?php echo esc_attr( $prefix . 'login_redirect' ); ?>" id="<?php echo esc_attr( $prefix . 'login_redirect' ); ?>" value="<?php echo esc_attr( (string) $login_val ); ?>" />
			<?php if ( ! empty( $login['note'] ) ) : ?>
				<p class="description"><?php echo esc_html( $login['note'] ); ?></p>
			<?php endif; ?>
		</td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $prefix . 'logout_redirect' ); ?>"><?php echo esc_html( $logout['label'] ?? '' ); ?></label></th>
		<td>
			<input type="text" class="regular-text" name="<?php echo esc_attr( $prefix . 'logout_redirect' ); ?>" id="<?php echo esc_attr( $prefix . 'logout_redirect' ); ?>" value="<?php echo esc_attr( (string) $logout_val ); ?>" />
			<?php if ( ! empty( $logout['note'] ) ) : ?>
				<p class="description"><?php echo esc_html( $logout['note'] ); ?></p>
			<?php endif; ?>
		</td>
	</tr>
</table>
