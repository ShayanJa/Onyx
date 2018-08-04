import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import WalletReducer from './WalletReducer';
import ChartReducer from './ChartReducer';

export default combineReducers({
  wallet: WalletReducer,
  chart: ChartReducer,
  selectedLibraryId: SelectionReducer
});
