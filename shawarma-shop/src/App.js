import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import AccountPage from "./pages/AccountPage";
import ContactsPage from "./pages/ContactsPage";
import ShwarmasPage from "./pages/ShwarmasPage";
import ShwarmaPage from "./pages/ShwarmaPage";
import AdminAddProductPage from './pages/AddProductPage';
import AdminUsersListPage from './pages/UsersListPage';


import { AuthProvider, useAuth } from './context/AuthContext';
import Cart from "./components/Cart";


const App = () => {

    const ProtectedRoute = ({ children, requiredRole, isLogin }) => {
        const { user, isAuthenticated } = useAuth();
        const navigate = useNavigate()
        console.log(user)
        console.log(isAuthenticated)

        useEffect(() => {
            if (!isAuthenticated) {
                console.log('LOGIN')
                navigate('/login')
                return
            }

            if (requiredRole && user?.role !== requiredRole) {
                console.log('req')
                navigate('/')
                return
            }

            if (isAuthenticated && isLogin) {
                console.log('ACCOUNT')
                navigate('/user/account')
                return
            }
        }, [isLogin, isAuthenticated]);

        console.log('smth')

        return children;
    };


    const AdminLayout = ({ children }) => (
        <div className="container mx-auto py-5">
            <div className="flex">
                <div className="flex-1 ml-8">
                    {children}
                </div>
            </div>
        </div>
    );


    const UserLayout = ({ children }) => (
        <div className="container mx-auto py-5">
            <div className="flex">
                <div className="flex-1 ml-8">
                    {children}
                </div>
            </div>
        </div>
    );

    const AppContent = () => {
        const { isAuthenticated, user } = useAuth();

        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-grow bg-gray-100">
                    <Routes>

                        <Route path="/" element={<HomePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        //TODO edit namings
                        <Route path="/shawarma" element={<ShwarmasPage/>} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/user/contacts" element={<ContactsPage />} />
                        <Route path="/shawarma/:shawarmaId" element={<ShwarmaPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute isLogin={true}>
                                    <UserLayout>
                                        <LoginPage/>
                                    </UserLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/registration" element={<RegisterPage />} />

                        <Route
                            path="/user/account"
                            element={
                                <ProtectedRoute>
                                    <UserLayout>
                                        <AccountPage />
                                    </UserLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/order/user/orders"
                            element={
                                <ProtectedRoute>
                                    <UserLayout>
                                        {/* <OrdersListPage /> */}
                                    </UserLayout>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/add/shawarma"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <AdminLayout>
                                        <AdminAddProductPage />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/users"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <AdminLayout>
                                        <AdminUsersListPage />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />


                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        );
    };

    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;