import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../redux/modalSlice';
import { addCurrUser } from '../../../redux/currUserSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const submitForm = (data) => {
    console.log(data);
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
        console.log(data.message);
        dispatch(addCurrUser(data.data));
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
      <h2 className='text-2xl font-bold text-center'>Login</h2>
      <form
        className='flex flex-col gap-2'
        onSubmit={handleSubmit(submitForm)}
      >
        <div className='flex flex-col gap-2 my-2'>
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
        </div>
        <Button
          padding='px-0 py-1'
          fontSize='text-base'
          borderRadius='rounded-full'
          text='Login'
        />
      </form>
    </div>
  )
};

export default LoginForm;