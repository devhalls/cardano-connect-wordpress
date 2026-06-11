<?php

namespace WPCC\Tests;

use WPCC\Base;

/**
 * Test double exposing protected Base methods.
 */
class TestDouble extends Base {
	public function run(): void {
	}

	public function exposedLoadOptions(): array {
		return $this->loadOptions();
	}

	public function exposedGetDefaultSettings(): array {
		return $this->getDefaultSettings();
	}

	public function exposedGetSetting( string $field_key = 'all' ): mixed {
		return $this->getSetting( $field_key );
	}
}
