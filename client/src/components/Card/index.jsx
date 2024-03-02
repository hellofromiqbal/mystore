import React from 'react';
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { BsBagPlus, BsBagPlusFill } from "react-icons/bs";
import Button from '../Button';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItemToCurrUser, selectCurrUser } from '../../redux/currUserSlice';
import { notifyFailed, notifySuccess } from '../../helpers/toaster';

const Card = ({ productId, name, description, price, image_url }) => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  const alreadyInCart = currUser.cart.find((cartItem) => cartItem.product === productId);
  const handleAddToCart = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/cart-items`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userId: currUser._id, productId })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(addCartItemToCurrUser(result.data));
        notifySuccess(result.message);
      }
    } catch (error) {
      notifyFailed(error.message);
    }
  };

  return (
    <div className='flex flex-col w-[300px] shadow-md hover:shadow-xl transition-all duration-300'>
      <div className='min-h-[300px] bg-slate-300'>
        {/* <img src={`http://localhost:3001/${image_url}`} alt={name} /> */}
      </div>
      <div className='flex flex-col px-3 py-2'>
        <div className='flex flex-col'>
          <h2 className='text-lg font-bold'>{name}</h2>
          <p className='text-sm'>{description}</p>
          <p className='text-sm font-medium mt-2'>{currencyFormatter.format(price)}</p>
        </div>
        <div className='flex justify-end'>
          <Button
            padding=''
            bgColor=''
            textColor='text-black'
            border=''
            clickEvent={handleAddToCart}
            text={alreadyInCart ? <BsBagPlusFill size={21}/> : <BsBagPlus size={21}/>}
          />
        </div>
      </div>
    </div>
  )
}

export default Card