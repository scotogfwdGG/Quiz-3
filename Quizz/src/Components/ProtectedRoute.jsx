import React from 'react';
import { Navigate } from 'react-router-dom';
import services from '../Services/Services';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({ children, requiredRole }) => {
    const user = services.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
