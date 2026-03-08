import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoHeart } from "react-icons/io5";
import { removeWishlist } from './WishlistSlice';

const WishList = () => {


  //use Selector to display list of produts in wishlist
  const WishlistProducts= useSelector((state)=>{return state.Wishlist})
  
  //Dispatch to remove wishlist
  const dispatch = useDispatch()

  //removelist function 
  const RemoveList = (id)=>{
    dispatch( removeWishlist(id))
  }

  
    return (
      <div>
          {WishlistProducts.length !== 0 ?<div> 
          {
          WishlistProducts.map((product)=>(
            
            <div key={product.id} className='cart-box'>
              <img src={product.image} alt={product.title} width="200px"/>
              <div>
              <p className='title'> {product.title} </p>
              <p className='rating'> ⭐{product.rating} </p>
              <p className='price'>  PRICE : £{product.price}  </p>
              </div>
              <div className='button-group'>
    
                  <button className='wish-btn'  onClick={()=>{RemoveList(product.id)}}><IoHeart /></button>
                
              </div>
            
            </div>
  
          ))
        } </div>
  
        : <div className='emptycart'>
              <h1 className='message'>Your WishList is empty. Please add product to WishList</h1>
          </div>}
      
      </div>
  
      
    )
}

export default WishList