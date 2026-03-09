import React, { useState, useEffect } from 'react'
import '../Styles/FormProductos.css';
import services from '../Services/Services';
import { useNavigate } from 'react-router-dom';

function FormProductos() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProductos = async () => {
            const data = await services.getProductos();
            setProductos(data);
        };
        cargarProductos();
    }, []);

    const handleComprar = () => {
        navigate('/compra');
    };

    return (
        <div className="catalog-container fade-in">
            <header className="catalog-header">
                <h2>SUPLEMENTOS DE ÉLITE</h2>
                <p>FORJA TU CUERPO CON LO MEJOR</p>
            </header>

            <div className="product-grid">
                {productos && productos.map(producto => (
                    <article key={producto.id} className="product-card grid-item-appear">
                        <img src={producto.imagen} alt={producto.nombre} />
                        <div className="product-info">
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>
                            <div className="product-action">
                                <span className="product-price">${producto.precio}</span>
                                <button className='btn-add' onClick={handleComprar}>COMPRAR</button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <footer className="catalog-footer">
                <p>PATROCINADO POR CREAPURE® QUALITY SYSTEMS</p>
            </footer>
        </div>
    )
}

export default FormProductos
