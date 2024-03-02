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
    }
  }
})

export const { addCurrUser, removeCurrUser } = currUser.actions;
export const selectCurrUser = (state) => state.currUser;
export default currUser.reducer;