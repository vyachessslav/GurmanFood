import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/shawarma/popular');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const mainCarouselItems = [
        {
            id: 2,
            imageUrl: "https://e0.edimdoma.ru/data/posts/0002/8364/28364-ed4_wide.jpg?1691513110",
            link: "/shawarma/2"
        },
        {
            id: 3,
            imageUrl: "https://e0.edimdoma.ru/data/posts/0002/8364/28364-ed4_wide.jpg?1691513110",
            link: "/shawarma/3"
        }
    ];

    const categories = [
        { name: 'Шаурма', imageUrl: 'https://lavash36.ru/upload/shop_1/1/8/5/item_185/item_185.jpg?202308111254' },
        { name: 'Пицца', imageUrl: 'https://cdnn21.img.ria.ru/images/98976/61/989766135_0:105:2000:1230_1920x0_80_0_0_16a8fff0f23e9297155772f93b403aed.jpg' },
        { name: 'Бургер', imageUrl: 'https://avatars.mds.yandex.net/get-altay/4598810/2a0000017bbf266180c31deb17f28fc650ce/L_height' },
        { name: 'Фалафель', imageUrl: 'https://jonikitchen.ru/wp-content/uploads/2015/07/falafel.jpg' },
        { name: 'Напиток', imageUrl: 'https://example.com/drink.jpg' }
    ];

    return (
        <div className="bg-light min-h-screen">
            {/* Main Carousel */}
            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    {mainCarouselItems.map((item, index) => (
                        <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <Link to={item.link}>
                                <img className="d-block w-100" src={item.imageUrl} alt={`Slide ${index + 1}`} />
                            </Link>
                        </div>
                    ))}
                </div>
                <CarouselControls />
            </div>

            {/* Categories Section */}
            <div className="container text-center my-3 mt-5">
                <h3>У НАС ИМЕЕТСЯ:</h3>
                <CategoryCarousel categories={categories} />
            </div>

            {/* Halal/Haram Section */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-5">
                            <Link to="/shawarma?moralitys=Харам">
                                <img className="img-fluid" src="https://ih1.redbubble.net/image.1914967287.1977/st,small,845x845-pad,1000x1000,f8f8f8.jpg" alt="Харам" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card mb-5">
                            <Link to="/shawarma?moralitys=Халяль">
                                <img className="img-fluid" src="https://media.istockphoto.com/id/1364094307/ru/vector/halal-symbol.jpg" alt="Халяль" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Products Section */}
            <div className="container text-center my-3">
                <h4>СПЕЦИАЛЬНО ДЛЯ ВАС:</h4>
                <ProductCarousel products={products} />
            </div>
        </div>
    );
};

const CarouselControls = () => (
    <>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Предыдущая</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Следующая</span>
        </a>
    </>
);

export default HomePage;