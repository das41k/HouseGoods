import React, { useState, useEffect } from 'react'
import CategoryCard from './components/CategoryCard/CategoryCard'
import BrandSlider from './components/BrandSlider/BrandSlider'
import CountryGrid from './components/CountryGrid/CountryGrid'
import ProductSlider from './components/ProductSlider/ProductSlider'
import './App.css'

function App() {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [countries, setCountries] = useState([])
    const [saleProducts, setSaleProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])
    const [currentParent, setCurrentParent] = useState(null)

    // Загрузка родительских категорий
    const loadParentCategories = async () => {
        try {
            const response = await fetch('/house-goods/api/categories')
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error)
        }
    }

    // Загрузка брендов
    const loadBrands = async () => {
        try {
            const response = await fetch('/house-goods/api/brands')
            const data = await response.json()
            setBrands(data)
        } catch (error) {
            console.error('Ошибка загрузки брендов:', error)
        }
    }

    // Загрузка стран
    const loadCountries = async () => {
        try {
            const response = await fetch('/house-goods/api/countries')
            const data = await response.json()
            setCountries(data)
        } catch (error) {
            console.error('Ошибка загрузки стран:', error)
        }
    }

    // Загрузка товаров со скидкой - ИСПРАВЛЕННЫЙ URL
    const loadSaleProducts = async () => {
        try {
            const response = await fetch('/house-goods/api/products/sales')
            const data = await response.json()
            console.log('Товары со скидкой:', data)
            setSaleProducts(data)
        } catch (error) {
            console.error('Ошибка загрузки товаров со скидкой:', error)
        }
    }

    // Загрузка подкатегорий
    const loadChildrenCategories = async (parentId, parentTitle, currentCats) => {
        setLoading(true)
        try {
            setHistory([...history, {
                categories: currentCats,
                title: currentParent?.title || 'Все категории',
                parentId: currentParent?.id
            }])

            const response = await fetch(`/house-goods/api/categories/${parentId}/children`)
            const data = await response.json()
            setCategories(data)
            setCurrentParent({ id: parentId, title: parentTitle })
        } catch (error) {
            console.error('Ошибка:', error)
        } finally {
            setLoading(false)
        }
    }

    // Назад
    const goBack = () => {
        if (history.length === 0) return
        const last = history[history.length - 1]
        setCategories(last.categories)
        setCurrentParent(last.parentId ? { id: last.parentId, title: last.title } : null)
        setHistory(history.slice(0, -1))
    }

    // Клик по категории
    const handleCategoryClick = (category) => {
        if (category.hasChildren) {
            loadChildrenCategories(category.id, category.title, categories)
        } else {
            alert(`Товары категории: ${category.title}`)
        }
    }

    // Клик по бренду
    const handleBrandClick = (brand) => {
        alert(`Товары бренда: ${brand.name}`)
    }

    // Клик по стране
    const handleCountryClick = (country) => {
        alert(`Товары из страны: ${country.name}`)
    }

    // Клик по товару со скидкой
    const handleProductClick = (product) => {
        alert(`Товар: ${product.name}`)
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([
                loadParentCategories(),
                loadBrands(),
                loadCountries(),
                loadSaleProducts()
            ])
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <div className="app">
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <span className="logo-icon">🏠</span>
                        <span className="logo-text">HOUSE GOODS</span>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="container">
                    {/* Навигация */}
                    <div className="nav-row">
                        {history.length > 0 && (
                            <button className="back-btn" onClick={goBack}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Назад
                            </button>
                        )}
                        <div className="breadcrumb">
                            <span className={!currentParent ? 'active' : ''}>Все категории</span>
                            {currentParent && (
                                <>
                                    <span className="separator">/</span>
                                    <span className="active">{currentParent.title}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Заголовок */}
                    <h1 className="page-title">
                        {currentParent ? currentParent.title : 'Каталог товаров'}
                    </h1>

                    {/* Сетка категорий */}
                    {loading ? (
                        <div className="loading">Загрузка...</div>
                    ) : (
                        <>
                            {categories.length > 0 && (
                                <div className="categories-grid">
                                    {categories.map((category, idx) => (
                                        <CategoryCard
                                            key={idx}
                                            category={category}
                                            onClick={handleCategoryClick}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Бренды - только на главной */}
                            {!currentParent && brands.length > 0 && (
                                <BrandSlider brands={brands} onBrandClick={handleBrandClick} />
                            )}

                            {/* Страны - только на главной */}
                            {!currentParent && countries.length > 0 && (
                                <CountryGrid countries={countries} onCountryClick={handleCountryClick} />
                            )}

                            {/* Товары со скидкой - только на главной */}
                            {!currentParent && saleProducts.length > 0 && (
                                <ProductSlider products={saleProducts} onProductClick={handleProductClick} />
                            )}
                        </>
                    )}

                    {!loading && categories.length === 0 && (
                        <div className="empty">Нет категорий</div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App