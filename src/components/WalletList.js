import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ListView } from 'react-native';
import WalletDetail from './WalletDetail.js'
import axios from 'axios';
import {Config} from '../Config.js'
import _ from 'lodash';
import { walletFetch, walletViewChanged } from '../actions';
import {WeiToEther, GetCoinImage} from '../Util.js';
import {Spinner} from './common'

import { connect } from 'react-redux';


class WalletList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [] //create a dataSource
        };
        this.renderRow = this.renderRow.bind(this)
    }

    componentWillMount() {
        this.props.walletFetch();    
        this.createDataSource(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ wallets }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({dataSource: ds.cloneWithRows(wallets)})
    }

    renderRow(wallet) {
        return (
            <View>
                <WalletDetail  key={wallet.Name}  wallet={wallet} coinPrices={this.props.newCoinPrices} />
                {/* <WalletDetail  key={wallet.Name} coinPrices={this.state.coinPrices} priceView={this.state.priceView} wallet={wallet}/> */}
            </View>
        ); 
    }

    render() {
        if (this.props.loading == true){
            return <Spinner size="large" />;
        } else {
            return (
                <View>
                    <ListView style={styles.albumListStyle}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    scrollEnabled={false}
                    />
                    <View style={styles.amountContainerStyle}>
                        <Text style={styles.amountStyle}>Total {"$ " + WeiToEther(this.props.walletTotal).toFixed(2)}</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = {
    cardStyle: {
        height: 100,
    },
    albumListStyle: {
        // alignItems: 'center'
    },
    amountStyle : {
        fontSize: 18,
    },
    amountContainerStyle: {
        alignItems: 'center',
        marginTop: 20
    }
    
};

const mapStateToProps = ({wallet}) => {
    const {wallets, newCoinPrices, walletTotal, loading} = wallet
    // console.log(newCoinPrices)
    return  {wallets, newCoinPrices, walletTotal, loading}
};
  
export default connect( mapStateToProps, { walletFetch })(WalletList);
  