import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './NavMenu.css'

function NavMenu({ isMenuOpen, setMenuOpen }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const [userPhone, setUserPhone] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const name = localStorage.getItem('userName') || localStorage.getItem('userLogin') || ''
        const phone = localStorage.getItem('userPhone') || ''
        setIsLoggedIn(!!token)
        setUserName(name)
        setUserPhone(phone)
    }, [location, isMenuOpen])

    const handleLinkClick = (id) => {
        setMenuOpen(false)
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const handleCatalogClick = () => {
        setMenuOpen(false)
        navigate('/catalog?type=all')
    }

    const handleLoginClick = () => {
        setMenuOpen(false)
        navigate('/login')
    }

    const handleOrdersClick = () => {
        setMenuOpen(false)
        if (isLoggedIn) {
            navigate('/orders')
        } else {
            navigate('/login')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userLogin')
        localStorage.removeItem('userName')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userPhone')
        localStorage.removeItem('userRole')
        setMenuOpen(false)
        navigate('/')
    }

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

                {/* Информация о пользователе в мобильном меню */}
                {isLoggedIn && (
                    <div className="mobile-user-card">
                        <div className="mobile-user-avatar">
                            <span>{userName?.charAt(0).toUpperCase() || 'U'}</span>
                        </div>
                        <div className="mobile-user-details">
                            <div className="mobile-user-name">{userName || 'Пользователь'}</div>
                            {userPhone && <div className="mobile-user-phone">{userPhone}</div>}
                        </div>
                    </div>
                )}

                <div className="mobile-menu-items">
                    <button className="mobile-menu-link" onClick={handleCatalogClick}>
                        Каталог
                    </button>
                    <button className="mobile-menu-link" onClick={() => handleLinkClick('sales-section')}>
                        Скидки
                    </button>
                    <button className="mobile-menu-link" onClick={() => handleLinkClick('brands-section')}>
                        Бренды
                    </button>
                    <button className="mobile-menu-link" onClick={() => handleLinkClick('countries-section')}>
                        Страны
                    </button>

                    {/* Кнопка "Мои заказы" - видна только авторизованным */}
                    {isLoggedIn && (
                        <button className="mobile-menu-link orders" onClick={handleOrdersClick}>
                            Мои заказы
                        </button>
                    )}
                </div>

                <div className="mobile-menu-footer">
                    {isLoggedIn ? (
                        <button className="mobile-menu-link logout" onClick={handleLogout}>
                            Выйти
                        </button>
                    ) : (
                        <button className="mobile-menu-link login" onClick={handleLoginClick}>
                            Войти
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavMenu