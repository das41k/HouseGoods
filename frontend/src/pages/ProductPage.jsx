import React from 'react'
import { useParams } from 'react-router-dom'
import './Pages.css'

function ProductPage() {
    const { sku } = useParams()

    return (
        <div className="page-container">
            <div className="product-page">
                <h1>Товар {sku}</h1>
                <p>Страница товара в разработке</p>
            </div>
        </div>
    )
}

export default ProductPage