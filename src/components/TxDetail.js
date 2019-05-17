import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';
import { SatoshiToBTC } from '../Util.js'
import { connect } from 'react-redux';

class TxDetail extends Component  {
    render () {
        // const { value, spent } = this.props.tx;
        const { inputs, out } = this.props.tx;
        const { publicKey } = this.props.publicKey;
        const { headerContentStyle, headerTextStyle, thumbnailContainerStyle,
            amountContentStyle, imageStyle} = styles;
        totalInput = 0
        totalOutput = 0
        inputs.forEach (function (input) {
            if (input.addr == publicKey) {
                totalInput.input += input.value
            }
        });
        out.forEach( function (output) {
            if (output.addr == publicKey) {
                totalOutput.output += output.value
            }
        });

        // if (spent) {
        //     pic = <Image style={imageStyle} source={require('../assets/topright.png')}/>
        //     direction = "Sent"
        // } else {
        //     pic = <Image style={imageStyle} source={require('../assets/bottomright.png')}/>
        //     direction = "Recieved"
        // }
        return (
            <View>
            <TouchableOpacity >
                <View>
                    <Card>
                        <View >
                        <CardSection > 
                            <View style={thumbnailContainerStyle}>
                            {/* Add image here */}
                                {/* {pic} */}
                            </View>
                            <View style={headerContentStyle}>
                            </View>
                            <TouchableOpacity onPress={() => {}}>
                                <View style={amountContentStyle}>
                                    {/* <Text style={headerTextStyle}> {SatoshiToBTC(value)} {direction}</Text> */}
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
        height: 30,
        width: 30,
        flex: 1,
    },
    amountContentStyle: {
        flex: 1,
        justifyContent: 'center',
    }
}

const mapStateToProps = ({wallet}) => {
    const { priceView } = wallet
    return  { priceView }
};

export default connect(mapStateToProps, {})(TxDetail);


