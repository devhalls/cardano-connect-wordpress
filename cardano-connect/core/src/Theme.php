<?php

namespace WPCC;

class Theme extends Base
{
	/**
	 * @inheritDoc
	 */
	public function __construct() {
		parent::__construct();
		$this->settings    = $this->loadSettings();
		$this->options     = $this->loadOptions();
		$this->user_fields = $this->loadUserFields();
	}

	/**
	 * Returns self.
	 * $theme = (new WPCC\Theme()))->run()
	 * @return self
	 */
    public function run(): self {
	    return $this;
    }
}