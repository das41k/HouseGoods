import React from 'react'
import './Logo.css'
import logoImage from '../../assets/logo.png'

function Logo() {
    return (
        <a href="/" className="logo">
            <img src={logoImage} alt="HouseGoods" className="logo-img" />
            <span className="logo-text">HOUSEGOODS</span>
        </a>
    )
}

export default Logo