import bitcoin from 'react-native-bitcoinjs-lib'
import axios from 'axios'
import Frisbee from 'frisbee';

// Helper functions derived from blue wallet
export const createHDTransaction = function(utxos, toAddress, amount, fixedFee, changeAddress, keypair) {
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

  return tx.toHex();
};

export const fetchUtxos = async function(address) {
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


export const broadcastTxBlockcypher = async function(txhex) {
  const api = new Frisbee({
    baseURI: 'https://api.blockcypher.com',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  let res = await api.post('/v1/btc/main/txs/push', { body: { tx: txhex } });
  // console.log('blockcypher response', res);
  return res.body;
}