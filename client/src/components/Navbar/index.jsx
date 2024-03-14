import React, { useEffect, useState } from 'react';
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
  const [showTags, setShowTags] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    q: '',
    cat: '',
    tags: []
  });
  const handleLogout = () => {
    fetch('http://localhost:3001/auth/logout', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        notifySuccess(data.message);
        dispatch(removeCurrUser());
      })
      .catch((error) => console.log(error.message));
  };

  const handleSearch = ({ inputSearch, category, selectedTags }) => {
    setSearchCriteria((prev) => ({
      ...prev,
      q: inputSearch !== undefined ? inputSearch : prev.q,
      cat: category !== undefined ? category : prev.cat,
      tags: selectedTags !== undefined ? selectedTags : prev.tags
    }));

    const menuSection = document.getElementById('menuSection');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    let url = 'http://localhost:3001/api/products';
    
    const queryParams = [];
    if (searchCriteria.q !== '') {
      queryParams.push(`q=${searchCriteria.q}`);
    }

    if (searchCriteria.cat !== '') {
      queryParams.push(`cat=${searchCriteria.cat}`);
    }

    if(searchCriteria.tags.length > 0) {
      queryParams.push(`tags=${searchCriteria.tags.join(',')}`);
    }

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch(addCurrProducts(data.data)))
      .catch((error) => console.log(error.message));
  }, [searchCriteria.q, searchCriteria.cat, searchCriteria.tags]);

  return (
    <nav className='fixed z-10 bg-white w-full max-w-[1440px] flex justify-between items-center h-14 px-8 border-b-[1px] shadow-sm'>
      <Link
        className='text-2xl font-medium text-green-600'
        to={"/"}
      >MyStore</Link>
      <div className='flex items-center gap-4'>
        <div className='flex gap-2'>
          <input
            type="search"
            className='rounded-sm border w-[250px] px-2 py-1'
            placeholder='Search...'
            onChange={(e) => handleSearch({ inputSearch: e.target.value })}
          />
          <select
            className='border w-max px-2 py-1 text-sm'
            onChange={(e) => handleSearch({ category: e.target.value })}
          >
            <option value="">All</option>
            <option value="65dd7986bfcd13e374c712f4">Food</option>
            <option value="65dd798ebfcd13e374c712f6">Drink</option>
            <option value="65dd7992bfcd13e374c712f8">Snack</option>
          </select>
          <div
            className='flex items-center relative border text-sm'
          >
            <button
              className='px-2 py-1'
              onClick={() => setShowTags((prev) => !prev)}
            >Tags</button>
            <div>
              {showTags ?
                <div className='absolute -bottom-[5rem] -left-[3.3rem] p-2 w-max flex flex-col gap-2 bg-white border rounded-sm shadow-sm'>
                  <div className='flex gap-1'>
                    <input
                      type="checkbox"
                      id="best_seller"
                      value="65dd7ccfa2ac445e2d7b6500"
                      onClick={(e) => {
                        const tagValue = e.target.value;
                        setSearchCriteria((prev) => ({
                          ...prev,
                          tags: prev.tags.includes(tagValue)
                            ? prev.tags.filter(tag => tag !== tagValue)
                            : [...prev.tags, tagValue]
                        }));
                      }}
                    />
                    <label htmlFor="best_seller">Best Seller</label>
                  </div>
                  <div className='flex gap-1'>
                    <input
                      type="checkbox"
                      id="signature"
                      value="65ddac61ce85d49e21317e72"
                      onClick={(e) => {
                        const tagValue = e.target.value;
                        setSearchCriteria((prev) => ({
                          ...prev,
                          tags: prev.tags.includes(tagValue)
                            ? prev.tags.filter(tag => tag !== tagValue)
                            : [...prev.tags, tagValue]
                        }));
                      }}
                    />
                    <label htmlFor="signature">Signature</label>
                  </div>
                </div>
                : ''
              }
            </div>
          </div>
        </div>
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