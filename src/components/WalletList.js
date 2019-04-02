import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ListView } from 'react-native';
import WalletDetail from './WalletDetail.js'
import axios from 'axios';
import {Config} from '../Config.js'
import _ from 'lodash';
import { walletFetch, walletViewChanged, walletInit } from '../actions';
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
        if(!this.props.isInitialized) {
            this.props.walletInit()
            console.log("Initializing wallet")
        }  
        console.log("right here")
        console.log(this.props.wallets)
        this.props.walletFetch(this.props.wallets);    
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
        console.log("hey")
        console.log(wallet.Name)
        return (
            <View style={styles.tabStyle}>
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
                <View >
                    <ListView 
                    style={styles.albumListStyle}
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
        paddingBottom: 10,
        marginTop: 30,
        marginBottom: 40,
    },
    amountStyle : {
        fontSize: 18,
        color: "#00dcff"
    },
    amountContainerStyle: {
        alignItems: 'center',
        marginTop: 20,
        color: "#00dcff"
    },
    tabStyle: {
        
        marginBottom: 10,
        borderRadius: 4,
        marginRight:5,
        marginLeft:5,
        color: "#00dcff"
        // paddingTop:20,
        // paddingBottom:10,
        // backgroundColor:'#18cf',
        // borderRadius:8,
        // borderWidth: 1,
        // borderColor: '#fff00'
    }
    
};

const mapStateToProps = ({wallet}) => {
    const {wallets, newCoinPrices, walletTotal, loading, isInitialized} = wallet
    console.log(wallets)
    console.log('hey')
    return  {wallets, newCoinPrices, walletTotal, loading, isInitialized}
};

  
export default connect( mapStateToProps, { walletFetch, walletInit })(WalletList);
  