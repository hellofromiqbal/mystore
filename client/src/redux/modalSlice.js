import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: '',
    showModal: false
  },
  reducers: {
    toggleModal: (state, action) => {
      state.showModal = !state.showModal
      if(state.showModal === false) {
        state.modalType = ''
      } else {
        state.modalType = action.payload
      }
    },
  }
})

export const { toggleModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;
export default modalSlice.reducer;