import React from 'react'
import RegisterForm from '../Forms/RegisterForm'
import LoginForm from '../Forms/LoginForm'

const Modal = ({ modalType }) => {
  return (
    <div className='fixed z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='w-1/3 px-5 pt-4 pb-6 bg-white rounded-md flex flex-col'>
        {modalType === 'register' ? <RegisterForm/> : ''}
        {modalType === 'login' ? <LoginForm/> : ''}
      </div>
    </div>
  )
}

export default Modal