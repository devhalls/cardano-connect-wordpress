import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    classMap,
    formatBalance,
    formatPercentageFromDecimal,
    formatPercentageFromBig,
    trimAddress
} from "../library/utils";
import {Tooltip} from 'react-tooltip'
import {Copy} from "./common/Copy";
import {backendGetPool} from "../library";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {Stats} from "./common/Stats";
import {LinkIcon} from "./common/LinkIcon";
import {getUserState} from "../library/user";
import {getUxComparePools, setComparePools} from "../library/ux";

export const PoolMini = ({
    poolId,
    index,
    delegateStake,
    pool
}: ComponentPool) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loading, setLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const [poolData, setPoolData] = useState<PoolData | null>(null)

    // Handlers

    const handleDelegate = async () => {
        setLoadingAction(true)
        await delegateStake(poolId)
        setLoadingAction(false)
    }

    // Helpers

    const getPool = useCallback(async () => {
        if (pool) {
            setPoolData(pool)
        } else {
            setLoading(true)
            const data = await backendGetPool({
                nonce: wpCardanoConnect?.nonce,
                poolId
            })
            if (data.success) {
                setPoolData(data.data)
            }
        }
        setLoading(false)
    }, [poolId, pool])

    const poolPledgePercent = useMemo<number>(() =>
        formatPercentageFromBig(poolData?.live_pledge, poolData?.declared_pledge), [poolData])
    const poolSaturationPercent = useMemo<number>(() =>
        formatPercentageFromDecimal(poolData?.live_saturation), [poolData])
    const userDelegated = useMemo(() =>
        (user?.account?.active && user?.account?.pool_id === poolId), [user, poolId])
    const isSaturated = useMemo(() =>
        ((poolData?.live_saturation ? poolData?.live_saturation * 100 : 0) > 100), [poolData])
    const isNoPledged = useMemo(() =>
        (poolPledgePercent ? poolPledgePercent < 100 : true), [poolPledgePercent])

    // Get pool data on load

    useEffect(() => {
        getPool().then()
    }, [getPool])

    return (
        <div key={poolId + '-' + index} className={`${classMap.poolMini} pool-${poolId}`}>
            {loading ? <Loader/> : !poolData ?
                <div className={classMap.notFound}>
                    {options.label_no_pool}<br/><Copy text={poolId} />
                </div> :
                <div className={classMap.poolContent}>
                    <div className={classMap.poolHeader}>
                        <div className={classMap.poolImage}>
                            <img
                                src={poolData.metadata_extended?.info?.url_png_icon_64x64 || poolData.metadata_extended?.info?.url_png_logo || options.assets_placeholder}
                                alt={poolId}
                            />
                        </div>
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
                                    {user?.connected && delegateStake && !userDelegated ?
                                        <button className={classMap.actionsButton + ' not-delegated'} onClick={handleDelegate}
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
