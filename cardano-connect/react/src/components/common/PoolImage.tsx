import React from 'react'
import {classMap} from "../../library/utils";
import {useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";

export const PoolImage = ({
    poolData,
    poolId,
    isSaturated,
    isNoPledged,
    className = '',
}: ComponentPoolImage) => {

    // APP State
    const options: OptionState = useAppSelector(getOptionState)

    return (
        <div className={`${classMap.poolImageWrapper} ${className}`}>
            <div className={`${classMap.poolImage}`}>
                <img
                    src={
                        poolData.metadata_extended?.info?.url_png_icon_64x64 ||
                        poolData.metadata_extended?.info?.url_png_logo ||
                        options.assets_placeholder
                    }
                    alt={poolId}
                />
                {isSaturated || isNoPledged ? <span
                    className={`${classMap.icon} ${classMap.iconSmall} ${classMap.icon}-retired`}
                    data-tooltip-id={`pool-tooltip-${poolId}`}
                    data-tooltip-content={`
                        ${isSaturated ? options.label_pool_stake_saturated_error : ''} 
                        ${isNoPledged ? options.label_pool_pledge_not_met_error : ''}
                    `}
                    data-tooltip-place={'bottom'}
                ></span> : null }
                {poolData.mithril_signer ? <span
                    className={`${classMap.icon} ${classMap.iconSmall} ${classMap.icon}-mithril`}
                    data-tooltip-id={`pool-tooltip-${poolId}`}
                    data-tooltip-content={options.label_pool_is_mithril_signer}
                    data-tooltip-place={'bottom'}
                ></span> : null }
            </div>
        </div>
    )
}
