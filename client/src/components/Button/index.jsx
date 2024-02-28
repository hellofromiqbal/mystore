import React from 'react'

const Button = ({
  padding = 'px-3 py-1',
  fontSize = 'text-sm',
  textColor = 'text-white',
  fontWeight = 'font-medium',
  bgColor = 'bg-green-600',
  borderColor = 'border-transparent',
  text = 'Button',
  clickEvent = () => console.log('Clicked!')
}) => {
  return (
    <button
      className={`${padding} ${fontSize} ${textColor} ${fontWeight} ${bgColor} border ${borderColor} rounded-md`}
      onClick={clickEvent}
    >
      {text}
    </button>
  )
}

export default Button