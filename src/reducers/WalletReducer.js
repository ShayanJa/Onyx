import {
    WALLET_FETCH_SUCCESS,
    WALLET_COINMARKETCAP_API_FETCH_SUCCESS,
    WALLET_FETCH,
    WALLET_VIEW_CHANGED,
    SELECT_WALLET_CHART,
    WALLET_BUY,
    WALLET_SELL,
    WALLET_SCROLL_ENABLED,
} from '../actions/types'
import _ from 'lodash';
const INITIAL_STATE = {
    wallets: [],
    walletTotal: 0,
    loading: false,
    priceView: {
        "BTC": 0,
        "ETH": 0,
        "LTC": 0,
        "XRP": 0,
    }
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case WALLET_FETCH: 
            return {...state, loading: true }
        case WALLET_FETCH_SUCCESS:
            return {...state, wallets: action.payload}
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