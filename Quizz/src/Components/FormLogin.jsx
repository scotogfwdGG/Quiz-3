import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import services from '../Services/Services'
import '../Styles/FormLogin.css';

function FormLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const usuarios = await services.getUsuarios()
            if (!usuarios) {
                alert('No se pudo conectar con el servidor. Verifica que el backend esté activo.')
                return
            }
            const user = usuarios.find(u => u.email === email && u.password === password)

            if (user) {
                services.login(user)
                if (user.role === 'admin') {
                    navigate('/dashboardAdmin')
                } else {
                    navigate('/dashboard')
                }
            } else {
                alert('Correo o contraseña incorrectos')
            }
        } catch (error) {
            console.error("Login error:", error)
            alert('Ocurrió un error inesperado al intentar iniciar sesión.')
        }
    }

    return (
        <div className="login-wrapper fade-in">
            <Link to="/" className="btn-back-home">
                <span className="arrow">←</span> VOLVER AL INICIO
            </Link>

            <div className="form-container moving-border">
                <header className="form-header">
                    <div className="badge">ACCESO RESTRINGIDO</div>
                    <h1>HOLA, <span className="highlight">GUERRERO</span></h1>
                    <p>IDENTIFÍCATE PARA CONTINUAR TU ENTRENAMIENTO</p>
                </header>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">COORDENADAS (CORREO)</label>
                        <div className="input-wrapper">
                            <input
                                id="email"
                                className="sporty-input"
                                type="email"
                                placeholder="tu@guerrero.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="input-line"></div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">CÓDIGO DE ACCESO (CONTRASEÑA)</label>
                        <div className="input-wrapper">
                            <input
                                id="password"
                                className="sporty-input"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="input-line"></div>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit">
                        <span className="btn-text">DESBLOQUEAR ACCESO</span>
                        <span className="btn-glow"></span>
                    </button>
                </form>

                <footer className="form-footer">
                    <p>¿NUEVO EN EL TEMPLO? <Link to="/register" className="link-highlight">CREA TU CUENTA AQUÍ</Link></p>
                </footer>
            </div>
        </div>
    )
}

export default FormLogin 
