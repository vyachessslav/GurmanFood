
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCarousel = ({ categories }) => {
    return (
        <div id="categoryCarousel" className="carousel slide w-100" data-ride="carousel">
            <div className="carousel-inner w-100" role="listbox">
                <div className="carousel-item row active">
                    {categories.map((category, index) => (
                        <div key={index} className="col text-center">
                            <Link to={`/shawarma?category=${category.name}`} className="category-link">
                                <img
                                    src={category.imageUrl}
                                    className="img-fluid mx-auto d-block"
                                    alt={category.name}
                                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                />
                                <h5 className="mt-3">{category.name}</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;