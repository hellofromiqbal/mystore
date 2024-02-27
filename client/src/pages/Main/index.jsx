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
    <div className='px-4 py-4'>
      {products.map((product) => (
        <Card
          key={product._id}
          name={product?.name}
          description={product?.description}
          price={product?.price}
        />
      ))}
    </div>
  )
}

export default MainPage