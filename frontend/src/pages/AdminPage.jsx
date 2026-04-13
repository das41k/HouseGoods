import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('userRole')

        if (!token) {
            navigate('/403')
            return
        }

        if (role !== 'ROLE_ADMIN') {
            navigate('/403')
            return
        }
    }, [navigate])

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Админ-панель</h1>
            <p>Доступ разрешен. Вы администратор.</p>
            <button onClick={() => navigate('/')}>На главную</button>
        </div>
    )
}

export default AdminPage