<?php
/**
 * @var WPCC\SetupWizard $wizard
 */
$prefix      = WPCC\Base::SETTING_PREFIX;
$option_name = $prefix . 'main_settings';
$mainnet     = $wizard->getFieldDefinition( $prefix . 'mainnet_active' );
$mainnet_val = (bool) $wizard->getStoredValue( $option_name, $prefix . 'mainnet_active', false );
?>

<h3><?php esc_html_e( 'Enable mainnet?', 'cardano-connect' ); ?></h3>
<p><?php esc_html_e( 'Testnet is recommended while you configure blocks and test wallet connections. Enable mainnet when you are ready for production Cardano users.', 'cardano-connect' ); ?></p>

<table class="form-table" role="presentation">
	<tr>
		<th scope="row"><?php echo esc_html( $mainnet['label'] ?? __( 'Mainnet active', 'cardano-connect' ) ); ?></th>
		<td>
			<label for="<?php echo esc_attr( $prefix . 'mainnet_active' ); ?>">
				<input type="checkbox" name="<?php echo esc_attr( $prefix . 'mainnet_active' ); ?>" id="<?php echo esc_attr( $prefix . 'mainnet_active' ); ?>" value="1" <?php checked( $mainnet_val ); ?> />
				<?php echo esc_html( $mainnet['note'] ?? __( 'Allow users to connect with mainnet wallets', 'cardano-connect' ) ); ?>
			</label>
		</td>
	</tr>
</table>
