import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

export const LoginPage = () => {
    const { setUser } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                if (response.ok) {
                    localStorage.setItem('token', data.token);


                    const userResponse = await fetch('/auth/user', {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    const userData = await userResponse.json();
                    setUser(userData);
                    navigate('/user/account');
                } else {
                    setError(data.message || 'Неверный адрес Электронной Почты или Пароль');
                }
            }
        }catch (error) {
            console.error('Login error:', error);
            setError('Произошла ошибка при входе. Пожалуйста, попробуйте позже.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (error) setError('');
    };

    return (
        <div className="bg-light">
            <div className="py-5">
                <div className="container py-1 bg-white shadow-sm">
                    {error && (
                        <div className="alert alert-danger col-sm-8 mt-3" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mr-3">
                                        <i className="fas fa-sign-in-alt mr-3"></i>
                                        Войти
                                    </h4>
                                    <hr />

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">E-mail: </label>
                                        <i className="fas fa-envelope" style={{position: 'relative', top: '8px'}}></i>
                                        <div className="col-sm-7">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Пароль: </label>
                                        <i className="fas fa-lock" style={{position: 'relative', top: '8px'}}></i>
                                        <div className="col-sm-7">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <button type="submit" className="btn btn-dark mx-2">
                                            <i className="fas fa-sign-in-alt mr-3"></i>
                                            Войти
                                        </button>
                                        <a href="/auth/forgot" className="forgot-password ml-3">
                                            Забыл пароль?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;