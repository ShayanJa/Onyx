import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import WalletList from './components/WalletList.js'
import AppLogo from './components/headers/AppLogo.js'
import CoinChart from './components/CoinChart'
import WalletDetailExtended from './components/WalletDetailExtended'
// import ScanScreen from './components/ScanScreen.js';
import SendScreen from './components/SendScreen'
const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBarStyles}>
            <Scene key="root" >
                <Scene 
                    key="walletDetail" 
                    sceneStyle={{marginTop: 85, backgroundColor: '#f1ffff'}}
                    component={WalletDetailExtended} 
                    renderTitle={() => <AppLogo/>} />
                <Scene 
                    sceneStyle={{marginTop: 80, backgroundColor: '#f1ffff'}} 
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
        borderColor: '#f1ffff',
        borderBottomWidth: 0.4,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
        backgroundColor: '#f1ffff',
        borderBottomColor: '#1fdcff', 
        borderBottomWidth: 2, 
        height: 100,     
    }

}