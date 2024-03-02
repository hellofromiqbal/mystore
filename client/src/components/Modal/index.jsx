import React from 'react';
import RegisterForm from '../Forms/RegisterForm';
import LoginForm from '../Forms/LoginForm';
import Cart from '../Cart';
import { useSelector } from 'react-redux';
import { selectModal } from '../../redux/modalSlice';

const Modal = ({ modalType }) => {
  const modalConfig = useSelector(selectModal);
  const modalContent = {
    register: <RegisterForm/>,
    login: <LoginForm/>,
    cart: <Cart/>
  };

  return (
    <div className='fixed z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className={`${modalConfig.modalWidth} px-5 pt-4 pb-6 bg-white rounded-md flex flex-col`}>
        {modalContent[modalType]}
      </div>
    </div>
  )
}

export default Modal