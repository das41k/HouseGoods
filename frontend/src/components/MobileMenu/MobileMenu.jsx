import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './MobileMenu.css'

function MobileMenu({ isOpen, onClose }) {
    const navigate = useNavigate()
    const location = useLocation()

    const handleScrollToSection = (sectionId) => {
        onClose()
        // Если мы не на главной странице
        if (location.pathname !== '/') {
            navigate('/')
            // Ждем загрузки главной страницы и скроллим
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
        onClose()
        navigate('/catalog?type=all')
    }

    const menuItems = [
        { name: 'Категории', id: 'catalog-section' },
        { name: 'Скидки', id: 'sales-section' },
        { name: 'Бренды', id: 'brands-section' },
        { name: 'Страны', id: 'countries-section' },
        { name: 'Каталог', isCatalog: true }
    ]

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
                    item.isCatalog ? (
                        <button
                            key={item.name}
                            className="mobile-menu-link"
                            onClick={handleCatalogClick}
                        >
                            {item.name}
                        </button>
                    ) : (
                        <button
                            key={item.name}
                            className="mobile-menu-link"
                            onClick={() => handleScrollToSection(item.id)}
                        >
                            {item.name}
                        </button>
                    )
                ))}
            </div>
        </div>
    )
}

export default MobileMenu