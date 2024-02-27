import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-14 px-8 border-b-[1px] shadow-sm'>
      <h1 className='text-2xl font-medium text-green-600'>MyStore</h1>
      <ul className='flex gap-4'>
        <li><a href="">Register</a></li>
        <li><a href="">Login</a></li>
      </ul>
    </nav>
  )
}

export default Navbar