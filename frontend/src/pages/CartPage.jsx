import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CartPage.css'

function CartPage() {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(cart)
        setLoading(false)
    }

    const updateQuantity = (sku, newQuantity) => {
        if (newQuantity < 1) return
        const updatedCart = cartItems.map(item =>
            item.sku === sku ? { ...item, quantity: newQuantity } : item
        )
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const removeItem = (sku) => {
        const updatedCart = cartItems.filter(item => item.sku !== sku)
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const clearCart = () => {
        setCartItems([])
        localStorage.setItem('cart', '[]')
    }

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }

    const goBack = () => {
        navigate('/')
    }

    const handleCheckout = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        // TODO: переход к оформлению заказа
        alert('Оформление заказа - в разработке')
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
                {/* Хлебные крошки */}
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
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="cart-item">
                                    <div className="cart-item-image">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.name} />
                                        ) : (
                                            <div className="image-placeholder">📦</div>
                                        )}
                                    </div>
                                    <div className="cart-item-info">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <div className="cart-item-sku">Артикул: {item.sku}</div>
                                        <div className="cart-item-price">{item.price.toLocaleString()} ₽</div>
                                    </div>
                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                                            className="qty-btn"
                                        >
                                            -
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="cart-item-total">
                                        <span className="total-label">Сумма</span>
                                        <span className="total-value">{(item.price * item.quantity).toLocaleString()} ₽</span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.sku)}
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
                                <span>{getTotalPrice().toLocaleString()} ₽</span>
                            </div>
                            <div className="summary-row delivery">
                                <span>Доставка</span>
                                <span>Рассчитывается при оформлении</span>
                            </div>
                            <div className="summary-row total">
                                <span>Итого к оплате</span>
                                <span>{getTotalPrice().toLocaleString()} ₽</span>
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