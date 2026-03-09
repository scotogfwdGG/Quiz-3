import React, { useState, useEffect } from 'react';
import services from '../Services/Services';

const ManageSite = () => {
    const [siteData, setSiteData] = useState({
        title: '',
        subtitle: '',
        heroMessage: '',
        footerText: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await services.getSiteData();
            if (data) setSiteData(data);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await services.putSiteData(siteData);
        alert('Datos del sitio actualizados correctamente');
    };

    if (loading) return <div>Cargando configuración...</div>;

    return (
        <div className="manage-container fade-in">
            <h1 className="sporty-title">CONFIGURACIÓN DEL TEMPLO</h1>
            <form onSubmit={handleSubmit} className="manage-form moving-border" style={{ maxWidth: '800px' }}>
                <div className="input-group">
                    <label>TÍTULO DEL SITIO</label>
                    <input
                        className="sporty-input"
                        type="text"
                        value={siteData.title}
                        onChange={(e) => setSiteData({ ...siteData, title: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>SUBTÍTULO / SLOGAN</label>
                    <input
                        className="sporty-input"
                        type="text"
                        value={siteData.subtitle}
                        onChange={(e) => setSiteData({ ...siteData, subtitle: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>MENSAJE HERO (PÁGINA PRINCIPAL)</label>
                    <textarea
                        className="sporty-input"
                        rows="4"
                        value={siteData.heroMessage}
                        onChange={(e) => setSiteData({ ...siteData, heroMessage: e.target.value })}
                    ></textarea>
                </div>
                <div className="input-group">
                    <label>TEXTO DEL PIE DE PÁGINA (FOOTER)</label>
                    <input
                        className="sporty-input"
                        type="text"
                        value={siteData.footerText}
                        onChange={(e) => setSiteData({ ...siteData, footerText: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn-add" style={{ marginTop: '20px', width: '100%' }}>ACTUALIZAR SITIO</button>
            </form>
        </div>
    );
};

export default ManageSite;
