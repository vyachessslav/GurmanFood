import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const removeFromCart = (shawarmaId) => {
        setCartItems(cartItems.filter(item => item.id !== shawarmaId));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + item.price, 0);
    };

    return (
        <div className="bg-gray-100 py-5">
            <div className="container mx-auto py-5 bg-white shadow-sm">
                <h4 className="text-center mb-4">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Корзина
                </h4>

                {cartItems.length === 0 ? (
                    <p className="text-center">Корзина пуста</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div key={item.id} className="max-w-4xl mx-auto mb-3 border rounded">
                                <div className="flex items-center p-4">
                                    <div className="w-1/6">
                                        <img
                                            src={`/img/${item.filename}`}
                                            alt={item.shawarmaTitle}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-3/6 px-4">
                                        <h5>{item.category} {item.shawarmaTitle}</h5>
                                    </div>
                                    <div className="w-2/6 text-right">
                                        <h5>{item.price} р.</h5>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                        >
                                            <i className="far fa-minus-square mr-2"></i>
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <hr className="my-4" />
                        <div className="max-w-4xl mx-auto flex justify-between items-center">
                            <h5 className="text-right">Итого: {getTotalPrice()} р.</h5>
                            <button
                                onClick={() => navigate('/order')}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                <i className="fas fa-shopping-bag mr-2"></i>
                                Заказать
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;