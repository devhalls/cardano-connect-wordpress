import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    classMap,
    formatBalance,
} from "../library/utils";
import {Copy} from "./common/Copy";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {getUserState} from "../library/user";
import usePool from "../hooks/pool";
import {PoolImage} from "./common/PoolImage";

export const PoolMini = ({
    poolId,
    index,
    pool
}: ComponentPool) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const {
        loading,
        loadingAction,
        poolData,
        delegateToPool,
        poolSaturationPercent,
        userDelegated,
        isSaturated,
        isNoPledged,
    } = usePool(poolId, pool)

    return (
        <div key={poolId + '-' + index} className={`${classMap.poolMini} pool-${poolId}`}>
            {loading ? <Loader/> : !poolData ?
                <div className={classMap.notFound}>
                    {options.label_no_pool}<br/><Copy text={poolId} />
                </div> :
                <div className={classMap.poolContent}>
                    <div className={classMap.poolHeader}>
                        <PoolImage poolId={poolId} poolData={poolData} isNoPledged={isNoPledged} isSaturated={isSaturated} />
                        {poolData.metadata?.ticker ? (
                            <div>
                                <Copy text={poolData.metadata.ticker} className={classMap.poolTicker}/>
                                <div className={classMap.poolName}>
                                    <Copy text={poolData.metadata.name} />
                                </div>
                            </div>
                        ) : null}
                        <Bar
                            title={isSaturated ? options.label_pool_stake_saturated : options.label_pool_stake}
                            content={`₳ ${formatBalance(poolData.live_stake)} (${poolSaturationPercent}%)`}
                            percentage={poolSaturationPercent}
                            colorMap={{
                                0: '#87e381',
                                85: '#ffe15e',
                                95: '#ff6c6c'
                            }}
                        />
                    </div>
                    <div>
                        <div className={classMap.actionsSmall}>
                            {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                                <>
                                    {!user?.connected && <span
                                        className={classMap.actionsButtonPlaceholder + ' not-connected'}>{options.label_connect_prompt}</span>}
                                    {user?.connected && !userDelegated ?
                                        <button className={classMap.actionsButton + ' not-delegated'} onClick={delegateToPool}
                                                type={'button'}>{options.label_delegate_to_pool}</button> : null}
                                    {user?.connected && userDelegated ? <span
                                        className={classMap.actionsButtonPlaceholder + ' delegated'}>{options.label_delegated_to_pool}</span> : null}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
