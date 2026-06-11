import React, {useState} from "react";
import {classMap, formatBalance, trimAddress} from "../library/utils";
import {Tooltip} from 'react-tooltip'
import {Copy} from "./common/Copy";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {Stats} from "./common/Stats";
import {getUserState} from "../library/user";
import usePool from "../hooks/pool";
import {Socials} from "./common/Socials";
import {PoolImage} from "./common/PoolImage";

export const Pool = ({
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
        addToCompare,
        poolPledgePercent,
        poolSaturationPercent,
        userDelegated,
        isSaturated,
        isNoPledged,
        isComparing,
    } = usePool(poolId, pool)
    const [showDescription, setShowDescription] = useState(false)
    return (
        <div className={`${classMap.pool} pool-index-${index} pool-${poolId} ${isComparing ? classMap.poolComparing : null}`}>
            {loading ? (
                <Loader/>
            ) : !poolData ? (
                <div className={classMap.notFound}>
                    {options.label_no_pool}<br/><Copy text={poolId}/>
                </div>
            ) : (
                <div className={classMap.poolContent}>
                    <div className={classMap.poolHeader}>
                        <div className={classMap.poolHeaderLeft}>
                            <PoolImage poolId={poolId} poolData={poolData} isNoPledged={isNoPledged} isSaturated={isSaturated} />
                            {poolData.metadata?.ticker ? (
                                <div>
                                    <Copy text={poolData.metadata.ticker} className={classMap.poolTicker}/>
                                    <div className={classMap.poolName}>
                                        <Copy text={poolData.metadata.name}/>
                                        {poolData.metadata.description ? (
                                            <span
                                                className={classMap.poolDescriptionIcon}
                                                onClick={() => setShowDescription(!showDescription)}
                                            />
                                        ) : null }
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className={classMap.poolHeaderRight}>
                            <Socials poolId={poolId} poolData={poolData} />
                            <Copy text={trimAddress(poolId)} copyText={poolId} className={classMap.poolId}/>
                        </div>
                    </div>
                    {poolData.metadata?.description && showDescription ? (
                        <div className={classMap.poolDescription}>{poolData.metadata.description}</div>
                    ) : null}
                    <div className={classMap.poolBody}>
                        <Stats
                            title={options.label_pool_fees}
                            stats={[
                                {
                                    content: `${(poolData.margin_cost * 100).toFixed(2)}%`,
                                    color: '#D7D7D7'
                                },
                                {
                                    content: `₳ ${formatBalance(poolData.fixed_cost, 0)}`,
                                    color: '#D7D7D7'
                                }
                            ]}
                        />
                        <div className={classMap.poolBodyBars}>
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
                            <Bar
                                title={isNoPledged ? options.label_pool_pledge_not_met : options.label_pool_pledge_met}
                                content={`₳ ${formatBalance(poolData.live_pledge)} (${poolPledgePercent}%)`}
                                percentage={poolPledgePercent}
                                defaultColor={'#ff6c6c'}
                                colorMap={{
                                    0: '#ff6c6c',
                                    100: '#87e381',
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={classMap.actions}>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {options.label_pool_lifetime_blocks} <strong>{poolData.blocks_minted}</strong>
                            </div>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {options.label_pool_last_epoch_blocks} <strong>{poolData.blocks_epoch}</strong>
                            </div>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {options.label_pool_delegators} <strong>{poolData.live_delegators}</strong>
                            </div>
                        </div>
                        <div className={classMap.actions}>
                            {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                                <>
                                    {user?.connected && !userDelegated ?
                                        <button className={classMap.actionsButton + ' not-delegated'}
                                                onClick={delegateToPool}
                                                type={'button'}>{options.label_delegate_to_pool}</button> : null}
                                    {user?.connected && userDelegated ? <span
                                        className={classMap.actionsButtonPlaceholder + ' delegated'}>{options.label_delegated_to_pool}</span> : null}
                                    <button
                                        data-tooltip-id={`pool-tooltip-${poolId}`}
                                        data-tooltip-content={!isComparing ? options.label_compare_add : options.label_compare_remove}
                                        className={classMap.actionsButtonLight}
                                        onClick={() => addToCompare()}
                                        type={'button'}>
                                        {isComparing ? '-' : '+'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={classMap.poolDetail}>
                        {poolData.synced_at ? `${options.label_pool_synced} ${new Date(parseInt(poolData.synced_at ?? '0') * 1000)}` : ''}
                    </div>
                </div>
            )}
            <Tooltip id={`pool-tooltip-${poolId}`}/>
        </div>
    )
}
