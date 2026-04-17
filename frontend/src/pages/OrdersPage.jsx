import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './OrdersPage.css'

function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        try {
            const response = await fetch('/house-goods/api/orders/my', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 401 || response.status === 403) {
                navigate('/login')
                return
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`)
            }

            const data = await response.json()
            setOrders(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Ошибка загрузки заказов:', error)
            setError('Не удалось загрузить заказы')
        } finally {
            setLoading(false)
        }
    }

    const handleOrderClick = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId)
    }

    const handleViewOrder = (orderId) => {
        navigate(`/order/${orderId}`)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Дата не указана'
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const formatPrice = (price) => {
        return Number(price).toLocaleString('ru-RU') + ' ₽'
    }

    const getDeliveryStatusText = (status) => {
        const statuses = {
            'PENDING': 'Ожидает обработки',
            'IN_TRANSIT': 'В пути',
            'DELIVERED': 'Доставлен',
            'RETURNED': 'Возвращен'
        }
        return statuses[status] || status || 'В обработке'
    }

    const getDeliveryStatusClass = (status) => {
        const classes = {
            'PENDING': 'status-pending',
            'IN_TRANSIT': 'status-transit',
            'DELIVERED': 'status-delivered',
            'RETURNED': 'status-returned'
        }
        return classes[status] || 'status-pending'
    }

    const getDeliveryStatusIcon = (status) => {
        const icons = {
            'PENDING': '⏳',
            'IN_TRANSIT': '🚚',
            'DELIVERED': '✅',
            'RETURNED': '↩️'
        }
        return icons[status] || '📦'
    }

    const goBack = () => {
        navigate('/')
    }

    if (error) {
        return (
            <div className="orders-page">
                <div className="orders-container">
                    <div className="orders-error">
                        <div className="error-icon">⚠️</div>
                        <h2>Ошибка</h2>
                        <p>{error}</p>
                        <button onClick={fetchOrders} className="retry-btn">Повторить</button>
                        <button onClick={goBack} className="back-btn-error">На главную</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="orders-page">
            <div className="orders-container">
                {/* Хлебные крошки */}
                <div className="orders-breadcrumb">
                    <button onClick={goBack} className="breadcrumb-link">Главная</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-active">Мои заказы</span>
                </div>

                <div className="orders-header">
                    <h1 className="orders-title">Мои заказы</h1>
                    <span className="orders-count">Всего заказов: {orders.length}</span>
                </div>

                {loading ? (
                    <div className="orders-loading">
                        <div className="loading-spinner"></div>
                        <p>Загрузка заказов...</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="orders-accordion">
                        {orders.map((order, index) => (
                            <div
                                key={order.orderId}
                                className={`accordion-item ${expandedOrder === order.orderId ? 'expanded' : ''}`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div
                                    className="accordion-header"
                                    onClick={() => handleOrderClick(order.orderId)}
                                >
                                    <div className="accordion-header-left">
                                        <div className="order-badge">
                                            <span className="badge-number">#{order.orderId}</span>
                                        </div>
                                        <div className="order-info">
                                            <span className="order-date-label">Заказ от</span>
                                            <span className="order-date">{formatDate(order.orderDate)}</span>
                                        </div>
                                    </div>
                                    <div className="accordion-header-right">
                                        <div className="order-price">
                                            <span className="price-label">Сумма</span>
                                            <span className="price-value">{formatPrice(order.totalAmount)}</span>
                                        </div>
                                        <div className={`order-status-badge ${getDeliveryStatusClass(order.deliveryInfo?.deliveryStatus)}`}>
                                            <span className="status-icon">{getDeliveryStatusIcon(order.deliveryInfo?.deliveryStatus)}</span>
                                            <span className="status-text">{getDeliveryStatusText(order.deliveryInfo?.deliveryStatus)}</span>
                                        </div>
                                        <div className="accordion-icon">
                                            <svg className={`chevron ${expandedOrder === order.orderId ? 'rotated' : ''}`}
                                                 width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-content">
                                    <div className="content-inner">
                                        {/* Информация о доставке */}
                                        {order.deliveryInfo && (
                                            <div className="delivery-card">
                                                <div className="card-header">
                                                    <div className="card-icon">📍</div>
                                                    <h3>Информация о доставке</h3>
                                                </div>
                                                <div className="delivery-address">
                                                    <div className="address-line">
                                                        <span className="address-label">Адрес доставки:</span>
                                                        <span className="address-value">
                                                            {order.deliveryInfo.city},
                                                            ул. {order.deliveryInfo.street},
                                                            д. {order.deliveryInfo.house}
                                                            {order.deliveryInfo.apartment && `, кв. ${order.deliveryInfo.apartment}`}
                                                        </span>
                                                    </div>
                                                    <div className="address-details">
                                                        {order.deliveryInfo.entrance && (
                                                            <span className="detail-chip">Подъезд: {order.deliveryInfo.entrance}</span>
                                                        )}
                                                        {order.deliveryInfo.floor && (
                                                            <span className="detail-chip">Этаж: {order.deliveryInfo.floor}</span>
                                                        )}
                                                        {order.deliveryInfo.intercom && (
                                                            <span className="detail-chip">Домофон: {order.deliveryInfo.intercom}</span>
                                                        )}
                                                    </div>
                                                    {order.deliveryInfo.deliveryTimeFrom && order.deliveryInfo.deliveryTimeTo && (
                                                        <div className="delivery-time">
                                                            <span className="time-icon">⏰</span>
                                                            <span className="time-text">
                                                                Время доставки: {order.deliveryInfo.deliveryTimeFrom.substring(0, 5)} - {order.deliveryInfo.deliveryTimeTo.substring(0, 5)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {order.deliveryInfo.courierComment && (
                                                        <div className="courier-comment">
                                                            <span className="comment-icon">💬</span>
                                                            <span className="comment-text">Комментарий курьеру: {order.deliveryInfo.courierComment}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {order.deliveryAmount > 0 && (
                                                    <div className="delivery-cost">
                                                        <span>Стоимость доставки:</span>
                                                        <strong>{formatPrice(order.deliveryAmount)}</strong>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Итого */}
                                        <div className="summary-card">
                                            <div className="card-header">
                                                <div className="card-icon">💰</div>
                                                <h3>Итоговая стоимость</h3>
                                            </div>
                                            <div className="summary-items">
                                                <div className="summary-row">
                                                    <span>Сумма заказа</span>
                                                    <span>{formatPrice(order.totalAmount)}</span>
                                                </div>
                                                {order.deliveryAmount > 0 && (
                                                    <div className="summary-row">
                                                        <span>Доставка</span>
                                                        <span>{formatPrice(order.deliveryAmount)}</span>
                                                    </div>
                                                )}
                                                <div className="summary-row total">
                                                    <span>Итого к оплате</span>
                                                    <span className="total-price">{formatPrice(order.totalAmount + (order.deliveryAmount || 0))}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Кнопка перехода к деталям */}
                                        <button
                                            className="view-order-btn"
                                            onClick={() => handleViewOrder(order.orderId)}
                                        >
                                            <span>Подробнее о заказе</span>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="orders-empty">
                        <div className="empty-animation">
                            <div className="empty-icon">📦</div>
                            <div className="empty-dots"></div>
                        </div>
                        <h3>У вас пока нет заказов</h3>
                        <p>Начните покупки в нашем магазине</p>
                        <button onClick={goBack} className="empty-back-btn">
                            Перейти в каталог
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersPage