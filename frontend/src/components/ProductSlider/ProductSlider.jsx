import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductSlider.css'

function ProductSlider({ products, onProductClick }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsToShow, setItemsToShow] = useState(4)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) setItemsToShow(1)
            else if (width < 900) setItemsToShow(2)
            else if (width < 1200) setItemsToShow(3)
            else setItemsToShow(4)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!products || products.length === 0) {
        return (
            <div className="products-slider">
                <div className="products-slider-header">
                    <h2>🔥 Товары со скидкой</h2>
                    <p>Нет товаров со скидкой</p>
                </div>
            </div>
        )
    }

    const maxIndex = Math.max(0, products.length - itemsToShow)
    const visibleProducts = products.slice(currentIndex, currentIndex + itemsToShow)

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    return (
        <div className="products-slider">
            <div className="products-slider-header">
                <div>
                    <h2>🔥 Товары со скидкой</h2>
                    <p>Успей купить по выгодной цене</p>
                </div>

                <div className="products-slider-nav">
                    <button
                        className="slider-nav-btn prev"
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>

                    <span className="slider-counter">
            {currentIndex + 1} / {maxIndex + 1}
          </span>

                    <button
                        className="slider-nav-btn next"
                        onClick={nextSlide}
                        disabled={currentIndex === maxIndex}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="products-slider-track">
                {visibleProducts.map((product, idx) => (
                    <div key={idx} className="products-slide">
                        <ProductCard product={product} onClick={onProductClick} />
                    </div>
                ))}
            </div>

            {maxIndex > 0 && (
                <div className="products-slider-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductSlider