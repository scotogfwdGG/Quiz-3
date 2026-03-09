import React, { useState, useEffect } from 'react';
import services from '../Services/Services';
import '../Styles/ManageProducts.css';

const ManageRoutines = () => {
    const [rutinas, setRutinas] = useState([]);
    const [editingRutina, setEditingRutina] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        video: '',
        nivel: 'Principiante'
    });

    useEffect(() => {
        loadRutinas();
    }, []);

    const loadRutinas = async () => {
        const data = await services.getRutinas();
        setRutinas(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta rutina?')) {
            await services.deleteRutina(id);
            loadRutinas();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingRutina) {
            await services.putRutina(formData, editingRutina.id);
        } else {
            await services.postRutina(formData);
        }
        setFormData({ titulo: '', descripcion: '', video: '', nivel: 'Principiante' });
        setEditingRutina(null);
        loadRutinas();
    };

    const handleEdit = (rutina) => {
        setEditingRutina(rutina);
        setFormData({
            titulo: rutina.titulo,
            descripcion: rutina.descripcion,
            video: rutina.video,
            nivel: rutina.nivel
        });
    };

    return (
        <div className="manage-container fade-in">
            <h2>GESTIÓN DE ENTRENAMIENTOS</h2>

            <form onSubmit={handleSubmit} className="manage-form">
                <h3>{editingRutina ? 'EDITAR RUTINA' : 'NUEVA RUTINA DE ÉLITE'}</h3>
                <div className="form-grid">
                    <input
                        className="sporty-input"
                        type="text" placeholder="TÍTULO"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        required
                    />
                    <select
                        className="sporty-input"
                        value={formData.nivel}
                        onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                    >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                    <input
                        className="sporty-input"
                        type="text" placeholder="URL VIDEO (Youtube)"
                        value={formData.video}
                        onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                        required
                    />
                    <textarea
                        className="sporty-input"
                        placeholder="DESCRIPCIÓN"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn-add">
                    {editingRutina ? 'ACTUALIZAR' : 'DESPLEGAR RUTINA'}
                </button>
                {editingRutina && <button onClick={() => setEditingRutina(null)} className="btn-cancel">CANCELAR</button>}
            </form>

            <div className="items-grid">
                {rutinas.map(r => (
                    <div key={r.id} className="item-card">
                        <div className="item-video-preview">
                            <iframe src={r.video} title={r.titulo} width="100%" height="150" frameBorder="0"></iframe>
                        </div>
                        <div className="item-info">
                            <span className="badge">{r.nivel}</span>
                            <h4>{r.titulo}</h4>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(r)} className="btn-edit">EDITAR</button>
                                <button onClick={() => handleDelete(r.id)} className="btn-delete">ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageRoutines;
