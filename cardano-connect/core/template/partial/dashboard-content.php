<?php
/**
 * @var WPCC\Settings $this
 */
?>

<?php if ( isset( $_GET['wizard'] ) && $_GET['wizard'] === 'complete' ) : ?>
	<div class="wpcc-section wpcc-section-success wpcc-notice-banner">
		<p><?php esc_html_e( 'Setup complete. Your Cardano Connect plugin is ready to use.', 'cardano-connect' ); ?></p>
	</div>
<?php endif; ?>

<div class="wpcc-row">
	<div class="wpcc-col-1">

		<?php $this->getTemplate( 'partial/notice', [], true ); ?>

		<?php $wizard_restart_url = \WPCC\SetupWizard::getRestartUrl(); ?>

		<div class="wpcc-section">
			<h3><?php esc_html_e( 'Getting started', 'cardano-connect' ); ?></h3>
			<p><?php esc_html_e( 'Configure the plugin in a few simple steps:', 'cardano-connect' ); ?></p>
			<ol>
				<li>
					<?php esc_html_e( "Configure your 'Main settings', you can enabled Mainnet straight away or when you are ready.", 'cardano-connect' ); ?>
					<a href="<?php echo esc_url( $this->getSettingUrl() ); ?>"><?php esc_html_e( 'Edit settings', 'cardano-connect' ); ?></a>
					<span class="wpcc-inline-separator">|</span>
					<a href="<?php echo esc_url( $wizard_restart_url ); ?>"><?php esc_html_e( 'Run setup wizard', 'cardano-connect' ); ?></a>
				</li>
				<li><?php esc_html_e( 'Add the WP Cardano Connector using a WordPress block, or the short code anywhere in your theme.', 'cardano-connect' ); ?></li>
				<li><?php esc_html_e( 'You can include multiple instances of the blocks on each page to suit your theme.', 'cardano-connect' ); ?></li>
				<li><?php esc_html_e( 'Share details with your users on how to create a wallet and connect!', 'cardano-connect' ); ?></li>
			</ol>
			<hr class="wpcc-hr" />
			<div class="wpcc-row">
				<div class="wpcc-col-1 wpcc-content" style="width: 50%">
					<h4><?php esc_html_e( 'WordPress block', 'cardano-connect' ); ?></h4>
					<p><?php esc_html_e( "Using an WordPress block editor, search for 'Cardano' and select the WP Cardano Connector to place this anywhere in your theme.", 'cardano-connect' ); ?></p>
					<p><?php esc_html_e( 'If your theme does not support Blocks, you can use the short code in any content editor or WordPress theme or plugin file.', 'cardano-connect' ); ?></p>
				</div>
				<div class="wpcc-col-1 wpcc-content" style="width: 50%">
					<img width="100%" src="<?php echo esc_url( $this->getAssetUrl( 'screenshot-1.jpg' ) ); ?>" alt="<?php esc_attr_e( 'WordPress block', 'cardano-connect' ); ?>">
				</div>
			</div>
			<hr class="wpcc-hr" />
			<h4><?php esc_html_e( 'Short codes', 'cardano-connect' ); ?></h4>
			<p><?php esc_html_e( 'Paste one of the following short codes into any content editor, shortcode block, or a custom theme file to display the Cardano Connect plugins. Click a shortcode to copy it.', 'cardano-connect' ); ?></p>
			<?php
			$shortcodes = [
				'[cardano-connect-connector]',
				'[cardano-connect-balance]',
				'[cardano-connect-assets]',
				'[cardano-connect-pools]',
				'[cardano-connect-dreps]',
				'[cardano-connect-assets whitelist="c450b3e21b1e98bb559bfbaf3b9fd9df60d7df9e0ce62cedd56912ea,7e45118272daec25d07395db991611d723bece256191d1926bb612f5"]',
			];
			foreach ( $shortcodes as $shortcode ) :
				?>
				<button
					type="button"
					class="wpcc-code wpcc-code-copy"
					data-copy="<?php echo esc_attr( $shortcode ); ?>"
					title="<?php esc_attr_e( 'Click to copy', 'cardano-connect' ); ?>"
				><?php echo esc_html( $shortcode ); ?></button>
			<?php endforeach; ?>
			<p><?php esc_html_e( 'Example adding a shortcode using the block editor:', 'cardano-connect' ); ?></p>
			<img width="100%" src="<?php echo esc_url( $this->getAssetUrl( 'screenshot-2.jpg' ) ); ?>" alt="<?php esc_attr_e( 'WordPress block', 'cardano-connect' ); ?>">
		</div>

		<div class="wpcc-section">
			<h3><?php esc_html_e( 'How does it work?', 'cardano-connect' ); ?></h3>
			<p><?php esc_html_e( 'Allowing your users to register and login with a Cardano Wallet is a first step with web3. Users will sign a message in their connected wallet, and the plugin takes care of linking the wallet to with WordPress account.', 'cardano-connect' ); ?></p>
			<ol>
				<li>
					<?php esc_html_e( "When connecting a wallet a new WordPress user is created with the role you selected on the 'Main settings' plugin page.", 'cardano-connect' ); ?>
					<a href="<?php echo esc_url( $this->getSettingUrl() ); ?>"><?php esc_html_e( 'Edit settings', 'cardano-connect' ); ?></a>
					<span class="wpcc-inline-separator">|</span>
					<a href="<?php echo esc_url( $wizard_restart_url ); ?>"><?php esc_html_e( 'Run setup wizard', 'cardano-connect' ); ?></a>
				</li>
				<li><?php esc_html_e( 'Addresses are unique, and unique across networks. The plugin takes care of associating Mainnet and Testnet wallets with a single WordPress user.', 'cardano-connect' ); ?></li>
				<li><?php esc_html_e( 'You can then use any WordPress functionality or user role plugin to control web3 gated content access for logged in users.', 'cardano-connect' ); ?></li>
			</ol>
			<hr class="wpcc-hr" />
			<h4><?php esc_html_e( 'Under the hood', 'cardano-connect' ); ?></h4>
			<p>
				<?php esc_html_e( 'Built with the latest WordPress, Gutenberg and Cardano development tooling keeping a stable plugin with the latest Web3 features:', 'cardano-connect' ); ?>
				<a href='https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/'><?php esc_html_e( 'wp-env', 'cardano-connect' ); ?></a>,
				<a href='https://meshjs.dev/'><?php esc_html_e( 'Mesh.js', 'cardano-connect' ); ?></a>,
				<a href='https://react.dev/'><?php esc_html_e( 'React', 'cardano-connect' ); ?></a>
			</p>
		</div>
	</div>

	<div class="wpcc-col-2">
		<div class="wpcc-section">
			<div class="wpcc-title">
				<img width="72" height="72" src="<?php echo esc_url( $this->getAssetUrl( 'logo-color.svg' ) ); ?>" alt="<?php esc_attr_e( 'WP Cardano Connect', 'cardano-connect' ); ?>">
				<div class="wpcc-content">
					<h3><?php esc_html_e( 'Stay up to date', 'cardano-connect' ); ?></h3>
					<p><?php esc_html_e( 'Stay up to date with the latest on Cardano from Upstream:', 'cardano-connect' ); ?></p>
				</div>
			</div>
			<hr class="wpcc-hr" />
			<div class="wpcc-supporter-container">
				<div class="wpcc-supporter-item">
					<h3><?php esc_html_e( 'Upstream', 'cardano-connect' ); ?><br/><?php esc_html_e( 'Stake Pool', 'cardano-connect' ); ?></h3>
					<a href="https://upstream.org.uk/" target="_blank" class="wpcc-rounded">
						<img src="<?php echo esc_url( $this->getAssetUrl( 'logo-upstream.svg' ) ); ?>" alt="<?php esc_attr_e( 'Upstream', 'cardano-connect' ); ?>" />
					</a>
					<p><?php esc_html_e( 'Cardano Community events, workshops, Cardano infrastructure; making Cardano accessible.', 'cardano-connect' ); ?></p>
					<a class="button" href="https://upstream.org.uk/" target="_blank"><?php esc_html_e( 'Infrastructure', 'cardano-connect' ); ?></a>
				</div>
				<div class="wpcc-supporter-item">
					<h3><?php esc_html_e( 'Pendulum Development', 'cardano-connect' ); ?></h3>
					<a href="https://pendulumdev.co.uk/" target="_blank" class="wpcc-rounded">
						<img src="<?php echo esc_url( $this->getAssetUrl( 'logo-pendulum.svg' ) ); ?>" alt="<?php esc_attr_e( 'Pendulum', 'cardano-connect' ); ?>" />
					</a>
					<p><?php esc_html_e( 'Main plugin development support, experienced web engineers; making Cardano accessible.', 'cardano-connect' ); ?></p>
					<a class="button" href="https://pendulumdev.co.uk/" target="_blank"><?php esc_html_e( 'Development', 'cardano-connect' ); ?></a>
				</div>
			</div>
		</div>
	</div>
</div>
