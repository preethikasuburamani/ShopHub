import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import "./Header.css"
import {Link, useNavigate} from "react-router-dom"
import { totalCart } from './CartSlice';
import { useSelector } from 'react-redux';
import ProductList from './ProductList'


const Header = () => {

    let navigate = useNavigate()

    //total cart length
    const cartCount =useSelector(totalCart)
    
  return (
    
    <header  className='header-box'>
        <div className='logo'> 
            <h1><Link to= "/">SHOPHUB</Link></h1>
        </div>
        
        {/*Navigation*/}
        <div className='nav-box'>
            <ul className='nav'> 
                <li><Link to="/">Home</Link></li>
                <li className='dropdown'><Link to="/Products">Products</Link>
                
                {/* Hover Navigation for products */}
                    <ul class="dropdown-menu">
                        <li onClick={()=>{navigate(`/productList/1`)}}>Electronics</li>
                        <li onClick={()=>{navigate(`/productList/2`)}}>Fashion</li>
                        <li onClick={()=>{navigate(`/productList/3`)}}>Watches</li>
                        <li onClick={()=>{navigate(`/productList/4`)}}>Beauty</li>
                        <li onClick={()=>{navigate(`/productList/5`)}}>Men</li>   
                        <li onClick={()=>{navigate(`/productList/6`)}}>Women</li>             
                    </ul>
                </li>
                <li><Link to="/contactus">ContactUs</Link></li>   
            </ul>
        </div>


      


        {/* signin,cart,whishlist */}
        <div className='account'>
            <Link to="/signin" className='siginlink'>Signin</Link>
            {/* <h2><a  href='/'> <CgProfile /> </a></h2> */}

            <div className='cart-wrapper'>
                <Link to="/cart"><FaCartShopping /></Link>
                 {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
                </div>

            <h2> <Link to ="/wishlist"> <IoHeart /> </Link> </h2>
        </div>
    </header>
  )
}

export default Header