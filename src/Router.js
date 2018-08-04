import React from 'react';
import { Scene, Router, View, Image, Text} from 'react-native-router-flux';
import LoginForm from './components/LoginForm.js'
import WalletList from './components/WalletList.js'
import AppLogo from './components/headers/AppLogo.js'
import {Card} from './components/common'
import CoinChart from './components/CoinChart'
import WalletDetailExtended from './components/WalletDetailExtended'

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#fffff' }}>
            <Scene key="root" >
                <Scene sceneStyle={{marginTop: 80}} key="login" component={LoginForm} title="Please Login" />
                <Scene 
                    sceneStyle={{marginTop: 65 }} 
                    key="walletList" component={WalletList}            
                    renderTitle={() => <AppLogo/>} 
                    initial />
            </Scene>
        </Router>
    );
}

export default RouterComponent