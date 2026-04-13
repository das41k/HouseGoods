import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ErrorPages.css'

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="error-page">
            <div className="error-bg">
                <div className="error-circle error-circle-1"></div>
                <div className="error-circle error-circle-2"></div>
                <div className="error-circle error-circle-3"></div>
                <div className="error-dots"></div>
            </div>

            <div className="error-container">
                <div className="error-card">
                    <div className="error-code">404</div>
                    <div className="error-icon">🔍</div>
                    <h1>Страница не найдена</h1>
                    <p>Извините, страница, которую вы ищете, не существует или была перемещена.</p>
                    <div className="error-buttons">
                        <button onClick={() => navigate('/')} className="error-btn primary">
                            На главную
                        </button>
                        <button onClick={() => navigate(-1)} className="error-btn secondary">
                            Вернуться назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage