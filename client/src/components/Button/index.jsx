import React from 'react'

const Button = ({
  padding = 'px-3 py-1',
  fontSize = 'text-sm',
  textColor = 'text-white',
  fontWeight = 'font-medium',
  bgColor = 'bg-green-600',
  border = 'border',
  borderColor = 'border-transparent',
  borderRadius = 'rounded-md',
  text = 'Button',
  clickEvent = () => console.log('Clicked!')
}) => {
  return (
    <button
      className={`${padding} ${fontSize} ${textColor} ${fontWeight} ${bgColor} ${border} ${borderColor} ${borderRadius}`}
      onClick={clickEvent}
    >
      {text}
    </button>
  )
}

export default Button