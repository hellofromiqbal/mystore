import React from 'react'
import Button from '../Button'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-14 px-8 border-b-[1px] shadow-sm'>
      <h1 className='text-2xl font-medium text-green-600'>MyStore</h1>
      <ul className='flex gap-3'>
        <li>
          <Button
            text='Register'
          />
        </li>
        <li>
          <Button
            textColor='text-green-600'
            bgColor='bg-transparent'
            borderColor='border-green-600'
            text='Login'
          />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar