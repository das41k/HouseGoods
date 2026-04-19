import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderIcons.css'

function HeaderIcons({ isLoggedIn, userName, userPhone, onLogout }) {
    const navigate = useNavigate()
    const [favoritesCount, setFavoritesCount] = useState(0)

    // Загрузка количества избранного
    useEffect(() => {
        if (isLoggedIn) {
            fetchFavoritesCount()
        } else {
            setFavoritesCount(0)
        }

        // Слушаем событие обновления избранного
        const handleFavoritesUpdate = () => {
            fetchFavoritesCount()
        }

        window.addEventListener('favoritesUpdated', handleFavoritesUpdate)
        return () => {
            window.removeEventListener('favoritesUpdated', handleFavoritesUpdate)
        }
    }, [isLoggedIn])

    const fetchFavoritesCount = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/house-goods/api/favorites/my', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setFavoritesCount(Array.isArray(data) ? data.length : 0)
            }
        } catch (error) {
            console.error('Ошибка загрузки количества избранного:', error)
        }
    }

    const handleAuthClick = () => {
        if (isLoggedIn) {
            onLogout()
        } else {
            navigate('/login')
        }
    }

    const handleOrdersClick = () => {
        if (isLoggedIn) {
            navigate('/orders')
        } else {
            navigate('/login')
        }
    }

    const handleFavoritesClick = () => {
        navigate('/favorites')
    }

    return (
        <div className="header-icons">
            {/* Избранное */}
            <button className="icon-btn" aria-label="Избранное" onClick={handleFavoritesClick}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"/>
                </svg>
                {favoritesCount > 0 && <span className="icon-badge">{favoritesCount}</span>}
            </button>

            {/* Заказы - только для авторизованных */}
            {isLoggedIn && (
                <button className="icon-btn" aria-label="Заказы" onClick={handleOrdersClick}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M8 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M8 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </button>
            )}

            {/* Корзина */}
            <button className="icon-btn" aria-label="Корзина">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H20L18 17H8L6 6Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
                    <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
                    <path d="M10 9L12 12L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="icon-badge">2</span>
            </button>

            {/* Авторизация / Профиль */}
            {isLoggedIn ? (
                <div className="user-info">
                    <button className="icon-btn user-btn" onClick={handleOrdersClick}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <path d="M5 20V19C5 15.13 8.13 12 12 12C15.87 12 19 15.13 19 19V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button>
                    <div className="user-details">
                        <span className="user-name">{userName || 'Пользователь'}</span>
                        {userPhone && <span className="user-phone">{userPhone}</span>}
                    </div>
                    <button onClick={onLogout} className="logout-btn">
                        Выйти
                    </button>
                </div>
            ) : (
                <button className="icon-btn" onClick={handleAuthClick} aria-label="Войти">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M5 20V19C5 15.13 8.13 12 12 12C15.87 12 19 15.13 19 19V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </button>
            )}
        </div>
    )
}

export default HeaderIcons