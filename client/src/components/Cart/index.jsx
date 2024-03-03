import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { decrementCartItemAmout, incrementCartItemAmount, removeCartItemFromCurrUser, selectCurrUser } from '../../redux/currUserSlice';
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { notifyFailed, notifySuccess } from '../../helpers/toaster';

const Cart = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  console.log(currUser);

  const incAmount = (productId, cartItemId) => {
    dispatch(incrementCartItemAmount(productId));
  };

  const decAmount = async (productId, cartItemId) => {
    const cartItem = currUser.cart.find((item) => item._id === cartItemId);
    if(cartItem.amount === 1) {
      try {
        const res = await fetch('http://localhost:3001/api/cart-items', {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ userId: currUser._id, productId })
        });
        if(!res.ok) {
          const result = await res.json();
          throw new Error(result.message);
        } else {
          const result = await res.json();
          dispatch(removeCartItemFromCurrUser(productId));
          notifySuccess(result.message);
        }
      } catch (error) {
        notifyFailed(error.message);
      }
    } else {
      dispatch(decrementCartItemAmout(productId));
    }
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
        {currUser?.cart?.length < 1 ?
          <div className='flex justify-center items-center h-[100px]'>
            <h1 className='text-lg font-bold text-slate-400'>No items yet.</h1>
          </div>
            :
          ''
        }
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