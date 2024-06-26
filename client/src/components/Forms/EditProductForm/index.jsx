import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { notifyFailed, notifySuccess } from '../../../helpers/toaster';
import Button from '../../Button';
import { addNewProduct, deleteProduct, editProduct } from '../../../redux/currProductsSlice';
import { selectCurrTags } from '../../../redux/currTagsSlice';
import { selectCurrCategories } from '../../../redux/currCategoriesSlice';

const EditProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const currTags = useSelector(selectCurrTags);
  const currCategories = useSelector(selectCurrCategories);
  const { register, handleSubmit, reset } = useForm();

  const [state, setState] = useState({
    category: '',
    tags: [],
    image: null
  });

  useEffect(() => {
    fetch(`${apiUrl}/api/products/?id=${id}`)
      .then((res) => res.json())
      .then((data) => { setState(data.data[0])})
      .catch((error) => console.log(error.message));
  }, []);

  const handleAddTags = (e, tag) => {
    e.preventDefault();
    setState((prev) => {
      const alreadyExists = prev.tags && prev.tags.some(prevTag => prevTag._id === tag._id);
      if (alreadyExists) {
        return {
          ...prev,
          tags: prev.tags.filter(prevTag => prevTag._id !== tag._id)
        };
      }
      return {
        ...prev,
        tags: [...(prev.tags || []), tag]
      };
    });
  };
  const imageChooserRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState((prev) => ({ ...prev, image: file }));
  };

  const submitForm = async (data) => {
    try {
      const formData = new FormData();
      if (!data.name && state.name) {
        formData.append('name', state.name);
      } else {
        formData.append('name', data.name);
      }
  
      if (!data.description && state.description) {
        formData.append('description', state.description);
      } else {
        formData.append('description', data.description);
      }
  
      if (!data.price && state.price) {
        formData.append('price', state.price);
      } else {
        formData.append('price', data.price);
      }
  
      if (!data.category && state.category) {
        formData.append('category', state.category._id);
      } else {
        formData.append('category', data.category);
      }
  
      if (!data.tags && state.tags.length > 0) {
        state.tags.forEach((tag) => {
          formData.append('tags[]', tag._id);
        });
      } else {
        data.tags.forEach((tag) => {
          formData.append('tags[]', tag);
        });
      }
  
      if (!data.image && state.image) {
        formData.append('image', state.image);
      } else {
        formData.append('image', data.image);
      }
  
      const res = await fetch(`${apiUrl}/api/products/${id}`, {
        method: 'PUT',
        body: formData
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(editProduct(result.data));
        notifySuccess(result.message);
        navigate("/");
      }
    } catch (error) {
      notifyFailed(error.message);
    }
    reset();
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/products/${id}`, { method: 'DELETE' });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        notifySuccess(result.message);
        dispatch(deleteProduct(id));
        navigate("/");
      }
    } catch (error) {
      notifyFailed(error.message);
    }
  };
  
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl font-bold text-center'>Edit Product</h2>
      <form
        className='flex flex-col gap-4'
        encType='multipart/form-data'
        onSubmit={handleSubmit(submitForm)}
      >
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='basis-1/2'>
            <div
              className='min-h-[300px] relative bg-center bg-cover cursor-pointer border-2 border-dashed flex justify-center items-center'
              onClick={() => imageChooserRef.current.click()}
              style={{ overflow: 'hidden' }}
            >
              {state.image ? (
                <img
                  src={URL.createObjectURL(state.image)}
                  alt="selected-image"
                  className='max-h-full h-full w-full object-cover object-center'
                />
              ) : (
                state.image_url ? (
                  <img
                    src={`${apiUrl}/images/${state.image_url?.split('\\')[2]}`}
                    alt="selected-image"
                    className='max-h-full h-full w-full object-cover object-center'
                  />
                ) : (
                  <p className='text-gray-500'>Select Image</p>
                )
              )}
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
              defaultValue={state?.name}
              {...register('name')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="text"
              placeholder='Description'
              defaultValue={state?.description}
              {...register('description')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="number"
              placeholder='Price'
              defaultValue={state?.price}
              {...register('price')}
            />
            <select
              className='border px-2 py-1 rounded-sm text-base capitalize'
              value={state.category?._id || ''}
              onChange={(e) => {
                setState((prev) => ({ ...prev, category: { _id: e.target.value } }));
              }}
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
                <small>{state.tags.length} selected</small>
              </div>
              <div className='flex gap-2 flex-wrap h-full'>
                {currTags?.map((tag) => (
                  <button
                    key={tag?._id}
                    onClick={(e) => handleAddTags(e, tag)}
                    className={state.tags?.find((item) => item?._id === tag?._id) ? 'bg-green-500 text-white' : ''}
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
          text='Save changes'
        />
      </form>
      <div className='flex flex-col mt-4 gap-2'>
        <p className='text-center text-sm md:text-base'>Danger zone</p>
        <Button
          padding='px-0 py-1'
          fontSize='text-base'
          textColor='text-white'
          fontWeight='font-medium'
          bgColor='bg-red-600'
          border='border'
          borderColor='border-transparent'
          borderRadius='rounded-full'
          text='Delete product'
          clickEvent={handleDeleteProduct}
        />
      </div>
    </div>
  )
};

export default EditProductForm;