import React from 'react';
import { FaReceipt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrUser } from '../../../redux/currUserSlice';

const AdminDashboard = () => {
  const currUser = useSelector(selectCurrUser);
  return (
    <section className='flex flex-wrap h-screen px-16 pt-24 pb-10'>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <div className='flex flex-col items-center relative'>
            {currUser && currUser.invoices.length > 0 ?
              <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-8 h-8 flex justify-center items-center'>
                <p className='text-white font-extrabold'>{currUser.invoices.length}</p>
              </div>
              : ''
            }
            <FaReceipt size={80}/>
            <h2>Invoices</h2>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
      <div className='flex justify-center items-center basis-1/4'>
        <div className='flex flex-col justify-center items-center border rounded-md w-[90%] h-[90%]'>
          <FaReceipt size={80}/>
          <h2>Invoices</h2>
        </div>
      </div>
    </section>
  )
};

export default AdminDashboard;