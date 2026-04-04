import React, { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product, onClick }) {
    const [imgError, setImgError] = useState(false)

    const discountPercent = product.basePrice && product.salePrice
        ? Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)
        : 0

    const imageUrl = !imgError
        ? `/house-goods/static/images/products/${product.sku}.jpg`
        : null

    return (
        <div className="product-card" onClick={() => onClick(product)}>
            {discountPercent > 0 && (
                <div className="product-discount-badge">
                    -{discountPercent}%
                </div>
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
                    <div className="product-image-placeholder">
                        📦
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>

                {product.brand && (
                    <div className="product-brand">{product.brand.name}</div>
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

                {product.count > 0 ? (
                    <div className="product-stock in-stock">В наличии</div>
                ) : (
                    <div className="product-stock out-of-stock">Нет в наличии</div>
                )}
            </div>
        </div>
    )
}

export default ProductCard