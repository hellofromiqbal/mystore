import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import Modal from './components/Modal'

const App = () => {
  return (
    <div className='relative'>
      <BrowserRouter>
        {/* <Modal/> */}
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App