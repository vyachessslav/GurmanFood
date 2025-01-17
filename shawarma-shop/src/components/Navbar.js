import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className="bg-black py-5 text-white text-center font-figtree">
                <h1 className="text-4xl font-bold">GOURMANFOOD</h1>
            </div>
            <nav className="bg-black text-white py-4 font-figtree">
                <div className="container mx-auto flex justify-between items-center">
                    <ul className="flex space-x-10">
                        <li><Link to="/"
                                  className="text-white no-underline hover:text-gray-300 font-medium">Главная</Link>
                        </li>
                        <li><Link to="/shawarma"
                                  className="text-white no-underline hover:text-gray-300 font-medium">Меню</Link></li>
                        <li><Link to="/user/contacts"
                                  className="text-white no-underline hover:text-gray-300 font-medium">Контакты</Link>
                        </li>
                    </ul>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/cart" className="text-white no-underline hover:text-gray-300">
                                <i className="fas fa-shopping-cart text-xl"></i>
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/user/account"
                                          className="text-white no-underline hover:text-gray-300 font-medium">
                                        <i className="fas fa-user mr-2"></i>
                                        Мой аккаунт
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}
                                            className="text-white no-underline hover:text-gray-300 font-medium border-0 bg-transparent">
                                        <i className="fas fa-sign-out-alt mr-2"></i>
                                        Выход
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login"
                                          className="text-white no-underline hover:text-gray-300 font-medium">
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Авторизация
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/registration"
                                          className="text-white no-underline hover:text-gray-300 font-medium">
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