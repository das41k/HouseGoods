import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import BrandSlider from '../components/BrandSlider/BrandSlider'
import CountryGrid from '../components/CountryGrid/CountryGrid'
import ProductSlider from '../components/ProductSlider/ProductSlider'
import './Pages.css'

function HomePage() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [countries, setCountries] = useState([])
    const [saleProducts, setSaleProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])
    const [currentParent, setCurrentParent] = useState(null)

    const catalogRef = useRef(null)
    const salesRef = useRef(null)
    const brandsRef = useRef(null)
    const countriesRef = useRef(null)

    // Обработка hash при загрузке
    useEffect(() => {
        if (window.location.hash) {
            const sectionId = window.location.hash.slice(1)
            const sectionMap = {
                'catalog-section': catalogRef,
                'sales-section': salesRef,
                'brands-section': brandsRef,
                'countries-section': countriesRef
            }
            const targetRef = sectionMap[sectionId]
            if (targetRef?.current) {
                setTimeout(() => {
                    targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 500)
            }
        }
    }, [loading])

    const loadParentCategories = async () => {
        try {
            const response = await fetch('/house-goods/api/categories/parents')
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error)
        }
    }

    const loadBrands = async () => {
        try {
            const response = await fetch('/house-goods/api/brands')
            const data = await response.json()
            setBrands(data)
        } catch (error) {
            console.error('Ошибка загрузки брендов:', error)
        }
    }

    const loadCountries = async () => {
        try {
            const response = await fetch('/house-goods/api/countries')
            const data = await response.json()
            setCountries(data)
        } catch (error) {
            console.error('Ошибка загрузки стран:', error)
        }
    }

    const loadSaleProducts = async () => {
        try {
            const response = await fetch('/house-goods/api/products/sales')
            const data = await response.json()
            setSaleProducts(data)
        } catch (error) {
            console.error('Ошибка загрузки товаров со скидкой:', error)
        }
    }

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
            navigate(`/catalog?type=category&name=${encodeURIComponent(category.title)}`)
        }
    }

    // Клик по бренду
    const handleBrandClick = (brand) => {
        navigate(`/catalog?type=brand&name=${encodeURIComponent(brand.name)}`)
    }

    // Клик по стране
    const handleCountryClick = (country) => {
        navigate(`/catalog?type=country&name=${encodeURIComponent(country.name)}`)
    }

    // Клик по товару со скидкой
    const handleProductClick = (product) => {
        navigate(`/product/${product.sku}`)
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

    const isHomePage = !currentParent

    return (
        <div className="page-container">
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
                    <span className={!currentParent ? 'active' : ''}></span>
                    {currentParent && (
                        <>
                            <span className="separator">/</span>
                            <span className="active">{currentParent.title}</span>
                        </>
                    )}
                </div>
            </div>

            <h1 className="page-title">
                {currentParent ? currentParent.title : 'Категории товаров'}
            </h1>

            {loading ? (
                <div className="loading">Загрузка...</div>
            ) : (
                <>
                    {/* Секция Каталог */}
                    <div id="catalog-section" ref={catalogRef} className="section">
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
                    </div>

                    {/* Секция Скидки - только на главной */}
                    {isHomePage && saleProducts.length > 0 && (
                        <div id="sales-section" ref={salesRef} className="section">
                            <div className="section-header">
                                <h2 className="section-title">🔥 Товары со скидкой</h2>
                                <p className="section-subtitle">Успей купить по выгодной цене</p>
                            </div>
                            <ProductSlider products={saleProducts} onProductClick={handleProductClick} />
                        </div>
                    )}

                    {/* Секция Бренды - только на главной */}
                    {isHomePage && brands.length > 0 && (
                        <div id="brands-section" ref={brandsRef} className="section">
                            <div className="section-header">
                                <h2 className="section-title">Популярные бренды</h2>
                                <p className="section-subtitle">Ведущие мировые производители</p>
                            </div>
                            <BrandSlider brands={brands} onBrandClick={handleBrandClick} />
                        </div>
                    )}

                    {/* Секция Страны - только на главной */}
                    {isHomePage && countries.length > 0 && (
                        <div id="countries-section" ref={countriesRef} className="section">
                            <div className="section-header">
                                <h2 className="section-title">Страны производители</h2>
                                <p className="section-subtitle">Товары со всего мира</p>
                            </div>
                            <CountryGrid countries={countries} onCountryClick={handleCountryClick} />
                        </div>
                    )}
                </>
            )}

            {!loading && categories.length === 0 && (
                <div className="empty">Нет категорий</div>
            )}
        </div>
    )
}

export default HomePage