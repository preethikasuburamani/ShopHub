import React, { useEffect, useState } from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"
//import bags from '../assets/image/bags.png';
import ProductList from './ProductList'

const Home= () => {

    //Categories state
    const[categorie,setCategorie]=useState([])
  
    //Error for categories
    const[errorcat,setErrorcat] = useState("")
  
    // Fetch data
    useEffect(()=>{
  
      async function fetchData(){
        try{
        const res = await fetch("https://my-json-server.typicode.com/preethikasuburamani/products-api/categories")
        const data = await res.json();
        setCategorie(data)
        }catch(err){
          setErrorcat(err)
        }
      }

      fetchData()
    },[])

  const navigate = useNavigate()
  return (
  

     <div className='home-box'> 
        
        <div className='banner-content'>
            <h1 className='top'>Shop Smarter</h1>  
            <h3>UPTO 50% DISCOUNT</h3>  
            <h3 className='subline'>Morden lifestyle, Free shipping on all ordes</h3>
            <button onClick={()=>{navigate("/Products")}} >Start shoping</button>
        </div>
        

        {/*categorier content*/}
         <h1 style={{fontFamily:'cursive'}}> CATEGORIES </h1>
        <div className="categories-container">           
          {
            categorie.map((cat)=>(
              <div key = {cat.id}   className="category-card">
              <img  onClick={()=>{navigate(`/productList/${cat.id}`)}} src={cat.image} alt={cat.name} style={{width:"200px",height:"200px"}}/> 
                <h3>{cat.name}</h3>
              </div>
            ))
          }
        </div>

          {/*Bannner content*/}
        <div>
          <center><h1>SHOP TODAY AND GET MORE DISCOUNT</h1></center>
          
          <div className='banner-box'>

            <div className='img-box'>
            <img src="/images/homepageImage/bags.png" alt="shopping bags" width="700px" />
          </div>

            <div className='content-box'>
              <p>Upgrade your lifestyle with the latest modern trends at unbeatable prices.
                 Enjoy up to 50% discount on a wide range of premium products designed to match 
                 your style. We bring you high-quality fashion and essentials that combine comfort, 
                 elegance, and affordability. Plus, get free shipping on all orders with no hidden 
                 charges. Shop smarter today and experience bigger savings with every purchase.
               </p>
            </div>

          </div>

        </div>
      
    </div>
  )
}

export default Home