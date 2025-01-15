// components/ProductCarousel.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCarousel = ({ products }) => {
    const chunkArray = (arr, size) => {
        const chunked = [];
        for (let i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size));
        }
        return chunked;
    };

    const productChunks = chunkArray(products, 4);

    return (
        <div id="shawarmaCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {productChunks.map((chunk, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="container">
                            <div className="row">
                                {chunk.map((product) => (
                                    <div key={product.id} className="col-md-3 mb-3">
                                        <div className="card h-100">
                                            <Link to={`/shawarma/${product.id}`}>
                                                <img src={product.filename} className="card-img-top" alt={product.name} />
                                            </Link>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">{product.price} ₽</p>
                                                <Link to={`/shawarma/${product.id}`} className="btn btn-dark">
                                                    Подробнее
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <CarouselIndicators total={productChunks.length} targetId="shawarmaCarousel" />
        </div>
    );
};

const CarouselIndicators = ({ total, targetId }) => (
    <ol className="carousel-indicators">
        {Array.from({ length: total }, (_, i) => (
            <li
                key={i}
                data-target={`#${targetId}`}
                data-slide-to={i}
                className={i === 0 ? 'active' : ''}
                style={{ backgroundColor: 'black' }}
            />
        ))}
    </ol>
);

export default ProductCarousel;