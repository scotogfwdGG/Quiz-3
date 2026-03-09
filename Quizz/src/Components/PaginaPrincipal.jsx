import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import services from '../Services/Services';
import '../Styles/PaginaPrincipal.css';
import calisteniaImg from '../Imagenes/calistenia.jpg';

function PaginaPrincipal() {
  const user = services.getCurrentUser();
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState({
    title: 'Cargando...',
    subtitle: '',
    heroMessage: '',
    footerText: ''
  });

  useEffect(() => {
    const loadSiteData = async () => {
      const data = await services.getSiteData();
      if (data) setSiteData(data);
    };
    loadSiteData();
  }, []);

  const handleLogout = () => {
    services.logout();
    navigate('/');
  };

  return (
    <div className="pag-principal fade-in">
      <header className="header-main">
        <h1>{siteData.title}</h1>
        <p>{siteData.subtitle}</p>
        {user && (
          <div className="user-info">
            <span>Bienvenido, {user.nombre}</span>
            <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
          </div>
        )}
      </header>

      <nav className="nav-main">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          {!user ? (
            <>
              <li><Link to="/register">Registro</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile">Perfil</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/rutinas">Rutinas</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/dashboardAdmin" className="admin-link">Dashboard Admin</Link></li>
              )}
            </>
          )}
        </ul>
      </nav>

      <main className="main-content">
        <div className="fade-in">
          <h2>DOMINA TU CUERPO</h2>
          <p>{siteData.heroMessage}</p>
          <div className="hero-container">
            <img
              src={calisteniaImg}
              alt="Calisthenics"
              className="hero-image"
            />
          </div>
        </div>
      </main>

      <footer className="footer-main">
        <p>&copy; {siteData.footerText}</p>
      </footer>
    </div>
  )
}

export default PaginaPrincipal
