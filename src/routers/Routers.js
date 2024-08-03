import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import UserProfile from '../Pages/UserProfile';
import ProtectedRoutes from './ProtectedRoutes';
import UserPosts from '../Pages/Posts';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="userprofile" element={<UserProfile />} />
                        <Route path="post/:id" element={<UserPosts />} />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
