import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPages.css'

function RegisterPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        patronymic: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' })

    const validateName = (name, fieldName) => {
        if (!name.trim()) {
            return `${fieldName} обязательно`
        }
        if (name.trim().length < 2) {
            return `${fieldName} должно содержать минимум 2 символа`
        }
        if (!/^[а-яА-ЯёЁa-zA-Z-]+$/.test(name.trim())) {
            return `${fieldName} должно содержать только буквы и дефис`
        }
        return ''
    }

    const validateEmail = (email) => {
        if (!email.trim()) {
            return 'Email обязателен'
        }
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
        if (!emailRegex.test(email)) {
            return 'Введите корректный email'
        }
        return ''
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

    const validatePhone = (phone) => {
        if (!phone.trim()) {
            return 'Номер телефона обязателен'
        }
        const digits = phone.replace(/\D/g, '')
        if (digits.length === 10) {
            return ''
        }
        if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
            return ''
        }
        return 'Введите корректный российский номер телефона'
    }

    const checkPasswordStrength = (password) => {
        let score = 0
        let message = ''

        if (!password) {
            return { score: 0, message: '' }
        }

        if (password.length >= 8) score++
        if (password.length >= 12) score++
        if (/[A-ZА-Я]/.test(password)) score++
        if (/[a-zа-я]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++

        if (score <= 2) message = 'Слишком простой'
        else if (score <= 4) message = 'Средний'
        else message = 'Надежный'

        return { score, message }
    }

    const validatePassword = (password) => {
        if (!password) {
            return 'Пароль обязателен'
        }
        if (password.length < 8) {
            return 'Пароль должен содержать минимум 8 символов'
        }
        if (!/[A-ZА-Я]/.test(password)) {
            return 'Пароль должен содержать хотя бы одну заглавную букву'
        }
        if (!/[a-zа-я]/.test(password)) {
            return 'Пароль должен содержать хотя бы одну строчную букву'
        }
        if (!/[0-9]/.test(password)) {
            return 'Пароль должен содержать хотя бы одну цифру'
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Пароль должен содержать хотя бы один спецсимвол'
        }
        return ''
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')

        if (name === 'password') {
            setPasswordStrength(checkPasswordStrength(value))
        }
    }

    const handlePhoneChange = (e) => {
        let value = e.target.value
        let digits = value.replace(/\D/g, '')

        if (digits.length > 11) {
            digits = digits.slice(0, 11)
        }

        let formatted = ''

        if (digits.length === 0) {
            formatted = ''
        } else if (digits.length <= 1) {
            formatted = digits
        } else if (digits.length <= 4) {
            formatted = `+7 (${digits.slice(1)}`
        } else if (digits.length <= 7) {
            formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
        } else if (digits.length <= 9) {
            formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
        } else {
            formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
        }

        setFormData(prev => ({ ...prev, phone: formatted }))
    }

    const validateForm = () => {
        const lastNameError = validateName(formData.lastName, 'Фамилия')
        if (lastNameError) {
            setError(lastNameError)
            return false
        }

        const firstNameError = validateName(formData.firstName, 'Имя')
        if (firstNameError) {
            setError(firstNameError)
            return false
        }

        if (formData.patronymic.trim() && formData.patronymic.trim().length < 2) {
            setError('Отчество должно содержать минимум 2 символа')
            return false
        }

        const emailError = validateEmail(formData.email)
        if (emailError) {
            setError(emailError)
            return false
        }

        const phoneError = validatePhone(formData.phone)
        if (phoneError) {
            setError(phoneError)
            return false
        }

        const passwordError = validatePassword(formData.password)
        if (passwordError) {
            setError(passwordError)
            return false
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают')
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        setError('')

        const fullName = `${formData.lastName.trim()} ${formData.firstName.trim()} ${formData.patronymic.trim()}`.trim()
        const normalizedPhone = normalizePhone(formData.phone)

        try {
            const response = await fetch('/house-goods/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: fullName,
                    email: formData.email.trim(),
                    phone: normalizedPhone,
                    password: formData.password
                })
            })

            // Читаем ответ только один раз как текст
            const textResponse = await response.text()

            let errorMessage = ''
            try {
                // Пытаемся парсить как JSON
                const jsonData = JSON.parse(textResponse)
                errorMessage = jsonData.message || jsonData.error || 'Ошибка регистрации'
            } catch {
                // Если не JSON, используем текст
                errorMessage = textResponse || 'Ошибка регистрации'
            }

            if (!response.ok) {
                throw new Error(errorMessage)
            }

            // Успешная регистрация - редирект на логин
            navigate('/login', { state: { message: 'Регистрация успешна! Войдите в аккаунт.' } })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getStrengthColor = () => {
        if (passwordStrength.score <= 2) return '#ef4444'
        if (passwordStrength.score <= 4) return '#f59e0b'
        return '#4caf50'
    }

    const getStrengthWidth = () => {
        if (passwordStrength.score === 0) return '0%'
        return `${(passwordStrength.score / 6) * 100}%`
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

            <div className="auth-container register-container">
                <div className="auth-card register-card">
                    <div className="auth-header">
                        <div className="auth-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M17 3.5L19 5.5L23 1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                        </div>
                        <h1>Создать аккаунт</h1>
                        <p>Заполните форму для регистрации</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Фамилия *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Иванов"
                                className="auth-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Имя *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Иван"
                                className="auth-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Отчество</label>
                            <input
                                type="text"
                                name="patronymic"
                                value={formData.patronymic}
                                onChange={handleChange}
                                placeholder="Иванович"
                                className="auth-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Номер телефона *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">📱</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="+7 (999) 123-45-67"
                                    className="auth-input"
                                />
                            </div>
                            <small className="form-hint">В формате +7 (XXX) XXX-XX-XX</small>
                        </div>

                        <div className="form-group">
                            <label>Пароль *</label>
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
                            {formData.password && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div
                                            className="strength-fill"
                                            style={{
                                                width: getStrengthWidth(),
                                                backgroundColor: getStrengthColor()
                                            }}
                                        ></div>
                                    </div>
                                    <span className="strength-text" style={{ color: getStrengthColor() }}>
                                        {passwordStrength.message}
                                    </span>
                                </div>
                            )}
                            <small className="form-hint">
                                Минимум 8 символов: заглавная, строчная, цифра, спецсимвол
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Подтверждение пароля *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Повторите пароль"
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? '🙈' : '👁️'}
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
                                'Зарегистрироваться'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Уже есть аккаунт?{' '}
                            <Link to="/login" className="auth-link">
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage