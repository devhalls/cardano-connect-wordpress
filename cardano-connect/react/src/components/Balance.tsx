import React, {useEffect, useState} from "react";
import {useAppSelector} from "../library/state";
import {getUserBalances, getUserCollateral, getUserNetwork, getUserState} from "../library/user";
import {getOptionState} from "../library/option";
import {useWalletList} from "@meshsdk/react";
import {classMap, formatBalance, trimAddress, ucFirst} from "../library/utils";
import {hasBrowserWallet} from "../library/wallet";
import {Copy} from "./common/Copy";
import {Loader} from "./common/Loader";
import {Gated} from "./common/Gated";

export const Balance = ({
    gated,
    gatedPlaceholder,
    gate,
    gateHideComponent,
    className
}: ComponentBalance) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)
    const network: string = useAppSelector(getUserNetwork)
    const balances: Balance[] = useAppSelector(getUserBalances)
    const collateral: UxTO[] = useAppSelector(getUserCollateral)

    // Local state

    const wallets = useWalletList()
    const walletExtensionAvailable = hasBrowserWallet(wallets)
    const wallet = wallets.find((wallet) => wallet.name === user.web3?.cardano_connect_wallet);
    const [loading, setLoading] = useState<boolean>(true)
    const [filteredBalance, setFilteredBalance] = useState<Balance[]|null>(null)
    const address: string = network === 'testnet' ? user.web3?.cardano_connect_address_testnet : user.web3?.cardano_connect_address
    const stakeAddress: string = network === 'testnet' ? user.web3?.cardano_connect_stake_address_testnet : user.web3?.cardano_connect_stake_address

    // Load data

    useEffect(() => {
        if ( ! user.connected ) {
            setLoading( false )
            return
        }

        if ( ! walletExtensionAvailable ) {
            setLoading( false )
            return
        }

        const allowedUnits = ['lovelace']
        if ( balances?.length ) {
            setFilteredBalance( balances.filter( b => allowedUnits.includes( b.unit ) ? b : false ) )
            setLoading( false )
            return
        }

        setLoading( true )
    }, [user.connected, balances, walletExtensionAvailable]);

    return (
        <>
            {user.connected && (!gated || (gated && !gateHideComponent)) ? (
                <div className={`${classMap.balanceContainer} ${className}`}>
                    {loading ? (
                        <Loader />
                    ) : !walletExtensionAvailable ? (
                        <div className={classMap.balanceEmpty}>{options.label_empty}</div>
                    ) : (
                        <>
                            {user.connected ? (
                                <>
                                    <div className={classMap.balanceRow}>
                                        <div className={classMap.balanceCol}>Address:</div>
                                        <div className={classMap.balanceCol}>
                                            <Copy text={trimAddress(address)} copyText={address} />
                                        </div>
                                    </div>
                                    <div className={classMap.balanceRow}>
                                        <div className={classMap.balanceCol}>Stake Address:</div>
                                        <div className={classMap.balanceCol}>
                                            <Copy text={trimAddress(stakeAddress)} copyText={stakeAddress} />
                                        </div>
                                    </div>
                                    {wallet ? (
                                        <div className={classMap.balanceRow}>
                                            <div className={classMap.balanceCol}>Connect with:</div>
                                            <div className={classMap.row}>
                                                <img width={18} height={18} src={wallet.icon} alt={wallet.name}/>
                                                {ucFirst(user.web3.cardano_connect_wallet)}
                                            </div>
                                        </div>
                                    ) : null}
                                </>
                            ) : null }
                            {collateral?.length ? (
                                <div className={classMap.balanceRow}>
                                    <div className={classMap.balanceCol}>Wallet collateral:</div>
                                    <div className={classMap.balanceCol}>
                                        {collateral?.map((col: UxTO) => {
                                            return col.output?.amount?.map((out) => (
                                                <div key={out.unit + out.quantity}>₳ {formatBalance(out.quantity)}</div>
                                            ))
                                        })}
                                    </div>
                                </div>
                            ) : null }
                            {filteredBalance ? (
                                <div className={classMap.balanceTotalRow}>
                                    <div className={classMap.balanceCol}>Balance:</div>
                                    {filteredBalance?.map((balance: Balance) => (
                                        <div key={balance.unit + balance.quantity}
                                             className={classMap.balanceCol}>₳ {formatBalance(balance.quantity)}</div>
                                    ))}
                                </div>
                            ) : null }
                        </>
                    )}
                </div>
            ) : null }
            {gated ? <Gated gated={gated} gatedPlaceholder={gatedPlaceholder} gate={gate}/> : null}
        </>
    )
}
