import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import { MeshProvider } from "@meshsdk/react";
import { Connector } from "./components/Connector";
import { Assets } from "./components/Assets";
import { Balance } from "./components/Balance";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, state } from './library/state'
import './app.css';
import {Message} from "./components/Message";
import {AssetModal} from "./components/AssetModal";
import {Pools} from "./components/Pools";
import 'react-tooltip/dist/react-tooltip.css'
import {CompareModal} from "./components/CompareModal";
import {Dreps} from "./components/Dreps";

/**
 * Convert snake case to camel case.
 * @param str
 */
function toCamelCase(str: string) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Extracts an elements data set and phrase it ready to pass to React components.
 * @param dataset
 */
function extractDataSet(dataset: { [s: string]: unknown; } | ArrayLike<unknown>) {
    const dataAttrs = {};
    for (const [key, value] of Object.entries(dataset)) {
        if (value === "" || value === null) {
            dataAttrs[toCamelCase(key)] = undefined;
        } else if (!isNaN(value) && value.trim() !== "") {
            // Convert numeric values automatically
            dataAttrs[toCamelCase(key)] = Number(value);
        } else {
            dataAttrs[toCamelCase(key)] = value;
        }
    }
    return dataAttrs;
}

/**
 * Construct the wallet connector elements.
 */
const connectorElements = document.getElementsByClassName('wp-block-cardano-connect-connector')
for (let i = 0; i < connectorElements.length; i++) {
    const connector = ReactDOM.createRoot(connectorElements[i]);
    const element = connectorElements[i] as HTMLElement
    connector.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Connector {...extractDataSet(element.dataset)} />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

/**
 * Construct the balance (aka wallet) elements.
 */
const balanceElements = document.getElementsByClassName('wp-block-cardano-connect-balance')
for (let i = 0; i < balanceElements.length; i++) {
    const balance = ReactDOM.createRoot(balanceElements[i]);
    const element = balanceElements[i] as HTMLElement
    balance.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Balance {...extractDataSet(element.dataset)} />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

/**
 * Construct the pool list elements.
 */
const poolElements = document.getElementsByClassName('wp-block-cardano-connect-pools')
for (let i = 0; i < poolElements.length; i++) {
    const pool = ReactDOM.createRoot(poolElements[i]);
    const element = poolElements[i] as HTMLElement
    pool.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Pools {...extractDataSet(element.dataset)} />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}


const assetsElements = document.getElementsByClassName('wp-block-cardano-connect-assets')
for (let i = 0; i < assetsElements.length; i++) {
    const assets = ReactDOM.createRoot(assetsElements[i])
    const perPage: number = assetsElements[i].getAttribute('data-per_page')
        ? parseInt(assetsElements[i].getAttribute('data-per_page'))
        : undefined
    const hideTitles: boolean = assetsElements[i].getAttribute('data-hide_titles')
        ? !!assetsElements[i].getAttribute('data-hide_titles')
        : undefined
    const notFound: string = assetsElements[i].getAttribute('data-not_found')
        ? assetsElements[i].getAttribute('data-not_found')
        : undefined
    assets.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Assets
                            perPage={perPage}
                            hideTitles={hideTitles}
                            notFound={notFound}
                            whitelist={assetsElements[i].getAttribute('data-whitelist')}
                        />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}


const drepsElements = document.getElementsByClassName('wp-block-cardano-connect-dreps')
for (let i = 0; i < drepsElements.length; i++) {
    const pools = ReactDOM.createRoot(drepsElements[i]);
    const perPage: number = drepsElements[i].getAttribute('data-per_page')
        ? parseInt(drepsElements[i].getAttribute('data-per_page'))
        : undefined
    const notFound: string = drepsElements[i].getAttribute('data-not_found')
        ? drepsElements[i].getAttribute('data-not_found')
        : undefined
    pools.render(
        <React.StrictMode>
            <MeshProvider>
                <Provider store={state}>
                    <PersistGate persistor={persistor}>
                        <Dreps
                            perPage={perPage}
                            notFound={notFound}
                            whitelist={drepsElements[i].getAttribute('data-whitelist')}
                        />
                    </PersistGate>
                </Provider>
            </MeshProvider>
        </React.StrictMode>
    );
}

/**
 * Create the global element a append it the dom automatically.
 */
const globalElement = document.createElement('div')
globalElement.id = 'wp-block-cardano-connect-global'
document.body.appendChild(globalElement)
const global = ReactDOM.createRoot(globalElement);
global.render(
    <React.StrictMode>
        <MeshProvider>
            <Provider store={state}>
                <PersistGate persistor={persistor}>
                    <Message />
                    <AssetModal />
                    <CompareModal />
                </PersistGate>
            </Provider>
        </MeshProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
