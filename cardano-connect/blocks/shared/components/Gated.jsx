import {__} from "@wordpress/i18n";
import {useEffect, useState} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * @param {{
 *   gated: string,
 *   gated_placeholder?: string,
 *   gate?: string
 *   gateOptions: []
 * }} attributes
 */
export default function Gated(attributes) {

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

    return (
        <>
            {attributes.gated_placeholder ? (
                <div className={'wpcc-gated unlocked'}>
                    <div className={'wpcc-gated-title'}>
                        <span className={'wpcc-gated-lock'}></span>
                        {__('Gated placeholder:')}
                    </div>
                    <span className={'wpcc-gated-detail'}>
                        {patternOptions.find(g => g.value === attributes.gated_placeholder)?.label}
                    </span>
                </div>
            ) : null }
            {attributes.gated ? (
                <div className={'wpcc-gated locked'}>
                    <div className={'wpcc-gated-title'}>
                        <span className={'wpcc-gated-lock'}></span>
                        {__('Gated content:')}
                    </div>
                    <span className={'wpcc-gated-detail'}>
                        {patternOptions.find(g => g.value === attributes.gated)?.label}
                    </span> : {attributes.gateOptions.find(g => g.value === (attributes.gate || 'any'))?.label}
                </div>
            ) : null }
        </>
    )
}