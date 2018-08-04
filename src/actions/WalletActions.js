import { Actions } from 'react-native-router-flux'
// import SQLite from 'react-native-sqlite-storage'
import {
    WALLET_FETCH_SUCCESS,
    WALLET_COINMARKETCAP_API_FETCH_SUCCESS,
    WALLET_FETCH_TOTAL_AMOUNT,
    WALLET_FETCH,
    WALLET_VIEW_CHANGED,
    SELECT_WALLET_CHART,
    WALLET_SCROLL_ENABLED,
    WALLET_BUY,
    WALLET_SELL,
    WALLET_INIT,
    GET_WALLET_BALANCE,
} from './types'

// import blockexplorer from 'blockchain.info/blockexplorer'
import '../../shim' // make sure to use es6 import and not require()
import bitcoin from 'react-native-bitcoinjs-lib'
import bip39 from 'bip39'
import { Config } from '../Config.js'
import axios from 'axios'
// var SQLite = require('react-native-sqlite-storage');
// import SQLite from "react-native-sqlite-storage";

// let walletDB = SQLite.openDatabase({name : "wallet.db", createFromLocation : "~db/wallet.sqlite"}, successCB,errorCB);




export const walletInit = () => {
    //Generate all wallet public and private keys
    // const bitcoin = require("bitcoinjs-lib");
    return (dispatch) => {
       
        // const mnemonic = bip39.generateMnemonic(256)
        const mnemonic = bip39.generateMnemonic(128)
        console.log(mnemonic)
        const seed = bip39.mnemonicToSeed(mnemonic)
          
        const master = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.bitcoin);
        const derived = master.derivePath("m/44'/0'/0'/0/0");
        const publicKey = derived.getAddress();
        const privateKey = derived.keyPair.toWIF();

        console.log(publicKey);

        return axios.get('https://blockexplorer.com/api/addr/' + publicKey + '/balance').then(function(response) {
            //get amount value from blockexplorer
            var amount = response.data
            console.log("wtf m8")
            console.log(response)
            dispatch({ type: WALLET_INIT, payload: {mnemonic, privateKey, publicKey, amount }})

        }).catch( function (error) {
            console.log(error)
        })

        // return dispatch({ type: WALLET_INIT, payload: {mnemonic, privateKey, publicKey}})
    }
    //return a seed, wif, derived, to the payload an
}

export const ETHWalletInit = () => {
    return (dispatch) => {
    }
}


export const walletFetch = () => {
    return (dispatch) => {
        dispatch({type: WALLET_FETCH})
        // const keyPair = Bitcoin.ECPair.makeRandom();
        // const address = keyPair.getAddress();
        // console.log("address")
        // console.log(address);
        var self = this;
        //Get All wallet addresses by user
        // return axios.post(Config.API + '/btc/wallet/all', {
            // username: "shyshawn"
        // }).then(function (response) {
            // dispatch({ type: WALLET_FETCH_SUCCESS, payload: response.data})
            // console.log(response.data)
            //Get Coin prices from coinmarketcap
            //And get total wallet values
            // var wallets = response.data
        return axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10').then(function(response) {
                var newCoinPrices = {}
                
                for (var i = 0; i < response.data.length; i++){
                    var coin = response.data[i]
                    newCoinPrices[coin.symbol] = coin.price_usd
                } 
                // console.log(response.data)
                //get wallet amount
                var walletTotal = 0
                for (var i = 0; i < wallets.length; i++){
                    var coinSymbol = wallets[i].Currency
                    walletTotal += newCoinPrices[coinSymbol]*wallets[i].Amount
                }
                dispatch({ type: WALLET_COINMARKETCAP_API_FETCH_SUCCESS, payload: {wallets, newCoinPrices, walletTotal}})
            // })
        })
        .catch( function (error) {
            // //Get Coin prices from coinmarketcap

            /*
            ****JUST DEVELOPMENT
            //use defaultWallet Value instead for testing and not connected to internet
            */
            dispatch({ type: WALLET_FETCH_SUCCESS, payload: defaultWalletFetchValue})
            return axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10').then(function(response) {
                var newCoinPrices = {}
                var wallets = defaultWalletFetchValue
               
                for (var i = 0; i < response.data.length; i++){
                    var coin = response.data[i]
                    newCoinPrices[coin.symbol] = coin.price_usd
                    
                } 
                //get wallet amount
                var walletTotal = 0
                for (var i = 0; i < wallets.length; i++){
                    var coinSymbol = wallets[i].Currency
                    walletTotal += newCoinPrices[coinSymbol]*wallets[i].Amount
                    console.log(walletTotal)
                }

                dispatch({ type: WALLET_COINMARKETCAP_API_FETCH_SUCCESS, payload: { newCoinPrices, walletTotal }})
            })
        })  
    }
    
}

export const getWalletBalance = (publicKey) => {
    return (dispatch) => {
        return axios.get('https://blockexplorer.com/api/addr/' + publicKey + '/balance').then(function(response) {
            //get amount value from blockexplorer
            var amount = response.data
            dispatch({ type: GET_WALLET_BALANCE, payload: response.data})

        }).catch( function (error) {
            console.log(publicKey)
            console.log(error)
        })
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

export const walletBuy = (walletCurrency, amount) => {
    //TODO:
    /*
    Make Wallet buy api
    axios post call to a server depending on the coin
    */
    return {
        type: WALLET_BUY,
        payload: {walletCurrency, amount}
    }
}

export const walletSell = (walletCurrency, amount) => {
    //TODO:
    /*
    Make Wallet buy api
    axios post call to a server depending on the coin
    */
    return {
        type: WALLET_SELL,
        payload: {walletCurrency, amount}
    }
}









const defaultWalletFetchValue = 
    [
        {
          "ID": 1,
          "CreatedAt": "2017-12-06T20:59:09Z",
          "UpdatedAt": "2018-07-11T18:04:09.032411552-07:00",
          "DeletedAt": null,
          "Name": "BTC Wallet",
          "Currency": "BTC",
          "Username": "shyshawn",
          "PrivateKey": "4d5bedc5d471f75284bc60e26639885e2a0c4d6979ad5c997216e7a85fd059e8",
          "PublicKey": "17KBESi2iBQ9UB2zR5xJNHpjn6vyv4pXHt",
          "Amount": 30000000000000000
        },
        {
          "ID": 2,
          "CreatedAt": "2017-12-06T20:59:12Z",
          "UpdatedAt": "2018-07-11T18:04:09.786202169-07:00",
          "DeletedAt": null,
          "Name": "ETH Wallet",
          "Currency": "ETH",
          "Username": "shyshawn",
          "PrivateKey": "85db55951f73c8ff7418f753b09614c7374dea5ead2cc16dcb5a6b4e9eaea502",
          "PublicKey": "0xa09f58A7e5D2284F5c77F9CBEf75492ffBEa45c4",
          "Amount": 13320460000000000
        },
        {
          "ID": 3,
          "CreatedAt": "2017-12-06T20:59:12Z",
          "UpdatedAt": "2018-07-11T18:04:09.789794313-07:00",
          "DeletedAt": null,
          "Name": "LTC Wallet",
          "Currency": "LTC",
          "Username": "shyshawn",
          "PrivateKey": "85db55951f73c8ff7418f753b09614c7374dea5ead2cc16dcb5a6b4e9eaea502",
          "PublicKey": "0xa09f58A7e5D2284F5c77F9CBEf75492ffBEa45c4",
          "Amount": 12300000000000000
        },
        {
          "ID": 4,
          "CreatedAt": "2017-12-06T20:59:12Z",
          "UpdatedAt": "2018-07-11T18:04:09.791483929-07:00",
          "DeletedAt": null,
          "Name": "XRP Wallet",
          "Currency": "XRP",
          "Username": "shyshawn",
          "PrivateKey": "85db55951f73c8ff7418f753b09614c7374dea5ead2cc16dcb5a6b4e9eaea502",
          "PublicKey": "0xa09f58A7e5D2284F5c77F9CBEf75492ffBEa45c4",
          "Amount": 1000000000000000000000
        }
      ]

export const dbInit = () => {
    return (dispatch) => {
        dispatch({type: WALLET_FETCH})
    }
}

function errorCB(err) {
    console.log("SQL Error: " + err);
}
      
function successCB() {
    console.log("SQL executed fine");
}
      
function openCB() {
    console.log("Database OPENED");
}

