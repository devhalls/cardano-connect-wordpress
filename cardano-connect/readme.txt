=== Cardano Connect ===
Contributors:      PendulumDev
Donate link:       https://pendulumdev.co.uk/
Tags:              Web3, Cardano, Wallet Connections, Token Gate
Requires at least: 6.1
Tested up to:      6.8
Stable tag:        1.1.0
Requires PHP:      8.0
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Cardano blockchain wallet login and data indexing for your WordPress website. Bring the web3 world to your website.

== Description ==

Cardano Wallet login for your WordPress website, supporting all CIP-30 compliant wallets.

Built using WordPress blocks, React and Mesh.js to bring you the latest wallet connection features for your WordPress
users.

Connecting your wallet will register a new user account with your selected user role, and grant access to your default
WordPress configured user settings allowing you to create gated content.

== Installation ==

1. Upload the plugin zip to the `/wp-content/plugins` directory, or install the plugin through the WordPress plugins
screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Complete the setup wizard or configure the plugin under Cardano Connect → Settings.

== Changelog ==

= 1.1.0 =
* Fix plugin activation not seeding default settings (connect button showed numeric labels on fresh installs).
* Fix options loading to merge field defaults instead of array index fallbacks.
* Add skippable setup wizard on the main plugin dashboard for new installations.
* Add conditional frontend asset loading when blocks or shortcodes are present.
* Fix frontend asset loading from theme sidebars and ACF meta fields.
* Handle missing browser wallet extensions with readable empty states and download links.
* Fix balance empty-state text readability on themed sites.
* Migrate React frontend from Create React App to Vite.
* Upgrade blocks toolchain to @wordpress/scripts 32.x.
* Pin Mesh SDK transitive dependencies with npm overrides.
* Harden REST connect/disconnect endpoints with nonce validation and rate limiting.
* Add WPCC_VERIFY_ENDPOINT constant and wpcc_verify_endpoint filter for signature verification URL.
* Add wpcc_load_options filter for multilingual label overrides.
* Load plugin text domain for admin and settings translations.
* Update plugin guide URL for Upstream documentation.

= 0.1.0 =
* Initial release
