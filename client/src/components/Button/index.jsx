import React from 'react'

const Button = ({
  padding = '',
  fontSize = '',
  textColor = '',
  fontWeight = '',
  bgColor = '',
  border = '',
  borderColor = '',
  borderRadius = '',
  text = 'Button',
  clickEvent = () => {}
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