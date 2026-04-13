import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo'
import HeaderIcons from './HeaderIcons'
import './Header.css'

function Header({ onMenuOpen }) {
    const navigate = useNavigate()
    const location = useLocation()

    const handleScrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 100)
        } else {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    const handleCatalogClick = () => {
        navigate('/catalog?type=all')
    }

    return (
        <header className="header">
            <div className="header-container">
                <Logo />

                <nav className="nav-menu desktop">
                    <button onClick={() => handleScrollToSection('catalog-section')} className="nav-link">
                        Категории
                    </button>
                    <button onClick={() => handleScrollToSection('sales-section')} className="nav-link">
                        Скидки
                    </button>
                    <button onClick={() => handleScrollToSection('brands-section')} className="nav-link">
                        Бренды
                    </button>
                    <button onClick={() => handleScrollToSection('countries-section')} className="nav-link">
                        Страны
                    </button>
                    <button onClick={handleCatalogClick} className="nav-link">
                        Каталог
                    </button>
                </nav>

                <div className="header-right">
                    <HeaderIcons />
                    <button className="mobile-menu-btn" onClick={onMenuOpen}>
                        ☰
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header