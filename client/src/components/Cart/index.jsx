import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { addNewInvoice, clearCart, decrementCartItemAmout, incrementCartItemAmount, removeCartItemFromCurrUser, selectCurrUser, setAddresses } from '../../redux/currUserSlice';
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { notifyFailed, notifySuccess } from '../../helpers/toaster';
import Button from '../Button';

const Cart = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(currUser);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/api/addresses/${currUser?._id}`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => dispatch(setAddresses(data.data)));
  }, []);

  const totalPrice = () => {
    const deliveryFee = selectedAddress !== '' ? 10000 : 0;
    const subTotal = currUser.cart.reduce((acc, cartItem) => {
      return acc + (cartItem.product.price * cartItem.amount);
    }, 0);
    return subTotal + deliveryFee;
  };

  const updateCartItemAmount = async (cartItemId, productId, amount, updateType) => {
    try {
      const res = await fetch(`${apiUrl}/api/cart-items`, {
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
        const res = await fetch(`${apiUrl}/api/cart-items`, {
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

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/invoices`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userId: currUser?._id, selectedAddress })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        notifySuccess(result.message);
        dispatch(addNewInvoice(result.data._id));
        dispatch(clearCart());
        dispatch(toggleModal(''));
        console.log(result.data);
      }
    } catch (error) {
      notifyFailed(error.message);
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
      <h2 className='text-2xl font-bold text-center'>My Cart</h2>
      <div className='flex flex-col gap-2 py-2 border-t max-h-[70vh] overflow-auto pe-2'>
        {currUser?.cart?.length > 0 ?
          <h3 className='text-xl font-medium'>Items</h3>
          : ''
        }
        <ul className='flex flex-col gap-2'>
          {currUser?.cart?.length < 1 ?
            <div className='flex justify-center items-center h-[100px]'>
              <h1 className='text-lg font-bold text-slate-300'>No items yet.</h1>
            </div>
              :
            ''
          }
          {currUser?.cart?.map((cartItem) => (
            <li key={cartItem._id} className='flex justify-between'>
              <div>
                <h4 className='font-medium'>{cartItem?.product?.name}</h4>
                <p className='text-gray-700'>{cartItem?.product?.description}</p>
                <div className='flex items-center gap-4'>
                  <p className='text-gray-700'>Amount</p>
                  <div className='flex items-center gap-2 w-max'>
                    <button onClick={() => decAmount(cartItem?._id, cartItem?.product?._id, cartItem?.amount, 'decrement')}>
                      <AiOutlineMinusCircle size={20}/>
                    </button>
                    <p className='font-medium'>{cartItem?.amount}</p>
                    <button onClick={() => incAmount(cartItem?._id, cartItem?.product?._id, cartItem?.amount, 'increment')}>
                      <AiOutlinePlusCircle size={20}/>
                    </button>
                  </div>
                </div>
              </div>
              <div className='self-end'>
                <p className='font-medium'>{currencyFormatter.format(cartItem?.product?.price * cartItem?.amount)}</p>
              </div>
            </li>
          ))}
        </ul>
        {currUser?.cart?.length > 0 ?
          <>
            <div className='flex flex-col gap-2 py-2 border-t'>
              <h3 className='text-xl font-medium'>Address</h3>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1'>
                  <h4 className='text-gray-700'>Deliver to</h4>
                  <select className='border rounded-md text-sm' onChange={(e) => setSelectedAddress(e.target.value)}>
                    <option value="" className='text-center text-xs lg:text-sm'>-- Select Address --</option>
                    {currUser.address.map((item) => (
                      <option key={item?._id} value={item?.fullAddress} className='text-xs lg:text-sm'>{item?.fullAddress}</option>
                    ))}
                  </select>
                </div>
                {selectedAddress !== '' ?
                  <div className='flex justify-between'>
                    <h4 className='text-gray-700'>Delivery fee</h4>
                    <h4 className='font-medium'>{currencyFormatter.format(10000)}</h4>
                  </div>
                  :
                  ''
                }
              </div>
            </div>
            <div className='flex justify-between items-center border-y py-2'>
              <h3 className='text-xl font-medium'>Total</h3>
              <h3 className='text-lg font-bold'>{currencyFormatter.format(totalPrice())}</h3>
            </div>
          </> : ''
        }
      </div>
      <div className='flex items-center justify-between pt-2'>
        {currUser?.cart?.length > 0 ?
          <>
            <small className='text-red-500'>* Please check all data before checkout.</small>
            <Button
              padding='px-2 py-1'
              fontSize='text-base'
              textColor='text-white'
              fontWeight='font-medium'
              bgColor={currUser?.cart?.length < 1 || selectedAddress === '' ? 'bg-gray-300' : 'bg-green-600'}
              border='border'
              borderColor='border-transparent'
              borderRadius='rounded-md'
              disabled={currUser?.cart?.length < 1 || selectedAddress === ''}
              text='Checkout'
              clickEvent={handleCheckout}
            />
          </>
          : ''
        }
      </div>
    </div>
  )
};

export default Cart;