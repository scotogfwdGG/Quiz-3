import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import services from '../Services/Services'
import '../Styles/FormAdmin.css';


function FormAdmin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleAdminLogin = async (e) => {
        e.preventDefault()
        const usuarios = await services.getUsuarios()
        const user = usuarios.find(u => u.email === email && u.password === password)

        if (user && user.role === 'admin') {
            services.login(user)
            navigate('/dashboardAdmin')
        } else {
            alert('Acceso denegado. Solo administradores pueden ingresar aquí.')
        }
    }

    return (
        <div className="admin-login-container fade-in">
            <h1>SISTEMA DE CONTROL</h1>
            <form onSubmit={handleAdminLogin}>
                <div className="input-group">
                    <label>IDENTIFICADOR ADMIN</label>
                    <input
                        className="sporty-input admin-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>CÓDIGO DE ACCESO</label>
                    <input
                        className="sporty-input admin-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-admin">ENTRAR AL SISTEMA</button>
            </form>
            <div className="admin-footer">
                <Link to="/login">VOLVER AL ACCESO CIVIL</Link>
            </div>
        </div>
    )
}

export default FormAdmin

