import React, { useState } from 'react'
import "./Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {

  const[email,setEmail] = useState("")


  return (
    <div>

      <footer className='footer'>
        {/* terms and conditions */}
        <div className='footer-box'>
          <div className='LegalTrust'> 
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Payment Methods</p>     
          </div>


          {/* social media links */}
          <div className='social-media'>
            <h3>Contact us on</h3>
            <div className='social-icon'>
              <a href='https://www.facebook.com/' target='parent'> <p><FaFacebook /> </p></a>
              <a href='https://www.instagram.com/' target='parent'><p><FaInstagram /> </p></a>
              <a href='https://x.com/' target='parent'> <p><FaSquareXTwitter /> </p></a>
            </div> 
          </div>

          {/* subscribe for discount and updates */}
          <div className='subscribe'>
            <h3>Subscribe for Exclusive Deals</h3>
            <p>get update on new arrival, special discount and sesonal offer</p>
            <input type='email'  placeholder='Enter you email '  value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            <button onClick={()=>{setEmail("")}} >Subscribe</button>

          </div>

        </div>

        {/* copy rights */}
        <div className='copyrights'>
          <p>© 2026 SHOPHUB. All Rights Reserved.</p>
        </div>

      </footer>
    </div>
  )
}

export default Footer