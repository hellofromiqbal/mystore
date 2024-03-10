import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { notifyFailed, notifySuccess } from '../../../helpers/toaster';
import { toggleModal } from '../../../redux/modalSlice';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Button from '../../Button';

const EditProductForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const submitForm = (data) => {
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.data) {
          // dispatch(addCurrUser(data.data));
          notifySuccess(data.message);
          dispatch(toggleModal(''));
        } else {
          notifyFailed(data.message);
        }
      })
      .catch((error) => console.log(error.message));
    reset();
  };
  
  return (
    <div className='flex flex-col gap-2 relative'>
      <button
        className='absolute -top-2 -right-2'
        onClick={() => dispatch(toggleModal(''))}
      >
        <IoCloseCircleOutline size={25}/>
      </button>
      <h2 className='text-2xl font-bold text-center'>Edit Product</h2>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(submitForm)}
      >
        <div className='flex gap-4'>
          <div className='basis-1/2'>
            <div
              className='min-h-[300px] relative bg-center bg-cover cursor-pointer border-2 border-dashed flex justify-center items-center'
            >
              <p className='text-gray-500'>Select Image</p>
            </div>
          </div>
          <div className='basis-1/2 flex flex-col gap-2 my-2'>
            <input
              className='border px-2 py-1 rounded-sm'
              type="text"
              placeholder='Name'
              {...register('name')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="text"
              placeholder='Description'
              {...register('description')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="number"
              placeholder='Price'
              {...register('price')}
            />
            <select className='border px-2 py-1 rounded-sm'>
              <option value="">-- Select Category --</option>
              <option value="">Food</option>
              <option value="">Drink</option>
              <option value="">Snack</option>
            </select>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <p>Tags</p>
                <small>1 selected</small>
              </div>
              <ul className='flex gap-2 flex-wrap h-full'>
                <li>
                  <small className='border px-2 py-1'>Best seller</small>
                </li>
                <li>
                  <small className='border px-2 py-1'>Signature</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Button
          padding='px-0 py-1'
          fontSize='text-base'
          textColor='text-white'
          fontWeight='font-medium'
          bgColor='bg-green-600'
          border='border'
          borderColor='border-transparent'
          borderRadius='rounded-full'
          text='Save Changes'
        />
      </form>
      <div className='flex flex-col gap-2 mt-4'>
        <small className='text-center'>Danger Zone</small>
        <Button
          padding='px-0 py-1'
          fontSize='text-base'
          textColor='text-white'
          fontWeight='font-medium'
          bgColor='bg-red-500'
          border='border'
          borderColor='border-transparent'
          borderRadius='rounded-full'
          text='Delete Product'
        />
      </div>
    </div>
  )
};

export default EditProductForm;