<?php
/**
 * @var WPCC\SetupWizard $wizard
 */
$prefix       = WPCC\Base::SETTING_PREFIX;
$option_name  = $prefix . 'assets_settings';
$mainnet_key  = $wizard->getFieldDefinition( $prefix . 'assets_api_key' );
$testnet_key  = $wizard->getFieldDefinition( $prefix . 'assets_api_key_testnet' );
$mainnet_val  = $wizard->getStoredValue( $option_name, $prefix . 'assets_api_key', '' );
$testnet_val  = $wizard->getStoredValue( $option_name, $prefix . 'assets_api_key_testnet', '' );
?>

<h3><?php esc_html_e( 'Data sources', 'cardano-connect' ); ?></h3>
<p>
	<?php esc_html_e( 'Enter your BlockFrost API keys to fetch on-chain asset and pool data. Create a free project at BlockFrost if you do not have one yet.', 'cardano-connect' ); ?>
	<a href="https://blockfrost.io/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'BlockFrost', 'cardano-connect' ); ?></a>
	&middot;
	<a href="https://wp.cardanoconnect.io/blockfrost" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'How to get API keys', 'cardano-connect' ); ?></a>
</p>

<div class="wpcc-section wpcc-section-warning wpcc-section-small">
	<p><strong><?php esc_html_e( 'Before going live:', 'cardano-connect' ); ?></strong> <?php esc_html_e( 'You will need a mainnet BlockFrost API key configured before enabling mainnet and serving production users.', 'cardano-connect' ); ?></p>
</div>

<table class="form-table" role="presentation">
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $prefix . 'assets_api_key' ); ?>"><?php echo esc_html( $mainnet_key['label'] ?? '' ); ?></label></th>
		<td>
			<input type="text" class="regular-text" name="<?php echo esc_attr( $prefix . 'assets_api_key' ); ?>" id="<?php echo esc_attr( $prefix . 'assets_api_key' ); ?>" value="<?php echo esc_attr( (string) $mainnet_val ); ?>" autocomplete="off" />
			<?php if ( ! empty( $mainnet_key['note'] ) ) : ?>
				<p class="description"><?php echo esc_html( $mainnet_key['note'] ); ?></p>
			<?php endif; ?>
		</td>
	</tr>
	<tr>
		<th scope="row"><label for="<?php echo esc_attr( $prefix . 'assets_api_key_testnet' ); ?>"><?php echo esc_html( $testnet_key['label'] ?? '' ); ?></label></th>
		<td>
			<input type="text" class="regular-text" name="<?php echo esc_attr( $prefix . 'assets_api_key_testnet' ); ?>" id="<?php echo esc_attr( $prefix . 'assets_api_key_testnet' ); ?>" value="<?php echo esc_attr( (string) $testnet_val ); ?>" autocomplete="off" />
			<?php if ( ! empty( $testnet_key['note'] ) ) : ?>
				<p class="description"><?php echo esc_html( $testnet_key['note'] ); ?></p>
			<?php endif; ?>
		</td>
	</tr>
</table>
