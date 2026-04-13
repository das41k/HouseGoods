import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPages.css'

function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const normalizePhone = (phone) => {
        let digits = phone.replace(/\D/g, '')
        if (digits.startsWith('8') && digits.length === 11) {
            digits = '7' + digits.slice(1)
        }
        if (digits.startsWith('7') && digits.length === 11) {
            digits = '+' + digits
        }
        if (digits.startsWith('9') && digits.length === 10) {
            digits = '+7' + digits
        }
        return digits
    }

    const isEmail = (str) => {
        return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(str)
    }

    const validateForm = () => {
        if (!formData.login.trim()) {
            setError('Введите email или номер телефона')
            return false
        }
        if (!formData.password) {
            setError('Введите пароль')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            let loginValue = formData.login.trim()

            if (!isEmail(loginValue)) {
                loginValue = normalizePhone(loginValue)
            }

            const response = await fetch('/house-goods/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: loginValue,
                    password: formData.password
                })
            })

            let data
            try {
                data = await response.json()
            } catch {
                data = { message: 'Ошибка сервера' }
            }

            if (!response.ok) {
                throw new Error(data.message || 'Неверный логин или пароль')
            }

            // Сохраняем данные пользователя
            localStorage.setItem('token', data.token)
            localStorage.setItem('userLogin', data.username || data.email || data.phone)
            localStorage.setItem('userName', data.username || '')
            localStorage.setItem('userEmail', data.email || '')
            localStorage.setItem('userPhone', data.phone || '')
            localStorage.setItem('userRole', data.role || 'USER')

            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
                <div className="bg-circle bg-circle-4"></div>
                <div className="bg-dots"></div>
            </div>

            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                        </div>
                        <h1>Добро пожаловать!</h1>
                        <p>Войдите в свой аккаунт</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email или номер телефона</label>
                            <div className="input-wrapper">
                                <span className="input-icon">📧</span>
                                <input
                                    type="text"
                                    name="login"
                                    value={formData.login}
                                    onChange={handleChange}
                                    placeholder="example@mail.com или +7 (999) 123-45-67"
                                    className="auth-input"
                                />
                            </div>
                            <small className="form-hint">
                                Телефон можно вводить в любом формате: +7 953 837-86-36, 89538378636, 9538378636
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Пароль</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Введите пароль"
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="auth-btn"
                        >
                            {loading ? (
                                <span className="btn-loader">
                                    <span className="loader-dot"></span>
                                    <span className="loader-dot"></span>
                                    <span className="loader-dot"></span>
                                </span>
                            ) : (
                                'Войти'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Нет аккаунта?{' '}
                            <Link to="/register" className="auth-link">
                                Зарегистрироваться
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage