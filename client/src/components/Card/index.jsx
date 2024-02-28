import React from 'react'
import { currencyFormatter } from '../../../helpers/currencyFormatter'
import { BsBagPlus, BsBagPlusFill } from "react-icons/bs"

const Card = ({ name, description, price, image_url }) => {
  return (
    <div className='flex flex-col w-[300px] shadow-md hover:shadow-xl transition-all duration-300'>
      <div className='min-h-[300px] bg-slate-300'>
        {/* <img src={`http://localhost:3001/${image_url}`} alt={name} /> */}
      </div>
      <div className='flex flex-col px-3 py-2'>
        <div className='flex flex-col'>
          <h2 className='text-lg font-bold'>{name}</h2>
          <p className='text-sm'>{description}</p>
          <p className='text-sm font-medium mt-2'>{currencyFormatter.format(price)}</p>
        </div>
        <div className='flex justify-end'>
          <BsBagPlus size={21}/>
        </div>
      </div>
    </div>
  )
}

export default Card