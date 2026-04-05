import React, { useEffect } from 'react'
import './MobileMenu.css'

function MobileMenu({ isOpen, onClose }) {
    const menuItems = [
        { name: 'Каталог', id: 'catalog-section' },
        { name: 'Скидки', id: 'sales-section' },
        { name: 'Бренды', id: 'brands-section' },
        { name: 'Страны', id: 'countries-section' }
    ]

    const handleLinkClick = (id) => {
        onClose()
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="mobile-menu-overlay" onClick={onClose}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-menu-header">
                    <span>Меню</span>
                    <button onClick={onClose}>✕</button>
                </div>
                {menuItems.map(item => (
                    <button
                        key={item.name}
                        className="mobile-menu-link"
                        onClick={() => handleLinkClick(item.id)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default MobileMenu