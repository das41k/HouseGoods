import React, { useState } from 'react'
import './BrandCard.css'

function BrandCard({ brand, onClick }) {
    const [imgError, setImgError] = useState(false)
    const [flagError, setFlagError] = useState(false)

    const imageUrl = brand.imageURl && !imgError
        ? `/house-goods${brand.imageURl}`
        : null

    const flagUrl = brand.countryResponse?.imageURl && !flagError
        ? `/house-goods${brand.countryResponse.imageURl}`
        : null

    return (
        <div className="brand-card" onClick={() => onClick(brand)}>
            <div className="brand-logo">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={brand.name}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="brand-logo-placeholder">🏷️</div>
                )}
            </div>

            <div className="brand-details">
                <h3 className="brand-title">{brand.name}</h3>
                <div className="brand-country-info">
                    {flagUrl ? (
                        <img
                            src={flagUrl}
                            alt={brand.countryResponse.name}
                            className="brand-flag"
                        />
                    ) : (
                        <span className="brand-flag-placeholder">🌍</span>
                    )}
                    <span>{brand.countryResponse?.name}</span>
                </div>
            </div>

            <div className="brand-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        </div>
    )
}

export default BrandCard