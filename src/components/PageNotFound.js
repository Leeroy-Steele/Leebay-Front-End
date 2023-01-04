import React from 'react'
import PlainHeader from './PlainHeader'
import HeaderLinks from './HeaderLinks'

export default function PageNotFound() {
  return (
    <div>
        <HeaderLinks linkName='Home' linkTo='/'/>
        <PlainHeader/>
        <h2 className='text-black text-center p-5 m-5'>.. ops, the page was not found</h2>    
    </div>
  )
}
