import { combineReducers } from 'redux';
import productReducer from './productReducer';
import customerReducer from './customerReducer';
import purchaseReducer from './purchaseReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  products: productReducer,
  customers: customerReducer,
  purchases: purchaseReducer,
  modal: modalReducer
});

export default rootReducer;