import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';
import TxRecieved from './TxRecieved';
import TxSent from './TxSent'
import { SatoshiToBTC } from '../Util.js'
import { connect } from 'react-redux';

class TxDetail extends Component  {
    render () {
        const publicKey = this.props.publicKey;
        const { inputs, out } = this.props.tx;
        // Extract info from utxos
        totalInput = 0
        totalOutput = 0
        inputs.forEach (function (input) {
            if (input.prev_out.addr == publicKey) {
                totalInput += input.prev_out.value
            }
        });
        out.forEach( function (output) {
            if (output.addr == publicKey) {
                totalOutput += output.value
            }
        });

        if (totalInput > 0 && totalOutput > 0) {
            return (
                <View>
                    <TxRecieved value={totalOutput}/>
                    <TxSent value={totalInput}/>
                </View>
                )         
        } else if (totalInput > 0 && totalOutput <= 0) {
            return (
                <View>
                    <TxSent value={totalInput}/>
                </View>
            )
        } else if (totalOutput > 0){
            return (
                <View>
                    <TxRecieved value={totalOutput}/>
               </View>
            ) 
        } else {
            return (
                <View></View>
            )
        } 
    }
}

const mapStateToProps = ({wallet}) => {
    const { priceView } = wallet
    return  { priceView }
};

export default connect(mapStateToProps, {})(TxDetail);


