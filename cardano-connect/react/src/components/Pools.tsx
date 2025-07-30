import React, {useEffect} from "react";
import {classMap, filterPaginatedRange} from "../library/utils";
import {backendGetPools} from "../library";
import {Paginator} from "./common/Paginator";
import {Pool as PoolComponent} from "./Pool";
import {PoolMini as PoolMiniComponent} from "./PoolMini";
import {PoolList as PoolListComponent} from "./PoolList";
import {useWallet} from "@meshsdk/react";
import {useAppSelector} from "../library/state";
import {getUserState} from "../library/user";
import {getOptionState} from "../library/option";
import {Gated} from "./common/Gated";

export const Pools = ({
    whitelistString = null,
    perPage = 10, // Set to 0 to disable pagination
    notFound,
    view,
    gated,
    gatedPlaceholder,
    gate,
    gateHideComponent,
    pools
}: ComponentPools) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)
    const { connect, connected} = useWallet()

    // Function to fetch the list of pools.

    const getPools = async (page: number, perPage: number, filters?: Filter[]|null) => {
        if (whitelistString) {
            const poolIds = whitelistString?.length ? whitelistString.split('\n').map(a => a.trim()) : []
            const formatted: Pool[] = poolIds.map(p => {
                return {pool_id: p}
            })
            return {
                total: formatted.length,
                items: filterPaginatedRange(formatted, page, perPage)
            }
        }
        const data = await backendGetPools({
            nonce: wpCardanoConnect?.nonce,
            page,
            perPage,
            filters
        })
        return data.data
    }

    const filters: Filter[] = [
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
            value: false,
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
            label: options.label_paginate_search_saturation,
            type: 'range',
            key: 'live_saturation',
            value: '0',
            min: 0,
            max: 1000,
            order: 4,
            format: (v) => parseInt(v)/1000,
            display: (v) => v !== '0' ? '< ' + parseInt(v)/10 + '%' : 'any%'
        },
        {
            label: options.label_paginate_search_order,
            type: 'select',
            key: 'orderby',
            value: 'random',
            className: '',
            order: 5,
            options: [
                {
                    label: 'Random (daily rotation)',
                    value: 'random'
                },
                {
                    label: 'Random (weekly rotation)',
                    value: 'random_7'
                },
                {
                    label: 'Saturation descending',
                    value: 'live_saturation_desc'
                },
                {
                    label: 'Saturation ascending',
                    value: 'live_saturation_asc'
                }
            ]
        },
    ]

    // Connect mesh provider if not already connected.

    useEffect(() => {
        if (!connected && user?.web3?.cardano_connect_wallet) {
            connect(user.web3.cardano_connect_wallet).then()
        }
    }, [user?.web3?.cardano_connect_wallet, connected, connect]);

    return pools ? (
        <>
            {pools.length > 0 ? pools.map(((p, i) => (
                <>
                    {view === 'mini' ?
                        <PoolMiniComponent
                            key={p.pool_id}
                            poolId={p.pool_id}
                            index={i}
                        />
                    : view === 'list' ?
                        <PoolListComponent
                            key={p.pool_id}
                            poolId={p.pool_id}
                            index={i}
                        />
                    : view === 'grid' ?
                        <PoolComponent
                            key={p.pool_id}
                            poolId={p.pool_id}
                            index={i}
                        />
                    : null }
                </>
            ))) : (
                <div className={classMap.notFound}>{notFound || options.label_no_pools}</div>
            )}
        </>
    ) : (
        <>
            {!gated || (gated && !gateHideComponent) ? (
                <Paginator
                    className={classMap.pools}
                    perPage={perPage}
                    fetcher={getPools}
                    notFound={notFound || options.label_no_pools}
                    defaultFilters={filters}
                    defaultView={view === 'list' ? 'list' : 'grid'}
                    renderer={(p: Pool, i, viewMode) =>
                        <React.Fragment key={p.pool_id}>
                            {viewMode === 'list' ?
                                <PoolListComponent
                                    poolId={p.pool_id}
                                    index={i}
                                />
                                : viewMode === 'grid' ?
                                    <>
                                        {view === 'mini' ? (
                                            <PoolMiniComponent
                                                poolId={p.pool_id}
                                                index={i}
                                            />
                                        ) : (
                                            <PoolComponent
                                                poolId={p.pool_id}
                                                index={i}
                                            />
                                        )}
                                    </>
                                    : null}
                        </React.Fragment>
                    }
                />
            ) : null }
            {gated ? <Gated gated={gated} gatedPlaceholder={gatedPlaceholder} gate={gate}/> : null}
        </>
    )
}
