import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { selectCurrUser } from '../../redux/currUserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrUser);
  console.log(currUser);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  return (
    <div className='flex flex-col gap-2 relative'>
      <button
        className='absolute -top-2 -right-2'
        onClick={() => dispatch(toggleModal(''))}
      >
        <IoCloseCircleOutline size={25}/>
      </button>
      <h2 className='text-2xl font-bold text-center'>My Profile</h2>
      <div className='flex flex-col gap-2 py-2 border-t max-h-[70vh] overflow-auto'>
        <ul>
          <li className='flex justify-between items-center'>
            <p className='text-sm font-medium'>Fullname:</p>
            <p className='text-sm text-gray-700'>{currUser?.fullname}</p>
          </li>
          <li className='flex justify-between items-center'>
            <p className='text-sm font-medium'>Email:</p>
            <p className='text-sm text-gray-700'>{currUser?.email}</p>
          </li>
          <li className='flex flex-col'>
            <p className='text-sm font-medium'>Address:</p>
            <ol className='list-decimal list-inside'>
              {currUser?.address.map((item) => (
                <li key={item?._id} className='text-sm text-gray-700'>{item.fullAddress}</li>
              ))}
              <div>
                {!showNewAddressForm ?
                  <button
                    className='text-sm bg-green-500 text-white font-medium px-2 rounded-md'
                    onClick={() => setShowNewAddressForm((prev) => !prev)}
                  >Add new</button>
                  : ''
                }
                {showNewAddressForm ?
                  <form>
                    <textarea
                      className='w-full h-[100px] p-2 text-sm resize-none border rounded-sm'
                    />
                    <div className='flex justify-end gap-2'>
                      <button
                        className='text-sm bg-red-400 text-white font-medium px-2 rounded-md'
                        onClick={() => setShowNewAddressForm((prev) => !prev)}
                      >
                        Cancel
                      </button>
                      <button
                        className='text-sm bg-green-500 text-white font-medium px-2 rounded-md'
                      >
                        Save
                      </button>
                    </div>
                  </form>
                  : ''
                }
              </div>
            </ol>
          </li>

        </ul>
      </div>
    </div>
  )
};

export default Profile;