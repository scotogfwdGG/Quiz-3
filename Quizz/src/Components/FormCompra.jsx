import React from 'react'
import { useNavigate } from 'react-router-dom';
import services from '../Services/Services';
import '../Styles/FormCompra.css';

function FormCompra() {
    const [formData, setFormData] = React.useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        metodoPago: 'Tarjeta de Crédito',
        numeroTarjeta: '',
        fechaExpiracion: '',
        cvv: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Compra realizada con éxito');
        navigate('/');
    };


    return (
        <div className="container">
            <div className="card">
                <h2>FORMULARIO DE COMPRA</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ingresa tu nombre"  required />
                    </div>

                    <div className="input-group">
                        <label>Correo Electrónico</label>
                        <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="[EMAIL_ADDRESS]" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                    </div>

                    <div className="input-group">
                        <label>Teléfono</label>
                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+52 123 456 7890" pattern="[0-9]{10}" required />
                    </div>

                    <div className="input-group">
                        <label>Dirección de Envío</label>
                        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle, número, colonia" required />
                    </div>

                    <div className="input-group">
                        <label>Ciudad</label>
                        <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="San Jose" required />
                    </div>

                    <div className="input-group">
                        <label>Código Postal</label>
                        <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} placeholder="CP" maxLength={5} minLength={3} required />
                    </div>

                    <div className="input-group">
                        <label>Método de Pago</label>
                        <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} required>
                            <option>Tarjeta de Crédito</option>
                            <option>Tarjeta de Débito</option>
                            <option>PayPal</option>
                            <option>Transferencia Bancaria</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Número de Tarjeta</label>
                        <input type="text" name="numeroTarjeta" value={formData.numeroTarjeta} onChange={handleChange} maxLength={16} minLength={16} placeholder="•••• •••• •••• ••••" required />
                    </div>

                    <div className="input-group">
                        <label>Fecha de Expiración</label>
                        <input type="text" name="fechaExpiracion" value={formData.fechaExpiracion} onChange={handleChange} placeholder="MM/AA" required />
                    </div>

                    <div className="input-group">
                        <label>CVV</label>
                        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="•••" maxLength={3} minLength={3} required />
                    </div>

                    <button type="submit">CONFIRMAR COMPRA</button>
                </form>
            </div>
        </div>
    )
}

export default FormCompra 