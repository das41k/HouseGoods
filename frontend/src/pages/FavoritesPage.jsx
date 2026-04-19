import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './FavoritesPage.css'

function FavoritesPage() {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = async () => {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        try {
            const response = await fetch('/house-goods/api/favorites/my', {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 401) {
                navigate('/login')
                return
            }

            if (response.status === 403) {
                navigate('/403')
                return
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`)
            }

            const data = await response.json()
            setFavorites(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Ошибка загрузки избранного:', error)
            setError('Не удалось загрузить избранные товары')
        } finally {
            setLoading(false)
        }
    }

    const removeFromFavorites = async (sku) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`/house-goods/api/favorites/${sku}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                setFavorites(favorites.filter(item => item.sku !== sku))
            }
        } catch (error) {
            console.error('Ошибка удаления из избранного:', error)
        }
    }

    const formatPrice = (price) => {
        return Number(price).toLocaleString('ru-RU') + ' ₽'
    }

    const handleProductClick = (sku) => {
        navigate(`/product/${sku}`)
    }

    const goBack = () => {
        navigate('/')
    }

    if (loading) {
        return (
            <div className="favorites-page">
                <div className="favorites-container">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Загрузка избранного...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="favorites-page">
                <div className="favorites-container">
                    <div className="error-state">
                        <div className="error-icon">⚠️</div>
                        <h2>Ошибка</h2>
                        <p>{error}</p>
                        <button onClick={fetchFavorites} className="retry-btn">Повторить</button>
                        <button onClick={goBack} className="back-btn">На главную</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                {/* Хлебные крошки */}
                <div className="favorites-breadcrumb">
                    <button onClick={goBack} className="breadcrumb-link">Главная</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-active">Избранное</span>
                </div>

                <div className="favorites-header">
                    <h1 className="favorites-title">Избранное</h1>
                    <span className="favorites-count">
                        {favorites.length} {favorites.length === 1 ? 'товар' : favorites.length < 5 ? 'товара' : 'товаров'}
                    </span>
                </div>

                {favorites.length > 0 ? (
                    <div className="favorites-grid">
                        {favorites.map((item) => (
                            <div key={item.sku} className="favorite-card">
                                <div className="favorite-image" onClick={() => handleProductClick(item.sku)}>
                                    {item.imgURl ? (
                                        <img src={`/house-goods${item.imgURl}`} alt={item.name} />
                                    ) : (
                                        <div className="image-placeholder">📦</div>
                                    )}
                                </div>
                                <div className="favorite-info">
                                    <h3 className="favorite-name" onClick={() => handleProductClick(item.sku)}>
                                        {item.name}
                                    </h3>
                                    <div className="favorite-meta">
                                        {item.category && (
                                            <span className="favorite-category">{item.category}</span>
                                        )}
                                        {item.brand && (
                                            <span className="favorite-brand">{item.brand}</span>
                                        )}
                                    </div>
                                    <div className="favorite-price">
                                        {item.salePrice ? (
                                            <>
                                                <span className="sale-price">{formatPrice(item.salePrice)}</span>
                                                <span className="old-price">{formatPrice(item.basePrice)}</span>
                                            </>
                                        ) : (
                                            <span className="regular-price">{formatPrice(item.basePrice)}</span>
                                        )}
                                    </div>
                                    <div className="favorite-date">
                                        Добавлено: {new Date(item.dateAdded).toLocaleDateString('ru-RU')}
                                    </div>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromFavorites(item.sku)}
                                    aria-label="Удалить из избранного"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="favorites-empty">
                        <div className="empty-icon">❤️</div>
                        <h2>В избранном пока пусто</h2>
                        <p>Добавляйте товары в избранное, чтобы не потерять их</p>
                        <button onClick={goBack} className="empty-back-btn">
                            Перейти в каталог
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavoritesPage