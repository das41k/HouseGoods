import React, { useState, useEffect } from 'react'
import './NavMenu.css'

function NavMenu({ isMenuOpen, setMenuOpen }) {
    const menuItems = [
        { name: 'Каталог', link: '#catalog-section' },
        { name: 'Скидки', link: '#sales-section' },
        { name: 'Бренды', link: '#brands-section' },
        { name: 'Страны', link: '#countries-section' }
    ]

    const handleLinkClick = (e, link) => {
        if (link.startsWith('#')) {
            e.preventDefault()
            setMenuOpen(false)
            const element = document.getElementById(link.slice(1))
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    // Блокируем скролл
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen])

    if (!isMenuOpen) return null

    return (
        <div className="mobile-menu-container">
            <div className="mobile-overlay" onClick={() => setMenuOpen(false)}></div>
            <div className="mobile-menu">
                <div className="mobile-menu-header">
                    <span>Меню</span>
                    <button onClick={() => setMenuOpen(false)}>✕</button>
                </div>
                {menuItems.map(item => (
                    <a
                        key={item.name}
                        href={item.link}
                        className="mobile-menu-link"
                        onClick={(e) => handleLinkClick(e, item.link)}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default NavMenu