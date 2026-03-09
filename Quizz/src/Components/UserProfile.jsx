import React, { useState, useEffect } from 'react';
import services from '../Services/Services';
import { Link } from 'react-router-dom';
import '../Styles/UserProfile.css';

function UserProfile() {
    const user = services.getCurrentUser();
    const [isEditing, setIsEditing] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        password: user?.password || ''
    });

    useEffect(() => {
        if (user) {
            loadPedidos();
        }
    }, [user]);

    const loadPedidos = async () => {
        const allPedidos = await services.getPedidos();
        setPedidos((allPedidos || []).filter(p => p.userId === user?.id));
    };

    const handleCancelOrder = async (id) => {
        if (window.confirm('¿Deseas cancelar este pedido?')) {
            const pedido = pedidos.find(p => p.id === id);
            await services.putPedido({ ...pedido, estado: 'Cancelado' }, id);
            loadPedidos();
        }
    };

    if (!user) {
        return (
            <div className="profile-container fade-in">
                <h2>No hay sesión iniciada</h2>
                <Link to="/login">Ir al Login</Link>
            </div>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, ...formData };
        try {
            await services.putUsuarios(updatedUser, user.id);
            services.login(updatedUser); 
            setIsEditing(false);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            alert('Error al actualizar el perfil');
        }
    };

    return (
        <div className="profile-container fade-in">
            <nav className="profile-nav-top">
                <Link to="/dashboard">VOLVER AL DASHBOARD</Link>
            </nav>
            <h1 className="sporty-title">PERFIL DEL GUERRERO</h1>
            <div className="profile-card moving-border">
                <div className="profile-avatar">
                    <div className="avatar-placeholder">{user.nombre.charAt(0).toUpperCase()}</div>
                </div>

                {!isEditing ? (
                    <div className="profile-info">
                        <div className="info-group">
                            <label>NOMBRE</label>
                            <p>{user.nombre}</p>
                        </div>
                        <div className="info-group">
                            <label>CORREO ELECTRÓNICO</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-group">
                            <label>RANGO / ROL</label>
                            <p className="role-badge">{user.role.toUpperCase()}</p>
                        </div>
                        <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>EDITAR DATOS</button>
                    </div>
                ) : (
                    <form className="profile-edit-form" onSubmit={handleUpdate}>
                        <div className="info-group">
                            <label>NOMBRE</label>
                            <input
                                className="sporty-input"
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div className="info-group">
                            <label>CORREO ELECTRÓNICO</label>
                            <input
                                className="sporty-input"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="info-group">
                            <label>CONTRASEÑA</label>
                            <input
                                className="sporty-input"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="btn-group-profile">
                            <button type="submit" className="btn-save-profile">GUARDAR</button>
                            <button type="button" className="btn-cancel-profile" onClick={() => setIsEditing(false)}>CANCELAR</button>
                        </div>
                    </form>
                )}
            </div>

            <div className="profile-stats">
                <h3>ESTADO DE ENTRENAMIENTO</h3>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">NIVEL</span>
                        <span className="stat-value">PRINCIPIANTE</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">PUNTOS DE HONOR</span>
                        <span className="stat-value">150</span>
                    </div>
                </div>
            </div>

            <div className="orders-section">
                <h3>MIS PEDIDOS</h3>
                <div className="orders-list">
                    {pedidos.length > 0 ? pedidos.map(pedido => (
                        <div key={pedido.id} className="order-card">
                            <div className="order-main-info">
                                <span>Ref: #{pedido.id}</span>
                                <span>Fecha: {pedido.fecha}</span>
                                <span className={`status-badge ${pedido.estado?.toLowerCase()}`}>{pedido.estado}</span>
                            </div>
                            <div className="order-details">
                                <p>Productos: {pedido.productos?.join(', ')}</p>
                                <p className="order-total">Total: ${pedido.total}</p>
                            </div>
                            {pedido.estado === 'Pendiente' && (
                                <button
                                    className="btn-cancel-order"
                                    onClick={() => handleCancelOrder(pedido.id)}
                                >
                                    CANCELAR PEDIDO
                                </button>
                            )}
                        </div>
                    )) : <p className="no-data">No tienes pedidos activos.</p>}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
