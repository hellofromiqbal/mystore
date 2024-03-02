import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { selectCurrUser } from '../../redux/currUserSlice';

const Cart = () => {
  const currUser = useSelector(selectCurrUser);
  console.log(currUser);
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col gap-2 relative'>
      <button
        className='absolute -top-2 -right-2'
        onClick={() => dispatch(toggleModal(''))}
      >
        <IoCloseCircleOutline size={25}/>
      </button>
      <h2 className='text-2xl font-bold text-center'>Cart</h2>
      <div>
        <h1>This is your cart.</h1>
      </div>
    </div>
  )
};

export default Cart;