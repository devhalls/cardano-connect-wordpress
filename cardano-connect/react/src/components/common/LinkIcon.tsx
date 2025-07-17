import React from 'react'
import {classMap} from "../../library/utils";

export const LinkIcon = ({
    title,
    url,
    icon,
    className = '',
    toolTip,
    toolTipId
}: ComponentLinkIcon) => {
    return (
        <a data-tooltip-place={'left'} data-tooltip-id={toolTip ? toolTipId : undefined} data-tooltip-content={toolTip ? toolTip : undefined} className={`${className}`} href={url} title={title} target="_blank" rel="noopener noreferrer">
            {icon ? <span className={`${classMap.icon} ${classMap.iconSmall} ${classMap.icon}-${icon}`}></span> : null}
            {!icon ? title : null}
        </a>
    )
}
