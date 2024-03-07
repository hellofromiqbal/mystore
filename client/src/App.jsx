import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import Modal from './components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { selectModal } from './redux/modalSlice'
import AddProduct from './pages/AddProduct'


const App = () => {
  const modal = useSelector(selectModal)
  
  return (
    <div className='relative'>
      {modal.showModal === true ? <Modal modalType={modal.modalType}/> : ''}
      <Navbar />
      <div className='pt-14'>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/add-product" exact element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  )
}

export default App