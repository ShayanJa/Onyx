import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  TextInput,
  Button
} from 'react-native';
import { CardSection, Card } from './common';
import { Hoshi } from 'react-native-textinput-effects';
// import { RNCamera, FaceDetector } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
  });
export default class SendScreen extends Component {


  render() {
    return (
        <View style={styles.screenStyle}>
  <Button
    title="Show Dialog"
    onPress={() => {
      this.popupDialog.show();
    }}
  />
  <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <View>
      <Text>Hello</Text>
    </View>
  </PopupDialog>
            {/* <Text>address</Text> */}
            {/* <Hoshi
                label={'address'}
                // this is used as active border color
                borderColor={'#b76c94'}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={'#F9F7F6'}
            />
            <Hoshi
                label={'amount'}
                // this is used as active border color
                borderColor={'#b76c94'}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={'#F9F7F6'}
            />
            <Hoshi
                label={'address'}
                // this is used as active border color
                borderColor={'#b76c94'}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={'#F9F7F6'}
            /> */}
            </View>

       
       
      
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  screenStyle: {
    marginTop: 230
  },
});