<?php use WPCC\Plugin;

/**
 * Plugin Name: Cardano Connect
 * Plugin URI: https://pendulumdev.co.uk
 * Description: Cardano blockchain wallet login and data indexing for your WordPress website, supporting all major CIP-30 complaint wallets. Bring the web3 world to your website and give gated content access to your web3 users, all using the default WordPress users and roles.
 * Requires at least: 6.1
 * Requires PHP: 8.0
 * Version: 1.0.0
 * Author: PendulumDev
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cardano-connect
 * Domain Path: /languages
 *
 * @package WPCC
 */

/**
 * Cardano Connect is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * Cardano Connect is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cardano Connect. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
 */

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Bootstrap the plugin.
 */
if ( ! class_exists( Plugin::class ) ) {

	define( 'WPCC_DIR', __DIR__ );
	require 'core/vendor/autoload.php';
	$plugin = new WPCC\Plugin();

	/**
	 * Plugin lifecycle hooks.
	 */
	register_activation_hook( __FILE__, [ $plugin, 'onActivate' ] );
	register_deactivation_hook( __FILE__, [ $plugin, 'onDeactivate' ] );
	register_uninstall_hook( __FILE__, 'onWPCCPluginUninstall' );

	/**
	 * Hook uninstall (plugin deleted).
	 * Deletes all plugin options values.
	 * Remove all plugin scheduled events.
	 * @return void
	 */
	function onWPCCPluginUninstall(): void {
		foreach ( WPCC\Base::SETTING_FIELD_NAMES as $setting ) {
			delete_option( $setting );
		}
		wp_unschedule_hook( 'cardano_connect_cron_fetch_data' );
		wp_unschedule_hook( 'cardano_connect_cron_fetch_data_batch' );
	}

	/**
	 * Start the plugin
	 */
	$plugin->run();
}