import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './OrderDetailsPage.css'

function OrderDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchOrderDetails()
    }, [id])

    const fetchOrderDetails = async () => {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        try {
            const response = await fetch(`/house-goods/api/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            // 401 - не авторизован → на логин
            if (response.status === 401) {
                navigate('/login')
                return
            }

            // 403 - нет прав (чужой заказ) → на страницу 403
            if (response.status === 403) {
                navigate('/403')
                return
            }

            if (response.status === 404) {
                navigate('/404')
                return
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`)
            }

            const data = await response.json()
            setOrder(data)
        } catch (error) {
            console.error('Ошибка загрузки заказа:', error)
            setError('Не удалось загрузить информацию о заказе')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Дата не указана'
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
        navigate('/orders')
    }

    if (loading) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Загрузка информации о заказе...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="error-state">
                        <div className="error-icon">⚠️</div>
                        <h2>Ошибка</h2>
                        <p>{error}</p>
                        <button onClick={fetchOrderDetails} className="retry-btn">Повторить</button>
                        <button onClick={goBack} className="back-btn">Вернуться к заказам</button>
                    </div>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h2>Заказ не найден</h2>
                        <button onClick={goBack} className="back-btn">Вернуться к заказам</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="order-details-page">
            <div className="order-details-container">
                {/* Хлебные крошки */}
                <div className="order-breadcrumb">
                    <button onClick={() => navigate('/')} className="breadcrumb-link">Главная</button>
                    <span className="breadcrumb-separator">/</span>
                    <button onClick={() => navigate('/orders')} className="breadcrumb-link">Мои заказы</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-active">Заказ #{id}</span>
                </div>

                {/* Заголовок */}
                <div className="order-header">
                    <div className="order-header-left">
                        <h1 className="order-title">Заказ #{order.orderId || id}</h1>
                        <div className={`order-status-large ${getDeliveryStatusClass(order.deliveryInfo?.deliveryStatus)}`}>
                            <span className="status-icon">{getDeliveryStatusIcon(order.deliveryInfo?.deliveryStatus)}</span>
                            <span className="status-text">{getDeliveryStatusText(order.deliveryInfo?.deliveryStatus)}</span>
                        </div>
                    </div>
                    <div className="order-header-right">
                        <div className="order-date-large">
                            <span className="date-icon">📅</span>
                            <span className="date-text">{formatDate(order.orderDate)}</span>
                        </div>
                    </div>
                </div>

                <div className="order-content">
                    {/* Информация о доставке */}
                    {order.deliveryInfo && (
                        <div className="info-card delivery-card">
                            <div className="card-header">
                                <div className="card-icon">📍</div>
                                <h2>Информация о доставке</h2>
                            </div>
                            <div className="delivery-address-full">
                                <div className="address-line">
                                    <span className="address-label">Адрес доставки:</span>
                                    <span className="address-value">
                                        {order.deliveryInfo.city},
                                        ул. {order.deliveryInfo.street},
                                        д. {order.deliveryInfo.house}
                                        {order.deliveryInfo.apartment && `, кв. ${order.deliveryInfo.apartment}`}
                                    </span>
                                </div>
                                <div className="address-details-grid">
                                    {order.deliveryInfo.entrance && (
                                        <div className="detail-item">
                                            <span className="detail-label">Подъезд:</span>
                                            <span className="detail-value">{order.deliveryInfo.entrance}</span>
                                        </div>
                                    )}
                                    {order.deliveryInfo.floor && (
                                        <div className="detail-item">
                                            <span className="detail-label">Этаж:</span>
                                            <span className="detail-value">{order.deliveryInfo.floor}</span>
                                        </div>
                                    )}
                                    {order.deliveryInfo.intercom && (
                                        <div className="detail-item">
                                            <span className="detail-label">Домофон:</span>
                                            <span className="detail-value">{order.deliveryInfo.intercom}</span>
                                        </div>
                                    )}
                                </div>
                                {order.deliveryInfo.deliveryTimeFrom && order.deliveryInfo.deliveryTimeTo && (
                                    <div className="delivery-time-full">
                                        <span className="time-icon">⏰</span>
                                        <span className="time-text">
                                            Желаемое время доставки: {order.deliveryInfo.deliveryTimeFrom.substring(0, 5)} - {order.deliveryInfo.deliveryTimeTo.substring(0, 5)}
                                        </span>
                                    </div>
                                )}
                                {order.deliveryInfo.courierComment && (
                                    <div className="courier-comment-full">
                                        <span className="comment-icon">💬</span>
                                        <span className="comment-text">Комментарий курьеру: {order.deliveryInfo.courierComment}</span>
                                    </div>
                                )}
                            </div>
                            {order.deliveryAmount > 0 && (
                                <div className="delivery-cost-full">
                                    <span>Стоимость доставки:</span>
                                    <strong>{formatPrice(order.deliveryAmount)}</strong>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Товары в заказе */}
                    <div className="info-card products-card">
                        <div className="card-header">
                            <div className="card-icon">🛍️</div>
                            <h2>Товары в заказе</h2>
                            <span className="products-count">{order.products?.length || 0} позиции</span>
                        </div>
                        <div className="products-list">
                            {order.products?.map((product, idx) => (
                                <div key={idx} className="product-item">
                                    <div className="product-image">
                                        {product.imgURl ? (
                                            <img src={`/house-goods${product.imgURl}`} alt={product.name} />
                                        ) : (
                                            <div className="product-image-placeholder">📦</div>
                                        )}
                                    </div>
                                    <div className="product-details">
                                        <h3 className="product-name">{product.name}</h3>
                                        <div className="product-sku">Артикул: {product.sku}</div>
                                        <div className="product-meta">
                                            <span className="product-quantity">Количество: {product.quantity} шт.</span>
                                            <span className="product-price">{formatPrice(product.price)}</span>
                                        </div>
                                    </div>
                                    <div className="product-total">
                                        <span className="total-label">Сумма</span>
                                        <span className="total-value">{formatPrice(product.price * product.quantity)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Стоимость */}
                    <div className="info-card summary-card">
                        <div className="card-header">
                            <div className="card-icon">💰</div>
                            <h2>Стоимость заказа</h2>
                        </div>
                        <div className="summary-breakdown">
                            <div className="summary-row">
                                <span>Товары ({order.products?.length || 0} шт.)</span>
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

                    {/* Способ оплаты - с иконкой из paymentMethodURl */}
                    {order.paymentMethodTitle && (
                        <div className="info-card payment-card">
                            <div className="card-header">
                                <div className="payment-icon-wrapper">
                                    {order.paymentMethodURl ? (
                                        <img
                                            src={`/house-goods${order.paymentMethodURl}`}
                                            alt={order.paymentMethodTitle}
                                            className="payment-icon-img"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.style.display = 'none'
                                                const fallback = e.target.nextSibling
                                                if (fallback) fallback.style.display = 'flex'
                                            }}
                                        />
                                    ) : null}
                                    <span className="payment-icon-fallback" style={{ display: order.paymentMethodURl ? 'none' : 'flex' }}>
                                        💳
                                    </span>
                                </div>
                                <h2>Способ оплаты</h2>
                            </div>
                            <div className="payment-info">
                                <div className="payment-method-title">
                                    {order.paymentMethodTitle}
                                </div>
                                {order.paymentMethodURl && (
                                    <div className="payment-hint">
                                        🔒 Оплата производится через защищенный шлюз
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Кнопки действий */}
                <div className="order-actions">
                    <button onClick={goBack} className="action-btn secondary">
                        ← Вернуться к заказам
                    </button>
                    <button onClick={() => navigate('/')} className="action-btn primary">
                        Продолжить покупки
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage