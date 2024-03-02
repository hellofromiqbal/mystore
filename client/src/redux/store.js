import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import currUserReducer from './currUserSlice';


const store = configureStore({
  reducer: {
    modal: modalReducer,
    currUser: currUserReducer
  }
});

export default store;