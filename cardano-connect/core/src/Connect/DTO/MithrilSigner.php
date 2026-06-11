<?php
namespace WPCC\Connect\DTO;

class MithrilSigner extends Base {
	public function __construct(
		/** @var string  */
		public string $party_id,
		/** @var string  */
		public string $stake,
	) {}
}