import React from 'react'

const Button = ({
  textColor = 'text-white',
  bgColor = 'bg-green-600',
  borderColor = 'border-transparent',
  text = 'Button'
}) => {
  return (
    <button
      className={`px-3 py-1 text-sm ${textColor} font-medium ${bgColor} border ${borderColor} rounded-md`}
    >
      {text}
    </button>
  )
}

export default Button