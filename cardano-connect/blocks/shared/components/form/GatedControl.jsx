import {__} from "@wordpress/i18n";
import {CheckboxControl, RadioControl, SelectControl} from "@wordpress/components";
import {useEffect, useState} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * @param {{
 *   gated: string,
 *   gated_placeholder?: string,
 *   gate?: string
 *   gate_hide_component?: boolean
 *   gateOptions: []
 *   patternOptions: []
 *   setPatternOptions: (a: any) => void
 *   setAttributes: (a: any) => void
 * }} attributes
 */
export default function GatedControl(attributes) {

    /**
     * Fetch available block patterns and create an array of options.
     */
    const [patternOptions, setPatternOptions] = useState([]);
    useEffect(() => {
        apiFetch({ path: '/cardano-connect/synced-patterns' })
            .then((data) => {
                setPatternOptions(data.map((pattern) => ({
                    label: pattern.label,
                    value: pattern.value,
                })));
            })
            .catch((err) => console.error('Error fetching patterns:', err));
    }, []);

    /**
     * Create options used in both select menus.
     */
    const defaultOptions = [
        // { label: __('— Wallet Connected —'), value: '' },
        // { label: __('Mint'), value: 'component_mint' },
        { label: __('— Select a Pattern —'), value: '' }
    ]

    return (
        <>
            <SelectControl
                __nextHasNoMarginBottom
                __next40pxDefaultSize
                label={__('Gated content to show when the selected condition passes')}
                help={__('Render this content when the current user PASSES the selected condition')}
                value={attributes.gated}
                options={[...defaultOptions, ...patternOptions]}
                onChange={( value ) => attributes.setAttributes({gated: value})}
            />
            {attributes.gated ? (
                <>
                    <CheckboxControl
                        __nextHasNoMarginBottom
                        label={__('Hide content and only show gated content?')}
                        help={__('Useful if you only want to show your custom gated content.')}
                        checked={attributes.gate_hide_component}
                        onChange={(value) => attributes.setAttributes({gate_hide_component: value})}
                    />
                    <SelectControl
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        label={__('Content to show when the selected condition fails')}
                        help={__('Render this content when the current user FAILS the selected logic.' +
                            ' Leave blank to not show any content to the user until the condition passes.')}
                        value={attributes.gated_placeholder}
                        options={[...defaultOptions, ...patternOptions]}
                        onChange={( value ) => attributes.setAttributes({gated_placeholder: value})}
                    />
                    <RadioControl
                        label={__('Gated content condition')}
                        selected={attributes.gate || 'any'}
                        onChange={(value) => attributes.setAttributes({gate: value})}
                        options={attributes.gateOptions}
                    />
                </>
            ) : null }
        </>
    )
}