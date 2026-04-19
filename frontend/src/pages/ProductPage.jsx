import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductPage.css'

function ProductPage() {
    const { sku } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [addingToCart, setAddingToCart] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoriteLoading, setFavoriteLoading] = useState(false)
    const [imageError, setImageError] = useState(false)

    const token = localStorage.getItem('token')
    const isLoggedIn = !!token

    useEffect(() => {
        fetchProduct()
        if (isLoggedIn) {
            checkIsFavorite()
        }
    }, [sku, isLoggedIn])

    const fetchProduct = async () => {
        setLoading(true)
        setError(null)
        setImageError(false)
        try {
            const response = await fetch(`/house-goods/api/products/${sku}`)
            if (!response.ok) {
                throw new Error('Товар не найден')
            }
            const data = await response.json()
            setProduct(data)
            setQuantity(1)
        } catch (error) {
            console.error('Ошибка загрузки товара:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const checkIsFavorite = async () => {
        try {
            const response = await fetch('/house-goods/api/favorites/my', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const favorites = await response.json()
                const found = favorites.some(item => item.sku === sku)
                setIsFavorite(found)
            }
        } catch (error) {
            console.error('Ошибка проверки избранного:', error)
        }
    }

    const toggleFavorite = async () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }

        setFavoriteLoading(true)
        try {
            if (isFavorite) {
                const response = await fetch(`/house-goods/api/favorites/${sku}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    setIsFavorite(false)
                    window.dispatchEvent(new Event('favoritesUpdated'))
                }
            } else {
                const response = await fetch(`/house-goods/api/favorites/${sku}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    setIsFavorite(true)
                    window.dispatchEvent(new Event('favoritesUpdated'))
                } else if (response.status === 400) {
                    const data = await response.json()
                    if (data.message?.includes('уже находится')) {
                        setIsFavorite(true)
                    }
                }
            }
        } catch (error) {
            console.error('Ошибка изменения избранного:', error)
        } finally {
            setFavoriteLoading(false)
        }
    }

    const increaseQuantity = () => {
        if (quantity < product.count) {
            setQuantity(quantity + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleQuantityInput = (e) => {
        let value = parseInt(e.target.value)
        if (isNaN(value)) value = 1
        value = Math.max(1, Math.min(value, product.count))
        setQuantity(value)
    }

    const addToCart = () => {
        setAddingToCart(true)

        const cartItem = {
            sku: product.sku,
            name: product.name,
            price: product.salePrice || product.basePrice,
            quantity: quantity,
            imageUrl: product.imageUrl
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingIndex = cart.findIndex(item => item.sku === cartItem.sku)

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity
        } else {
            cart.push(cartItem)
        }

        localStorage.setItem('cart', JSON.stringify(cart))

        setAddingToCart(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const discountPercent = product?.salePrice && product?.basePrice
        ? Math.round((1 - product.salePrice / product.basePrice) * 100)
        : 0

    if (loading) {
        return (
            <div className="pg-wrapper">
                <div className="pg-container">
                    <div className="pg-loading">Загрузка...</div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="pg-wrapper">
                <div className="pg-container">
                    <div className="pg-error">
                        <p>⚠️ {error || 'Товар не найден'}</p>
                        <button onClick={() => navigate('/catalog')} className="pg-btn pg-btn-green">
                            Вернуться в каталог
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="pg-wrapper">
            <div className="pg-container">
                {/* Хлебные крошки */}
                <div className="pg-breadcrumb">
                    <button onClick={() => navigate('/')} className="pg-breadcrumb-link">Главная</button>
                    <span className="pg-breadcrumb-sep">/</span>
                    {product.category && (
                        <>
                            <button
                                onClick={() => navigate(`/catalog?type=category&name=${encodeURIComponent(product.category.name)}`)}
                                className="pg-breadcrumb-link"
                            >
                                {product.category.name}
                            </button>
                            <span className="pg-breadcrumb-sep">/</span>
                        </>
                    )}
                    <span className="pg-breadcrumb-current">{product.name}</span>
                </div>

                {/* Карточка товара */}
                <div className="pg-card">
                    {/* Фото */}
                    <div className="pg-image-col">
                        <div className="pg-image-wrapper">
                            {!imageError ? (
                                <img
                                    src={`/house-goods/images/products/${product.sku}.jpg`}
                                    alt={product.name}
                                    className="pg-image"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="pg-image-placeholder">
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1">
                                        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" fill="none"/>
                                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                                        <path d="M21 15L16 10L5 21" stroke="currentColor" fill="none"/>
                                    </svg>
                                    <span>Нет изображения</span>
                                </div>
                            )}
                            {discountPercent > 0 && (
                                <div className="pg-sale-badge">-{discountPercent}%</div>
                            )}
                        </div>
                    </div>

                    {/* Информация */}
                    <div className="pg-info-col">
                        <div className="pg-title-row">
                            <h1 className="pg-title">{product.name}</h1>
                            <button
                                className={`pg-favorite-btn ${isFavorite ? 'active' : ''}`}
                                onClick={toggleFavorite}
                                disabled={favoriteLoading}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill={isFavorite ? '#ff4444' : 'none'} stroke={isFavorite ? '#ff4444' : '#999'} strokeWidth="1.8">
                                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35Z"/>
                                </svg>
                            </button>
                        </div>

                        <div className="pg-meta">
                            {product.brand && (
                                <div className="pg-meta-row">
                                    <span className="pg-meta-label">Бренд:</span>
                                    <button
                                        className="pg-meta-value"
                                        onClick={() => navigate(`/catalog?type=brand&name=${encodeURIComponent(product.brand.name)}`)}
                                    >
                                        {product.brand.name}
                                    </button>
                                    {product.brand.country && (
                                        <span className="pg-meta-country">({product.brand.country})</span>
                                    )}
                                </div>
                            )}
                            {product.category && (
                                <div className="pg-meta-row">
                                    <span className="pg-meta-label">Категория:</span>
                                    <button
                                        className="pg-meta-value"
                                        onClick={() => navigate(`/catalog?type=category&name=${encodeURIComponent(product.category.name)}`)}
                                    >
                                        {product.category.name}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="pg-price-block">
                            {product.salePrice ? (
                                <>
                                    <span className="pg-old-price">{product.basePrice.toLocaleString()} ₽</span>
                                    <span className="pg-current-price">{product.salePrice.toLocaleString()} ₽</span>
                                </>
                            ) : (
                                <span className="pg-current-price">{product.basePrice.toLocaleString()} ₽</span>
                            )}
                        </div>

                        <div className="pg-cart-block">
                            <div className="pg-quantity">
                                <span className="pg-quantity-label">Количество:</span>
                                <div className="pg-quantity-control">
                                    <button
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                        className="pg-qty-btn"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityInput}
                                        min="1"
                                        max={product.count}
                                        className="pg-qty-input"
                                    />
                                    <button
                                        onClick={increaseQuantity}
                                        disabled={quantity >= product.count}
                                        className="pg-qty-btn"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="pg-stock">В наличии: {product.count} шт.</span>
                            </div>

                            <button
                                onClick={addToCart}
                                disabled={addingToCart || product.count === 0}
                                className="pg-cart-btn"
                            >
                                {addingToCart ? 'Добавление...' : 'В корзину'}
                            </button>
                        </div>

                        {showSuccess && (
                            <div className="pg-success">
                                <span>✅ Товар добавлен в корзину!</span>
                                <button onClick={() => navigate('/cart')} className="pg-success-btn">
                                    Перейти в корзину
                                </button>
                            </div>
                        )}

                        {product.description && (
                            <div className="pg-desc">
                                <h3>Описание</h3>
                                <p>{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Характеристики */}
                {(product.weightKg || product.lengthCm || product.widthCm || product.heightCm || product.attributes?.length > 0) && (
                    <div className="pg-specs">
                        <h3>Характеристики</h3>
                        <div className="pg-specs-list">
                            {product.weightKg && (
                                <div className="pg-spec-row">
                                    <span className="pg-spec-name">Вес</span>
                                    <span className="pg-spec-value">{product.weightKg} кг</span>
                                </div>
                            )}
                            {product.lengthCm && (
                                <div className="pg-spec-row">
                                    <span className="pg-spec-name">Длина</span>
                                    <span className="pg-spec-value">{product.lengthCm} см</span>
                                </div>
                            )}
                            {product.widthCm && (
                                <div className="pg-spec-row">
                                    <span className="pg-spec-name">Ширина</span>
                                    <span className="pg-spec-value">{product.widthCm} см</span>
                                </div>
                            )}
                            {product.heightCm && (
                                <div className="pg-spec-row">
                                    <span className="pg-spec-name">Высота</span>
                                    <span className="pg-spec-value">{product.heightCm} см</span>
                                </div>
                            )}
                            {product.attributes && product.attributes.map((attr, idx) => (
                                <div key={idx} className="pg-spec-row">
                                    <span className="pg-spec-name">{attr.attributeName}</span>
                                    <span className="pg-spec-value">{attr.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Кнопка назад */}
                <div className="pg-back">
                    <button onClick={() => navigate('/catalog')} className="pg-back-btn">
                        ← Вернуться к каталогу
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage