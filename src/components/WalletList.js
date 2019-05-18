import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import WalletDetail from './WalletDetail.js'
import _ from 'lodash';
import { walletFetch, walletInit } from '../actions';
import { SatoshiToBTC } from '../Util.js';
import { Spinner } from './common'
import { connect } from 'react-redux';


class WalletList extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this)
    }

    componentWillMount() {
        if(!this.props.isInitialized) {
            this.props.walletInit()
            console.log("Initializing wallet")
        }  
        this.props.walletFetch(this.props.wallets);    
    }

    renderRow(wallet) {
        return (
            <View style={styles.tabStyle}>
                <WalletDetail  key={wallet.index}  wallet={wallet.item} coinPrices={this.props.newCoinPrices} />
            </View>
        ); 
    }

    render() {
        const { albumListStyle, amountContainerStyle, amountStyle } = styles
        if (this.props.loading == true){
            return <Spinner size="large" />;
        } else {
            return (
                <View >
                    <FlatList 
                    style={albumListStyle}
                    data={this.props.wallets}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    // ListEmptyComponent={//emplylistcomponent}
                    />
                    <View style={amountContainerStyle}>
                        <Text style={amountStyle}>Total {"$ " + SatoshiToBTC(this.props.walletTotal).toFixed(2)}</Text>
                    </View>

                </View>
            )
        }
    }
}

const styles = {
    albumListStyle: {
        paddingBottom: 10,
        marginTop: 30,
        marginBottom: 40,
    },
    amountStyle : {
        fontSize: 18,
    },
    amountContainerStyle: {
        alignItems: 'center',
        marginTop: 20,
    },
    tabStyle: { 
        marginBottom: 10,
        borderRadius: 4,
        marginRight:5,
        marginLeft:5,
        opacity: 10,
    }
};

const mapStateToProps = ({wallet}) => {
    const {wallets, newCoinPrices, walletTotal, loading, isInitialized} = wallet
    return  {wallets, newCoinPrices, walletTotal, loading, isInitialized}
};

  
export default connect( mapStateToProps, { walletFetch, walletInit })(WalletList);
  