import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import services from '../Services/Services'
import ManageProducts from './ManageProducts'
import ManageUsers from './ManageUsers'
import ManageSite from './ManageSite'
import ManageRoutines from './ManageRoutines'
import '../Styles/DashboardAdmin.css';

function DashboardAdmin() {
    const [view, setView] = useState('welcome')
    const navigate = useNavigate()

    const handleLogout = () => {
        services.logout()
        navigate('/')
    }

    return (
        <div className="dashboard-layout fade-in">
            <aside className="sidebar">
                <h2>CENTRAL DE MANDO</h2>
                <nav className="sidebar-nav">
                    <button onClick={() => setView('welcome')} className={view === 'welcome' ? 'active' : ''}>📊 ESTADÍSTICAS</button>
                    <button onClick={() => setView('productos')} className={view === 'productos' ? 'active' : ''}>📦 EQUIPAMIENTO</button>
                    <button onClick={() => setView('usuarios')} className={view === 'usuarios' ? 'active' : ''}>👥 GUERREROS</button>
                    <button onClick={() => setView('rutinas')} className={view === 'rutinas' ? 'active' : ''}>📋 ENTRENAMIENTOS</button>
                    <button onClick={() => setView('sitio')} className={view === 'sitio' ? 'active' : ''}>⚙️ SITIO</button>
                </nav>
                <button onClick={handleLogout} className="btn-logout">CERRAR PROTOCOLO</button>
            </aside>

            <main className="dashboard-main">
                {view === 'welcome' && (
                    <div className="fade-in">
                        <h1>OPERACIONES ACTIVAS</h1>
                        <p>Estado del imperio calisténico: ÓPTIMO.</p>

                        <div className="stats-grid">
                            <div className="stat-card moving-border">
                                <h3>INGRESOS BRUTOS</h3>
                                <p className="stat-value">$12,450</p>
                            </div>
                            <div className="stat-card moving-border">
                                <h3>ATLETAS ACTIVOS</h3>
                                <p className="stat-value">158</p>
                            </div>
                        </div>
                    </div>
                )}
                {view === 'productos' && <ManageProducts />}
                {view === 'usuarios' && <ManageUsers />}
                {view === 'sitio' && <ManageSite />}
                {view === 'rutinas' && <ManageRoutines />}
            </main>
        </div>
    )
}

export default DashboardAdmin
