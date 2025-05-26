import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header' style={{ backgroundImage: `url(${assets.header_img})` }}>
      <div className='header-contents'>
        <h2>Order your favourite food here</h2>
        <p>Craving variety? Discover a world of flavors with our diverse menu, 
        crafted to satisfy every taste bud. From comfort classics to exotic delights, 
        we've got something for everyone!</p>
        {/* <button>View Menu</button> */}
      </div>
    </div>
  )
}

export default Header
