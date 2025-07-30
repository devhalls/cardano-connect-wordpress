import React, {useMemo} from "react";
import {
    classMap,
    formatBalance,
    trimAddress
} from "../library/utils";
import {Tooltip} from 'react-tooltip'
import {Copy} from "./common/Copy";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {LinkIcon} from "./common/LinkIcon";
import {getUserState} from "../library/user";
import usePool from "../hooks/pool";
import {PoolImage} from "./common/PoolImage";

export const PoolList = ({
     poolId,
     index,
     pool
 }: ComponentPool) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const {
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

    const classesError = useMemo(() => `${isSaturated || isNoPledged ? classMap.poolError : ''}`, [isSaturated, isNoPledged])
    const classesComparing = useMemo(() => `${isComparing ? classMap.poolComparing : ''}`, [isComparing])

    return poolData ? (
        <tr key={poolId + '-' + index} className={`${classMap.pool} pool-${poolId} ${classMap.table.tr} ${classesComparing} ${classesError}`}>
            <td className={classMap.table.tdImage}>
                <PoolImage poolId={poolId} poolData={poolData} isNoPledged={isNoPledged} isSaturated={isSaturated} />
            </td>
            <td className={classMap.table.tdAction}>
                {poolData.metadata?.ticker ? (
                    <Copy text={poolData.metadata.ticker} className={classMap.poolTicker}/>
                ) : null}
                {poolData.metadata?.name ? (
                    <div className={classMap.poolName}>
                        <Copy text={poolData.metadata.name} />
                    </div>
                ) : null}
                <div className={classMap.row}>
                    <Copy text={trimAddress(poolId)} copyText={poolId} className={classMap.poolId}/>
                    {isSaturated || isNoPledged ? <span
                        className={`${classMap.icon} ${classMap.iconSmall} ${classMap.icon}-retired`}
                        data-tooltip-id={`pool-tooltip-${poolId}`}
                        data-tooltip-content={`
                            ${isSaturated ? options.label_pool_stake_saturated_error : ''} 
                            ${isNoPledged ? options.label_pool_pledge_not_met_error : ''}
                        `}
                    ></span> : null }
                </div>
            </td>
            <td className={classMap.table.tdText}>
                {`${(poolData.margin_cost * 100).toFixed(2)}%`}
            </td>
            <td className={classMap.table.tdText}>
                {`₳ ${formatBalance(poolData.fixed_cost, 0)}`}
            </td>
            <td className={classMap.table.tdText}>
                <Bar
                    content={`₳ ${formatBalance(poolData.live_stake)} (${poolSaturationPercent}%)`}
                    percentage={poolSaturationPercent}
                    colorMap={{
                        0: '#87e381',
                        85: '#ffe15e',
                        95: '#ff6c6c'
                    }}
                />
            </td>
            <td className={classMap.table.tdText}>
                <Bar
                    content={`₳ ${formatBalance(poolData.live_pledge)} (${poolPledgePercent}%)`}
                    percentage={poolPledgePercent}
                    defaultColor={'#ff6c6c'}
                    colorMap={{
                        0: '#ff6c6c',
                        100: '#87e381',
                    }}
                />
            </td>
            <td className={classMap.table.tdText}>
                {poolData.blocks_minted}
            </td>
            <td className={classMap.table.tdText}>
                {poolData.blocks_epoch}
            </td>
            <td className={classMap.table.tdText}>
                {poolData.live_delegators}
            </td>
            <td className={classMap.table.tdText}>
                {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                    <>
                        {user?.connected && !userDelegated ?
                            <button className={classMap.actionsButton + ' not-delegated'} onClick={delegateToPool} type={'button'}>{options.label_delegate_to_pool}</button> : null}
                        {user?.connected && userDelegated ? <span
                            className={classMap.actionsButtonPlaceholder + ' delegated'}>{options.label_delegated_to_pool}</span> : null}
                    </>
                )}
            </td>
            <td className={classMap.table.tdText}>
                {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                    <button
                        data-tooltip-id={`pool-tooltip-${poolId}`}
                        data-tooltip-content={!isComparing ? options.label_compare_add : options.label_compare_remove}
                        className={classMap.actionsButtonLight}
                        onClick={() => addToCompare()}
                        type={'button'}>
                        {isComparing ? '-' : '+'}
                    </button>
                )}
            </td>
            <td className={classMap.table.tdText}>
                <div className={classMap.poolSocial}>
                    {poolData.retirement?.length
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={poolData.retirement?.length === 1 ? options.label_pool_retiring : options.label_pool_retired}
                            title={poolData.metadata?.name || poolId}
                            icon={'retired'}
                            url={poolData.metadata?.homepage}
                        /> : null}
                    {poolData.metadata?.homepage
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Website'}
                            title={poolData.metadata?.name || poolId}
                            icon={'link'}
                            url={poolData.metadata?.homepage}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.twitter_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Twitter'}
                            title={'Twitter'}
                            icon={'twitter'}
                            url={'https://x.com/' + poolData.metadata_extended?.info?.social?.twitter_handle}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.github_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Github'}
                            title={'Github'}
                            icon={'github'}
                            url={'https://github.com/' + poolData.metadata_extended?.info?.social?.github_handle}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.linkedin_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Linkedin'}
                            title={'Linkedin'}
                            icon={'linkedin'}
                            url={'https://linkedin.com/' + poolData.metadata_extended?.info?.social?.linkedin_handle}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.facebook_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Facebook'}
                            title={'Facebook'}
                            icon={'facebook'}
                            url={'https://facebook.com/' + poolData.metadata_extended?.info?.social?.facebook_handle}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.youtube_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Youtube'}
                            title={'Youtube'}
                            icon={'youtube'}
                            url={'https://youtube.com/' + poolData.metadata_extended?.info?.social?.youtube_handle}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.telegram_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Telegram'}
                            title={'Telegram'}
                            icon={'telegram'}
                            url={'https://t.me/' + poolData.metadata_extended?.info?.social?.telegram_handle}
                        />
                        : null}
                    {poolData.metadata_extended?.info?.social?.discord_handle
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'Discord'}
                            title={'Discord'}
                            icon={'discord'}
                            url={'https://discord.com/users/' + poolData.metadata_extended?.info?.social?.discord_handle}
                        />
                        : null}
                    {poolData.metadata?.url
                        ? <LinkIcon
                            toolTipId={`pool-tooltip-${poolId}`}
                            toolTip={'JSON Metadata'}
                            title={'JSON Metadata'}
                            icon={'json'}
                            url={poolData.metadata?.url}
                        />
                        : null}
                </div>
                <div className={classMap.poolDetail}>
                    {poolData.synced_at ? `${options.label_pool_synced} ${new Date(parseInt(poolData.synced_at ?? '0') * 1000)}` : ''}
                </div>
                <Tooltip id={`pool-tooltip-${poolId}`}/>
            </td>
        </tr>
    ) : null
}
