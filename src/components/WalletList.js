import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import WalletDetail from './WalletDetail.js'
import _ from 'lodash';
import { walletFetch, walletInit } from '../actions';
import {WeiToEther} from '../Util.js';
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
        return (
            <View style={styles.tabStyle}>
                <WalletDetail  key={wallet.Name}  wallet={wallet} coinPrices={this.props.newCoinPrices} />
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
    console.log(wallets)
    return  {wallets, newCoinPrices, walletTotal, loading, isInitialized}
};

  
export default connect( mapStateToProps, { walletFetch, walletInit })(WalletList);
  