import React, { useState } from 'react'
import './CategoryCard.css'

function CategoryCard({ category, onClick }) {
    const [imgError, setImgError] = useState(false)

    // Правильный путь к картинке
    const imageUrl = category.imageURl && !imgError
        ? `/house-goods${category.imageURl}`  // /images/... → /house-goods/static/images/...
        : null

    return (
        <div className="category-card" onClick={() => onClick(category)}>
            <div className="card-image">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={category.title}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="card-placeholder">
                        <span>🏠</span>
                    </div>
                )}
            </div>
            <div className="card-info">
                <h3>{category.title}</h3>
                {category.description && <p>{category.description}</p>}
                <span className="card-link">
          {category.hasChildren ? 'Перейти в раздел' : 'Смотреть товары'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
            </div>
        </div>
    )
}

export default CategoryCard