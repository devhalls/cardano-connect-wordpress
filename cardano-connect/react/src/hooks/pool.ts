import {setMessage} from "../library/message";
import {formatPercentageFromBig, formatPercentageFromDecimal, translateError} from "../library/utils";
import {Transaction} from "@meshsdk/core";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getUserState} from "../library/user";
import {useWallet} from "@meshsdk/react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getUxComparePools, setComparePools} from "../library/ux";
import {backendGetPool} from "../library";

/**
 * Hook - Pool
 * Provides pool data, actions and states
 */
export default function usePool(poolId: string, pool?: PoolData) {

    // APP state

    const dispatch = useAppDispatch()
    const { wallet, connected} = useWallet()
    const user: UserState = useAppSelector(getUserState)
    const comparisons: UxState['comparePools'] = useAppSelector(getUxComparePools)

    // Local state

    const [loading, setLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const [poolData, setPoolData] = useState<PoolData | null>(pool)

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
    const isComparing = useMemo(() =>
        comparisons?.find(a => a && 'pool_id' in a && a.pool_id === poolId),
        [comparisons, poolId]
    )

    /**
     * Get the pool data from the API.
     */
    const getPool = useCallback(async () => {
        if (!poolData) {
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
    }, [poolId, poolData])

    /**
     * Delegate to the stake pool.
     */
    const delegateToPool = useCallback(async () => {
        if (!connected || !wallet) {
            return
        }
        setLoadingAction(true)
        try {
            const rewardAddress = user.account?.stake_address;
            const tx = new Transaction({ initiator: wallet });
            if (!user.account.active) {
                tx.registerStake(rewardAddress);
            }
            tx.delegateStake(rewardAddress, poolId);
            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            await wallet.submitTx(signedTx);
            // @todo add tx to global data to display tx state
        } catch (e) {
            dispatch(setMessage({
                message: translateError(e.toString()),
                type: 'error',
                timeout: 16000
            }))
        }
        setLoadingAction(false)
    }, [poolId, connected, wallet, user, dispatch])

    /**
     * Add this pool to pool compare.
     */
    const addToCompare = useCallback(() => {
        dispatch(setComparePools(poolData))
    }, [dispatch, poolData])

    /**
     * Get pool data on a load.
     */
    useEffect(() => {
        getPool().then()
    }, [getPool])

    /**
     * Return the methods and state.
     */
    return {
        loading,
        loadingAction,
        poolData,
        getPool,
        delegateToPool,
        addToCompare,
        poolPledgePercent,
        poolSaturationPercent,
        userDelegated,
        isSaturated,
        isNoPledged,
        isComparing,
    }
}