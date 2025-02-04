import React from 'react'
import Navbar from '../navbar/NavBar'
import Advertisement from './Advertisement'
import Products from '../products/Products'
import '../homepage/homepage.css'
// import CustomerDetails from './CustomerDetails'

const Homepage = () => {
    return (
        <div className='cont'>
            <Navbar />
            <Advertisement />
            <span className='productshomepage'>
                <Products />
            </span>
            {/* <CustomerDetails /> */}
        </div>
    )
}

export default Homepage