/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {CheckboxControl, TextareaControl} from '@wordpress/components';
import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

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
import Title from "../../shared/components/Title";
import GatedControl from "../../shared/components/form/GatedControl";
import Pagination from "../../shared/components/Pagination";
import Gated from "../../shared/components/Gated";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {

	/**
	 * Create an array of gated logic options.
	 */
	const gateOptions = [
		{label: __('No condition, always show content'), value: 'none'},
	]

	/**
	 * Renders a placeholder pool for visual display in the block editor.
	 * @param id {string}
	 * @param policy {string|null}
	 * @return {JSX.Element}
	 */
	const renderPlaceholder = (id, policy = null) => (
		<div key={id} className={`wpcc-placeholder`}>
			<div className={'wpcc-placeholder-head'}>
				<div className={'wpcc-placeholder-image'}></div>
				{policy ? <div className={'wpcc-placeholder-title'}>{policy}</div> : null}
				<div className={'wpcc-placeholder-title'}>{id}</div>
			</div>
		</div>
	)

	return (
		<div { ...useBlockProps() }>
			<div className={`wpcc-block-control ${isSelected ? 'wpcc-block-control-edit' : ''}`}>
				<div className={`${!isSelected ? 'hidden' : ''}`}>
					<Title title={'Cardano Wallet Assets List'} />
					<TextareaControl
						label={__('Whitelist Policy ID(s)')}
						help={__('(Filter the list of assets by one or more policy ID(s). Enter one Policy ID per line)')}
						value={attributes.whitelist}
						onChange={(nextValue) => setAttributes({whitelist: nextValue})}
					/>
					<NumberControl
						label={__('Items per page')}
						help={__('(Set to 0 to disable pagination, max 100)')}
						value={attributes.per_page}
						min={0}
						max={100}
						step={1}
						onChange={(nextValue) => setAttributes({per_page: parseInt(nextValue)})}
					/>
					<CheckboxControl
						label={__('Hide the collection titles?')}
						onChange={(nextValue) => setAttributes({hide_titles: !!nextValue})}
						checked={!!attributes.hide_titles}
						value={'hide_titles'}
					/>
					<TextareaControl
						label={__('Not found text')}
						help={__('(Replaces default options not found text with a custom message for this block)')}
						value={attributes.not_found}
						onChange={(nextValue) => setAttributes({not_found: nextValue})}
					/>
					<GatedControl
						gated={attributes.gated}
						gate_hide_component={attributes.gate_hide_component}
						gated_placeholder={attributes.gated_placeholder}
						gate={attributes.gate}
						gateOptions={gateOptions}
						setAttributes={setAttributes}
					/>
				</div>
				<div className={`${isSelected ? 'hidden' : ''}`}>
					{!attributes.gate_hide_component ? (
						<>
							{(!attributes.per_page && attributes.per_page !==0) || (attributes.per_page > 0) ? (
								<Pagination per_page={attributes.per_page} />
							) : null}
							<div className={`wpcc-placeholder-wrapper wpcc-${attributes.view || 'grid'}`}>
								{attributes.whitelist?.length > 0
									? attributes.whitelist.split('\n').map(id => renderPlaceholder('Asset 1', attributes.hide_titles ? null : id))
									: (
										<>
											{renderPlaceholder('Asset 1')}
											{renderPlaceholder('Asset 2')}
											{renderPlaceholder('Asset 3')}
											{renderPlaceholder('Asset 4')}
										</>
									)}
							</div>
						</>
					) : null }
					<Gated
						gateOptions={gateOptions}
						gated_placeholder={attributes.gated_placeholder}
						gated={attributes.gated}
						gate={attributes.gate}
					/>
				</div>
			</div>
		</div>
	);
}
