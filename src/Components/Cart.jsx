import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { IoHeart } from "react-icons/io5";
import { removecart } from './CartSlice';
import "./Cart.css"



const Cart = () => {


    //Selector to addcart
    let cartProduct = useSelector((state)=>{return state.cart})

    //useDispatch to removecart                             
    let dispatch = useDispatch()


    //function to removecart
    const Removecart =(id)=>{
        dispatch(removecart(id))
    }

  return (
    <div className='main-cart'>
        {cartProduct.length !== 0 ?<div> 
        {
        cartProduct.map((product)=>(
          
          <div key={product.id} className='cart-box'>
            <img src={product.image} alt={product.title} width="200px"/>
            <div>
            <p className='title'> {product.title} </p>
            <p className='rating'> ⭐{product.rating} </p>
            <p className='price'>  PRICE : £{product.price}  </p>
            </div>
            <div className='button-group'>

                <button className='cart-btn'    onClick={ ()=>{Removecart(product.id)} }>Remove Cart</button>

                <button className='wish-btn'><IoHeart /></button>
              
            </div>
          
          </div>

        ))
      } </div>

      : <div className='emptycart'>
            <h1 className='message'>Your Cart is empty. Please add product to cart</h1>
        </div>}
    
    </div>

    
  )
}

export default Cart