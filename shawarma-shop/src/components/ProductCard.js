
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="col-md-3 mb-3">
            <div className="card h-100">
                <Link to={`/shawarma/${product.id}`}>
                    <img src={`/img/${product.filename}`} className="card-img-top" alt={product.shawarmaTitle} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.shawarmaTitle}</h5>
                    <p className="card-text">{product.price} ₽</p>
                    <Link to={`/shawarma/${product.id}`} className="btn btn-dark">
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;