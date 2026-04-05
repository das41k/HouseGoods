import React from 'react'
import './Footer.css'
import logoImage from '../../assets/logo.png'

function Footer() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const menuItems = [
        { name: 'Каталог', id: 'catalog-section' },
        { name: 'Скидки', id: 'sales-section' },
        { name: 'Бренды', id: 'brands-section' },
        { name: 'Страны', id: 'countries-section' }
    ]

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Логотип и описание */}
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src={logoImage} alt="HouseGoods" className="footer-logo-img" />
                        <span className="footer-logo-text">HOUSEGOODS</span>
                    </div>
                    <p className="footer-description">
                        Всё для дома в одном месте<br />
                        Качественные товары по доступным ценам
                    </p>
                </div>

                {/* Навигация */}
                <div className="footer-section">
                    <h3 className="footer-title">Навигация</h3>
                    <ul className="footer-links">
                        {menuItems.map(item => (
                            <li key={item.name}>
                                <button
                                    className="footer-link"
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Контакты */}
                <div className="footer-section">
                    <h3 className="footer-title">Контакты</h3>
                    <ul className="footer-links">
                        <li>
                            <a href="mailto:armenpetrosan319@gmail.com" className="footer-email">
                                Почта:
                                📧 armenpetrosan319@gmail.com
                            </a>
                        </li>
                        <li className="footer-address">
                            Адрес:
                            🏛️ Оренбургский государственный университет
                        </li>
                    </ul>
                </div>

                {/* Соцсети */}
                <div className="footer-section">
                    <h3 className="footer-title">Наши контакты</h3>
                    <div className="footer-social">
                        <a
                            href="https://vk.com/wander06"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link vk"
                            aria-label="ВКонтакте"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.5 7.5c.1-.5 0-1-.5-1.2-.5-.2-1.2-.3-2-.3h-2.5c-1.2 0-2 .6-2.3 1.3 0 0-1.2 2.8-2.5 4.3-1 1-1.5 1.3-2 1.3-.4 0-.8-.3-1-1.2-.3-1-.4-2.2-.4-3 0-1.2.3-2.2 1-2.7.6-.5 1.3-.6 1.8-.6h.8c.3 0 .5-.2.5-.5 0-.7-.8-1.8-2-1.8h-2c-.6 0-1.2.2-1.7.6-1 .7-1.6 2-1.6 3.7 0 1.2.2 2.4.6 3.4.4 1 1 1.8 1.6 2.4.8.8 1.6 1.2 2.5 1.5 1 .3 2 .4 3 .4 1.2 0 2.2-.3 2.8-.8.6-.5.9-1.2 1-2 .1-.5-.2-1-.7-1.2-.4-.2-.8-.3-1-.4-.3-.1-.5-.3-.6-.6-.1-.3 0-.6.2-1 .2-.4.5-1 .9-1.6.4-.7.8-1.3 1-1.6.2-.3.3-.6.2-.9z"/>
                            </svg>
                        </a>
                        <a
                            href="https://t.me/smart1k56"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link telegram"
                            aria-label="Telegram"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.66-.35-1.02.22-1.61.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.1-.05-.14-.06-.04-.14-.02-.2-.01-.1.02-1.56.99-4.4 2.9-.42.29-.8.43-1.14.42-.38-.01-1.1-.21-1.64-.39-.68-.22-1.22-.34-1.17-.72.03-.2.29-.4.8-.61 3.06-1.33 5.1-2.2 6.13-2.6 2.92-1.16 3.52-1.36 3.92-1.37.09 0 .28.02.41.12.11.09.14.2.15.32.01.12-.02.27-.05.45z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Копирайт */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© 2026 HOUSEGOODS. Все права защищены.</p>
                    <p>Создано студентом 23ПИНЖ(б)-РПИС-1 Петросяном Арменом</p>
                    <p>Оренбургский государственный университет</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer