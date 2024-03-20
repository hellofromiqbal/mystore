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
import { addCurrCategories, selectCurrCategories } from '../../redux/currCategoriesSlice';
import { addCurrTags, selectCurrTags } from '../../redux/currTagsSlice';

const NavbarMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const currUser = useSelector(selectCurrUser);
  const currCategories = useSelector(selectCurrCategories);
  const currTags = useSelector(selectCurrTags);
  const [showTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    q: '',
    cat: '',
    tags: []
  });
  const handleLogout = () => {
    fetch(`${apiUrl}/auth/logout`, { credentials: 'include' })
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
  };

  const handleFocus = () => {
    const menuSection = document.getElementById('menuSection');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addCurrUser(data.data));
      })
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    let url = `${apiUrl}/api/products`;
    
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

  useEffect(() => {
    fetch(`${apiUrl}/api/categories`)
      .then((res) => res.json())
      .then((data) => dispatch(addCurrCategories((data.data))))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/tags`)
      .then((res) => res.json())
      .then((data) => dispatch(addCurrTags((data.data))))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <nav className='fixed bottom-0 z-10 bg-white w-full max-w-[1440px] flex justify-between items-center h-14 px-8 border-t-[1px] md:border-t-0 md:border-b-[1px] shadow-sm'>
      {currUser ?
        <button
          className='flex relative'
          onClick={() => dispatch(toggleModal({ modalType: 'invoice', modalWidth: 'w-11/12 lg:w-2/3' }))}
        >
          {currUser && currUser.invoices.length > 0 ?
            <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center'>
              <small className='text-white text-xs font-extrabold'>{currUser.invoices.length}</small>
            </div>
            : ''
          }
            {currUser?.role === 'user' ?
              <BsReceipt size={25}/>
              :
              <FaReceipt size={25}/>
            }
        </button>
        : ''
      }
      {currUser?.role === 'user' ?
        <button
          className='flex relative'
          onClick={() => dispatch(toggleModal({ modalType: 'cart', modalWidth: 'w-11/12 lg:w-2/3' }))}
        >
          {currUser && currUser.cart.length > 0 ?
            <div className='absolute -top-2 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center'>
              <small className='text-white text-xs font-extrabold'>{currUser.cart.length}</small>
            </div>
            : ''
          }
            <BsBag size={25}/>
        </button>
        : ''
      }
      {currUser ?
        currUser?.role === 'user' ?
          <button
            className='flex relative'
            onClick={() => dispatch(toggleModal({ modalType: 'profile', modalWidth: 'w-11/12 md:w-4/5 lg:w-1/2' }))}
          >
            <FaRegCircleUser size={25}/>
          </button>
          :
          <>
            <button
              className='flex relative'
              onClick={() => navigate("/add-product")}
            >
              <BsFilePlusFill size={25}/>
            </button>
            <button
              className='flex relative'
              onClick={() => dispatch(toggleModal({ modalType: 'profile', modalWidth: 'md:w-4/5 lg:w-1/2' }))}
            >
              <FaCircleUser size={25}/>
            </button>
          </>
        : ''
      }
    </nav>
  )
};

export default NavbarMobile;