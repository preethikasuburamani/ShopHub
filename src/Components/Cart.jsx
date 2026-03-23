import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { IoHeart } from "react-icons/io5";
import { removecart ,addQuantity,minusQuantity} from './CartSlice';
import "./Cart.css"



const Cart = () => {


    //Selector to addcart
    let cartProduct = useSelector((state)=>{return state.cart})

     //total price calculate
    const TotalPrice = cartProduct.reduce(
      (total,item)=>{
        return total+= (item.price* item.quantity)
      },0)
    

    //useDispatch to removecart                             
    let dispatch = useDispatch()


    //function to removecart
    const Removecart =(id)=>{
        dispatch(removecart(id))
    }
    //function to add quanity
    const AddQuantity = (id)=>{
      dispatch(addQuantity(id))
    }

    //function to minus quanity
    const MinusQuantity = (id)=>{
      dispatch(minusQuantity(id))
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
            <p className='price'>  PRICE : £{product.price *product.quantity}  </p>
            <p><button onClick={()=>{AddQuantity(product.id)}}> + </button> 1 <button onClick={()=>{MinusQuantity(product.id)}}> - </button></p>
            <p className='title'> Qty :{product.quantity}</p>
            </div>
            <div className='button-group'>
                <button className='cart-btn' onClick={ ()=>{Removecart(product.id)} }>Remove Cart</button>
                <button className='wish-btn'><IoHeart /></button>
              
            </div>
          
  
          </div>

        ))
      } 
             {/* process to buy */}
            <div className='buynow'>
              <p className='price'>Total Price : : £{TotalPrice.toFixed(2) }</p>
              <button className="cart-btn"> CHECK OUT</button>

            </div>

      </div>


      // Empty cart message
      : <div className='emptycart'>
            <h1 className='message'>Your Cart is empty. Please add product to cart</h1>
        </div>}
    
    </div>

    
  )
}

export default Cart