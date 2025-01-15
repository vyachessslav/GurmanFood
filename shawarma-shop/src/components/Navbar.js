import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic here
        navigate('/login');
    };

    return (
        <div>
            <div className="bg-black py-5 text-white text-center">
                <h1 className="text-4xl">GOURMANFOOD</h1>
            </div>
            <nav className="bg-black text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <ul className="flex space-x-10">
                        <li><Link to="/" className="hover:text-gray-300">Главная</Link></li>
                        <li><Link to="/shawarma" className="hover:text-gray-300">Меню</Link></li>
                        <li><Link to="/user/contacts" className="hover:text-gray-300">Контакты</Link></li>
                    </ul>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/cart" className="hover:text-gray-300">
                                <i className="fas fa-shopping-cart text-xl"></i>
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/user/account" className="hover:text-gray-300">
                                        <i className="fas fa-user mr-2"></i>
                                        Мой аккаунт
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-gray-300">
                                        <i className="fas fa-sign-out-alt mr-2"></i>
                                        Выход
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="hover:text-gray-300">
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Авторизация
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/registration" className="hover:text-gray-300">
                                        <i className="fas fa-user-plus mr-2"></i>
                                        Регистрация
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;