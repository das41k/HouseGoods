import React, { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product, onClick }) {
    const [imgError, setImgError] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    const discountPercent = product.basePrice && product.salePrice
        ? Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)
        : 0

    const imageUrl = !imgError
        ? `/house-goods/static/images/products/${product.sku}.jpg`
        : null

    return (
        <div
            className="product-card-container"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`product-card ${isFlipped ? 'flipped' : ''}`}>
                {/* Передняя сторона */}
                <div className="product-card-front">
                    {discountPercent > 0 && (
                        <div className="product-discount-badge">-{discountPercent}%</div>
                    )}

                    <div className="product-image-wrapper">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="product-image"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="product-image-placeholder">📦</div>
                        )}
                    </div>

                    <div className="product-info">
                        <h3 className="product-title">{product.name}</h3>

                        {product.category && (
                            <div className="product-category">
                                <span className="category-label">Категория:</span>
                                <span className="category-value">{product.category.name}</span>
                            </div>
                        )}

                        {product.brand && (
                            <div className="product-brand">
                                <svg className="brand-icon" width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 7L12 12L4 7M20 7V17L12 22L4 17V7M20 7L12 2L4 7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                </svg>
                                <span className="brand-name">{product.brand.name}</span>
                            </div>
                        )}

                        <div className="product-prices">
                            {product.salePrice ? (
                                <>
                                    <span className="product-sale-price">
                                        {Number(product.salePrice).toLocaleString()} ₽
                                    </span>
                                    <span className="product-old-price">
                                        {Number(product.basePrice).toLocaleString()} ₽
                                    </span>
                                </>
                            ) : (
                                <span className="product-price">
                                    {Number(product.basePrice).toLocaleString()} ₽
                                </span>
                            )}
                        </div>

                        <div className="product-stock-info">
                            {product.count > 0 ? (
                                <div className="product-stock in-stock">
                                    <span className="stock-icon">✓</span>
                                    В наличии: {product.count} шт.
                                </div>
                            ) : (
                                <div className="product-stock out-of-stock">
                                    <span className="stock-icon">✗</span>
                                    Нет в наличии
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Задняя сторона - характеристики */}
                <div className="product-card-back">
                    <div className="product-back-content">
                        <h4>Характеристики</h4>

                        {product.description && (
                            <div className="product-back-description">
                                <strong>Описание:</strong>
                                <p>{product.description}</p>
                            </div>
                        )}

                        <div className="product-specs">
                            {product.weightKg && (
                                <div className="spec-item">
                                    <span className="spec-label">Вес:</span>
                                    <span className="spec-value">{product.weightKg} кг</span>
                                </div>
                            )}

                            {(product.lengthCm || product.widthCm || product.heightCm) && (
                                <div className="spec-item">
                                    <span className="spec-label">Размеры:</span>
                                    <span className="spec-value">
                                        {product.lengthCm}×{product.widthCm}×{product.heightCm} см
                                    </span>
                                </div>
                            )}

                            {product.attributes && product.attributes.length > 0 && (
                                <>
                                    {product.attributes.slice(0, 3).map((attr, idx) => (
                                        <div key={idx} className="spec-item">
                                            <span className="spec-label">{attr.attributeName}:</span>
                                            <span className="spec-value">{attr.value}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <button
                            className="product-details-btn"
                            onClick={(e) => {
                                e.stopPropagation()
                                onClick(product)
                            }}
                        >
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard