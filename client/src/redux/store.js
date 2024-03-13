import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import currUserReducer from './currUserSlice';
import currProductsReducer from './currProductsSlice';


const store = configureStore({
  reducer: {
    modal: modalReducer,
    currUser: currUserReducer,
    currProducts: currProductsReducer
  }
});

export default store;