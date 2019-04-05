import React from 'react';
import {  View, Image, Text} from 'react-native';

const AppLogo = () => {

    const {appLogoStyle, logoTextStyle, headerStyle} = styles

    return (
    <View style={headerStyle}>
        <Image
          source={require('../../assets/onyx.png')}
        />
    </View>
    );
};




const styles = {
    headerStyle: {
        justifyContent: 'center',
        flexDirection: 'row', 
        marginTop: 20, 
        marginLeft: 0,
        marginBottom: 30
    },
    appLogoStyle: {
        marginLeft: 0,
        width: 100, 
        height: 27
    },
    logoTextStyle: {
        justifyContent:'center',
        flex: 1,
        paddingBottom: 10,
        color: "#ffffff",
        marginLeft: 40,
        backgroundColor: "#131313",
        borderColor: 'black',
        alignSelf: 'center',
        alignItems:'center',
        fontSize: 36,
        fontFamily: 'Copperplate',
        textShadowColor: 'rgba(35,35, 35, 0.25)',
        textShadowOffset: {width: 3, height: 1},
        textShadowRadius: .4,
        elevation: 200
    }
}

export default AppLogo