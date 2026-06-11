/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { RadioControl, TextareaControl} from '@wordpress/components';
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
import './../../shared/editor.scss';
import Pagination from "../../shared/components/Pagination";
import Gated from "../../shared/components/Gated";
import Title from "../../shared/components/Title";
import GatedControl from "../../shared/components/form/GatedControl";

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
	 * Create an array of view options.
	 */
	const viewOptions = [
		{ label: __('Card grid'), value: 'grid' },
		{ label: __('List table'), value: 'list' },
		{ label: __('Mini Cards'), value: 'mini' }
	]

	/**
	 * Create an array of gated logic options.
	 */
	const gateOptions = [
		{label: __('No condition, always show content'), value: 'none'},
		{label: __('Match all'), value: 'all'},
		{label: __('Match any'), value: 'any'},
	]

	/**
	 * Renders a placeholder pool for visual display in the block editor.
	 * @param id
	 * @param view
	 * @return {JSX.Element}
	 */
	const renderPlaceholder = (id, view) => (
		<div key={id} className={`wpcc-placeholder`}>
			<div className={'wpcc-placeholder-head'}>
				<div className={'wpcc-placeholder-image'}></div>
				<div className={'wpcc-placeholder-title'}>{id}</div>
			</div>
			{view === 'grid' && (
				<div className={'wpcc-placeholder-blocks'}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			)}
			{view === 'mini' && (
				<div className={'wpcc-placeholder-blocks'}>
					<span></span>
				</div>
			)}
		</div>
	)

	return (
		<div { ...useBlockProps() }>
			<div className={`wpcc-block-control ${isSelected ? 'wpcc-block-control-edit' : ''}`}>
				<div className={`${!isSelected ? 'hidden' : ''}`}>
					<Title title={'Cardano Pool List'} />
					<TextareaControl
						__nextHasNoMarginBottom
						label={__('Whitelist Pool ID(s)')}
						help={__('(Filter the list of pools by one or more pool ID(s). Enter one Pool ID per line)')}
						value={attributes.whitelist}
						onChange={(nextValue) => setAttributes({whitelist: nextValue})}
					/>
					<NumberControl
						__next40pxDefaultSize
						label={__('Pools per page')}
						help={__('(Set to 0 to disable pagination, max 100)')}
						value={attributes.per_page}
						min={0}
						max={100}
						step={1}
						onChange={(nextValue) => setAttributes({per_page: parseInt(nextValue)})}
					/>
					<TextareaControl
						__nextHasNoMarginBottom
						label={__('Not found text')}
						help={__('(Replaces default options not found text with a custom message for this block)')}
						value={attributes.not_found}
						onChange={(nextValue) => setAttributes({not_found: nextValue})}
					/>
					<RadioControl
						label={__('Select pool view template')}
						selected={ attributes.view || 'grid' }
						onChange={( value ) => setAttributes({view: value})}
						options={viewOptions}
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
									? attributes.whitelist.split('\n').map(id => renderPlaceholder(id, attributes.view || 'grid'))
									: (
										<>
											{renderPlaceholder('Placeholder pool 1', attributes.view || 'grid')}
											{renderPlaceholder('Placeholder pool 2', attributes.view || 'grid')}
											{renderPlaceholder('Placeholder pool 3', attributes.view || 'grid')}
											{renderPlaceholder('Placeholder pool 4', attributes.view || 'grid')}
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
