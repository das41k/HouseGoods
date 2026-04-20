import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CartPage.css'

function CartPage() {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const isLoggedIn = !!token

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        loadCart()
    }, [])

    const loadCart = async () => {
        setLoading(true)
        try {
            const response = await fetch('/house-goods/api/baskets/my', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setCartItems(data.items || [])
                setTotalPrice(data.totalPrice || 0)
            } else {
                console.error('Ошибка загрузки корзины')
                setCartItems([])
            }
        } catch (error) {
            console.error('Ошибка:', error)
            setCartItems([])
        } finally {
            setLoading(false)
        }
    }

    const increaseQuantity = async (sku) => {
        try {
            const response = await fetch('/house-goods/api/baskets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sku: sku,
                    quantity: 1
                })
            })

            if (response.ok) {
                await loadCart()
                window.dispatchEvent(new Event('cartUpdated'))
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    const decreaseQuantity = async (sku, currentQuantity) => {
        if (currentQuantity <= 1) {
            await removeItemBySku(sku)
            return
        }

        try {
            const response = await fetch('/house-goods/api/baskets/reduction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sku: sku,
                    quantity: 1
                })
            })

            if (response.ok) {
                await loadCart()
                window.dispatchEvent(new Event('cartUpdated'))
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    const removeItemBySku = async (sku) => {
        const item = cartItems.find(i => i.sku === sku)
        if (!item) return

        try {
            const response = await fetch(`/house-goods/api/baskets/${item.itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                await loadCart()
                window.dispatchEvent(new Event('cartUpdated'))
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    const removeItem = async (itemId) => {
        try {
            const response = await fetch(`/house-goods/api/baskets/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                await loadCart()
                window.dispatchEvent(new Event('cartUpdated'))
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    const clearCart = async () => {
        for (const item of cartItems) {
            await removeItem(item.itemId)
        }
    }

    const goBack = () => {
        navigate('/')
    }

    const handleCheckout = () => {
        navigate('/checkout')
    }

    const handleProductClick = (sku) => {
        navigate(`/product/${sku}`)
    }

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    }

    if (loading) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="cart-loading">
                        <div className="loading-spinner"></div>
                        <p>Загрузка корзины...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-breadcrumb">
                    <button onClick={goBack} className="breadcrumb-link">Главная</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-active">Корзина</span>
                </div>

                <div className="cart-header">
                    <h1 className="cart-title">Корзина</h1>
                    <span className="cart-count">{getTotalItems()} {getTotalItems() === 1 ? 'товар' : getTotalItems() < 5 ? 'товара' : 'товаров'}</span>
                </div>

                {cartItems.length > 0 ? (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.itemId} className="cart-item">
                                    <div
                                        className="cart-item-image"
                                        onClick={() => handleProductClick(item.sku)}
                                    >
                                        {item.imgURl ? (
                                            <img src={`/house-goods${item.imgURl}`} alt={item.name} />
                                        ) : (
                                            <div className="image-placeholder">📦</div>
                                        )}
                                    </div>
                                    <div className="cart-item-info">
                                        <h3
                                            className="cart-item-name"
                                            onClick={() => handleProductClick(item.sku)}
                                        >
                                            {item.name}
                                        </h3>
                                        <div className="cart-item-sku">Артикул: {item.sku}</div>
                                        <div className="cart-item-meta">
                                            {item.category && (
                                                <span className="cart-item-category">{item.category}</span>
                                            )}
                                            {item.brand && (
                                                <span className="cart-item-brand">{item.brand}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() => decreaseQuantity(item.sku, item.quantity)}
                                            className="qty-btn"
                                        >
                                            -
                                        </button>
                                        <span className="qty-value">{item.quantity} шт.</span>
                                        <button
                                            onClick={() => increaseQuantity(item.sku)}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="cart-item-total">
                                        <span className="total-value">{item.price.toLocaleString()} ₽</span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.itemId)}
                                        className="cart-item-remove"
                                        aria-label="Удалить"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Итого</h2>
                            <div className="summary-row">
                                <span>Товары ({getTotalItems()} шт.)</span>
                                <span>{totalPrice.toLocaleString()} ₽</span>
                            </div>
                            <div className="summary-row total">
                                <span>Итого к оплате</span>
                                <span>{totalPrice.toLocaleString()} ₽</span>
                            </div>
                            <button onClick={handleCheckout} className="checkout-btn">
                                Оформить заказ
                            </button>
                            <button onClick={clearCart} className="clear-cart-btn">
                                Очистить корзину
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="cart-empty">
                        <div className="empty-icon">🛒</div>
                        <h2>Корзина пуста</h2>
                        <p>Добавьте товары в корзину, чтобы продолжить покупки</p>
                        <button onClick={goBack} className="empty-back-btn">
                            Перейти в каталог
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage