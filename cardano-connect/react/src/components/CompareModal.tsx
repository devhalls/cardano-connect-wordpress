import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {
    classMap, convertPoolToGraphBar, convertPoolToGraphPlotPledge,
    convertPoolToGraphPlotPledgeRation, convertPoolToGraphTree,
    formatNumberShort,
    translateError
} from "../library/utils";
import {
    getUxComparePools,
    getUxCompareModal,
    setCompareModal,
    getUxCompareDreps,
    getUxComparePoolFilters, getUxCompareDrepFilters, setComparePoolFilters
} from "../library/ux";
import {getOptionState} from "../library/option";
import {Pools} from "./Pools";
import {Dreps} from "./Dreps";
import {backendGetPoolsStats} from "../library";
import {setMessage} from "../library/message";
import {Loader} from "./common/Loader";
import {ScatterPlot} from "./graph/ScatterPlot";
import {PoolGraph as PoolGraphComponent} from "./PoolGraph";
import {Tooltip} from "react-tooltip";
import {CircularBar} from "./graph/CircularBar";
import {Treemap} from "./graph/Treemap";
import {Density2d} from "./graph/Density2d";
import {Filter} from "./common/Filter";

export const CompareModal = () => {

    // APP State

    const dispatch = useAppDispatch()
    const compareModal: UxState['compareModal'] = useAppSelector(getUxCompareModal)
    const comparePools: UxState['comparePools'] = useAppSelector(getUxComparePools)
    const compareDreps: UxState['compareDreps'] = useAppSelector(getUxCompareDreps)
    const comparePoolFilters: UxState['comparePoolFilters'] = useAppSelector(getUxComparePoolFilters)
    const compareDrepFilters: UxState['compareDrepFilters'] = useAppSelector(getUxCompareDrepFilters)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const defaultFilters: Filter[] = [
        {
            placeholder: options.label_paginate_search_text_placeholder,
            label: options.label_paginate_search_text,
            type: 'text',
            key: 's',
            value: '',
            order: 1,
        },
        {
            label: options.label_paginate_search_metadata,
            type: 'checkbox',
            key: 'no_metadata',
            value: true,
            order: 2,
        },
        {
            label: options.label_paginate_search_retired,
            type: 'checkbox',
            key: 'hide_retired',
            value: true,
            order: 3,
        },
        {
            label: options.label_paginate_search_saturation_min,
            type: 'range',
            key: 'live_saturation_min',
            value: '0',
            min: 0,
            max: 1000,
            order: 4,
            format: (v) => parseInt(v)/1000,
            display: (v) => v != '0' ? '> ' + parseInt(v)/10 + '%' : 'any%'
        },
        {
            label: options.label_paginate_search_saturation,
            type: 'range',
            key: 'live_saturation',
            value: '0',
            min: 0,
            max: 1000,
            order: 5,
            format: (v) => parseInt(v)/1000,
            display: (v) => v != '0' ? '< ' + parseInt(v)/10 + '%' : 'any%'
        },
    ]
    const minWidth = 480
    const minHeight = 400
    const [containerWidth, setContainerWidth] = useState<number>(0)
    const [containerHeight, setContainerHeight] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const [views, setViews] = useState<any[]|null>(null)
    const [selectedView, setSelectedView] = useState(null)
    const [filters, setFilters] = useState<Filter[] | null>(defaultFilters)
    const [updatedFilters, setUpdatedFilters] = useState<Filter[] | null>(filters)
    const [allPoolStats, setAllPoolStats] = useState<PoolData[]|null>(null)
    const getPoolStats = useCallback(async () => {
        setLoading(true)
        setAllPoolStats(null)
        const data = await backendGetPoolsStats({
            nonce: wpCardanoConnect?.nonce,
            filters: comparePoolFilters
        })
        if (data.success) {
            setAllPoolStats(data.data.items)
        } else {
            dispatch(setMessage({
                message: translateError(data.message),
                type: 'error'
            }))
        }
    }, [comparePoolFilters])

    // Action handlers

    const handleClose = () => {
        dispatch(setCompareModal(null))
        setViews(null)
        setSelectedView(null)
        setAllPoolStats(null)
    }
    const handleChangeView = useCallback((key: string) => {
        setLoading(true)
        setSelectedView(views.find(v => v.key === key))
        setLoading(false)
    }, [views])
    const handleUpdateFilter = (updatedFilters: Filter[]) => {
        dispatch(setComparePoolFilters(updatedFilters.map(f => {
            return {
                value: f.format ? f.format(f.value) : f.value,
                key: f.key,
                type: f.type,
            }
        })))
        setFilters(updatedFilters)
        //getPoolStats().then()
    }

    // Load view data after fetching data

    useEffect(() => {
        if (loading || !allPoolStats) {
            return
        }
        const axisX = {
            tick: {
                spacing: 50,
                    length: 10,
                    format: (a) => formatNumberShort(a, undefined, 2),
            },
            label: {
                label: 'Live stake',
                    color: 'black',
                    position: {
                    x: '40px',
                        y: '56px'
                }
            }
        }
        const axisY = {
            tick: {
                spacing: 40,
                    length: 6,
                    format: (a) => formatNumberShort(a, undefined, 2),
            },
            label: {
                label: 'Live pledge',
                    color: 'black',
                    position: {
                    x: '-48px',
                        y: '-60px'
                }
            }
        }
        const axisMax = (x: number) => x > 1000000 ? Math.round(x/1000000)*1000000 : Math.round(x)
        const viewConfig: {
            enabled: boolean
            key: string
            type: string
            title: string
            icon: string
            description?: string
            descriptionShort?: string
            graph?: GraphComponent
        }[] = [
            {
                enabled: false,
                key: 'epoch-blocks-density',
                type: 'density2d',
                icon: '',
                title: 'Epoch blocks density',
                description: 'Pools block production from the previous epoch.',
                descriptionShort: 'Pools block production from the previous epoch.',
                graph: {
                    color: '#D2D7D3',
                    data: allPoolStats.map(p => {
                        if (comparePools?.find(q => p.pool_id === q.pool_id)) {
                            return {
                                ...convertPoolToGraphPlotPledge(p),
                                fill: 'green',
                                stroke: 'green',
                            }
                        }
                        return convertPoolToGraphPlotPledge(p)
                    }),
                    axisX,
                    axisY,
                }
            },
            {
                enabled: false,
                key: 'epoch-blocks',
                type: 'treemap-bar',
                icon: '',
                title: 'Epoch blocks',
                description: 'Pools block production from the previous epoch.',
                descriptionShort: 'Pools block production from the previous epoch.',
                graph: {
                    data: {
                        type: 'node',
                        value: 0,
                        children: allPoolStats.filter(p => p.blocks_epoch).map(p => {
                            if (comparePools?.find(q => p.pool_id === q.pool_id)) {
                                return {
                                    ...convertPoolToGraphTree(p, 'blocks_epoch'),
                                    fill: 'green',
                                    stroke: 'green',
                                }
                            }
                            return convertPoolToGraphTree(p, 'blocks_epoch')
                        })
                    },
                    ToolTip: PoolGraphComponent
                }
            },
            {
                enabled: false,
                key: 'epoch-blocks-circular',
                type: 'circular-bar',
                icon: '',
                title: 'Epoch blocks circular',
                description: 'Pools block production from the previous epoch.',
                graph: {
                    color: '#D2D7D3',
                    data: allPoolStats.filter(p => p.blocks_epoch).map(p => {
                        if (comparePools?.find(q => p.pool_id === q.pool_id)) {
                            return {
                                ...convertPoolToGraphBar(p, 'blocks_epoch'),
                                fill: 'green',
                                stroke: 'green',
                            }
                        }
                        return convertPoolToGraphBar(p, 'blocks_epoch')
                    }),
                    axisMax,
                    ToolTip: PoolGraphComponent
                }
            },
            {
                enabled: true,
                key: 'scatter',
                type: 'scatter',
                icon: 'scatter',
                title: 'Stake vs pledge',
                description: 'Pool live stake, live pledge comparison. Scroll or double click the graph to zoom' +
                    ' (shift double click to zoom out).',
                descriptionShort: 'Pool live stake, live pledge comparison.',
                graph: {
                    color: '#D2D7D3',
                    data: allPoolStats.map(p => {
                        if (comparePools?.find(q => p.pool_id === q.pool_id)) {
                            return {
                                ...convertPoolToGraphPlotPledge(p),
                                fill: 'green',
                                stroke: 'green',
                            }
                        }
                        return convertPoolToGraphPlotPledge(p)
                    }),
                    axisX,
                    axisY,
                    axisMax,
                    ToolTip: PoolGraphComponent
                }
            },
            {
                enabled: true,
                key: 'scatter-ratio',
                type: 'scatter',
                icon: 'scatter-ratio',
                title: 'Stake to pledge ratio',
                description: 'Pool live stake / live pledge comparison with sized plots based on the pools pledge to' +
                    ' stake ratio - the larger the plot the more \'skin in the game\' vs their stake. Scroll or' +
                    ' double click the graph to zoom (shift double click to zoom out).',
                descriptionShort: 'Pool live stake / live pledge comparison with sized plots.',
                graph: {
                    color: '#D2D7D3',
                    data: allPoolStats.map(p => {
                        if (comparePools?.find(q => p.pool_id === q.pool_id)) {
                            return {
                                ...convertPoolToGraphPlotPledgeRation(p),
                                fill: 'green',
                                stroke: 'green',
                            }
                        }
                        return convertPoolToGraphPlotPledgeRation(p)
                    }),
                    axisX,
                    axisY,
                    axisMax,
                    ToolTip: PoolGraphComponent
                }
            },
            {
                enabled: true,
                key: 'block',
                type: 'block',
                icon: 'grid',
                title: 'Favourite pools',
                descriptionShort: 'Your favourite pools',
            }
        ]
        if (!selectedView) {
            setSelectedView(viewConfig.find(a => a.enabled))
        } else {
            setSelectedView(viewConfig.find(a => a.key === selectedView.key))
        }
        setViews(viewConfig)
        setLoading(false)
    }, [loading, comparePools, allPoolStats]);

    // Load data on mount.

    useEffect(() => {
        if (compareModal === 'pools') {
            getPoolStats().then(() => setLoading(false))
        }
        if (compareModal) {
            document.body.classList.add('wpcc-modal-open');
        } else {
            document.body.classList.remove('wpcc-modal-open');
        }

        // Set dimensions and respond to window resize

        setContainerWidth(Math.max(window.innerWidth - 72, minWidth))
        setContainerHeight(Math.max(window.innerHeight - 212, minHeight))
        window.onresize = () => {
            setContainerWidth(Math.max(window.innerWidth - 72, minWidth))
            setContainerHeight(Math.max(window.innerHeight - 212, minHeight))
        }

        return () => {
            document.body.classList.remove('wpcc-modal-open');
            window.onresize = null
        }
    }, [compareModal, getPoolStats, minWidth, minHeight]);

    return (
        <>
            <div className={classMap.compareButtonContainer}>
                <button
                    className={classMap.compareButton}
                    onClick={() => dispatch(setCompareModal('pools'))}>
                    {options.label_compare_view_pools}
                </button>
                {compareDreps?.length ? <button
                    className={classMap.compareButton}
                    onClick={() => dispatch(setCompareModal('dreps'))}>
                    {options.label_compare_view_dreps} ({compareDreps.length})
                </button> : null}
            </div>
            {compareModal ? (
                <div className={classMap.modal}>
                    <div className={classMap.modalHeader}>
                        <h2 className={classMap.modalTitle}>
                            {compareModal === 'pools' ? options.label_compare_view_pools : options.label_compare_view_dreps}{' '}
                        </h2>
                        {!views ? <Loader className={'wpcc-loader'}/> : (
                            <div className={classMap.btnGroup}>
                                {views?.filter(a => a.enabled)?.map(v => (
                                    <button
                                        key={v.key}
                                        data-tooltip-id={`modal-tooltip`}
                                        data-tooltip-content={v.descriptionShort || v.description}
                                        className={`${classMap.btnIcon} ${classMap.icon} ${classMap.icon}-${v.icon} ${v.key === selectedView.key ? classMap.btnIconActive : ''} `}
                                        onClick={() => handleChangeView(v.key)}
                                        title={v.title}
                                    >
                                    </button>
                                ))}
                            </div>
                        )}
                        <button className={classMap.modalClose} onClick={() => handleClose()}></button>
                    </div>
                    <div className={classMap.compareModalBody}>
                        {(loading || !views) ? <Loader/> : (
                            <>
                                {filters ? (
                                    <div className={'classMap.paginationFiltersContainer'}>
                                        {filters?.sort((a, b) => a.order < b.order ? -1 : 1)?.map((f) =>
                                            <Filter
                                                key={f.key}
                                                prefix={'compare-filters-'}
                                                filter={updatedFilters?.find(g => g.key === f.key) || f}
                                                setFilter={(f) => {
                                                    const updated = updatedFilters.filter(g => g.key !== f.key)
                                                    setUpdatedFilters([...updated, f])
                                                }}
                                            />
                                        )}
                                        <div className={'classMap.paginationFiltersButtons'}>
                                            <button
                                                className={`${loading || JSON.stringify(updatedFilters) === JSON.stringify(filters) ? 'classMap.paginationUpdateDisabled' : 'classMap.paginationUpdate'}`}
                                                disabled={loading || JSON.stringify(updatedFilters) === JSON.stringify(filters)}
                                                onClick={() => handleUpdateFilter(updatedFilters)}>
                                                {options.label_paginate_search_update}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}

                                {selectedView?.key === 'block' ? (
                                    <>
                                        {compareModal === 'pools' ? <Pools
                                            perPage={0}
                                            pools={comparePools || []}
                                            notFound={options.label_compare_no_items}
                                        /> : null}
                                        {compareModal === 'dreps' ? <Dreps
                                            perPage={0}
                                            dreps={compareDreps}
                                            notFound={options.label_compare_no_items}
                                        /> : null}
                                    </>
                                ) : null}

                                {selectedView?.type === 'scatter' ? (
                                    <ScatterPlot {...selectedView.graph} width={containerWidth} height={containerHeight} />
                                ) : null}

                                {selectedView?.type === 'circular-bar' ? (
                                    <CircularBar {...selectedView.graph} width={containerWidth} height={containerHeight} />
                                ) : null}

                                {selectedView?.type === 'treemap-bar' ? (
                                    <Treemap {...selectedView.graph} width={containerWidth} height={containerHeight} />
                                ) : null}

                                {selectedView?.type === 'density2d' ? (
                                    <Density2d {...selectedView.graph} width={containerWidth} height={containerHeight} />
                                ) : null}

                                {selectedView?.description ? <p>{selectedView?.description}</p> : null}
                            </>
                        )}
                    </div>
                    <Tooltip id={`modal-tooltip`}/>
                </div>
            ) : null}
        </>
    )
}
