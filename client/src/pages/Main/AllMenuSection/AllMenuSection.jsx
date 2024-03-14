import React, { useState } from 'react';
import Card from '../../../components/Card';
import { useSelector } from 'react-redux';
import { selectCurrProducts } from '../../../redux/currProductsSlice';

const AllMenuSection = () => {
  const products = useSelector(selectCurrProducts);
  return (
    <section id="menuSection" className='px-8 py-8 grid grid-cols-4 gap-8'>
      {products?.map((product) => (
        <div key={product?._id} className='flex justify-center'>
          <Card
            productId={product?._id}
            name={product?.name}
            description={product?.description}
            price={product?.price}
            image_url={product?.image_url}
            tags={product?.tags}
          />
        </div>
      ))}
    </section>
  )
};

export default AllMenuSection;