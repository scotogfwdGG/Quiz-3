import React, { useState, useEffect } from 'react'
import services from '../Services/Services';
import '../Styles/FormRutinas.css';

function FormRutinas() {
    const [rutinas, setRutinas] = useState([
        {
            id: 1,
            titulo: "BLOQUE DE EMPUJE (PUSH)",
            descripcion: "Maximiza tu fuerza en pecho y hombros con control corporal.",
            video: "https://www.youtube.com/embed/HT_IEbQG76k"
        },
        {
            id: 2,
            titulo: "DOMINIO DE TRACCIÓN (PULL)",
            descripcion: "Construye una espalda de acero. El tirón es vida.",
            video: "https://www.youtube.com/embed/L0Q5G7AMUQo"
        },
        {
            id: 3,
            titulo: "PILAR DE PIERNA (LEGS)",
            descripcion: "La base de todo atleta. Potencia explosiva.",
            video: "https://www.youtube.com/embed/8SJ2Z2y6EaA"
        }
    ]);

    return (
        <div className="rutinas-container fade-in">
            <header className="catalog-header">
                <h2>ENTRENAMIENTO PROFESIONAL</h2>
                <p>VIDEOS DE ÉLITE PARA RESULTADOS REALES</p>
            </header>

            <div className="product-grid">
                {rutinas.map(rutina => (
                    <article key={rutina.id} className="rutina-card grid-item-appear">
                        <div className="video-wrapper">
                            <iframe
                                src={rutina.video}
                                title={rutina.titulo}
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="product-info">
                            <h3>{rutina.titulo}</h3>
                            <p>{rutina.descripcion}</p>
                            <button className="btn-detail">ANALIZAR TÉCNICA</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default FormRutinas
