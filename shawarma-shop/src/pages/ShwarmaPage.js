
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShwarmaPage = () => {
    const { shawarmaId } = useParams();
    const [shawarma, setShawarma] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchShawarma();
    }, [shawarmaId]);

    const fetchShawarma = async () => {
        try {
            const response = await fetch(`/shawarma/${shawarmaId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch shawarma');
            }
            const data = await response.json();
            setShawarma(data);
        } catch (error) {
            console.error('Error fetching shawarma:', error);
            setError('Failed to load product');
        }
    };

    const handleAddToCart = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('shawarmaId', shawarmaId);

            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to add to cart');
            }

            alert('Продукт добавлен в корзину');

        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Ошибка при добавлении в корзину');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!shawarma) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-light">
            <div className="container pt-5 pb-5 bg-white shadow-sm">
                <div className="row">
                    <div className="col-md-5">
                        <img
                            src={`/img/${shawarma.filename}`}
                            className="rounded mx-auto w-100"
                            alt={shawarma.shawarmaTitle}
                        />
                    </div>
                    <div className="col-md-7">
                        <h2>{shawarma.shawarmaTitle}</h2>
                        <h3>{shawarma.category}</h3>
                        <p>ID продукта: <span>{shawarma.id}</span></p>
                        <p className="product-stock" style={{ color: '#54C0A1' }}>В наличии</p>
                        <div className="row ml-1">
                            <h6 className="mr-5">
                                {shawarma.price}.00 р.
                            </h6>
                            <button
                                className="btn btn-success mx-3"
                                style={{
                                    width: '80%'
                                }}
                                onClick={handleAddToCart}
                            >
                                <i className="fas fa-cart-plus mr-2 fa-lg"></i>
                                Добавить в корзину
                            </button>
                        </div>
                        <br />
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>Название продукта:</td>
                                <td>{shawarma.shawarmaTitle}</td>
                            </tr>
                            <tr>
                                <td>Категория:</td>
                                <td>{shawarma.category}</td>
                            </tr>
                            <tr>
                                <td>Моральность:</td>
                                <td>{shawarma.morality}</td>
                            </tr>
                            <tr>
                                <td>Описание:</td>
                                <td>{shawarma.description}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShwarmaPage;