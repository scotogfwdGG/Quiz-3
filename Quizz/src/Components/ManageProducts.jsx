import React, { useState, useEffect } from 'react';
import services from '../Services/Services';
import '../Styles/ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '', imagen: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await services.getProductos();
        setProducts(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            await services.deleteProducto(id);
            loadProducts();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await services.putProducto(formData, editingProduct.id);
                alert('Producto actualizado con éxito');
            } else {
                await services.postProducto(formData);
                alert('Producto creado con éxito');
            }
            setFormData({ nombre: '', descripcion: '', precio: '', imagen: '' });
            setEditingProduct(null);
            loadProducts();
        } catch (error) {
            alert('Error al procesar la solicitud');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
    };

    return (
        <div className="manage-container fade-in">
            <h1 className="sporty-title">LOGÍSTICA DE EQUIPAMIENTO</h1>

            <div className="manage-form moving-border">
                <h3>
                    {editingProduct ? 'MODIFICAR EQUIPO' : 'REGISTRAR NUEVO ELEMENTO'}
                </h3>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-column">
                        <input
                            className="sporty-input"
                            type="text" placeholder="NOMBRE DEL PRODUCTO"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            required
                        />
                        <textarea
                            className="sporty-input"
                            placeholder="ESPECIFICACIONES TÉCNICAS"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        />
                    </div>
                    <div className="form-column">
                        <input
                            className="sporty-input"
                            type="number" placeholder="PRECIO ($)"
                            value={formData.precio}
                            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                            required
                        />
                        <input
                            className="sporty-input"
                            type="text" placeholder="URL DE IMAGEN ASSET"
                            value={formData.imagen}
                            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                        />
                        <div className="btn-group">
                            <button className="btn-add btn-save" type="submit">
                                {editingProduct ? 'ACTUALIZAR' : 'GUARDAR ARCHIVO'}
                            </button>
                            {editingProduct && (
                                <button className="btn-add btn-cancel" onClick={() => setEditingProduct(null)}>
                                    CANCELAR
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div className="item-list">
                {products.map(p => (
                    <div key={p.id} className="product-item fade-in">
                        {p.imagen && <img src={p.imagen} alt={p.nombre} className="img-preview" />}
                        <h4>{p.nombre}</h4>
                        <p>{p.descripcion}</p>
                        <div className="item-action-row">
                            <span className="item-price">${p.precio}</span>
                            <div className="btn-secondary-group">
                                <button className="btn-edit" onClick={() => handleEdit(p)}>EDITAR</button>
                                <button className="btn-delete" onClick={() => handleDelete(p.id)}>ELIMINAR</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProducts;
