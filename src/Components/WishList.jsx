import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoHeart } from "react-icons/io5";
import { removeWishlist } from './WishlistSlice';
import { addcart} from './CartSlice';


const WishList = () => {


  //use Selector to display list of produts in wishlist
  const WishlistProducts= useSelector((state)=>{return state.Wishlist})
  
  //Dispatch to remove wishlist
  const dispatch = useDispatch()

  //removelist function 
  const RemoveList = (id)=>{
    dispatch( removeWishlist(id))
  }

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
  
    return (
      <div className='main-cart'>
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

                  <button className='cart-btn'    onClick={ ()=>{AddCart(product)} }>ADD TO CART</button>
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