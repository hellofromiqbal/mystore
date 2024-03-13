import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { BsReceipt, BsBag, BsFilePlusFill  } from "react-icons/bs";
import { FaRegCircleUser, FaCircleUser } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { addCurrUser, removeCurrUser, selectCurrUser } from '../../redux/currUserSlice';
import { notifySuccess } from '../../helpers/toaster';
import { Link } from 'react-router-dom';
import { addCurrProducts } from '../../redux/currProductsSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => dispatch(addCurrProducts(data.data)))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <nav className='fixed z-10 bg-white w-full max-w-[1440px] flex justify-between items-center h-14 px-8 border-b-[1px] shadow-sm'>
      <Link
        className='text-2xl font-medium text-green-600'
        to={"/"}
      >MyStore</Link>
      <div className='flex items-center gap-4'>
        {currUser ?
          <button
            className='flex relative'
            onClick={() => dispatch(toggleModal({ modalType: 'invoice', modalWidth: 'w-2/3' }))}
          >
            {currUser && currUser.invoices.length > 0 ?
              <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center'>
                <small className='text-white text-xs font-extrabold'>{currUser.invoices.length}</small>
              </div>
              : ''
            }
              {currUser?.role === 'user' ?
                <BsReceipt size={21}/>
                :
                <FaReceipt size={21}/>
              }
          </button>
          : ''
        }
        {currUser?.role === 'user' ?
          <button
            className='flex relative'
            onClick={!currUser ? () => dispatch(toggleModal({ modalType: 'login', modalWidth: 'w-1/3' })) : () => dispatch(toggleModal({ modalType: 'cart', modalWidth: 'w-2/3' }))}
          >
            {currUser && currUser.cart.length > 0 ?
              <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center'>
                <small className='text-white text-xs font-extrabold'>{currUser.cart.length}</small>
              </div>
              : ''
            }
              <BsBag size={21}/>
          </button>
          : ''
        }
        {currUser ?
          currUser?.role === 'user' ?
            <button
              className='flex relative'
              onClick={() => dispatch(toggleModal({ modalType: 'profile', modalWidth: 'w-2/4' }))}
            >
              <FaRegCircleUser size={21}/>
            </button>
            :
            <>
              <button
                className='flex relative'
                onClick={() => navigate("/add-product")}
              >
                <BsFilePlusFill size={21}/>
              </button>
              <button
                className='flex relative'
                onClick={() => dispatch(toggleModal({ modalType: 'profile', modalWidth: 'w-2/4' }))}
              >
                <FaCircleUser size={21}/>
              </button>
            </>
          : ''
        }
        <ul className='flex gap-3 ps-4 border-s'>
          {!currUser ?
            <li>
              <Button
                padding='px-3 py-1'
                fontSize='text-sm'
                textColor='text-white'
                fontWeight='font-medium'
                bgColor='bg-green-600'
                border='border'
                borderColor='border-transparent'
                borderRadius='rounded-md'
                text='Register'
                clickEvent={() => dispatch(toggleModal({ modalType: 'register', modalWidth: 'w-1/3' }))}
              />
            </li>
            : ''
          }
          <li>
            <Button
              padding='px-3 py-1'
              fontSize='text-sm'
              fontWeight='font-medium'
              border='border'
              borderRadius='rounded-md'
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