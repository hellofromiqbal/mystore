import React, { useEffect } from 'react';
import Button from '../Button';
import { BsBag } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { addCurrUser, removeCurrUser, selectCurrUser } from '../../redux/currUserSlice';
import { notifySuccess } from '../../helpers/toaster';

const Navbar = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  const handleLogout = () => {
    fetch('http://localhost:3001/auth/logout', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        notifySuccess(data.message);
        dispatch(removeCurrUser());
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetch('http://localhost:3001/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addCurrUser(data.data));
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <nav className='fixed bg-white w-full max-w-[1440px] flex justify-between items-center h-14 px-8 border-b-[1px] shadow-sm'>
      <h1 className='text-2xl font-medium text-green-600'>MyStore</h1>
      {currUser && <p>Logged in.</p>}
      <div className='flex items-center gap-4'>
        <div className='flex relative'>
          {currUser && currUser.cart.length > 0 ?
            <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center'>
              <small className='text-white text-xs'>{currUser.cart.length}</small>
            </div>
            :
            ''
          }
            <Button
              padding=''
              bgColor=''
              textColor='text-black'
              border=''
              clickEvent={!currUser ? () => dispatch(toggleModal({ modalType: 'login', modalWidth: 'w-1/3' })) : () => dispatch(toggleModal({ modalType: 'cart', modalWidth: 'w-2/3' }))}
              text={<BsBag size={21}/>}
            />
        </div>
        <ul className='flex gap-3 ps-4 border-s'>
          {!currUser ?
            <li>
              <Button
                text='Register'
                clickEvent={() => dispatch(toggleModal({ modalType: 'register', modalWidth: 'w-1/3' }))}
              />
            </li>
            : ''
          }
          <li>
            <Button
              textColor={currUser ? 'text-white' : 'text-green-600'}
              bgColor={currUser ? 'bg-red-500' : 'bg-transparent'}
              borderColor={currUser ? 'border-transparent' : 'border-green-600'}
              text={currUser ? 'Logout' : 'Login'}
              clickEvent={currUser ? handleLogout : () => dispatch(toggleModal({ modalType: 'login', modalWidth: 'w-1/3' }))}
            />
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;