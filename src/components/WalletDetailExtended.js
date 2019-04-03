import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Card, CardSection, Button } from './common';
import {WeiToEther, GetCoinImage} from '../Util.js'
import { walletViewChanged, selectWalletChart } from '../actions';
import { connect } from 'react-redux';
import CoinChart from './CoinChart'
import ExtrasExample from './ExtraSample.js'
import {Actions} from 'react-native-router-flux'
import QRCode from 'react-native-qrcode-svg';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import { Hoshi } from 'react-native-textinput-effects';

class  WalletDetailExtended extends Component  {
    constructor(props) {
        super(props);

    }
    onWalletPress () {
        const {wallet} = this.props
        this.props.walletViewChanged(wallet.Currency)
        this.props.selectWalletChart(wallet.Currency)
    }

    onReceivePress() {
        
    }

    onSendPress() {
       
        // Actions.qrcodeScanner()
    }

    render () {
        const {priceView} = this.props
        const { name, currency, publicKey } = this.props.wallet;
        console.log(this.props.wallet)
        const { headerContentStyle, headerTextStyle, 
            thumbnail_style, thumbnailContainerStyle,
            amountContentStyle, screenStyle, qrcodeStyle,footerStyle} = styles;

        return ( 
            <View style={screenStyle}>
                <View >
                <Card>
                    <View style={{marginBottom: -3}}>
                    <CardSection > 
                        <View style={thumbnailContainerStyle}>
                            <Image style={thumbnail_style} source={{ uri : GetCoinImage(currency)}}/>
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}> {name} </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onWalletPress()}>
                            <View style={amountContentStyle}>
                            {shownCardValue(priceView[currency], this.props)}
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
                <View>
                {/* {this.renderDescription()} */}
                {console.log("walletpress")}
                </View>
                {/* <CoinChart /> */}
                {   /* < ExtrasExample/> */}
                <View>
                <View style={qrcodeStyle}>
                <QRCode
                    value={'43'}
                    // logo={{uri: base64Logo}}
                    size={250}
                    logoSize={30}
                    logoBackgroundColor='transparent'
                />
                </View>
                <View>
                    <Text>{publicKey}</Text>
                </View>
                <CardSection style={footerStyle}>
                    <Button onPress={() => {
                        this.popupDialog.show();
                        }}>
                        Send 
                    </Button>
                    
                    {/* <Button onPress={() => this.onSendPress()}>
                    Send 
                    </Button> */}
                    <Button onPress={() => {
                        this.popupDialogRecieve.show();
                        }}>
                        Recieve 
                    </Button>
                </CardSection>
                
                <PopupDialog
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        dialogAnimation={slideAnimation}
                >
                    <View>
                        <Hoshi
                            label={'address'}
                            // this is used as active border color
                            borderColor={'#00dcff'}
                            // this is used to set backgroundColor of label mask.
                            // please pass the backgroundColor of your TextInput container.
                            // backgroundColor={'#F9F7F6'}
                            backgroundColor={'#FFFFFF'}
                        />
                        <Hoshi
                            label={'amount'}
                            // this is used as active border color
                            // borderColor={'#b76c94'}
                            borderColor={'#00dcff'}
                            // this is used to set backgroundColor of label mask.
                            // please pass the backgroundColor of your TextInput container.
                                // backgroundColor={'#F9F7F6'}
                            backgroundColor={'#FFFFFF'}
                        />
                    </View>
                </PopupDialog>
                <PopupDialog
                        ref={(popupDialogRecieve) => { this.popupDialogRecieve = popupDialogRecieve; }}
                        dialogAnimation={slideAnimation}
                >
                    <View>
                        {/* <Hoshi
                            label={'address'}
                            // this is used as active border color
                            borderColor={'#00dcff'}
                            // this is used to set backgroundColor of label mask.
                            // please pass the backgroundColor of your TextInput container.
                            // backgroundColor={'#F9F7F6'}
                            backgroundColor={'#FFFFFF'}
                        />
                        <Hoshi
                            label={'amount'}
                            // this is used as active border color
                            // borderColor={'#b76c94'}
                            borderColor={'#00dcff'}
                            // this is used to set backgroundColor of label mask.
                            // please pass the backgroundColor of your TextInput container.
                                // backgroundColor={'#F9F7F6'}
                            backgroundColor={'#FFFFFF'} */}
                        {/* /> */}
                        <QRCode
                    value={'43'}
                    // logo={{uri: base64Logo}}
                    size={250}
                    logoSize={30}
                    logoBackgroundColor='transparent'
                />
                    </View>
                </PopupDialog>
                
                </View>
        </View>

        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.wallet.selectedWalletId === ownProps.wallet.currency;
    const {priceView} = state.wallet
    console.log(priceView)
    return  {priceView, expanded}
};

export default connect(mapStateToProps, {walletViewChanged, selectWalletChart})(WalletDetailExtended);


// const mapStateToProps = (state, ownProps) => {
//     return ownProps
// };

// export default connect(mapStateToProps, {walletViewChanged, selectWalletChart})(WalletDetailExtended);

const styles = {
    screenStyle: {
        marginTop: 20
    },
    qrcodeStyle: {
        // flex: 1, //what does it mean
        marginTop: 20,
        marginLeft:20,
        marginRight:20,
        marginBottom: 20,
        alignItems: 'center',
    },
    headerContentStyle: {
        // flexDirection: 'column',
        // justifyContent: 'space-around'
        flex: 1, //what does it mean
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 18,
        color:  "#121212"
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
        color:  "#000000"
    },
    footerStyle: {
        position:"absolute",
        bottom:0,
        // width:100,
        height:60,   /* Height of the footer */
        background:"#6cf",
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
}

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


const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
  });
  