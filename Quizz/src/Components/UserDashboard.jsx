import React, { useState, useEffect } from 'react';
import services from '../Services/Services';
import '../Styles/UserDashboard.css';
import { useNavigate, Link } from 'react-router-dom';

function UserDashboard() {
    const [activeTab, setActiveTab] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [progreso, setProgreso] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = services.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const [getProd, getRut, getProg] = await Promise.all([
                    services.getProductos(),
                    services.getRutinas(),
                    services.getProgresoRutinas(user.id)
                ]);
                setProductos(getProd || []);
                setRutinas(getRut || []);
                setProgreso(getProg || []);
            } catch (error) {
                console.error("Error loading dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []); 

    const handleBuy = () => navigate('/compra');

    const handleLogout = () => {
        services.logout();
        navigate('/');
    };

    const updateRoutineProgress = async (rutinaId, increment) => {
        const prog = progreso.find(p => String(p.rutinaId) === String(rutinaId));
        if (prog) {
            const newProg = Math.min(100, Math.max(0, prog.progreso + increment));
            const updated = { ...prog, progreso: newProg, completado: newProg === 100 };
            await services.updateProgreso(updated, prog.id);
            setProgreso(progreso.map(p => p.id === prog.id ? updated : p));
        } else {
            alert('Solo puedes seguir progreso en rutinas asignadas.');
        }
    };

    if (loading) return <div className="loading-spinner">CARGANDO PODER...</div>;

    return (
        <div className="user-dashboard fade-in">
            <nav className="dashboard-nav-top">
                <Link to="/">INICIO</Link>
                <Link to="/profile">MI PERFIL</Link>
                <button onClick={handleLogout} className="btn-logout-small">SALIR</button>
            </nav>
            <header className="dashboard-header">
                <h1>BIENVENIDO AL TEMPLO, {user?.nombre.toUpperCase()}</h1>
                <p>TU CAMINO A LA MAESTRÍA COMIENZA AQUÍ</p>
                {user?.role === 'admin' && (
                    <button className="btn-goto-admin" onClick={() => navigate('/dashboardAdmin')}>
                        PANEL DE ADMINISTRADOR
                    </button>
                )}
                <div className="tab-navigation">
                    <button
                        className={activeTab === 'productos' ? 'active' : ''}
                        onClick={() => setActiveTab('productos')}
                    >
                        CATÁLOGO DE PRODUCTOS
                    </button>
                    <button
                        className={activeTab === 'rutinas' ? 'active' : ''}
                        onClick={() => setActiveTab('rutinas')}
                    >
                        BIBLIOTECA DE RUTINAS
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                {activeTab === 'productos' ? (
                    <section className="catalog-section">
                        <div className="product-grid">
                            {productos.map(producto => (
                                <article key={producto.id} className="product-card">
                                    <div className="product-img-wrapper">
                                        <img src={producto.imagen} alt={producto.nombre} />
                                    </div>
                                    <div className="product-info">
                                        <h3>{producto.nombre}</h3>
                                        <p>{producto.descripcion}</p>
                                        <div className="product-footer">
                                            <span className="price">${producto.precio}</span>
                                            <button onClick={handleBuy} className="btn-buy">ADQUIRIR</button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ) : (
                    <section className="routines-section">
                        <div className="routine-grid">
                            {rutinas.map(rutina => {
                                const prog = progreso.find(p => p.rutinaId === rutina.id);
                                return (
                                    <article key={rutina.id} className="routine-card">
                                        <div className="video-container">
                                            <iframe src={rutina.video} title={rutina.titulo} allowFullScreen></iframe>
                                        </div>
                                        <div className="routine-info">
                                            <span className="level-badge">{rutina.nivel}</span>
                                            <h3>{rutina.titulo}</h3>
                                            <p>{rutina.descripcion}</p>

                                            <div className="progress-container">
                                                <div className="progress-header">
                                                    <span>Progreso: {prog?.progreso || 0}%</span>
                                                    {prog?.completado && <span className="completed-tag">¡COMPLETADA!</span>}
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${prog?.progreso || 0}%` }}></div>
                                                </div>
                                                <div className="progress-actions">
                                                    <button onClick={() => updateRoutineProgress(rutina.id, -10)} disabled={!prog}>- 10%</button>
                                                    <button onClick={() => updateRoutineProgress(rutina.id, 10)}>+ 10%</button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default UserDashboard;
