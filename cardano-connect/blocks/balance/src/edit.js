/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './../../shared/editor.scss';
import Title from "../../shared/components/Title";
import {CheckboxControl} from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	return (
		<div {...useBlockProps()}>
			<div className={`wpcc-block-control ${isSelected ? 'wpcc-block-control-edit' : ''}`}>
				{isSelected ? (
					<>
						<Title title={'Cardano Wallet'} />
						<CheckboxControl
							__nextHasNoMarginBottom
							label={__('Show address?')}
							checked={attributes.show_address}
							onChange={(value) => setAttributes({show_address: value})}
						/>
						<CheckboxControl
							__nextHasNoMarginBottom
							label={__('Show stake address?')}
							checked={attributes.show_stake_address}
							onChange={(value) => setAttributes({show_stake_address: value})}
						/>
						<CheckboxControl
							__nextHasNoMarginBottom
							label={__('Show wallet name?')}
							checked={attributes.show_wallet}
							onChange={(value) => setAttributes({show_wallet: value})}
						/>
						<CheckboxControl
							__nextHasNoMarginBottom
							label={__('Show wallet collateral?')}
							checked={attributes.show_collateral}
							onChange={(value) => setAttributes({show_collateral: value})}
						/>
						<CheckboxControl
							__nextHasNoMarginBottom
							label={__('Show wallet balance?')}
							checked={attributes.show_balance}
							onChange={(value) => setAttributes({show_balance: value})}
						/>
					</>
				) : (
					<div className={'balance-placeholder'}>
						<div className={`balance-placeholder-item ${attributes.show_address ? '' : 'hidden'}`}>
							<span>{__('Address:')}</span> {__('addr1r...xy4cfn')}
						</div>
						<div className={`balance-placeholder-item ${attributes.show_stake_address ? '' : 'hidden'}`}>
							<span>{__('Stake Address:')}</span> {__('stake1...ed73hf')}
						</div>
						<div className={`balance-placeholder-item ${attributes.show_wallet ? '' : 'hidden'}`}>
							<span>{__('Wallet:')}</span> {__('Eternl')}
						</div>
						<div className={`balance-placeholder-item ${attributes.show_collateral ? '' : 'hidden'}`}>
							<span>{__('Wallet collateral:')}</span> ₳{(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toLocaleString()}
						</div>
						<div className={`balance-placeholder-item ${attributes.show_balance ? '' : 'hidden'}`}>
							<span>{__('Balance:')}</span> ₳{(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toLocaleString()}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
