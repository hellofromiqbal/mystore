import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { selectCurrUser } from '../../redux/currUserSlice';
import { currencyFormatter } from '../../../helpers/currencyFormatter';

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
      <ul className='flex flex-col border-t'>
        {currUser?.cart?.map((cartItem) => (
          <li key={cartItem._id} className='flex justify-between border-b py-2'>
            <div>
              <h3 className='font-medium text-lg'>{cartItem?.product?.name}</h3>
              <p>{cartItem?.product?.description}</p>
              <p className='font-medium'>{cartItem?.amount}</p>
            </div>
            <div className='self-end'>
              <p className='font-medium'>{currencyFormatter.format(cartItem?.product?.price)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Cart;