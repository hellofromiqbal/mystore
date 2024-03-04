import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { addNewInvoice, clearCart, decrementCartItemAmout, incrementCartItemAmount, removeCartItemFromCurrUser, selectCurrUser } from '../../redux/currUserSlice';
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { notifyFailed, notifySuccess } from '../../helpers/toaster';
import Button from '../Button';

const Invoice = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  console.log(currUser);
  const [selectedAddress, setSelectedAddress] = useState('');

  const totalPrice = () => {
    const deliveryFee = selectedAddress !== '' ? 10000 : 0;
    const subTotal = currUser.cart.reduce((acc, cartItem) => {
      return acc + (cartItem.product.price * cartItem.amount);
    }, 0);
    return subTotal + deliveryFee;
  };

  const updateCartItemAmount = async (cartItemId, productId, amount, updateType) => {
    try {
      const res = await fetch('http://localhost:3001/api/cart-items', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ cartItemId, amount })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        if(updateType === 'increment') {
          dispatch(incrementCartItemAmount(productId));
        } else {
          dispatch(decrementCartItemAmout(productId));
        }
      }
    } catch (error) {
      notifyFailed(error.message);
    }
  };

  const incAmount = (cartItemId, productId, amount, updateType) => {
    amount += 1;
    updateCartItemAmount(cartItemId, productId, amount, updateType);
  };

  const decAmount = async (cartItemId, productId, amount, updateType) => {
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
      amount -= 1;
      updateCartItemAmount(cartItemId, productId, amount, updateType);
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
      <h2 className='text-2xl font-bold text-center'>My Invoices</h2>
      <div className='flex flex-col gap-2 py-2 border-t max-h-[70vh] overflow-auto pe-2'>
        <ul className='flex flex-col gap-2'>
          {currUser?.invoices?.length < 1 ?
            <div className='flex justify-center items-center h-[100px]'>
              <h1 className='text-lg font-bold text-slate-300'>No invoice yet.</h1>
            </div>
            : ''
          }
          {currUser?.invoices?.map((invoice) => (
            <ul key={invoice?._id}>
              {invoice?.items?.map((item) => (
                <li key={item?._id} className='flex justify-between'>
                  {item?.product?.name}
                </li>
              ))}
            </ul>
          ))}
        </ul>
        <div className='flex items-center justify-between pt-2'>
          <small className='text-red-500'>* Your item will be delivered after payment.</small>
          <Button
            padding='px-2 py-1'
            fontSize='text-base'
            textColor='text-white'
            fontWeight='font-medium'
            bgColor={'bg-green-600'}
            border='border'
            borderColor='border-transparent'
            borderRadius='rounded-md'
            text='Okay'
            clickEvent={() => dispatch(toggleModal(''))}
          />
        </div>
      </div>
    </div>
  )
};

export default Invoice;