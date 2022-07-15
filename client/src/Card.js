//import React from 'react'

const  Card=(id, title, price, rating,image)=> {
  return (
    <div>{id.children} 
    {title.children} 
    {price.children} 
    {rating.children}
    {image.children}</div>
  )
}

export default Card