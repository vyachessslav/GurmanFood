import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load cart');
        }
    };

    const removeFromCart = async (shawarmaId) => {
        try {
            const response = await fetch('/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shawarmaId }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to remove from cart');
            }

            fetchCartItems();
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Ошибка при удалении из корзины');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <div className="alert alert-info">Корзина пуста</div>
            ) : (
                <div className="row">
                    {cartItems.map((item) => (
                        <div key={item.id} className="col-12 mb-4">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <img
                                            src={`/img/${item.filename}`}
                                            className="img-fluid rounded-start"
                                            alt={item.shawarmaTitle}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.shawarmaTitle}</h5>
                                            <p className="card-text">
                                                {item.price}.00 р.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-2 d-flex align-items-center justify-content-center">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5>Итого: {cartItems.reduce((sum, item) => sum + item.price, 0)}.00 р.</h5>
                                <button className="btn btn-success">
                                    Оформить заказ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;