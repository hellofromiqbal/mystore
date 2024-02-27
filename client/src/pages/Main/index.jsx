import React, { useState } from 'react'
import Card from '../../components/Card'

const MainPage = () => {
  const [products, setProducts] = useState([]);
  useState(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);
  return (
    <div className='px-4 py-4 flex gap-8'>
      {products.map((product) => (
        <Card
          key={product._id}
          name={product?.name}
          description={product?.description}
          price={product?.price}
          image_url={product?.image_url}
        />
      ))}
    </div>
  )
}

export default MainPage