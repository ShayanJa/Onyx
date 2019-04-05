import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import WalletReducer from './WalletReducer';

export default combineReducers({
  wallet: WalletReducer,
  selectedLibraryId: SelectionReducer
});
