import React from 'react';
import AllMenuSection from './AllMenuSection/AllMenuSection';
import JumboSection from './JumboSection/JumboSection';
import { useSelector } from 'react-redux';
import { selectCurrUser } from '../../redux/currUserSlice';
import AdminDashboard from './AdminDashboard';

const MainPage = () => {
  const currUser = useSelector(selectCurrUser);
  return (
    <div>
      {currUser?.role === 'user' || currUser?.role === undefined ?
        <>
          <JumboSection/>
          <AllMenuSection/>
        </>
        :
        <div className='-mt-14'>
          <AdminDashboard/>
        </div>
      }
    </div>
  )
};

export default MainPage;