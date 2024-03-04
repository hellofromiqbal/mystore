import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { selectCurrUser } from '../../redux/currUserSlice';
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { notifyFailed, notifySuccess } from '../../helpers/toaster';
import Button from '../Button';

const Invoice = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  console.log(currUser);

  const countTotal = (items, includeDeliveryFee) => {
    const deliveryFee = 10000;
    const totalExpenditure = items.reduce((acc, items) => {
      return acc + (items.product.price * items.amount);
    }, 0);
    if(includeDeliveryFee){
      return totalExpenditure + deliveryFee;
    } else {
      return totalExpenditure
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
      <div className='flex flex-col gap-2 py-2 border-t max-h-[70vh] overflow-auto'>
        <ul className='flex flex-col gap-2'>
          {currUser?.invoices?.length < 1 ?
            <div className='flex justify-center items-center h-[100px]'>
              <h1 className='text-lg font-bold text-slate-300'>No invoice yet.</h1>
            </div>
            : ''
          }
          {currUser?.invoices?.map((invoice, index) => (
            <div key={invoice?._id} className='border p-2'>
              <div className='flex justify-between items-center'>
                <h3 className='text-xl font-medium border-b-2 border-yellow-400'>Invoice #{invoice?._id?.slice(0, 10)}</h3>
                <p className='font-bold text-green-600'>{invoice?.paymentStatus}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                  <p className='font-medium'>FOR</p>
                  <ul>
                    <li className='flex justify-between items-center'>
                      <p className='text-sm text-gray-700'>Buyer:</p>
                      <p className='text-sm font-medium'>{invoice?.user?.fullname}</p>
                    </li>
                    <li className='flex justify-between items-center'>
                      <p className='text-sm text-gray-700'>Date of purchase:</p>
                      <p className='text-sm font-medium'>{invoice?.createdAt?.toString().split('T')[0]}</p>
                    </li>
                    <li className='flex justify-between items-center'>
                      <p className='text-sm text-gray-700'>Delivery address:</p>
                      <p className='text-sm font-medium'>{invoice?.selectedAddress}</p>
                    </li>
                  </ul>
                </div>
                <div className='flex flex-col'>
                  <p className='font-medium'>ITEM INFO</p>
                  <ul>
                    {invoice?.items?.map((item) => (
                      <li key={item._id} className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                          <div className='flex gap-2'>
                            <p className='text-sm text-gray-700'>{item?.product?.name}</p>
                            <p className='text-sm text-gray-700'>x {item?.amount}</p>
                          </div>
                          <p className='text-sm'>{currencyFormatter.format(item?.product?.price * item?.amount)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-medium'>TOTAL PRICE</p>
                  <p className='font-medium'>{currencyFormatter.format(countTotal(invoice?.items))}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-sm'>Delivery fee</p>
                  <p className='text-sm'>{currencyFormatter.format(10000)}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-medium'>TOTAL EXPENDITURE</p>
                  <p className='font-medium'>{currencyFormatter.format(countTotal(invoice?.items, true))}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-medium'>TOTAL BILL</p>
                  <p className='font-medium'>{currencyFormatter.format(countTotal(invoice?.items, true))}</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className='flex justify-between items-center pt-2'>
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
  )
};

export default Invoice;