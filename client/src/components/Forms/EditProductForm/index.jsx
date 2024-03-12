import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { notifyFailed, notifySuccess } from '../../../helpers/toaster';
import { toggleModal } from '../../../redux/modalSlice';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Button from '../../Button';

const EditProductForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);
  const handleAddTags = (e, value) => {
    e.preventDefault();
    setTags((prev) => [...prev, value]);
  };
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageChooserRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const submitForm = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if(category) {
        formData.append('category', category);
      } else {
        notifyFailed('Category must be chosen.');
        return;
      }

      tags.forEach((tag) => {
        formData.append('tags[]', tag);
      });
      
      if(selectedImage) {
        formData.append('image', selectedImage);
      } else {
        notifyFailed('Image must be chosen.');
        return;
      }

      const res = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        body: formData
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        console.log(result.data);
        notifySuccess(result.message);
      }
    } catch (error) {
      notifyFailed(error.message);
    }
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
      <h2 className='text-2xl font-bold text-center'>Edit Product</h2>
      <form
        className='flex flex-col gap-4'
        encType='multipart/form-data'
        onSubmit={handleSubmit(submitForm)}
      >
        <div className='flex gap-4'>
          <div className='basis-1/2'>
            <div
              className='min-h-[300px] relative bg-center bg-cover cursor-pointer border-2 border-dashed flex justify-center items-center'
              onClick={() => imageChooserRef.current.click()}
            >
              {selectedImage ?
                <img src={URL.createObjectURL(selectedImage)} alt="selected-image" className='max-h-full' />
                :
                <p className='text-gray-500'>Select Image</p>
              }
            </div>
            <input
              type="file"
              accept='image/*'
              onChange={handleImageChange}
              ref={imageChooserRef}
              className='hidden'
            />
          </div>
          <div className='basis-1/2 flex flex-col gap-2 my-2'>
            <input
              className='border px-2 py-1 rounded-sm'
              type="text"
              placeholder='Name'
              {...register('name')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="text"
              placeholder='Description'
              {...register('description')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="number"
              placeholder='Price'
              {...register('price')}
            />
            <select className='border px-2 py-1 rounded-sm' onChange={(e) => setCategory(e.target.value)}>
              <option value="">-- Select Category --</option>
              <option value="65dd7986bfcd13e374c712f4">Food</option>
              <option value="65dd798ebfcd13e374c712f6">Drink</option>
              <option value="65dd7992bfcd13e374c712f8">Snack</option>
            </select>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <p>Tags</p>
                <small>1 selected</small>
              </div>
              <ul className='flex gap-2 flex-wrap h-full'>
                <li>
                  <button onClick={(e) => handleAddTags(e, '65dd7ccfa2ac445e2d7b6500')}>
                    <small className='border px-2 py-1'>Best seller</small>
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleAddTags(e, '65ddac61ce85d49e21317e72')}>
                    <small className='border px-2 py-1'>Signature</small>
                  </button>
                </li>
              </ul>
            </div>
          </div>
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
          text='Edit Product'
        />
      </form>
      <div className='flex flex-col gap-2 mt-4'>
        <p className='text-sm text-center'>Danger Zone</p>
        <Button
          padding='px-0 py-1'
          fontSize='text-base'
          textColor='text-white'
          fontWeight='font-medium'
          bgColor='bg-red-500'
          border='border'
          borderColor='border-transparent'
          borderRadius='rounded-full'
          text='Delete Product'
        />
      </div>
    </div>
  )
};

export default EditProductForm;