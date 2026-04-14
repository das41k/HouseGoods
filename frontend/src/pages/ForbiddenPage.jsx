import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ErrorPages.css'

function ForbiddenPage() {
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
                    <div className="error-code">403</div>
                    <div className="error-icon">🔒</div>
                    <h1>Доступ запрещен</h1>
                    <p>У вас нет прав для доступа к этой странице.</p>
                    <p className="error-hint">Пожалуйста, войдите в аккаунт или обратитесь к администратору.</p>
                    <div className="error-buttons">
                        <button onClick={() => navigate('/')} className="error-btn primary">
                            На главную
                        </button>
                        <button onClick={() => navigate('/login')} className="error-btn secondary">
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForbiddenPage