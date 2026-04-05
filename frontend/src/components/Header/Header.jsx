import React from 'react'
import Logo from './Logo'
import HeaderIcons from './HeaderIcons'
import './Header.css'

function Header({ onMenuOpen }) {
    return (
        <header className="header">
            <div className="header-container">
                <Logo />

                {/* Десктопное меню */}
                <nav className="nav-menu desktop">
                    <a href="#catalog-section" className="nav-link">Каталог</a>
                    <a href="#sales-section" className="nav-link">Скидки</a>
                    <a href="#brands-section" className="nav-link">Бренды</a>
                    <a href="#countries-section" className="nav-link">Страны</a>
                </nav>

                <div className="header-right">
                    <HeaderIcons />

                    {/* Мобильная кнопка */}
                    <button
                        className="mobile-menu-btn"
                        onClick={onMenuOpen}
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header