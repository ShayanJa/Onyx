import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';
import { SatoshiToBTC } from '../Util.js'
import { connect } from 'react-redux';

class TxDetail extends Component  {
    render () {
        const { headerContentStyle, headerTextStyle, thumbnailContainerStyle,
            amountContentStyle, imageStyle} = styles;
        return (
            <View>
            <TouchableOpacity >
                <View>
                    <Card>
                        <View >
                        <CardSection > 
                            <View style={thumbnailContainerStyle}>
                            {/* Add image here */}
                            <Image style={imageStyle} source={require('../assets/bottomright.png')}/>    
                            </View>
                            <View style={headerContentStyle}>
                            <TouchableOpacity onPress={() => {}}>
                                <View style={amountContentStyle}>
                                    <Text style={headerTextStyle}> {SatoshiToBTC(this.props.value)} Received</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
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
        flex: 1,
        justifyContent: 'flex-start',
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
