import React, { useState, useEffect } from 'react'
import './CountryGrid.css'

function CountryGrid({ countries, onCountryClick }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    if (!countries || countries.length === 0) {
        return null
    }

    return (
        <div className={`countries-grid-container ${isVisible ? 'visible' : ''}`}>
            <div className="countries-grid">
                {countries.map((country, idx) => (
                    <div
                        key={idx}
                        className="country-card"
                        onClick={() => onCountryClick(country)}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                        <div className="country-circle">
                            <div className="country-flag-wrapper">
                                {country.imageURl ? (
                                    <img
                                        src={`/house-goods${country.imageURl}`}
                                        alt={country.name}
                                        className="country-flag"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.parentElement.querySelector('.country-flag-fallback').style.display = 'flex'
                                        }}
                                    />
                                ) : null}
                                <div className="country-flag-fallback" style={{ display: country.imageURl ? 'none' : 'flex' }}>
                                    🌍
                                </div>
                            </div>
                        </div>
                        <div className="country-info">
                            <h3 className="country-name">{country.name}</h3>
                            {country.code && (
                                <span className="country-code">{country.code}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CountryGrid