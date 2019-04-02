import React from 'react';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createStore, applyMiddleware, compose } from 'redux';
import { StyleSheet, Text, TextInput, View , NavigatorIOS} from 'react-native';
import ReduxThunk from 'redux-thunk'
import {Header} from './src/components/common'
import Router from './src/Router.js'
import { connect } from 'react-redux';
// import firebase from 'firebase'
import reducers from './src/reducers'
import { walletInit } from './src/actions';
import { PersistGate } from 'redux-persist/integration/react';
import {SQLite} from 'react-native-sqlite-storage';
import { purgeStoredState } from 'redux-persist'

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() { 
  }

  render() {
    const persistConfig = {
      key: 'root',
      storage,
    }
    const persistedReducer = persistReducer(persistConfig, reducers)
    // let store = createStore(persistedReducer)
    const store = createStore(
      persistedReducer,
      {},
      compose(
        // autoRehydrate(), //fix autoRehydrate problem
        applyMiddleware(ReduxThunk)
      ))
    let persistor = persistStore(store, 
      {
        storage: SQLite,
      })
    // persistor.purge()
    return (
      <Provider  store ={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
         </PersistGate >
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1fff0f',
    justifyContent: 'center',
  },
});

