import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import services from '../Services/Services'

import '../Styles/FormRegister.css';

function FormRegister() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('cliente')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const nuevoUsuario = { nombre, email, password, role }
    await services.postUsuarios(nuevoUsuario)
    alert('Registro exitoso. Ahora puedes iniciar sesión.')
    navigate('/login')
  }


  return (
    <div className="login-wrapper fade-in">
      <Link to="/" className="btn-back-home">
        <span className="arrow">←</span> VOLVER AL INICIO
      </Link>

      <div className="form-container moving-border">
        <header className="form-header">
          <div className="badge">INSCRIPCIÓN ABIERTA</div>
          <h1>ÚNETE A LA <span className="highlight">ÉLITE</span></h1>
          <p>FORJA TU CUERPO Y MENTE EN EL TEMPLO</p>
        </header>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="nombre">NOMBRE DE GUERRERO</label>
            <div className="input-wrapper">
              <input
                id="nombre"
                className="sporty-input"
                type="text"
                placeholder="Ej. Leonidas"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <div className="input-line"></div>
            </div>
          </div>

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

          <div className="input-group">
            <label htmlFor="role">RANGO SOLICITADO</label>
            <div className="input-wrapper">
              <select id="role" className="sporty-input select-input" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="cliente">ATLETA (CLIENTE)</option>
                <option value="admin">ENTRENADOR (ADMIN)</option>
              </select>
              <div className="input-line"></div>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            <span className="btn-text">INICIAR MI CAMINO</span>
            <span className="btn-glow"></span>
          </button>
        </form>

        <footer className="form-footer">
          <p>¿YA ERES PARTE? <Link to="/login" className="link-highlight">ENTRA AQUÍ</Link></p>
        </footer>
      </div>
    </div>
  )
}

export default FormRegister
