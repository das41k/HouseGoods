import React, { useState, useEffect } from 'react'
import BrandCard from '../BrandCard/BrandCard'
import './BrandSlider.css'

function BrandSlider({ brands, onBrandClick }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsToShow, setItemsToShow] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) setItemsToShow(1)
            else if (width < 900) setItemsToShow(2)
            else setItemsToShow(3)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!brands || brands.length === 0) return null

    const maxIndex = Math.max(0, brands.length - itemsToShow)
    const visibleBrands = brands.slice(currentIndex, currentIndex + itemsToShow)

    return (
        <div className="brand-slider">
            <div className="brand-slider-container">
                <button
                    className="slider-nav prev"
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>

                <div className="brand-slider-track">
                    {visibleBrands.map((brand, idx) => (
                        <div key={idx} className="brand-slide">
                            <BrandCard brand={brand} onClick={onBrandClick} />
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

            <div className="slider-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`dot ${currentIndex === idx ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>
    )
}

export default BrandSlider