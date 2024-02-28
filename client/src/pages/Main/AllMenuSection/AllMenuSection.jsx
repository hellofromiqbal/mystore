import React, { useState } from 'react'
import Card from '../../../components/Card'

const AllMenuSection = () => {
  const [products, setProducts] = useState([]);
  useState(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);
  return (
    <section className='px-8 py-8 grid grid-cols-4 gap-8'>
      {products.map((product) => (
        <div key={product._id} className='flex justify-center'>
          <Card
            name={product?.name}
            description={product?.description}
            price={product?.price}
            image_url={product?.image_url}
          />
        </div>
      ))}
    </section>
  )
}

export default AllMenuSection