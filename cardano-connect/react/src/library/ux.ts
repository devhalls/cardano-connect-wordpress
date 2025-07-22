import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";
import {useMemo} from "react";

// Define the initial slice state
const initialState: UxState = {
    assetModal: null,
    compareModal: null,
    comparePools: null,
    compareDreps: null,
    comparePoolFilters: null,
    compareDrepFilters: null,
}

// Define the slice
const uxSlice = createSlice({
    name: 'ux',
    initialState,
    reducers: {
        setAssetModal(state, action: PayloadAction<UxState['assetModal'] | null>) {
            state.assetModal = action.payload
        },
        setCompareModal(state, action: PayloadAction<UxState['compareModal'] | null>) {
            state.compareModal = action.payload
        },
        setComparePools(state, action: PayloadAction<PoolData | null>) {
            if (!action.payload) {
                return {...state, comparePools: []}
            }
            let copiedItems = state.comparePools ? [...state.comparePools] : [];
            const isComparing = copiedItems?.find(a => a.pool_id === action.payload.pool_id)
            if (isComparing) {
                return {...state, comparePools: [...copiedItems.filter(p => p.pool_id !== action.payload.pool_id)]}
            }
            return {...state, comparePools: [...copiedItems, action.payload]}
        },
        setCompareDreps(state, action: PayloadAction<DrepData | null>) {
            if (!action.payload) {
                return {...state, compareDreps: []}
            }
            let copiedItems = state.compareDreps ? [...state.compareDreps] : [];
            const isComparing = copiedItems?.find(a => a.drep_id === action.payload.drep_id)
            if (isComparing) {
                return {...state, compareDreps: [...copiedItems.filter(p => p.drep_id !== action.payload.drep_id)]}
            }
            return {...state, compareDreps: [...copiedItems, action.payload]}
        },
        setComparePoolFilters(state, action: PayloadAction<UxState['comparePoolFilters'] | null>) {
            return {...state, comparePoolFilters: [...action.payload]}
        },
        setCompareDrepFilters(state, action: PayloadAction<UxState['compareDrepFilters'] | null>) {
            return {...state, compareDrepFilters: [...action.payload]}
        },
    },
})

// Define getters
export const getUxAssetModal = (state: RootState): UxState['assetModal'] => {
    return state.ux.assetModal
}
export const getUxCompareModal = (state: RootState): UxState['compareModal'] => {
    return state.ux.compareModal
}
export const getUxComparePools = (state: RootState): UxState['comparePools'] => {
    return state.ux.comparePools
}
export const getUxCompareDreps = (state: RootState): UxState['compareDreps'] => {
    return state.ux.compareDreps
}
export const getUxComparePoolFilters = (state: RootState): UxState['comparePoolFilters'] => {
    return state.ux.comparePoolFilters
}
export const getUxCompareDrepFilters = (state: RootState): UxState['compareDrepFilters'] => {
    return state.ux.compareDrepFilters
}

// Define mutators
export const { setAssetModal, setCompareModal, setComparePools, setCompareDreps, setComparePoolFilters, setCompareDrepFilters } = uxSlice.actions

// Export the slice
export default uxSlice.reducer
