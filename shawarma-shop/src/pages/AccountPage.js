
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

const AccountPage = () => {
    const { user } = useAuth();

    useEffect(() => {
        console.log(user)
    }, [user]);

    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <div className="bg-light">
            <div className="py-5">
                <div className="container py-5 bg-white shadow-sm">
                    <div className="row mx-3">

                        <div className="col-md-2">
                            <h4>
                                <i className="fas fa-user-edit mr-1"></i>
                                Аккаунт
                            </h4>
                            <Link className="nav-link account-sidebar-link" to="/user/info">Пользовательская информация</Link>
                            <Link className="nav-link account-sidebar-link" to="/user/reset">Изменить пароль</Link>
                            {user?.role === 'ADMIN' && (
                                <>
                                    <Link className="nav-link account-sidebar-link" to="/admin/add/shawarma">Добавить продукты</Link>
                                    <Link className="nav-link account-sidebar-link" to="/admin/shawarmas">Список продуктов</Link>
                                    <Link className="nav-link account-sidebar-link" to="/admin/orders">Список всех заказов</Link>
                                    <Link className="nav-link account-sidebar-link" to="/admin/users">Список всех пользователей</Link>
                                </>
                            )}
                            {user?.role === 'USER' && (
                                <Link className="nav-link account-sidebar-link" to="/order/user/orders">Список заказов</Link>
                            )}
                        </div>


                        <div className="col-md-4 mb-5">
                            <h4>
                                <i className="fas fa-address-card mr-2"></i>
                                Данные пользователя
                            </h4>
                            <div>
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Имя:</strong> {user?.firstName}</p>
                                <p><strong>Фамилия:</strong> {user?.lastName}</p>
                                <p><strong>Город:</strong> {user?.city}</p>
                                <p><strong>Адрес:</strong> {user?.address}</p>
                                <p><strong>Номер телефона:</strong> {user?.phoneNumber}</p>
                            </div>
                            <Link
                                to="/user/info/edit"
                                className="btn btn-dark mt-2"
                            >
                                <i className="fas fa-edit mr-2"></i>
                                Изменить
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;