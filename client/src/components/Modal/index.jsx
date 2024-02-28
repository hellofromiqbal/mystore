import React from 'react'
import RegisterForm from '../Forms/RegisterForm'

const Modal = () => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='w-1/3 px-5 py-4 bg-white rounded-md flex flex-col'>
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Modal