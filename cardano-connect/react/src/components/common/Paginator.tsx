import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Loader} from "./Loader";
import {useAppDispatch, useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";
import {classMap} from "../../library/utils";
import {Filter} from "./Filter";
import {setComparePoolFilters} from "../../library/ux";

export const Paginator = ({
    renderer,
    fetcher,
    perPage = 10, // Set to 0 to disable pagination
    className,
    notFound,
    defaultFilters,
    defaultView = 'grid'
}: ComponentPaginator<ApiAsset | Asset | Pool | Drep>) => {

    // APP state

    const dispatch = useAppDispatch()
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const containerRef= useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState<number>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [items, setItems] = useState<(ApiAsset | Pool | Asset | Drep)[] | null>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage)
    const [filters, setFilters] = useState<Filter[] | null>(defaultFilters)
    const [updatedPage, setUpdatedPage] = useState<number>(1);
    const [updatedFilters, setUpdatedFilters] = useState<Filter[] | null>(filters)
    const [showFilters, setShowFilters] = useState<boolean>(true);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>(defaultView)
    const totalPages = useMemo(
        () => total > itemsPerPage ? Math.ceil(total / itemsPerPage) : 1,
        [total, itemsPerPage]
    )

    // Click handlers

    const changePage = useCallback((newPage: number, filtersSubmittable: Filter[]) => {
        setContainerHeight(containerRef.current.clientHeight)
        setLoading(true)
        const submittableFilters: FilterPost[] = filtersSubmittable.map(f => {
            return {
                value: f.format ? f.format(f.value) : f.value,
                key: f.key,
                type: f.type,
            }
        })
        const calculatedPage= JSON.stringify(filters) === JSON.stringify(filtersSubmittable)
            ? newPage
            : 1;
        fetcher(calculatedPage, itemsPerPage, submittableFilters).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setPage(calculatedPage)
            setUpdatedPage(calculatedPage)
            setLoading(false)
            setFilters(filtersSubmittable)
            dispatch(setComparePoolFilters(filtersSubmittable.map(f => {
                return {
                    ...f,
                    value: f.format ? f.format(f.value) : f.value
                }
            })))
            setContainerHeight(null)
            containerRef.current.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
        })
    }, [itemsPerPage, filters, dispatch, fetcher])

    // Set data on load

    useEffect(() => {
        const submittableFilters: FilterPost[] = filters?.map(f => {
            return {
                value: f.format ? f.format(f.value) : f.value,
                key: f.key,
                type: f.type
            }
        })
        if (submittableFilters) {
            dispatch(setComparePoolFilters(submittableFilters))
        }
        fetcher(page, itemsPerPage, submittableFilters).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setLoading(false)
        })
    }, []);

    return (
        <div className={classMap.paginator.container} ref={containerRef} style={{height: containerHeight}}>
            {perPage > 0 ? (
                <div className={classMap.paginator.header}>
                    <div className={classMap.paginator.controls.container}>
                        <div className={classMap.paginator.controls.number}>
                            <input
                                className={classMap.input}
                                onChange={(v) => setUpdatedPage(parseInt(v.currentTarget.value || '1'))}
                                type={'number'}
                                value={updatedPage}
                                min={1}
                                max={totalPages}
                            />{' '}<div><span>/</span> {totalPages}</div>
                        </div>
                        <button
                            className={classMap.paginator.controls.prev}
                            disabled={loading || page <= 1}
                            onClick={() => changePage(page - 1, updatedFilters)}>
                            {options.label_paginate_prev}
                        </button>
                        <button
                            className={classMap.paginator.controls.next}
                            disabled={loading || (items && page >= totalPages)}
                            onClick={() => changePage(page + 1, updatedFilters)}>
                            {options.label_paginate_next}
                        </button>
                        <span className={classMap.paginator.controls.total}>{total} {options.label_paginate_items}</span>
                        <div className={classMap.btnGroup}>
                            <button
                                className={`${classMap.paginator.controls.grid} ${viewMode === 'grid' ? 'wpcc-button-icon-active' : null}`}
                                onClick={() => setViewMode('grid')}
                            ></button>
                            <button
                                className={`${classMap.paginator.controls.list} ${viewMode === 'list' ? 'wpcc-button-icon-active' : null}`}
                                onClick={() => setViewMode('list')}
                            ></button>
                            {defaultFilters && options.pools_data_source === 'local_wp' ? <button
                                className={showFilters ? classMap.paginator.controls.open : classMap.paginator.controls.close}
                                onClick={() => setShowFilters(!showFilters)}
                            ></button> : null}
                        </div>
                    </div>
                    {defaultFilters && showFilters ? (
                        <div className={classMap.paginator.filters.container}>
                            {options.pools_data_source === 'local_wp' ? (
                                <div className={classMap.paginator.filters.list}>
                                    {filters?.sort((a, b) => a.order < b.order ? -1 : 1).map((f) =>
                                        <Filter
                                            key={f.key}
                                            filter={updatedFilters?.find(g => g.key === f.key) || f}
                                            setFilter={(f) => {
                                                const updated = updatedFilters.filter(g => g.key !== f.key)
                                                setUpdatedFilters([...updated, f])
                                            }}
                                        />
                                    )}
                                </div>
                            ) : null}
                            <div className={classMap.paginator.filters.buttons}>
                                {!loading && (updatedPage !== page || JSON.stringify(updatedFilters) !== JSON.stringify(filters)) ? <button
                                    className={classMap.paginator.filters.update}
                                    disabled={loading}
                                    onClick={() => changePage(updatedPage, updatedFilters)}>
                                    {options.label_paginate_search_update}
                                </button> : null}
                                {!loading && (1 !== page || JSON.stringify(defaultFilters) !== JSON.stringify(filters)) ? <button
                                    className={classMap.paginator.filters.reset}
                                    disabled={loading}
                                    onClick={() => {
                                        setUpdatedFilters(defaultFilters)
                                        changePage(1, defaultFilters)
                                    }}>
                                    {options.label_paginate_search_reset}
                                </button> : null}
                            </div>
                        </div>
                    ): null}
                </div>
            ) : null}
            {viewMode === 'list' ? (
                <div className={`${classMap.table.wrapper} ${className}`}>
                    <table className={`${classMap.paginator.table}`}>
                        <thead>
                            <tr>
                                <th className={classMap.table.th}></th>
                                <th className={classMap.table.th}>Name / ID</th>
                                <th className={classMap.table.th}>Fee</th>
                                <th className={classMap.table.th}>Fixed Cost</th>
                                <th className={classMap.table.th}>Stake</th>
                                <th className={classMap.table.th}>Pledge</th>
                                <th className={classMap.table.th}>Lifetime Blocks</th>
                                <th className={classMap.table.th}>Blocks last Epoch</th>
                                <th className={classMap.table.th}>Delegators</th>
                                <th className={classMap.table.th}>Delegate</th>
                                <th className={classMap.table.th}>Compare</th>
                                <th className={classMap.table.th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? <tr><td colSpan={12}><Loader/></td></tr>
                                : items?.length
                                    ? items.map((item, i) => renderer(item, i, viewMode))
                                    : <tr className={classMap.notFound}><td>{notFound || options.label_no_assets}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`${classMap.paginator.body} ${className}`}>
                    {loading
                        ? <Loader/>
                        : items?.length
                            ? items.map((item, i) => renderer(item, i, viewMode))
                            : <div className={classMap.notFound}>{notFound || options.label_no_assets}</div>
                    }
                </div>
            )}
        </div>
    )
}
