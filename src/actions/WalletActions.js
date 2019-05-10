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

export const sendTx = (publicKey, privateKey, toAddress, amount) => {
    return async (dispatch) => {
        try {
            utxos = await fetchUtxo(publicKey)
            const keypair = bitcoin.ECPair.fromWIF(privateKey)
            x = createHDTransaction(utxos, toAddress, amount, 0.000005, publicKey, keypair )
        }
        catch {
            console.log('didnt work')
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

// Helper functions derived from blue wallet
createHDTransaction = function(utxos, toAddress, amount, fixedFee, changeAddress, keypair) {
    let feeInSatoshis = parseInt((fixedFee * 100000000).toFixed(0));
    let amountToOutputSatoshi = parseInt(((amount - fixedFee) * 100000000).toFixed(0)); // how much payee should get
    let txb = new bitcoin.TransactionBuilder();
    let unspentAmountSatoshi = 0;
    let outputNum = 0;

    for (const unspent of utxos) {
      if (unspent.confirmations < 1) {
        // using only confirmed outputs
        continue;
      }

      txb.addInput(unspent.txid, unspent.vout);
      unspentAmountSatoshi += unspent.amount;

      if (unspentAmountSatoshi >= amountToOutputSatoshi + feeInSatoshis) {
        // found enough inputs to satisfy payee and pay fees
        break;
      }
      outputNum++;
    }
    if (unspentAmountSatoshi < amountToOutputSatoshi + feeInSatoshis) {
      console.log('Not enough confirmed inputs')
      throw new Error('Not enough confirmed inputs');
    }
  
    // adding outputs
    txb.addOutput(toAddress, amountToOutputSatoshi);
    if (amountToOutputSatoshi + feeInSatoshis < unspentAmountSatoshi) {
      // sending less than we have, so the rest should go back
      if (unspentAmountSatoshi - amountToOutputSatoshi - feeInSatoshis > 3 * feeInSatoshis) {
        // to prevent @dust error change transferred amount should be at least 3xfee.
        // if not - we just dont send change and it wil add to fee
        txb.addOutput(changeAddress, unspentAmountSatoshi - amountToOutputSatoshi - feeInSatoshis);
      }
    }
  
    // now, signing every input with a corresponding key
    for (let c = 0; c <= outputNum; c++) {
      txb.sign(c, keypair);
    }
  
    let tx = txb.build();
    console.log(tx.toHex())

    return tx.toHex();
  };

fetchUtxo = async function(address) {
    let utxos = [];
    let response;
    try {
        response = await axios.get('https://blockchain.info/unspent?active=' + address );
        // this endpoint does not support offset of some kind o_O
        // so doing only one call
        let json = response.data;
        if (typeof json === 'undefined' || typeof json.unspent_outputs === 'undefined') {
            throw new Error('Could not fetch UTXO from API ' + response.err);
        }
        for (let unspent of json.unspent_outputs) {
            // a lil transform for signer module
            unspent.txid = unspent.tx_hash_big_endian;
            unspent.vout = unspent.tx_output_n;
            unspent.amount = unspent.value;

            let chunksIn = bitcoin.script.decompile(Buffer.from(unspent.script, 'hex'));
            unspent.address = bitcoin.address.fromOutputScript(chunksIn);
            utxos.push(unspent);
        }
        return utxos;
    } catch (err) {
      console.warn(err);
    }
}


