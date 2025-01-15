import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.type === "alert-success") {
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                switch (data.type) {
                    case "passwordError":
                        setErrors(prev => ({ ...prev, password: data.message }));
                        break;
                    case "emailError":
                        setErrors(prev => ({ ...prev, email: data.message }));
                        break;
                    default:
                        setErrors(prev => ({ ...prev, general: data.message }));
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({
                general: 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.'
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-light">
            <div className="py-5">
                <div className="container py-1 bg-white shadow-sm">
                    {errors.general && (
                        <div className="alert alert-danger" role="alert">
                            {errors.general}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mr-3">
                                        <i className="fas fa-user-plus mr-3"></i>
                                        Регистрация
                                    </h4>
                                    <hr/>

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">E-mail: </label>
                                        <i className="fas fa-envelope" style={{position: 'relative', top: '8px'}}></i>
                                        <div className="col-sm-7">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Имя: </label>
                                        <i className="fas fa-user" style={{position: 'relative', top: '8px'}}></i>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            />
                                            {errors.firstName && (
                                                <div className="invalid-feedback">{errors.firstName}</div>
                                            )}
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
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback">{errors.password}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Подтвердите пароль: </label>
                                        <i className="fas fa-lock" style={{position: 'relative', top: '8px'}}></i>
                                        <div className="col-sm-7">
                                            <input
                                                type="password"
                                                name="password2"
                                                value={formData.password2}
                                                onChange={handleChange}
                                                className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                                            />
                                            {errors.password2 && (
                                                <div className="invalid-feedback">{errors.password2}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <button type="submit" className="btn btn-dark mx-3">
                                            <i className="fas fa-user-plus mr-3"></i>
                                            Зарегистрироваться
                                        </button>
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

export default RegisterPage;