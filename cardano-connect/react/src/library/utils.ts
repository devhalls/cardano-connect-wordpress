import BigNumber from "bignumber.js";

export const trimAddress = (string: string, padded: number = 6) => {
    return string
        ? `${string.substring(0, padded)}...${string.substring(string.length-(padded), string.length)}`
        : ''
}

export const trimText = (string: string | string[], maxLength: number, ellipsis?: boolean): string => {
    let trimmed: string
    if (!string) {
        return
    }
    if (typeof string === 'string') {
        trimmed = string.substring(0, maxLength)
    } else {
        trimmed = string.join(' ').substring(0, maxLength)
    }
    return (
        trimmed.trim() +
        (ellipsis && trimmed?.length >= maxLength ? '...' : '')
    )
}

export const translateError = (error: string): string => {
    let formattedError: string = error
    const replacements: {match: string; replace: string}[] = [
        {
            match: 'user canceled connection',
            replace: 'User canceled the connection'
        },{
            match: 'user declined sign tx',
            replace: 'User declined the transaction'
        },{
            match: 'no account set',
            replace: 'No account is set for connection, please enable a connection in your wallet then try again'
        }
    ]
    replacements.map(r => {
        if (formattedError.includes(r.match)) {
            formattedError = r.replace
        }
        return r
    })
    return formattedError
}

export const formatBalance = (quantity: string, decimals: number = 2): string => {
    const asNumber: number = parseInt(quantity, 10)
    if (asNumber <= 0) {
        return '0'
    }
    const formatted: number = parseInt((asNumber / 1_00).toString(), 10)
    return formatNumber(parseInt(formatted.toString().slice(0, -4))) + (decimals > 0 ? '.' + formatted.toString().slice(-decimals) : '')
}

export const formatNumber = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatNumberShort = (n: number, suffix: string = '', decimals: number = 0, uppercase: boolean = false) => {
    let suffixes = uppercase ? ['', 'K', 'M', 'B', 'T'] : ['', 'k', 'm', 'b', 't'];
    if (typeof n !== 'number') {
        return (0).toFixed(decimals) + (suffix || '');
    }
    if (n < 1000) {
        return n.toFixed(decimals) + (suffix || '');
    }
    let index = suffix ? suffixes.indexOf(suffix) + 1 : 1;
    return formatNumberShort(n / 1000, suffixes[index], decimals, uppercase);
}

export const formatPercentageFromDecimal = (x: number): number => {
    return parseFloat((x * 100).toFixed(2))
}

export const formatPercentageFromBig = (a: string, b: string): number => {
    if (b === "0") {
        return 0
    }
    const aBn = new BigNumber(a)
    const bBn = new BigNumber(b)
    return (a && b)
        ? parseFloat(aBn.div(bBn).multipliedBy(100).toFixed(2))
        : 0
}

export const formatAbbreviatedNumberFromBig = (a: string): string => {
    return formatNumberShort(formatNumberFromBig(a))
}

export const formatNumberFromBig = (a: string): number => {
    const bn = new BigNumber(a)
    return bn.dividedBy(1000000).toNumber()
}

export const ucFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const filterPaginatedRange = (data: any[], page: number, perPage: number) => {
    if (perPage === 0) {
        return data
    }
    const min = (perPage * page) - perPage
    const max = perPage * page
    return data.filter((a, i) => {
        const index = i+1
        return index <= max && index > min
    })
}

export const getColor = (percentage: number = 0) => percentage > 90
    ? 'rgb(217,130,4)'
    : 85
        ? 'rgb(222,143,27)'
        : 'rgb(236,179,87)'

export const convertToApiAsset = (asset: Asset): ApiAsset => {
    return {
        asset: asset.unit,
        asset_name: asset.assetName,
        fingerprint: asset.fingerprint,
        initial_mint_tx_hash: null,
        metadata: null,
        mint_or_burn_count: 0,
        onchain_metadata: {
            name: asset.assetName,
            description: null,
            image: null,
            mediaType: null,
            files: null
        },
        onchain_metadata_extra: null,
        onchain_metadata_standard: null,
        policy_id: asset.policyId,
        quantity: asset.quantity,
        walletAsset: asset
    }
}

export const convertPoolToGraphBar = (p: PoolData, yField: string): GraphBar<PoolData> => {
    return {
        id: p.pool_id,
        y: p[yField],
        data: p
    }
}

export const convertPoolToGraphTree = (p: PoolData, yField: string): GraphTreeNode<PoolData> => {
    return {
        type: 'leaf',
        value: p[yField],
        fill: getColor(),
        stroke: getColor(),
        data: p
    }
}

export const convertPoolToGraphPlotPledge = (p: PoolData): GraphPlot<PoolData> => {
    const percentage = Math.min(formatPercentageFromBig(p.live_pledge, p.live_stake), 100)
    return {
        x: formatNumberFromBig(p.live_stake),
        y: formatNumberFromBig(p.live_pledge),
        id: p.pool_id,
        radius: 8,
        fill: getColor(percentage),
        stroke: getColor(percentage),
        data: p
    }
}

export const convertPoolToGraphPlotPledgeRation = (p: PoolData): GraphPlot<PoolData> => {
    const maxSize = 30
    const minSize = 4
    const percentage = Math.min(formatPercentageFromBig(p.live_pledge, p.live_stake), 100)
    const radius = Math.max(maxSize * (percentage / 100), minSize)
    return {
        ...convertPoolToGraphPlotPledge(p),
        radius
    }
}

export const classMap = {
    // General.
    row: 'wpcc-row',
    col: 'wpcc-col',
    card: 'wpcc-card',
    cardDark: 'wpcc-card-dark',
    notFound: 'wpcc-not-found wpcc-card-dark',
    // Form elements.
    input: 'wpcc-input',
    checkbox: 'wpcc-checkbox',
    range: 'wpcc-range',
    select: 'wpcc-select',
    selectWrapper: 'wpcc-select-wrapper',
    // Loader component.
    loader: 'wpcc-loader wpcc-card-dark',
    // Copy component.
    copy: 'wpcc-copy',
    // Icon component.
    icon: 'wpcc-icon',
    iconSmall: 'wpcc-icon-small',
    twitterIcon: 'wpcc-icon-twitter',
    githubIcon: 'wpcc-icon-github',
    facebookIcon: 'wpcc-icon-facebook',
    youtubeIcon: 'wpcc-icon-youtube',
    telegramIcon: 'wpcc-icon-telegram',
    discordIcon: 'wpcc-icon-discord',
    linkIcon: 'wpcc-icon-link',
    linkedinIcon: 'wpcc-icon-linkedin',
    filterIcon: 'wpcc-icon-filter',
    filterCloseIcon: 'wpcc-icon-filter-close',
    retiredIcon: 'wpcc-icon-retired',
    compareIcon: 'wpcc-icon-compare',
    jsonIcon: 'wpcc-icon-json',
    eyeIcon: 'wpcc-icon-eye',
    closeIcon: 'wpcc-icon wpcc-icon-close',
    addIcon: 'wpcc-icon wpcc-icon-add',
    minusIcon: 'wpcc-icon wpcc-icon-minus',
    infoIcon: 'wpcc-icon wpcc-icon-info',
    scatterIcon: 'wpcc-icon wpcc-icon-scatter',
    scatterRangeIcon: 'wpcc-icon wpcc-icon-scatter-range',
    gridIcon: 'wpcc-icon wpcc-icon-grid',
    // Button components.
    btnGroup: 'wpcc-button-group',
    btn: 'wpcc-button',
    btnSquare: 'wpcc-button-square',
    btnIcon: 'wpcc-button-icon',
    btnIconActive: 'wpcc-button-icon-active',
    btnPrimary: 'wpcc-button wpcc-button-primary',
    actions: 'wpcc-actions',
    actionsSmall: 'wpcc-actions-small',
    actionsButton: 'wpcc-actions-button',
    actionsButtonLight: 'wpcc-actions-button-light',
    // Pagination.
    paginator: {
        container: 'wpcc-paginator-container',
        header: 'wpcc-paginator-header',
        body: 'wpcc-paginator-body',
        controls: {
            container: 'wpcc-paginator-controls-container',
            number: 'wpcc-paginator-controls-page',
            prev: 'wpcc-paginator-controls-prev wpcc-button',
            next: 'wpcc-paginator-controls-next wpcc-button',
            total: 'wpcc-paginator-controls-total',
            grid: 'wpcc-paginator-controls-grid wpcc-button-icon wpcc-icon wpcc-icon-grid',
            list: 'wpcc-paginator-controls-list wpcc-button-icon wpcc-icon wpcc-icon-list',
            open: 'wpcc-paginator-controls-toggle wpcc-button-icon wpcc-button-icon-gray wpcc-icon wpcc-icon-filter',
            close: 'wpcc-paginator-controls-toggle wpcc-button-icon wpcc-button-icon-gray wpcc-icon wpcc-icon-filter-close',
        },
        filters: {
            container: 'wpcc-paginator-filters-container',
            list: 'wpcc-paginator-filters-list',
            item: 'wpcc-paginator-filters-item',
            buttons: 'wpcc-paginator-filters-buttons',
            reset: 'wpcc-paginator-filters-reset wpcc-button',
            update: 'wpcc-paginator-filters-update wpcc-button wpcc-button-primary',
        }
    },
    // Connector component classes.
    container: 'connector-container',
    connected: 'connector-content connector-connected',
    disconnected: 'connector-content connector-disconnected',
    list: 'connector-wallet-list wpcc-card',
    menu: 'connector-menu-list wpcc-card',
    listButton: 'connector-list-button',
    listEmpty: 'connector-no-wallets',
    button: 'connector-button',
    buttonIcon: 'connector-icon',
    buttonContent: 'connector-button-content',
    buttonText: 'connector-button-text',
    buttonAddress: 'connector-button-address',
    errorContainer: 'connector-error',
    // Balance classes.
    balanceContainer: 'wpcc-balance wpcc-card',
    balanceRow: 'wpcc-balance-row',
    balanceCol: 'wpcc-balance-col',
    balanceTotalRow: 'wpcc-balance-total-row wpcc-balance-row',
    // Asset list classes.
    assetsContainer: 'wpcc-assets-container',
    assetTitle: 'wpcc-assets-title',
    assetTitleText: 'wpcc-assets-title-text',
    assetItem: 'wpcc-assets-item wpcc-card-dark wpcc-row',
    assetItemCol: 'wpcc-assets-item-col',
    assetItemImage: 'wpcc-assets-item-image',
    assetItemTitle: 'wpcc-assets-item-title',
    assetItemDescription: 'wpcc-assets-item-description',
    assetItemQuantity: 'wpcc-assets-item-quantity',
    // Modal classes.
    modal: 'wpcc-modal wpcc-card',
    modalHeader: 'wpcc-modal-header',
    modalTitle: 'wpcc-modal-title',
    modalClose: 'wpcc-modal-close wpcc-button-icon wpcc-icon wpcc-icon-close',
    // Asset classes.
    assetBody: 'wpcc-asset-modal-body',
    assetBodyCol: 'wpcc-asset-modal-col',
    assetImage: 'wpcc-asset-modal-image',
    assetData: 'wpcc-asset-modal-data',
    assetTitleRow: 'wpcc-asset-modal-data-row wpcc-asset-modal-data-title',
    assetDataRow: 'wpcc-asset-modal-data-row',
    assetCode: 'wpcc-asset-modal-code wpcc-card-dark',
    // Message component classes.
    messages: 'wpcc-messages',
    message: 'wpcc-message wpcc-card',
    messageRemove: 'wpcc-message-remove',
    messageError: 'wpcc-message-error',
    messageSuccess: 'wpcc-message-success',
    messageWarning: 'wpcc-message-warning',
    messageNotice: 'wpcc-message-notice',
    // Pool.
    pools: 'wpcc-pools',
    pool: 'wpcc-pool wpcc-card-dark',
    poolMini: 'wpcc-pool wpcc-pool-mini wpcc-card-dark',
    poolComparing: 'wpcc-pool-comparing',
    poolImage: 'wpcc-pool-image',
    poolContent: 'wpcc-pool-content',
    poolHeader: 'wpcc-pool-header',
    poolDescription: 'wpcc-pool-description',
    poolDescriptionIcon: 'wpcc-icon wpcc-icon-eye',
    poolHeaderRight: 'wpcc-pool-header-right',
    poolBody: 'wpcc-pool-body',
    poolBodyBars: 'wpcc-pool-body-bars',
    poolTicker: 'wpcc-pool-ticker',
    poolName: 'wpcc-pool-name',
    poolSocial: 'wpcc-pool-social',
    poolId: 'wpcc-pool-id',
    poolDetail: 'wpcc-pool-detail',
    // DRep.
    dreps: 'wpcc-dreps',
    drep: 'wpcc-drep wpcc-card-dark',
    drepId: 'wpcc-drep-id',
    drepImage: 'wpcc-drep-image',
    drepContent: 'wpcc-pool-content',
    drepHeader: 'wpcc-drep-header',
    drepDescription: 'wpcc-pool-description',
    drepDescriptionIcon: 'wpcc-icon wpcc-icon-eye',
    drepHeaderRight: 'wpcc-pool-header-right',
    drepBody: 'wpcc-pool-body',
    drepSocial: 'wpcc-pool-social',
    // Bar component classes.
    bar: 'wpcc-bar',
    barTitle: 'wpcc-bar-title',
    barContent: 'wpcc-bar-content',
    barContentOverlay: 'wpcc-bar-content-overlay',
    barCoverage: 'wpcc-bar-coverage',
    barCoverageInner: 'wpcc-bar-coverage-inner',
    // Stats component classes.
    stats: 'wpcc-stats',
    statsTitle: 'wpcc-stats-title',
    statsContent: 'wpcc-stats-content',
    actionsButtonPlaceholder: 'wpcc-actions-button-placeholder',
    // Compare modal component
    compareButtonContainer: 'wpcc-compare-button-container',
    compareButton: 'wpcc-compare-button',
    compareButtonIcon: 'wpcc-icon wpcc-icon-compare',
    compareModalBody: 'wpcc-compare-modal-body',
    // Graphs
    graphContainer: 'wpcc-graph-container',
    graphHover: 'wpcc-graph-hover',
    plotContainer: 'wpcc-plot-container',
    plotClose: 'wpcc-plot-close wpcc-icon wpcc-icon-close',
    plotAdd: 'wpcc-plot-add wpcc-icon wpcc-icon-add',
    plotTitle: 'wpcc-plot-title',
}