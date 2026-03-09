import React, { useState, useEffect } from 'react';
import services from '../Services/Services';
import '../Styles/ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '', role: 'cliente' });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await services.getUsuarios();
        setUsers(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            await services.deleteUsuarios(id);
            loadUsers();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await services.putUsuarios(formData, editingUser.id);
        } else {
            await services.postUsuarios(formData);
        }
        setFormData({ nombre: '', email: '', password: '', role: 'cliente' });
        setEditingUser(null);
        loadUsers();
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData(user);
    };

    return (
        <div className="users-container fade-in">
            <h2>CONTROL DE ACCESO ATLETAS</h2>

            <form onSubmit={handleSubmit} className="manage-form">
                <h3>{editingUser ? 'MODIFICAR PERFIL' : 'REGISTRAR NUEVO GUERRERO'}</h3>
                <div className="form-row">
                    <input
                        className="sporty-input"
                        type="text" placeholder="NOMBRE"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                    />
                    <input
                        className="sporty-input"
                        type="email" placeholder="EMAIL"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        className="sporty-input"
                        type="password" placeholder="CONTRASEÑA"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <select
                        className="sporty-input"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="cliente">Cliente (Atleta)</option>
                        <option value="admin">Administrador (Entrenador)</option>
                    </select>
                </div>
                <div className="action-row">
                    <button type="submit" className="btn-add btn-athlete-save">
                        {editingUser ? 'ACTUALIZAR' : 'GUARDAR ATLETA'}
                    </button>
                    {editingUser && <button onClick={() => setEditingUser(null)} className="btn-add btn-athlete-cancel">CANCELAR</button>}
                </div>
            </form>

            <table className="sporty-table">
                <thead>
                    <tr>
                        <th>ATLETA</th>
                        <th>EMAIL</th>
                        <th>RANGO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td className="athlete-name">{u.nombre}</td>
                            <td>{u.email}</td>
                            <td>
                                <span className={`role-badge ${u.role === 'admin' ? 'role-admin' : 'role-cliente'}`}>
                                    {u.role}
                                </span>
                            </td>
                            <td>
                                <div className="table-btn-group">
                                    <button className="btn-user-edit" onClick={() => handleEdit(u)}>EDITAR</button>
                                    <button className="btn-user-delete" onClick={() => handleDelete(u.id)}>BAJA</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
