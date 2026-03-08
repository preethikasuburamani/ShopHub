import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import "./Header.css"
import {Link, useNavigate} from "react-router-dom"


const Header = () => {

    let navigate = useNavigate()
    
  return (
    
    <header  className='header-box'>
        <div className='logo'> 
            <h1><Link to= "/">SHOPHUB</Link></h1>
        </div>
        
        {/*Navigation*/}
        <div className='nav-box'>
            <nav className='nav'> 
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Products">Products</Link></li>
                <li><Link to="/contactus">ContactUs</Link></li>   
            </nav>
        </div>


        <div className='account'>
            <Link to="/signin" className='siginlink'>Signin</Link>
            {/* <h2><a  href='/'> <CgProfile /> </a></h2> */}
            <h2> <Link to ="/cart"><FaCartShopping /></Link> </h2>
            <h2> <Link to ="/wishlist"> <IoHeart /> </Link> </h2>
        </div>
    </header>
  )
}

export default Header