import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Card, CardSection, Button } from './common';
import {WeiToEther, GetCoinImage} from '../Util.js'
import { walletViewChanged, selectWalletChart } from '../actions';
import { connect } from 'react-redux';
import CoinChart from './CoinChart'
import ExtrasExample from './ExtraSample.js'

class  WalletDetailExtended extends Component  {

    onBuyPress() {

    }

    onSellPress() {

    }

    render () {
        return ( 
            <View>
                <CoinChart />
                < ExtrasExample/>
                <CardSection>
                <Button onPress={() => this.onBuyPress()}>
                  Buy 
                </Button>
                <Button onPress={() => this.onSellPress()}>
                  Sell 
                </Button>
              </CardSection>
            </View>

        )
    }

}


const mapStateToProps = (state, ownProps) => {
    return state
};

export default connect(mapStateToProps, {walletViewChanged, selectWalletChart})(WalletDetailExtended);
