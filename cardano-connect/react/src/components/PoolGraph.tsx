import React from "react";
import {
    classMap,
    formatBalance,
    formatNumber,
    formatPercentageFromBig,
    formatPercentageFromDecimal,
    trimAddress
} from "../library/utils";
import {DataRows} from "./common/DataRows";
import {Copy} from "./common/Copy";

export const PoolGraph = ({
    plot,
    hide,
} : GraphToolTip<PoolData>) => {

    // Local State

    const rows: ComponentDataRows['rows'] = [
        {
            title: 'Pledge',
            data: formatBalance(plot?.data?.live_pledge || '0') || '0'
        },
        {
            title: 'Stake',
            data: formatBalance(plot?.data?.live_stake || '0') || '0'
        },
        {
            title: 'Stake to pledge',
            data: formatPercentageFromBig(plot?.data?.live_pledge || '0', plot?.data?.live_stake || '0') + '%'
        },
        {
            title: 'Saturation',
            data: formatPercentageFromDecimal(plot?.data?.live_saturation || 0) + '%'
        },
        {
            title: 'Total Blocks',
            data: formatNumber(plot?.data?.blocks_minted || 0)
        },
        {
            title: 'Last Epoch Blocks',
            data: formatNumber(plot?.data?.blocks_epoch || 0)
        }
    ]

    return (
        <div>
            <span className={classMap.plotClose} onClick={() => hide()}></span>
            <div className={classMap.plotTitle}>
                ID: <Copy text={trimAddress(plot?.data?.pool_id || '-')} copyText={plot?.data?.pool_id} title={plot?.data?.pool_id || '-'}/><br/>
                Pool: <Copy text={plot?.data?.metadata?.name || '-'}/><br/>
                Ticker: <Copy text={plot?.data?.metadata?.ticker || '-'}/>
            </div>
            <DataRows rows={rows}/>
        </div>
    )
}