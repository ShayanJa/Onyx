import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Card, CardSection, Button } from './common';
import {WeiToEther, GetCoinImage} from '../Util.js'
import { walletViewChanged, selectWalletChart } from '../actions';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { Actions } from 'react-native-router-flux';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import { Hoshi } from 'react-native-textinput-effects';

class  WalletDetailExtended extends Component  {
    constructor(props) {
        super(props);

    }
    onWalletPress () {
        const {wallet} = this.props
        this.props.walletViewChanged(wallet.currency)
        this.props.selectWalletChart(wallet.currency)
    }

    onReceivePress() {
        
    }

    onSendPress() {
        Actions.qrcodeScanner()
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

                </Card>
                </View>
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
                    {/* <Button onPress={() => {
                        this.popupDialog.show();
                        }}>
                        Send 
                    </Button> */}
                    
                    <Button onPress={() => this.onSendPress()}>
                    Send 
                    </Button>
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
                            backgroundColor={'#FFFFFF'}
                        />
                        <Hoshi
                            label={'amount'}
                            // this is used as active border color
                            borderColor={'#00dcff'}
                            // this is used to set backgroundColor of label mask.
                            // please pass the backgroundColor of your TextInput container.
                            backgroundColor={'#FFFFFF'}
                        />
                    </View>
                </PopupDialog>
                <PopupDialog
                    ref={(popupDialogRecieve) => { this.popupDialogRecieve = popupDialogRecieve; }}
                    dialogAnimation={slideAnimation}
                >
                <View>
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

const styles = {
    screenStyle: {
        marginTop: 20
    },
    qrcodeStyle: {
        marginTop: 20,
        marginLeft:20,
        marginRight:20,
        marginBottom: 20,
        alignItems: 'center',
    },
    headerContentStyle: {
        flex: 1, 
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
        flex: 1,
        justifyContent: 'center',
    },
    footerStyle: {
        position:"absolute",
        bottom:0,
        height:60,  
        background:"#6cf",
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        colorText: '#777',
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
    const { coinPrices } = ownProps
    const { amount, currency } = ownProps.wallet;
    switch( valueView ) {
        case 0:
            return  (<Text> {WeiToEther(amount) + " " + currency} </Text>);
        case 1:
            return (<Text> {"$" + (WeiToEther(amount)*coinPrices["ETH"]).toFixed(2)} </Text>)
        case 2:
            return (<Text> {"$" + coinPrices[currency]} </Text>);
        default:
            return  (<Text> {(WeiToEther(amount)) + " " + currency} </Text>);
    }
}


const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
  });
  