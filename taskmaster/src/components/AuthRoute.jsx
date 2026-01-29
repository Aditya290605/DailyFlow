import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/landing-page" replace />;
    }

    return <Outlet />;
};

export const PublicRoute = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
