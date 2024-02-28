import React from 'react'
import Button from '../../Button'
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5"

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };
  
  return (
    <div className='flex flex-col gap-2 relative'>
      <button className='absolute -top-2 -right-2'>
        <IoCloseCircleOutline size={25}/>
      </button>
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <form
        className='flex flex-col gap-2'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-2 my-2'>
          <input
            className='border px-2 py-1 rounded-sm'
            type="text"
            placeholder='Fullname'
          />
          <input
            className='border px-2 py-1 rounded-sm'
            type="email"
            placeholder='Email'
          />
          <input
            className='border px-2 py-1 rounded-sm'
            type="password"
            placeholder='Password'
          />
          <input
            className='border px-2 py-1 rounded-sm'
            type="password"
            placeholder='Confirm password'
          />
        </div>
        <Button
          padding='px-0 py-1'
          fontSize='text-base'
          borderRadius='rounded-full'
          text='Register'
        />
      </form>
    </div>
  )
}

export default RegisterForm