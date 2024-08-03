import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalState } from '../store/GlobalStore';

const ProtectedRoutes = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.auth;

    return isLogged ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;
