import React from 'react';
import { Scene, Router, View, Image, Text} from 'react-native-router-flux';
import LoginForm from './components/LoginForm.js'
import WalletList from './components/WalletList.js'
import AppLogo from './components/headers/AppLogo.js'
import {Card, CardSection} from './components/common'
import CoinChart from './components/CoinChart'
import WalletDetailExtended from './components/WalletDetailExtended'
// import ScanScreen from './components/ScanScreen.js';
import SendScreen from './components/SendScreen'
const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBarStyles}>
            <Scene key="root" >
                <Scene sceneStyle={{marginTop: 80}} key="login" component={LoginForm} title="Please Login" />
                <Scene 
                    key="walletDetail" 
                    sceneStyle={{marginTop: 85, backgroundColor: '#f1ffff'}}
                    component={WalletDetailExtended} 
                    renderTitle={() => <AppLogo/>} />
                <Scene 
                    sceneStyle={{marginTop: 72, backgroundColor: '#f1ffff'}} 
                    key="walletList" component={WalletList}            
                    renderTitle={() => <AppLogo/>} 
                    initial />
                {/* <Scene
                    key="qrcodeScanner"
                    component={ScanScreen}
                /> */}
                <Scene
                    key="qrcodeScanner"
                    component={SendScreen}
                />
            </Scene>
        </Router>
    );
}

export default RouterComponent


const styles = {
    navBarStyles:  {
        borderWidth: 1.3,
        borderRadius: 10,
        // borderColor: '#00dc3f',
        borderColor: '#f1ffff',
        borderBottomWidth: 0.4,
        // shadowColor: '#00022',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
        // backgroundColor: '#131313', 
        backgroundColor: '#f1ffff',
        borderBottomColor: '#1fdcff', 
        borderBottomWidth: 2, 
        // borderLeftWidth:0, 
        // elevation:10,   
        height: 90,     
        // textShadowColor: 'rgba(35,35, 35, 0.25)',
        // textShadowOffset: {width: 3, height: 1},
        // textShadowRadius: 2 
    }

}
//TODO make a styles thing down here
