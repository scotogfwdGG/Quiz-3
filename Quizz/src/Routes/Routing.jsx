import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Principal from '../Pages/Principal'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import FormAdmin from '../Components/FormAdmin'
import DashboardAdmin from '../Components/DashboardAdmin'
import FormProductos from '../Components/FormProductos'
import FormRutinas from '../Components/FormRutinas'
import ProtectedRoute from '../Components/ProtectedRoute'
import FormCompra from '../Components/FormCompra'
import UserProfile from '../Components/UserProfile'
import UserDashboard from '../Components/UserDashboard'
import PaginaPrincipal from '../Components/PaginaPrincipal'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas para Compra */}
      <Route path="/compra" element={<FormCompra />} />

      {/* Ruta para Perfil y Dashboard */}
      <Route path="/profile" element={<UserProfile />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas para Usuarios */}
      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <FormProductos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rutinas"
        element={
          <ProtectedRoute>
            <FormRutinas />
          </ProtectedRoute>
        }
      />

      {/* Rutas para Admin */}
      <Route path="/admin" element={<FormAdmin />} />
      <Route
        path="/dashboardAdmin"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing
