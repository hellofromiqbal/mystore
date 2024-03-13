import { createSlice } from '@reduxjs/toolkit'

const currProducts = createSlice({
  name: 'currProducts',
  initialState: {
    info: undefined
  },
  reducers: {
    addCurrProducts: (state, action) => {
      state.info = action.payload;
    }
  }
});

export const {
  addCurrProducts
} = currProducts.actions;
export const selectCurrProducts = (state) => state.currProducts.info;
export default currProducts.reducer;