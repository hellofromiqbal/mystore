import { createSlice } from '@reduxjs/toolkit'

const currUser = createSlice({
  name: 'currUser',
  initialState: {
    info: undefined
  },
  reducers: {
    addCurrUser: (state, action) => {
      state.info = action.payload;
    },
    removeCurrUser: (state, action) => {
      state.info = undefined;
    },
    addCartItemToCurrUser: (state, action) => {
      state.info.cart.push(action.payload);
    },
    removeCartItemFromCurrUser: (state, action) => {
      state.info.cart = state.info.cart.filter((item) => item.product !== action.payload)
    }
  }
})

export const { addCurrUser, removeCurrUser, addCartItemToCurrUser, removeCartItemFromCurrUser } = currUser.actions;
export const selectCurrUser = (state) => state.currUser.info;
export default currUser.reducer;