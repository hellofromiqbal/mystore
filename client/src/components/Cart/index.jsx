import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { decrementCartItemAmout, incrementCartItemAmount, selectCurrUser } from '../../redux/currUserSlice';
import { currencyFormatter } from '../../../helpers/currencyFormatter';

const Cart = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  console.log(currUser);

  const incAmount = (productId, cartItemId) => {
    dispatch(incrementCartItemAmount(productId));
  };

  const decAmount = (productId, cartItemId) => {
    dispatch(decrementCartItemAmout(productId));
  };

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
              <div className='flex items-center gap-2 w-max'>
                <button onClick={() => decAmount(cartItem?.product?._id, cartItem?._id)}>
                  <AiOutlineMinusCircle size={20}/>
                </button>
                <p className='font-medium'>{cartItem?.amount}</p>
                <button onClick={() => incAmount(cartItem?.product?._id, cartItem?._id)}>
                  <AiOutlinePlusCircle size={20}/>
                </button>
              </div>
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