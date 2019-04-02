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
    },
    {
        name: "ETH Wallet",
        currency:"ETH",
        amount: 0,
        privateKey: null,
        publicKey: null,
    },
    {
        name: "LTC Wallet",
        currency:"LTC",
        amount: 0,
        privateKey: null,
        publicKey: null,
    },
    {
        name: "Ripple Wallet",
        currency:"XRP",
        amount: 0,
        privateKey: null,
        publicKey: null,
    },],
    walletTotal: 0,
    loading: false,
    priceView: {
        "BTC": 0,
        "ETH": 0,
        "LTC": 0,
        "XRP": 0,
    },
    isInitialized: false,
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case WALLET_INIT:
            wallets = state.wallets
            for (i=0; i< 4; i++) {
                wallets[i].privateKey = action.payload.privateKey
                wallets[i].publicKey = action.payload.publicKey
                wallets[i].amount = action.payload.amount
            }
            // wallets[0].privateKey = action.payload.bitcoin.privateKey
            // wallets[0].publicKey = action.payload.bitcoin.publicKey
            // wallets[0].amount = action.payload.bitcoin.amount
            return {...state, wallets: wallets, isInitialized: true}
        case GET_WALLET_BALANCE: 
            wallets = state.wallets
            wallets[0].amount = action.payload
            return {...state, wallets:wallets}
        case WALLET_FETCH: 
            return {...state, loading: true }
        case WALLET_FETCH_SUCCESS:
            return {...state}
            // return {...state, wallets: action.payload}

        case WALLET_COINMARKETCAP_API_FETCH_SUCCESS:
            return {
                ...state, 
                // wallets: action.payload.wallets,
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
        default:
            return state;
    }
}