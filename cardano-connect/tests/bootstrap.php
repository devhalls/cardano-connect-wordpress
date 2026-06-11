<?php

/**
 * PHPUnit bootstrap for WordPress tests (wp-env tests-cli).
 */

define( 'TESTS_PLUGIN_DIR', dirname( __DIR__ ) );

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = '/wordpress-phpunit';
}

require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require TESTS_PLUGIN_DIR . '/cardano-connect.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require $_tests_dir . '/includes/bootstrap.php';
