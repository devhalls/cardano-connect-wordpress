import React from 'react'
import {classMap} from "../../library/utils";
import {LinkIcon} from "./LinkIcon";
import {useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";

export const Socials = ({
    poolData,
    poolId,
    className = '',
}: ComponentSocials) => {

    // APP State
    const options: OptionState = useAppSelector(getOptionState)

    return (
        <div className={classMap.poolSocial + ` ${className}`}>
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
    )
}
