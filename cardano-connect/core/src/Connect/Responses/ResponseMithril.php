<?php

namespace WPCC\Connect\Responses;

use WPCC\Connect\DTO\MithrilSigners;

class ResponseMithril {
	public function __construct(
		/** @var bool */
		public bool $success,
		/** @var MithrilSigners|null */
		public array|null $response = null,
		/** @var int|null */
		public int|null $total = null,
		/** @var string|null */
		public string|null $message = null,
	) {}
}