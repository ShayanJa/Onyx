import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';
import { SatoshiToBTC } from '../Util.js'
import { connect } from 'react-redux';

class TxDetail extends Component  {
    render () {
        const { value } = this.props.tx;
        const { headerContentStyle, headerTextStyle, thumbnailContainerStyle,
            amountContentStyle} = styles;
        return (
            <View>
            <TouchableOpacity >
                <View>
                    <Card>
                        <View >
                        <CardSection > 
                            <View style={thumbnailContainerStyle}>
                            {/* Add image here */}
                                {/* <Image style={thumbnail_style} source={{ uri : GetCoinImage(currency)}}/> */}
                            </View>
                            <View style={headerContentStyle}>
                            </View>
                            <TouchableOpacity onPress={() => {}}>
                                <View style={amountContentStyle}>
                                    <Text style={headerTextStyle}> {SatoshiToBTC(value)} received</Text>
                                </View>
                            </TouchableOpacity>
                        </CardSection>
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
    const {priceView} = state.wallet
    return  {priceView}
};

export default connect(mapStateToProps, {})(TxDetail);


