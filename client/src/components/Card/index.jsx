import React from 'react'
import { currencyFormatter } from '../../../helpers/currencyFormatter'

const Card = ({ name, description, price, image_url }) => {
  return (
    <div className='flex flex-col w-[300px] shadow-md'>
      <div className='min-h-[300px] bg-black'>
        <h1>Image</h1>
      </div>
      <div className='flex flex-col px-3 py-2'>
        <div className='flex flex-col'>
          <h2 className='text-lg font-bold'>{name}</h2>
          <p className='text-sm'>{description}</p>
          <p className='text-sm font-medium mt-2'>{currencyFormatter.format(price)}</p>
        </div>
        <div className='flex justify-end'>
          <p className='text-sm'>Add to cart</p>
        </div>
      </div>
    </div>
  )
}

export default Card