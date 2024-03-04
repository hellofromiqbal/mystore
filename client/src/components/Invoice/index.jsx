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