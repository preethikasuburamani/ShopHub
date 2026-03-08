import React from 'react'
import "./App.css"
import {HashRouter as Router,Routes,Route, json} from "react-router-dom"
import Home from './Components/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Products from './Components/Products'
import ProductList from './Components/ProductList'
import Cart from './Components/Cart'
import WishList from './Components/WishList'
import Signin from './Components/Signin'
import ContactUs from './Components/ContactUs'
import Register from './Components/Register'
import ForgetPassword from './Components/ForgetPassword'



const App = () => {


  return (
    <Router>
        <Header/>

        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/products' element={<Products/>} />
          <Route path='/productList/:categoryId' element= {<ProductList/>}/>
          <Route path='/cart' element= {<Cart/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>   
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>  
        </Routes>
        <Footer/>
    </Router>


    
  )
}

export default App