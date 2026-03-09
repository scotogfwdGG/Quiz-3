const USERS_URL = "http://localhost:3000/usuarios";
const PRODUCTS_URL = "http://localhost:3000/productos";
const SITE_DATA_URL = "http://localhost:3000/siteData";
const RUTINAS_URL = "http://localhost:3000/rutinas";
const PEDIDOS_URL = "http://localhost:3000/pedidos";
const PROGRESO_URL = "http://localhost:3000/progresoRutinas";

import dbData from '../../db.json';
// --- USUARIOS ---

async function getUsuarios() {
    try {
        const respuestaServidor = await fetch(USERS_URL);
        if (!respuestaServidor.ok) throw new Error("Server response not OK");
        const datosUsuarios = await respuestaServidor.json();
        return datosUsuarios;
    } catch (error) {
        console.warn("Error al obtener los usuarios, usando datos locales", error);
        return dbData.usuarios || [];
    }
}

async function postUsuarios(usuario) {
    try {
        const respuesta = await fetch(USERS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al registrar el usuario", error);
    }
}

async function putUsuarios(usuario, id) {
    try {
        const respuesta = await fetch(`${USERS_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}

async function deleteUsuarios(id) {
    try {
        const respuesta = await fetch(`${USERS_URL}/${id}`, {
            method: "DELETE",
        })
        const datosUsuarios = await respuesta.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
    }
}

// --- PRODUCTOS ---

async function getProductos() {
    try {
        const respuesta = await fetch(PRODUCTS_URL);
        if (!respuesta.ok) throw new Error("Server response not OK");
        return await respuesta.json();
    } catch (error) {
        console.warn("Error al obtener los productos, usando datos locales", error);
        return dbData.productos || [];
    }
}

async function postProducto(producto) {
    try {
        const respuesta = await fetch(PRODUCTS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el producto", error);
    }
}

async function putProducto(producto, id) {
    try {
        const respuesta = await fetch(`${PRODUCTS_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el producto", error);
    }
}

async function deleteProducto(id) {
    try {
        const respuesta = await fetch(`${PRODUCTS_URL}/${id}`, {
            method: "DELETE",
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
}

// --- RUTINAS ---
async function getRutinas() {
    try {
        const respuesta = await fetch(RUTINAS_URL);
        if (!respuesta.ok) throw new Error("Server response not OK");
        return await respuesta.json();
    } catch (error) {
        console.warn("Error al obtener las rutinas, usando datos locales", error);
        return dbData.rutinas || [];
    }
}

async function postRutina(rutina) {
    try {
        const respuesta = await fetch(RUTINAS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rutina)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear la rutina", error);
    }
}

async function putRutina(rutina, id) {
    try {
        const respuesta = await fetch(`${RUTINAS_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rutina)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar la rutina", error);
    }
}

async function deleteRutina(id) {
    try {
        const respuesta = await fetch(`${RUTINAS_URL}/${id}`, {
            method: "DELETE",
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar la rutina", error);
    }
}

// --- PEDIDOS ---
async function getPedidos() {
    try {
        const respuesta = await fetch(PEDIDOS_URL);
        if (!respuesta.ok) throw new Error("Server response not OK");
        return await respuesta.json();
    } catch (error) {
        console.warn("Error al obtener los pedidos, usando datos locales", error);
        return dbData.pedidos || [];
    }
}

async function postPedido(pedido) {
    try {
        const respuesta = await fetch(PEDIDOS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el pedido", error);
    }
}

async function putPedido(pedido, id) {
    try {
        const respuesta = await fetch(`${PEDIDOS_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el pedido", error);
    }
}

// --- PROGRESO RUTINAS ---
async function getProgresoRutinas(userId) {
    try {
        const respuesta = await fetch(`${PROGRESO_URL}?userId=${userId}`);
        if (!respuesta.ok) throw new Error("Server response not OK");
        return await respuesta.json();
    } catch (error) {
        console.warn("Error al obtener el progreso, usando datos locales", error);
        return dbData.progresoRutinas ? dbData.progresoRutinas.filter(p => String(p.userId) === String(userId)) : [];
    }
}

async function updateProgreso(progresoData, id) {
    try {
        const respuesta = await fetch(`${PROGRESO_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(progresoData)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el progreso", error);
    }
}

async function postLogout() {
    try {
        console.log("Sesión cerrada exitosamente");
        return { message: "Logout success" };
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
}

// --- SITE DATA ---

async function getSiteData() {
    try {
        const respuesta = await fetch(SITE_DATA_URL);
        if (!respuesta.ok) throw new Error("Server response not OK");
        return await respuesta.json();
    } catch (error) {
        console.warn("Error al obtener los datos del sitio, usando datos locales", error);
        return dbData.siteData || {};
    }
}

async function putSiteData(data) {
    try {
        const respuesta = await fetch(SITE_DATA_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar los datos del sitio", error);
    }
}

const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('isAuthenticated', 'true');
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
};

const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error al obtener el usuario del localStorage:", error);
        localStorage.removeItem('user'); // Limpiamos si está corrupto
        return null;
    }
};

export default {
    postUsuarios, getUsuarios, putUsuarios, deleteUsuarios,
    getProductos, postProducto, putProducto, deleteProducto,
    getRutinas, postRutina, putRutina, deleteRutina,
    getPedidos, postPedido, putPedido,
    getProgresoRutinas, updateProgreso,
    postLogout, login, logout, getCurrentUser,
    getSiteData, putSiteData
}
