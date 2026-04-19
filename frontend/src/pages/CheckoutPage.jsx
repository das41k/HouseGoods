import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CheckoutPage.css'

function CheckoutPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [selectedPaymentCode, setSelectedPaymentCode] = useState(null)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
    const [courierComment, setCourierComment] = useState('')
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [newAddress, setNewAddress] = useState({
        city: '',
        street: '',
        house: '',
        apartment: '',
        entrance: '',
        floor: '',
        intercom: ''
    })

    const timeSlots = [
        '09:00 - 11:00',
        '11:00 - 13:00',
        '13:00 - 15:00',
        '15:00 - 17:00',
        '17:00 - 19:00',
        '19:00 - 21:00'
    ]

    const token = localStorage.getItem('token')
    const isLoggedIn = !!token

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        loadCheckoutData()
        loadCart()
    }, [])

    const loadCheckoutData = async () => {
        try {
            const response = await fetch('/house-goods/api/orders/create', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setAddresses(data.addresses || [])
                setPaymentMethods(data.paymentMethods || [])
                if (data.addresses?.length > 0) {
                    setSelectedAddressId(data.addresses[0].addressId)
                }
                if (data.paymentMethods?.length > 0) {
                    setSelectedPaymentCode(data.paymentMethods[0].code)
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки данных для оформления:', error)
        }
    }

    const loadCart = async () => {
        try {
            const response = await fetch('/house-goods/api/baskets/my', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setCartItems(data.items || [])
                const total = (data.items || []).reduce((sum, item) => sum + (item.price * item.quantity), 0)
                setTotalPrice(total)
            }
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value })
    }

    const addNewAddress = async () => {
        alert('Добавление адреса - в разработке')
        setShowAddressForm(false)
    }

    const getPaymentIconUrl = (iconUrl) => {
        if (!iconUrl) return null
        return `/house-goods${iconUrl}`
    }

    const handleSubmitOrder = async () => {
        if (!selectedAddressId && !showAddressForm) {
            alert('Выберите адрес доставки')
            return
        }
        if (!selectedPaymentCode) {
            alert('Выберите способ оплаты')
            return
        }
        if (!selectedTimeSlot) {
            alert('Выберите время доставки')
            return
        }

        setSubmitting(true)
        try {
            const [fromTime, toTime] = selectedTimeSlot.split(' - ')

            const orderData = {
                codePayment: selectedPaymentCode,
                deliveryInfo: {
                    addressId: selectedAddressId,
                    deliveryTimeFrom: fromTime + ':00',
                    deliveryTimeTo: toTime + ':00',
                    courierComment: courierComment || null,
                    deliveryStatus: 'PENDING'
                }
            }

            const response = await fetch('/house-goods/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            })

            if (response.ok) {
                // ПРИНУДИТЕЛЬНО ОЧИЩАЕМ КОРЗИНУ НА ФРОНТЕ
                setCartItems([])
                setTotalPrice(0)

                // Очищаем localStorage
                localStorage.removeItem('cart')

                // Отправляем событие для обновления счетчика в хедере
                window.dispatchEvent(new Event('cartUpdated'))

                alert('Заказ успешно оформлен!')

                // Даем время на обновление состояния и переходим
                setTimeout(() => {
                    navigate('/orders')
                }, 100)
            } else {
                const error = await response.json()
                alert('Ошибка при оформлении заказа: ' + (error.message || 'Попробуйте позже'))
            }
        } catch (error) {
            console.error('Ошибка:', error)
            alert('Не удалось оформить заказ')
        } finally {
            setSubmitting(false)
        }
    }

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    }

    if (loading) {
        return (
            <div className="checkout-page">
                <div className="checkout-container">
                    <div className="checkout-loading">
                        <div className="loading-spinner"></div>
                        <p>Загрузка...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-breadcrumb">
                    <button onClick={() => navigate('/')} className="breadcrumb-link">Главная</button>
                    <span className="breadcrumb-separator">/</span>
                    <button onClick={() => navigate('/cart')} className="breadcrumb-link">Корзина</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-active">Оформление заказа</span>
                </div>

                <h1 className="checkout-title">Оформление заказа</h1>

                <div className="checkout-content">
                    <div className="checkout-left">
                        {/* Адрес доставки */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <span className="section-icon">📍</span>
                                <h2>Адрес доставки</h2>
                            </div>
                            {addresses.length > 0 && !showAddressForm && (
                                <div className="address-list">
                                    {addresses.map(addr => (
                                        <label key={addr.addressId} className={`address-item ${selectedAddressId === addr.addressId ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="address"
                                                value={addr.addressId}
                                                checked={selectedAddressId === addr.addressId}
                                                onChange={() => setSelectedAddressId(addr.addressId)}
                                            />
                                            <div className="address-details">
                                                <strong>{addr.city}, ул. {addr.street}, д. {addr.house}</strong>
                                                {(addr.apartment || addr.entrance || addr.floor || addr.intercom) && (
                                                    <div className="address-extras">
                                                        {addr.apartment && <span>кв. {addr.apartment}</span>}
                                                        {addr.entrance && <span>под. {addr.entrance}</span>}
                                                        {addr.floor && <span>эт. {addr.floor}</span>}
                                                        {addr.intercom && <span>дом. {addr.intercom}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                    <button className="add-address-btn" onClick={() => setShowAddressForm(true)}>
                                        + Добавить новый адрес
                                    </button>
                                </div>
                            )}

                            {showAddressForm && (
                                <div className="address-form">
                                    <div className="form-row">
                                        <input type="text" name="city" placeholder="Город" value={newAddress.city} onChange={handleAddressChange} className="form-input" />
                                        <input type="text" name="street" placeholder="Улица" value={newAddress.street} onChange={handleAddressChange} className="form-input" />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" name="house" placeholder="Дом" value={newAddress.house} onChange={handleAddressChange} className="form-input" />
                                        <input type="text" name="apartment" placeholder="Квартира" value={newAddress.apartment} onChange={handleAddressChange} className="form-input" />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" name="entrance" placeholder="Подъезд" value={newAddress.entrance} onChange={handleAddressChange} className="form-input" />
                                        <input type="text" name="floor" placeholder="Этаж" value={newAddress.floor} onChange={handleAddressChange} className="form-input" />
                                        <input type="text" name="intercom" placeholder="Домофон" value={newAddress.intercom} onChange={handleAddressChange} className="form-input" />
                                    </div>
                                    <div className="form-buttons">
                                        <button onClick={addNewAddress} className="save-address-btn">Сохранить</button>
                                        <button onClick={() => setShowAddressForm(false)} className="cancel-address-btn">Отмена</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Время доставки */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <span className="section-icon">⏰</span>
                                <h2>Время доставки</h2>
                            </div>
                            <div className="time-slots">
                                {timeSlots.map(slot => (
                                    <button
                                        key={slot}
                                        className={`time-slot-btn ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder="Комментарий курьеру (необязательно)"
                                value={courierComment}
                                onChange={(e) => setCourierComment(e.target.value)}
                                className="comment-input"
                                rows="2"
                            />
                        </div>

                        {/* Способы оплаты */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <span className="section-icon">💳</span>
                                <h2>Способ оплаты</h2>
                            </div>
                            <div className="payment-list">
                                {paymentMethods.map(method => (
                                    <label key={method.code} className={`payment-item ${selectedPaymentCode === method.code ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.code}
                                            checked={selectedPaymentCode === method.code}
                                            onChange={() => setSelectedPaymentCode(method.code)}
                                        />
                                        {method.iconUrl ? (
                                            <img
                                                src={getPaymentIconUrl(method.iconUrl)}
                                                alt={method.name}
                                                className="payment-icon-img"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : null}
                                        <span className="payment-icon-fallback" style={{ display: method.iconUrl ? 'none' : 'flex' }}>
                                            💳
                                        </span>
                                        <div className="payment-details">
                                            <span className="payment-name">{method.name}</span>
                                            <span className="payment-desc">{method.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="checkout-right">
                        <div className="order-summary">
                            <div className="summary-header">
                                <span className="summary-icon">🛒</span>
                                <h2>Ваш заказ</h2>
                            </div>
                            <div className="order-items">
                                {cartItems.map(item => (
                                    <div key={item.itemId} className="order-item">
                                        <div className="order-item-info">
                                            <span className="order-item-name">{item.name}</span>
                                            <span className="order-item-quantity">× {item.quantity}</span>
                                        </div>
                                        <span className="order-item-price">{(item.price * item.quantity).toLocaleString()} ₽</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <div className="total-row">
                                    <span>Товары ({getTotalItems()} шт.)</span>
                                    <span>{totalPrice.toLocaleString()} ₽</span>
                                </div>
                                <div className="total-row delivery">
                                    <span>Доставка</span>
                                    <span>Бесплатно</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Итого к оплате</span>
                                    <span>{totalPrice.toLocaleString()} ₽</span>
                                </div>
                            </div>
                            <button onClick={handleSubmitOrder} disabled={submitting} className="submit-order-btn">
                                {submitting ? 'Оформление...' : 'Оформить заказ'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage