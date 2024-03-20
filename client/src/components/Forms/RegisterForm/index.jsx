import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../redux/modalSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { register, handleSubmit, reset } = useForm();
  const submitForm = (data) => {
    if(data.password !== data.confirmPassword) return;
    fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        fullname: data.fullname,
        email: data.email,
        password: data.password
      })
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message))
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
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <form
        className='flex flex-col gap-2'
        onSubmit={handleSubmit(submitForm)}
      >
        <div className='flex flex-col gap-2 my-2'>
          <input
            className='border px-2 py-1 rounded-sm'
            type="text"
            placeholder='Fullname'
            {...register('fullname')}
          />
          <input
            className='border px-2 py-1 rounded-sm'
            type="email"
            placeholder='Email'
            {...register('email')}
          />
          <input
            className='border px-2 py-1 rounded-sm'
            type="password"
            placeholder='Password'
            {...register('password')}
          />
          <input
            className='border px-2 py-1 rounded-sm'
            type="password"
            placeholder='Confirm password'
            {...register('confirmPassword')}
          />
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
          text='Register'
        />
      </form>
    </div>
  )
};

export default RegisterForm;