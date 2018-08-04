import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Card, CardSection } from './common';
import {WeiToEther, GetCoinImage} from '../Util.js'
import { walletViewChanged, selectWalletChart } from '../actions';
import { connect } from 'react-redux';
import CoinChart from './CoinChart'

class  WalletDetail extends Component  {
    
    componentWillUpdate() {
        LayoutAnimation.spring();
      }
      

    onWalletPress () {
        const {wallet} = this.props
        this.props.walletViewChanged(wallet.Currency)
        this.props.selectWalletChart(wallet.Currency)
    }
    renderDescription() {
        const { library, expanded } = this.props;
    
        if (expanded) {
          return (
            <View>
      
                <CoinChart />
          
            </View>
          )
        } else {
            return (
                <View>
                    {/* <Text>yes</Text> */}
                </View>
            )
        }
      }
    
    render () {
        const {priceView, expanded} = this.props
        const { Name, Amount, Currency, Id } = this.props.wallet;
        const {cardStyle, headerContentStyle, headerTextStyle, 
            thumbnail_style, imageStyle, thumbnailContainerStyle,
            amountContentStyle} = styles;
        if (expanded) {
            return (
                <View>
                <View>
                <Card>
                    <View style={{marginBottom: -3}}>
                    <CardSection > 
                        <View style={thumbnailContainerStyle}>
                            <Image style={thumbnail_style} source={{ uri : GetCoinImage(Currency)}}/>
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}> {Name} </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onWalletPress()}>
                            <View style={amountContentStyle}>
                            {shownCardValue(this.props.priceView[Currency], this.props)}
                            </View>
                        </TouchableOpacity>
                    </CardSection>
                    </View>
                    <View>
                       
                    </View>
                    <View className='row'>
                        {this.renderDescription()}
                         {/* <InfoBox data={this.props.bpi} /> */}
                    </View>
                </Card>
                </View>
                <View>
                {/* {this.renderDescription()} */}
                {console.log("walletpress")}
                </View>
                </View >
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.props.selectWalletChart(Currency)}>
                <View>
                <Card>
                    <View style={{marginBottom: -3}}>
                    <CardSection > 
                        <View style={thumbnailContainerStyle}>
                            <Image style={thumbnail_style} source={{ uri : GetCoinImage(Currency)}}/>
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}> {Name} </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onWalletPress()}>
                            <View style={amountContentStyle}>
                            {shownCardValue(this.props.priceView[Currency], this.props)}
                            </View>
                        </TouchableOpacity>
                    </CardSection>
                    </View>
                    <View>
                       
                    </View>
                    <View className='row'>
                        {this.renderDescription()}
                         {/* <InfoBox data={this.props.bpi} /> */}
                    </View>
                </Card>
                </View>
                <View>
                {/* {this.renderDescription()} */}
                {console.log("walletpress")}
                </View>
                </TouchableOpacity >
            )
        }
        
    }
}

const styles = {
    headerContentStyle: {
        // flexDirection: 'column',
        // justifyContent: 'space-around'
        flex: 1, //what does it mean
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 18,
    },
    thumbnail_style: {
        height: 50,
        width: 50,
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 50,
        width: 20,
        flex: 1,
        width: null,
    },
    amountContentStyle: {
        flex: 1, //what does it mean
        justifyContent: 'center',
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.wallet.selectedWalletId === ownProps.wallet.Currency;
    const {priceView} = state.wallet
    console.log(priceView)
    return  {priceView, expanded}
};

export default connect(mapStateToProps, {walletViewChanged, selectWalletChart})(WalletDetail);


shownCardValue  = (valueView, ownProps) => {
    const {coinPrices, priceView} = ownProps
    const { Name, Amount, Currency } = ownProps.wallet;
    switch(valueView) {
        case 0:
            return  (<Text> {WeiToEther(Amount) + " " + Currency} </Text>);
        case 1:
            return (<Text> {"$" + (WeiToEther(Amount)*coinPrices["ETH"]).toFixed(2)} </Text>)
        case 2:
            return (<Text> {"$" + coinPrices[Currency]} </Text>);
        default:
            return  (<Text> {(WeiToEther(Amount)) + " " + Currency} </Text>);
    }
}


