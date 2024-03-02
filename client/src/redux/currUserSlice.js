import { createSlice } from '@reduxjs/toolkit'

const currUserSlice = createSlice({
  name: 'currUser',
  initialState: {
    _id: '',
    fullname: '',
    email: '',
    role: ''
  },
  reducers: {
    addCurrUser: (state, action) => {
      state = action.payload;
    },
  }
})

export const { toggleModal } = currUserSlice.actions;
export const selectCurrUser = (state) => state.currUser;
export default currUserSlice.reducer;