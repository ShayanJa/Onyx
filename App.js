import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, Text, TextInput, View , NavigatorIOS} from 'react-native';
import ReduxThunk from 'redux-thunk'
import {Header} from './src/components/common'
import WalletList from './src/components/WalletList.js'
import Router from './src/Router.js'
// import firebase from 'firebase'
import reducers from './src/reducers'

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {

    
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider  store ={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
