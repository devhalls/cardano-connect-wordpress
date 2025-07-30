<?php
namespace WPCC\Connect\DTO;

class MithrilSigners extends Base {
	public function __construct(
		/** @var int */
		public int $registered_at,
		/** @var int */
		public int $signing_at,
		/** @var MithrilSigner[] */
		public array $registrations,
	) {}
}