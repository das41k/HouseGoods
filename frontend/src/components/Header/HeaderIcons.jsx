import React from 'react'
import './HeaderIcons.css'

function HeaderIcons() {
    return (
        <div className="header-icons">
            <button className="icon-btn" aria-label="Избранное">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                    />
                </svg>
                <span className="icon-badge">0</span>
            </button>

            <button className="icon-btn" aria-label="Корзина">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20Z" fill="currentColor"/>
                    <path d="M18 20C18 20.5523 17.5523 21 17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19C17.5523 19 18 19.4477 18 20Z" fill="currentColor"/>
                    <path d="M2 2H4L7 16H19" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M7 16L20 13L22 6H5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <span className="icon-badge">2</span>
            </button>

            <button className="icon-btn" aria-label="Войти">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
            </button>
        </div>
    )
}

export default HeaderIcons