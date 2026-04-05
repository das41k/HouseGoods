import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import './CatalogPage.css'

function CatalogPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allCategories, setAllCategories] = useState([])
    const [allBrands, setAllBrands] = useState([])
    const [allCountries, setAllCountries] = useState([])

    // Состояние фильтров
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        country: '',
        isSale: false,
        maxPrice: ''
    })

    const location = useLocation()
    const navigate = useNavigate()

    // Получаем тип и имя из URL
    const params = new URLSearchParams(location.search)
    const type = params.get('type')
    const name = params.get('name')

    // Загрузка всех категорий, брендов и стран для фильтров
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [categoriesRes, brandsRes, countriesRes] = await Promise.all([
                    fetch('/house-goods/api/categories'),
                    fetch('/house-goods/api/brands'),
                    fetch('/house-goods/api/countries')
                ])
                const categoriesData = await categoriesRes.json()
                const brandsData = await brandsRes.json()
                const countriesData = await countriesRes.json()
                setAllCategories(categoriesData)
                setAllBrands(brandsData)
                setAllCountries(countriesData)
            } catch (error) {
                console.error('Ошибка загрузки данных для фильтров:', error)
            }
        }
        fetchFilterData()
    }, [])

    // Загрузка всех товаров (GET /api/products)
    const fetchAllProducts = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/house-goods/api/products')
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }
            const data = await response.json()
            setProducts(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error)
            setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.')
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    // Загрузка товаров с фильтрами (POST /api/products/filters)
    const fetchProductsWithFilters = async (currentFilters) => {
        setLoading(true)
        setError(null)
        try {
            const requestBody = {}
            if (currentFilters.category) requestBody.category = currentFilters.category
            if (currentFilters.brand) requestBody.brand = currentFilters.brand
            if (currentFilters.country) requestBody.country = currentFilters.country
            if (currentFilters.isSale) requestBody.isSale = currentFilters.isSale
            if (currentFilters.maxPrice) requestBody.maxPrice = parseFloat(currentFilters.maxPrice)

            const response = await fetch('/house-goods/api/products/filters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            })

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }

            const data = await response.json()
            setProducts(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error)
            setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.')
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    // Установка начальных фильтров при переходе
    useEffect(() => {
        if (type === 'all') {
            setFilters({ category: '', brand: '', country: '', isSale: false, maxPrice: '' })
            fetchAllProducts()
            return
        }

        if (!type || !name) {
            navigate('/')
            return
        }

        const newFilters = { category: '', brand: '', country: '', isSale: false, maxPrice: '' }

        switch (type) {
            case 'category':
                newFilters.category = name
                break
            case 'brand':
                newFilters.brand = name
                break
            case 'country':
                newFilters.country = name
                break
            default:
                navigate('/')
                return
        }

        setFilters(newFilters)
        fetchProductsWithFilters(newFilters)
    }, [location.search])

    // Применение фильтров
    const applyFilters = () => {
        fetchProductsWithFilters(filters)
    }

    // Сброс фильтров
    const resetFilters = () => {
        if (type === 'all') {
            const newFilters = { category: '', brand: '', country: '', isSale: false, maxPrice: '' }
            setFilters(newFilters)
            setError(null)
            fetchAllProducts()
            return
        }

        const newFilters = { category: '', brand: '', country: '', isSale: false, maxPrice: '' }

        if (type === 'category') {
            newFilters.category = name
        } else if (type === 'brand') {
            newFilters.brand = name
        } else if (type === 'country') {
            newFilters.country = name
        }

        setFilters(newFilters)
        setError(null)
        fetchProductsWithFilters(newFilters)
    }

    // Удаление отдельного фильтра
    const removeFilter = (filterKey) => {
        const newFilters = { ...filters }

        if (filterKey === 'category') {
            if (type === 'category') {
                newFilters.category = name
            } else {
                newFilters.category = ''
            }
        } else if (filterKey === 'brand') {
            if (type === 'brand') {
                newFilters.brand = name
            } else {
                newFilters.brand = ''
            }
        } else if (filterKey === 'country') {
            if (type === 'country') {
                newFilters.country = name
            } else {
                newFilters.country = ''
            }
        } else if (filterKey === 'isSale') {
            newFilters.isSale = false
        } else if (filterKey === 'maxPrice') {
            newFilters.maxPrice = ''
        }

        setFilters(newFilters)
        fetchProductsWithFilters(newFilters)
    }

    // Обновление фильтра
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        if (error) setError(null)
    }

    const handleProductClick = (product) => {
        navigate(`/product/${product.sku}`)
    }

    const goBack = () => {
        navigate('/')
    }

    const getTypeName = () => {
        switch(type) {
            case 'category': return 'Категория'
            case 'brand': return 'Бренд'
            case 'country': return 'Страна'
            default: return ''
        }
    }

    const getCurrentItemName = () => {
        if (!name) return ''
        switch(type) {
            case 'category':
                const category = allCategories.find(cat => cat.title === name)
                return category?.title || name
            case 'brand':
                const brand = allBrands.find(b => b.name === name)
                return brand?.name || name
            case 'country':
                const country = allCountries.find(c => c.name === name)
                return country?.name || name
            default:
                return name
        }
    }

    // Получение активных фильтров для хлебных крошек
    const getActiveFilters = () => {
        const active = []

        if (type === 'category') {
            active.push({ key: 'category', label: getCurrentItemName(), type: 'category' })
        } else if (filters.category) {
            active.push({ key: 'category', label: filters.category, type: 'category' })
        }

        if (type === 'brand') {
            active.push({ key: 'brand', label: getCurrentItemName(), type: 'brand' })
        } else if (filters.brand) {
            active.push({ key: 'brand', label: filters.brand, type: 'brand' })
        }

        if (type === 'country') {
            active.push({ key: 'country', label: getCurrentItemName(), type: 'country' })
        } else if (filters.country) {
            active.push({ key: 'country', label: filters.country, type: 'country' })
        }

        if (filters.isSale) {
            active.push({ key: 'isSale', label: 'Со скидкой', type: 'sale' })
        }

        if (filters.maxPrice) {
            active.push({ key: 'maxPrice', label: `до ${filters.maxPrice} ₽`, type: 'price' })
        }

        return active
    }

    const activeFilters = getActiveFilters()

    return (
        <div className="catalog-page">
            <div className="catalog-container">
                {/* Хлебные крошки */}
                <div className="catalog-breadcrumb">
                    <button onClick={goBack} className="breadcrumb-link">Главная</button>
                    <span className="breadcrumb-separator">/</span>

                    {type === 'all' ? (
                        <span className="breadcrumb-active">Все товары</span>
                    ) : (
                        <>
                            <span className="breadcrumb-current">{getTypeName()}</span>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-active">{getCurrentItemName()}</span>

                            {/* Дополнительные фильтры */}
                            {activeFilters.filter(f =>
                                (type === 'category' && f.key !== 'category') ||
                                (type === 'brand' && f.key !== 'brand') ||
                                (type === 'country' && f.key !== 'country')
                            ).length > 0 && (
                                <>
                                    {activeFilters.filter(f =>
                                        (type === 'category' && f.key !== 'category') ||
                                        (type === 'brand' && f.key !== 'brand') ||
                                        (type === 'country' && f.key !== 'country')
                                    ).map((filter, idx) => (
                                        <React.Fragment key={filter.key}>
                                            <span className="breadcrumb-separator">/</span>
                                            <span className="breadcrumb-filter">
                                                {filter.label}
                                                <button
                                                    className="breadcrumb-filter-remove"
                                                    onClick={() => removeFilter(filter.key)}
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        </React.Fragment>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Если есть активные фильтры на странице all */}
                {type === 'all' && activeFilters.length > 0 && (
                    <div className="catalog-breadcrumb">
                        <button onClick={goBack} className="breadcrumb-link">Главная</button>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Все товары</span>
                        {activeFilters.map((filter, idx) => (
                            <React.Fragment key={filter.key}>
                                <span className="breadcrumb-separator">/</span>
                                <span className="breadcrumb-filter">
                                    {filter.label}
                                    <button
                                        className="breadcrumb-filter-remove"
                                        onClick={() => removeFilter(filter.key)}
                                    >
                                        ✕
                                    </button>
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                )}

                <div className="catalog-layout">
                    {/* Фильтры - слева */}
                    <aside className="catalog-filters-sidebar">
                        <div className="filters-header">
                            <h3>Фильтры</h3>
                            <button onClick={resetFilters} className="reset-filters-btn">Сбросить все</button>
                        </div>

                        {/* Фильтр по категории */}
                        {type !== 'category' && allCategories.length > 0 && (
                            <div className="filter-group">
                                <label className="filter-label">Категория</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">Все категории</option>
                                    {allCategories.map(cat => (
                                        <option key={cat.id || cat.title} value={cat.title}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Фильтр по бренду */}
                        {type !== 'brand' && allBrands.length > 0 && (
                            <div className="filter-group">
                                <label className="filter-label">Бренд</label>
                                <select
                                    value={filters.brand}
                                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">Все бренды</option>
                                    {allBrands.map(brand => (
                                        <option key={brand.id || brand.name} value={brand.name}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Фильтр по стране */}
                        {type !== 'country' && allCountries.length > 0 && (
                            <div className="filter-group">
                                <label className="filter-label">Страна</label>
                                <select
                                    value={filters.country}
                                    onChange={(e) => handleFilterChange('country', e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">Все страны</option>
                                    {allCountries.map(country => (
                                        <option key={country.id || country.name} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Фильтр по цене */}
                        <div className="filter-group">
                            <label className="filter-label">Максимальная цена</label>
                            <input
                                type="number"
                                placeholder="Введите сумму"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                className="filter-input"
                                min="0"
                                step="100"
                            />
                        </div>

                        {/* Фильтр по скидке */}
                        <div className="filter-group">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    checked={filters.isSale}
                                    onChange={(e) => handleFilterChange('isSale', e.target.checked)}
                                />
                                <span>Только со скидкой</span>
                            </label>
                        </div>

                        <button onClick={applyFilters} className="apply-filters-btn">
                            Применить
                        </button>
                    </aside>

                    {/* Товары - справа */}
                    <div className="catalog-content">
                        <div className="catalog-header">
                            <h1 className="catalog-title">
                                {type === 'all' ? 'Все товары' : getCurrentItemName()}
                            </h1>
                            <span className="products-count">Найдено: {products.length} товаров</span>
                        </div>

                        {loading ? (
                            <div className="catalog-loading">Загрузка товаров...</div>
                        ) : error ? (
                            <div className="catalog-error">
                                <p>⚠️ {error}</p>
                                <button onClick={resetFilters} className="empty-back-btn">Сбросить фильтры</button>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="catalog-grid">
                                {products.map((product, idx) => (
                                    <ProductCard
                                        key={product.sku || idx}
                                        product={product}
                                        onClick={handleProductClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="catalog-empty">
                                <p>😕 Товары не найдены</p>
                                <p className="empty-hint">Попробуйте изменить параметры фильтрации</p>
                                <button onClick={resetFilters} className="empty-back-btn">Сбросить фильтры</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogPage