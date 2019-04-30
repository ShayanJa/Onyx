import {
    WALLET_FETCH_SUCCESS,
    WALLET_COINMARKETCAP_API_FETCH_SUCCESS,
    WALLET_FETCH,
    WALLET_VIEW_CHANGED,
    SELECT_WALLET_CHART,
    WALLET_BUY,
    WALLET_SELL,
    WALLET_SCROLL_ENABLED,
    WALLET_INIT,
    GET_WALLET_BALANCE,
    WALLET_FETCH_NETWORK_ERROR,
    SCAN_QR_CODE,
    GET_WALLET_TXS
} from '../actions/types'
import _ from 'lodash';

const INITIAL_STATE = {
    wallets: [
    {
        name: "BTC Wallet",
        currency:"BTC",
        amount: 0,
        privateKey: null,
        publicKey: null,
        txns: [],
    }],
    walletTotal: 0,
    loading: false,
    priceView: {
        "BTC": 0,
    },
    isInitialized: false,
    qrcodeVaue: '',
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case WALLET_INIT:
            //TODO: Update to differentiate between coins
            wallets = state.wallets
            wallets[0].privateKey = action.payload.privateKey
            wallets[0].publicKey = action.payload.publicKey
            wallets[0].amount = action.payload.amount
            return {...state, wallets: wallets, isInitialized: true}
        case GET_WALLET_BALANCE: 
            wallets = state.wallets
            wallets[0].amount = action.payload
            console.log(action.payload)
            return {...state, wallets:wallets}
        case GET_WALLET_TXS: 
            return {...state, txs:action.payload}
        case WALLET_FETCH_NETWORK_ERROR: 
            return {...state}
        case WALLET_FETCH: 
            return {...state, loading: true }
        case WALLET_FETCH_SUCCESS:
            return {...state, loading: false}

        case WALLET_COINMARKETCAP_API_FETCH_SUCCESS:
            return {
                ...state, 
                newCoinPrices: action.payload.newCoinPrices, 
                walletTotal: action.payload.walletTotal, 
                loading: false 
            }
        case WALLET_VIEW_CHANGED:
            var newPriceView = _.clone(state.priceView); //lodash clone
            if(newPriceView[action.payload] >= 0){ 
            newPriceView[action.payload]  +=1
            newPriceView[action.payload] %= 3 
            } else {
            newPriceView[action.payload] = 1 //if value is not already set
            }

            return {
                ...state,
                priceView: newPriceView
            }
        case SELECT_WALLET_CHART:
            return {
                ...state,
                selectedWalletId: action.payload
            }

        case WALLET_BUY:
            return {
                ...state,
                selectedWalletId: action.payload
            }
        case WALLET_SELL:
            return {
                ...state,
                selectedWalletId: action.payload
            }
        case WALLET_SCROLL_ENABLED:
            return {
                ...state,
                walletScrollEnabled: action.payload
            }
        case SCAN_QR_CODE:
            return {
                ...state,
                qrcodeValue: action.payload,
                sendVisible: true,
            }
        default:
            return state;
    }
}