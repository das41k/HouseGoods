import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductSlider.css'

function ProductSlider({ products, onProductClick }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsToShow, setItemsToShow] = useState(4)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 480) setItemsToShow(1)
            else if (width < 768) setItemsToShow(2)
            else if (width < 1024) setItemsToShow(3)
            else setItemsToShow(4)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!products || products.length === 0) return null

    const maxIndex = Math.max(0, products.length - itemsToShow)
    const visibleProducts = products.slice(currentIndex, currentIndex + itemsToShow)

    return (
        <div className="product-slider">
            <div className="product-slider-container">
                <button
                    className="slider-nav prev"
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>

                <div className="product-slider-track">
                    {visibleProducts.map((product, idx) => (
                        <div key={idx} className="product-slide">
                            <ProductCard product={product} onClick={onProductClick} />
                        </div>
                    ))}
                </div>

                <button
                    className="slider-nav next"
                    onClick={() => setCurrentIndex(Math.min(maxIndex, currentIndex + 1))}
                    disabled={currentIndex === maxIndex}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>

            {maxIndex > 0 && (
                <div className="slider-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${currentIndex === idx ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductSlider