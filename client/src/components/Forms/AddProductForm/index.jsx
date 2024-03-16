import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { notifyFailed, notifySuccess } from '../../../helpers/toaster';
import Button from '../../Button';
import { addNewProduct } from '../../../redux/currProductsSlice';
import { selectCurrTags } from '../../../redux/currTagsSlice';
import { selectCurrCategories } from '../../../redux/currCategoriesSlice';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currTags = useSelector(selectCurrTags);
  const currCategories = useSelector(selectCurrCategories);
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);
  const handleAddTags = (e, tag) => {
    e.preventDefault();
    setTags((prev) => {
      const alreadyExists = prev && prev.some(prevTag => prevTag._id === tag._id);
      if (alreadyExists) {
        return prev.filter(prevTag => prevTag._id !== tag._id)
      }
      return [...(prev || []), tag];
    });
  };
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageChooserRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const submitForm = async (data) => {
    console.log(tags);
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
        formData.append('tags[]', tag._id);
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
        dispatch(addNewProduct(result.data));
        notifySuccess(result.message);
        navigate("/");
      }
    } catch (error) {
      notifyFailed(error.message);
    }
    reset();
  };
  
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl font-bold text-center'>New Product</h2>
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
            <select
              className='border px-2 py-1 rounded-sm text-base capitalize'
              value={category || ''} // Set the value of the select element to the category ID
              onChange={(e) => {
                setCategory((prev) => prev = e.target.value );
                console.log(category);
              }} // Ensure category is set as an object
            >
              <option value="" className='text-base capitalize'>-- Select Category --</option>
              {currCategories?.map((category) => (
                <option
                  key={category?._id}
                  value={category?._id}
                  className='text-base capitalize'
                >
                  {category?.name}
                </option>
              ))}
            </select>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <p>Tags</p>
                <small>{tags.length} selected</small>
              </div>
              <div className='flex gap-2 flex-wrap h-full'>
                {currTags?.map((tag) => (
                  <button
                    key={tag?._id}
                    onClick={(e) => handleAddTags(e, tag)}
                    className={tags?.find((item) => item?._id === tag?._id) ? 'bg-green-500 text-white' : ''}
                  >
                    <small className='border px-2 py-1 capitalize'>{tag?.name.replace('_', ' ')}</small>
                  </button>
                ))}
              </div>
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
          text='Add Product'
        />
      </form>
    </div>
  )
};

export default AddProductForm;