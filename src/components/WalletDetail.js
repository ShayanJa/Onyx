import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Card, CardSection, Button } from './common';
import {SatoshiToBTC} from '../Util.js'
import { walletViewChanged, selectWalletChart, getWalletBalance } from '../actions';
import { connect } from 'react-redux';
import WalletDetailExtended from './WalletDetailExtended.js'
import {Actions} from 'react-native-router-flux'


class WalletDetail extends Component  {

    componentWillMount() {
        const {wallet} = this.props
        this.props.getWalletBalance(wallet.publicKey)
    }

    onWalletPress () {
        const {wallet} = this.props
        this.props.walletViewChanged(wallet.currency)
        this.props.selectWalletChart(wallet.currency)
    }
    
    render () {
        const { name, currency } = this.props.wallet;
        const {cardStyle, headerContentStyle, headerTextStyle, 
            thumbnail_style, imageStyle, thumbnailContainerStyle,
            amountContentStyle} = styles;
        console.log(currency)
        return (
            <View>
            <TouchableOpacity onPress={() => Actions.walletDetail({wallet: this.props.wallet, priceView: this.props.priceView, coinPrices: this.props.coinPrices})}>
                <View>
                    <Card>
                        <View >
                        <CardSection > 
                            <View style={thumbnailContainerStyle}>
                                <Image style={thumbnail_style} source={require('../assets/btc.png')}/>
                            </View>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}> {name} </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onWalletPress()}>
                                <View style={amountContentStyle}>
                                {shownCardValue(this.props.priceView[currency], this.props)}
                                </View>
                            </TouchableOpacity>
                        </CardSection>
                        </View>
                        <View>
                        </View>
                        <View className='row'>
                            {/* {this.renderDescription()} */}
                                {/* <InfoBox data={this.props.bpi} /> */}
                        </View>
                    </Card>
                </View>
            </TouchableOpacity >
            </View>
        )
    }
}

const styles = {
    headerContentStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 18,
        color:  "#131111"
        
    },
    thumbnail_style: {
        height: 50,
        width: 50,
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    imageStyle: {
        height: 50,
        width: 20,
        flex: 1,
        width: null,
    },
    amountContentStyle: {
        flex: 1,
        justifyContent: 'center',
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.wallet.selectedWalletId === ownProps.wallet.currency;
    const {priceView} = state.wallet
    return  {priceView, expanded}
};

export default connect(mapStateToProps, {walletViewChanged, selectWalletChart, getWalletBalance})(WalletDetail);


shownCardValue  = (valueView, ownProps) => {
    const {coinPrices } = ownProps
    const { currency, amount } = ownProps.wallet;
    switch(valueView) {
        case 0:
            return  (<Text style={styles.amountContentStyle}> {SatoshiToBTC(amount) + " " + currency} </Text>);
        case 1:
            return (<Text style={styles.amountContentStyle}> {"$" + (SatoshiToBTC(amount)*coinPrices["BTC"]).toFixed(2)} </Text>)
        case 2:
            return (<Text style={styles.amountContentStyle}> {"$" + coinPrices[currency]} </Text>);
        default:
            return  (<Text style={styles.amountContentStyle}> {(SatoshiToBTC(amount)) + " " + currency} </Text>);
    }
}


