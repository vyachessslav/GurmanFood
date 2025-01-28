import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/shawarma/${productId}`);
    };

    const handleHalalClick = () => {
        navigate('/shawarma', {
            state: {
                initialFilters: {
                    categorys: [],
                    moralitys: ['Халяль'],
                    startingPrice: 0,
                    endingPrice: 999999,
                    searchType: 'shawarmaTitle',
                    text: ''
                }
            }
        });
    };
    const handleHaramClick = () => {
        navigate('/shawarma', {
            state: {
                initialFilters: {
                    categorys: [],
                    moralitys: ['Харам'],
                    startingPrice: 0,
                    endingPrice: 999999,
                    searchType: 'shawarmaTitle',
                    text: ''
                }
            }
        });
    };
    const categories = [
        {name: 'Шаурма', imageUrl: 'https://lavash36.ru/upload/shop_1/1/8/5/item_185/item_185.jpg?202308111254'},
        {
            name: 'Пицца',
            imageUrl: 'https://cdnn21.img.ria.ru/images/98976/61/989766135_0:105:2000:1230_1920x0_80_0_0_16a8fff0f23e9297155772f93b403aed.jpg'
        },
        {
            name: 'Бургер',
            imageUrl: 'https://avatars.mds.yandex.net/get-altay/4598810/2a0000017bbf266180c31deb17f28fc650ce/L_height'
        },
        {name: 'Фалафель', imageUrl: 'https://jonikitchen.ru/wp-content/uploads/2015/07/falafel.jpg'},
        {
            name: 'Напиток',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6b7yL_XVyOGOpxw5_K7Gc4RlZGGkN2igqw&s'
        }
    ];

    const handleCategoryClick = (categoryName) => {
        navigate('/shawarma', {
            state: {
                initialFilters: {
                    categorys: [categoryName],
                    moralitys: [],
                    startingPrice: 0,
                    endingPrice: 999999,
                    searchType: 'shawarmaTitle',
                    text: ''
                }
            }
        });
    };


    const fetchProducts = async () => {
        try {
            const response = await fetch('/shawarma/popular');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.content || []);
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
            imageUrl: "https://avatars.mds.yandex.net/get-altay/4598810/2a0000017bbf266180c31deb17f28fc650ce/L_height",
            link: "/shawarma/3"
        }
    ];


    return (
        <div className="bg-light min-h-screen">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-ride="carousel">
                            <div className="carousel-inner">
                                {mainCarouselItems.map((item, index) => (
                                    <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <Link to={item.link}>
                                            <img className="d-block w-100" src={item.imageUrl}
                                                 alt={`Slide ${index + 1}`}/>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <CarouselControls/>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container text-center my-3 mt-5">
                <h3>У НАС ИМЕЕТСЯ:</h3>
                <div className="row">
                    {categories.map((category, index) => (
                        <div key={index} className="col">
                            <div className="card h-100" onClick={() => handleCategoryClick(category.name)}>
                                <img className="card-img-top" src={category.imageUrl} alt={category.name}/>
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-5" onClick={handleHaramClick}>
                            <img className="img-fluid"
                                 src="https://ih1.redbubble.net/image.1914967287.1977/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
                                 alt="Харам"/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card mb-5" onClick={handleHalalClick}>
                            <img
                                className="img-fluid"
                                src="https://cdn-icons-png.flaticon.com/512/84/84666.png"
                                alt="Халяль"
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className="container text-center my-3">
                <h4>СПЕЦИАЛЬНО ДЛЯ ВАС:</h4>
                <div id="shawarmaCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {[0, 1, 2].map((page) => (
                            <div key={page} className={`carousel-item ${page === 0 ? 'active' : ''}`}>
                                <div className="row">
                                    {products.slice(page * 4, (page + 1) * 4).map((product, index) => (
                                        <div key={index} className="col-3">
                                            <div className="card" onClick={() => handleProductClick(product.id)}
                                                 style={{cursor: 'pointer'}}>
                                                <img
                                                    className="card-img-top"
                                                    src={`/img/${product.filename}`}
                                                    alt={product.shawarmaTitle}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.shawarmaTitle}</h5>
                                                    <p className="card-text">{product.price} ₽</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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