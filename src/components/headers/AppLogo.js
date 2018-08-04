import React from 'react';
import {  View, Image, Text} from 'react-native';

// import NavBar from './components/NavBar.js';

const AppLogo = () => {

    const {appLogoStyle, logoTextStyle, headerStyle} = styles

    return (
    <View style={headerStyle}>
        <Image source={{ uri: "https://cdn3.iconfinder.com/data/icons/menu-icons-1/100/menu-512.png"}}
            style={styles.appLogoStyle } />
        <Text style={logoTextStyle}>OnYX</Text>
    </View>
    );
};




const styles = {
    headerStyle: {
        justifyContent: 'flex-start', 
        flexDirection: 'row', 
        marginTop: 26, 
    },
    appLogoStyle: {
        // justifyContent: 'center',
        // alignItems: 'center',
        marginLeft: 10,
        // alignSelf: 'flex-left',
        width: 34, 
        height: 27
    },
    logoTextStyle: {
        //figure out how to center the logo properly
        justifyContent: 'flex-start',
        flex: 1,
        marginLeft: 100,
        alignSelf: 'center',
        alignItems:'center',
        fontSize: 30,
        fontFamily: 'Copperplate',
    }

}

export default AppLogo