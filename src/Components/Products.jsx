import React, { useEffect, useState } from 'react'
import useFetch from './useFetch'
import { IoHeart } from "react-icons/io5";
import "./Products.css"
import { useDispatch, useSelector } from 'react-redux';
import { addcart} from './CartSlice';
import { addWhishlist } from "./WishlistSlice"




const Products = () => {

  
  const {products,error} = useFetch("https://my-json-server.typicode.com/preethikasuburamani/products-api/products")

  //useDispatch hook
  const dispatch = useDispatch()

  //useSelect to check not to add same product to cat
  const existProduct = useSelector((state)=>{return state.cart})

  //Addcart function
  let AddCart = (product)=>{
    const Status = existProduct.some((item)=>item.id ===product.id)

    if(!Status){
    dispatch( addcart({...product, quantity: 1}) )
    }else{
      alert("Product is Already added")
    }
  }

   //useSelect to check the wishlist
     const existwishlist  =  useSelector((state)=>{return state.Wishlist})
 
    //AddWishlist function
   let AddWishlist = (product)=>{
     const wishlistStatus = existwishlist.some((item)=>item.id ===product.id)
 
      if(!wishlistStatus){
       dispatch(  addWhishlist(product) )
       }else{
         alert("Product is Already added to cart")
       } 
   }

 
  return (
    <div>
      
      <div>
        <h1>Product List</h1>
      </div>

      <div className='products-wrapper'>
      {
        products.map((product)=>(
          
          <div key={product.id} className='container-box'>
            <img src={product.image} alt={product.title} width="200px"/>
            <p className='title'> {product.title} </p>
            <p className='rating'> ⭐{product.rating} </p>
            <p className='price'>  PRICE : £{product.price}  </p>
           
            <div className='button-group'>

                <button className='cart-btn'    onClick={ ()=>{AddCart(product)} }>ADD TO CART</button>

                <button className='wish-btn' onClick={()=>{AddWishlist(product)}}><IoHeart /></button>
              
            </div>
          
          </div>

        ))
      }
      </div>
    
    </div>
  )
}

export default Products