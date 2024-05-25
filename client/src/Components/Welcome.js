import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Products from './Products'
import CustomerReview from './CustomerReview'
export default function Welcome() {
    return (
        <div>
            <Navbar/>
            <Main/>
            <Products/>
            <CustomerReview/>
        </div>
    )
}
