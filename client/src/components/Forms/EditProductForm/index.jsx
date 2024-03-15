import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { notifyFailed, notifySuccess } from '../../../helpers/toaster';
import Button from '../../Button';
import { selectCurrTags } from '../../../redux/currTagsSlice';
import { selectCurrCategories } from '../../../redux/currCategoriesSlice';

const EditProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currTags = useSelector(selectCurrTags);
  const currCategories = useSelector(selectCurrCategories);
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [productDetail, setProductDetail] = useState({
    tags: []
  });

  const handleAddTags = (e, value) => {
    e.preventDefault();
    setProductDetail((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), value]
    }));
  };

  const imageChooserRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductDetail((prev) => ({ ...prev, image: file }));
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        notifySuccess(result.message);
        navigate("/");
      }
    } catch (error) {
      notifyFailed(error.message);
    }
  };

  const submitForm = async (data) => {
    console.log(productDetail);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if(productDetail.category) {
        formData.append('category', productDetail.category);
      } else {
        notifyFailed('Category must be chosen.');
        return;
      }

      productDetail.tags.forEach((tag) => {
        formData.append('tags[]', tag);
      });
      
      if(productDetail.image) {
        formData.append('image', productDetail.image);
      }

      // const res = await fetch('http://localhost:3001/api/products', {
      //   method: 'PUT',
      //   body: formData
      // });
      // if(!res.ok) {
      //   const result = await res.json();
      //   throw new Error(result.message);
      // } else {
      //   const result = await res.json();
      //   console.log(result.data);
      //   notifySuccess(result.message);
      // }
    } catch (error) {
      notifyFailed(error.message);
    }
    reset();
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data[0]);
        setProductDetail(data.data[0]);
      })
      .catch((error) => console.log(error.message));
  }, []);
  
  return (
    <div className='flex flex-col gap-2'>
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
              {productDetail?.image ?
                // <img src={URL.createObjectURL(productDetail?.image)} alt="selected-image" className='max-h-full' />
                <img src={`http://localhost:3001/images/${productDetail?.image?.split('\\')[2]})`} alt="selected-image" className='max-h-full' />
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
              defaultValue={productDetail?.name}
              {...register('name')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="text"
              placeholder='Description'
              defaultValue={productDetail?.description}
              {...register('description')}
            />
            <input
              className='border px-2 py-1 rounded-sm'
              type="number"
              placeholder='Price'
              defaultValue={productDetail?.price}
              {...register('price')}
            />
            <select
              className='border px-2 py-1 rounded-sm text-base capitalize'
              value={productDetail?.category?._id || ''} // Set the value of the select element to the category ID
              onChange={(e) => setProductDetail((prev) => ({ ...prev, category: { _id: e.target.value } }))} // Ensure category is set as an object
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
                <small>{productDetail?.tags?.length} selected</small>
              </div>
              <div className='flex gap-2 flex-wrap h-full'>
                {currTags?.map((tag) => (
                  <button
                    key={tag?._id}
                    onClick={(e) => handleAddTags(e, tag)}
                    className={productDetail?.tags?.find((item) => item?._id === tag?._id) ? 'bg-green-500 text-white' : ''}
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
          clickEvent={handleDeleteProduct}
        />
      </div>
    </div>
  )
};

export default EditProductForm;