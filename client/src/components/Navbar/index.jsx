import React from 'react';
import Button from '../Button';
import { BsBag } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    fetch('http://localhost:3001/auth/logout', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.log(error.message));
  };

  return (
    <nav className='flex justify-between items-center h-14 px-8 border-b-[1px] shadow-sm'>
      <h1 className='text-2xl font-medium text-green-600'>MyStore</h1>
      <div className='flex items-center gap-4'>
        <div className='flex relative'>
          <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center'>
            <small className='text-white text-xs'>1</small>
          </div>
          <BsBag size={21}/>
        </div>
        <ul className='flex gap-3 ps-4 border-s'>
          <li>
            <Button
              text='Register'
              clickEvent={() => dispatch(toggleModal('register'))}
            />
          </li>
          <li>
            <Button
              textColor='text-green-600'
              bgColor='bg-transparent'
              borderColor='border-green-600'
              text='Login'
              clickEvent={() => dispatch(toggleModal('login'))}
            />
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;