import {
    WALLET_COINMARKETCAP_API_FETCH_SUCCESS,
    WALLET_FETCH_NETWORK_ERROR,
    WALLET_FETCH,
    WALLET_VIEW_CHANGED,
    SELECT_WALLET_CHART,
    WALLET_SCROLL_ENABLED,
    WALLET_INIT,
    GET_WALLET_BALANCE,
    GET_WALLET_BALANCE_FAIL,
    SCAN_QR_CODE,
    GET_WALLET_TXS,
} from './types'

// import blockexplorer from 'blockchain.info/blockexplorer'
import bitcoin from 'react-native-bitcoinjs-lib'
import bip39 from 'react-native-bip39'

import axios from 'axios'


export const walletInit = () => {
    //Generate all wallet public and private keys
    return async (dispatch) => {
        try {
            const mnemonic = await bip39.generateMnemonic() 
            const seed = bip39.mnemonicToSeed(mnemonic)
            const master = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.bitcoin);
            const derived = master.derivePath("m/44'/0'/0'/0/0");
            const publicKey = derived.getAddress();
            const privateKey = derived.keyPair.toWIF();
            try {
                //Get coin value amounts from blockexplorer
                const response = await axios.get('https://blockexplorer.com/api/addr/' + publicKey + '/balance');
                var amount = response.data;
                dispatch({ type: WALLET_INIT, payload: { mnemonic, privateKey, publicKey, amount } });
            }
            catch (error) {
                console.log(error);
                amount = 0
                dispatch({ type: WALLET_INIT, payload: { mnemonic, privateKey, publicKey, amount } });
            }
        }  
        catch {
            //TODO 'if mnemonic fails'
        }
    }
}

export const walletFetch = (wallets) => {
    return async (dispatch) => {
        dispatch({type: WALLET_FETCH})
        try {
            const response = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10');
            var newCoinPrices = {};
            for (var i = 0; i < response.data.length; i++) {
                var coin = response.data[i];
                newCoinPrices[coin.symbol] = coin.price_usd;
            }
            //get wallet amount
            var walletTotal = 0;
            for (var i = 0; i < wallets.length; i++) {
                var coinSymbol = wallets[i].currency;
                walletTotal += newCoinPrices[coinSymbol] * wallets[i].amount;
            }
            dispatch({ type: WALLET_COINMARKETCAP_API_FETCH_SUCCESS, payload: { newCoinPrices, walletTotal } });
        }
        catch (error) {
            //Return the old values if the coinmarketcap api can't be reached
            dispatch({ type: WALLET_FETCH_NETWORK_ERROR, payload: {} });
        }  
    }
    
}

export const getWalletBalance = (publicKey) => {
    return async (dispatch) => {
        try {
            //get amount value from blockexplorer
            const response = await axios.get('https://blockchain.info/rawaddr/' + publicKey );
            dispatch({ type: GET_WALLET_BALANCE, payload: response.data.final_balance });
        }
        catch (error) {
            //Returns old balance and Doen't update the balance
            console.log("unable to update balance " + error);
            dispatch({ type: GET_WALLET_BALANCE_FAIL});
        }
    }
}

export const getWalletTxs = (publicKey) => {
    return async (dispatch) => {
        try {
            //get amount value from blockexplorer
            const response = await axios.get('https://blockchain.info/rawaddr/' + publicKey);
            dispatch({ type: GET_WALLET_TXS, payload: response.data.txs[0].out });
        }
        catch (error) {
            //Returns old balance and Doen't update the balance
            console.log("unable to get txs ");
            dispatch({ type: GET_WALLET_TXS_FAIL});
        }
    }
}

export const walletViewChanged = (walletCurrency) => {
    return {
        type: WALLET_VIEW_CHANGED,
        payload: walletCurrency
    };

};

export const selectWalletChart = (walletCurrency) => {
    return {
        type: SELECT_WALLET_CHART,
        payload: walletCurrency,
    }
}

export const setWalletScrollEnabled = (isEnabled) => {
    return {
        type: WALLET_SCROLL_ENABLED,
        payload: isEnabled
    }
}


export const scanQRcode = (address) => {
    return {
        type: SCAN_QR_CODE,
        payload: address
    }
}