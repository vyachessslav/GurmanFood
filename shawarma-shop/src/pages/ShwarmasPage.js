import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import ProductCard from '../components/ProductCard';

const ShwarmasPage = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        size: 12
    });

    const [searchRequest, setSearchRequest] = useState({
        categorys: [],
        moralitys: [],
        startingPrice: 0,
        endingPrice: 999999,
        searchType: 'shawarmaTitle',
        text: ''
    });

    useEffect(() => {
        fetchProducts();
    }, [pagination.currentPage, pagination.size, searchRequest]);

    const fetchProducts = async () => {
        try {
            let url = new URL('/shawarma', window.location.origin);
            let params = new URLSearchParams({
                page: pagination.currentPage,
                size: pagination.size,
                ...searchRequest
            });

            searchRequest.categorys.forEach(category => {
                params.append('categorys', category);
            });
            searchRequest.moralitys.forEach(morality => {
                params.append('moralitys', morality);
            });

            url.search = params.toString();
            const response = await fetch(url);
            const data = await response.json();

            setProducts(data.content);
            setPagination(prev => ({
                ...prev,
                currentPage: data.number,
                totalPages: data.totalPages,
                size: data.size
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = async () => {
        try {
            let url = new URL('/shawarma/search', window.location.origin);

            let params = new URLSearchParams({
                page: pagination.currentPage,
                size: pagination.size,
                searchType: searchRequest.searchType,
                text: searchRequest.text
            });

            url.search = params.toString();
            const response = await fetch(url);
            const data = await response.json();

            setProducts(data.content);
            setPagination(prev => ({
                ...prev,
                totalPages: data.totalPages
            }));
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    return (
        <div className="bg-light">
            <div className="container d-flex bg-white shadow-sm">
                <Sidebar
                    filters={searchRequest}
                    setFilters={setSearchRequest}
                />

                <div className="container mb-5">
                    <div className="container-fluid mt-5 ml-1">
                        <Search
                            searchParams={{
                                searchType: searchRequest.searchType,
                                text: searchRequest.text
                            }}
                            setSearchParams={(newParams) => {
                                setSearchRequest(prev => ({
                                    ...prev,
                                    ...newParams
                                }));
                            }}
                            onSearch={handleSearch}
                            options={[
                                { value: 'category', text: 'Категория' },
                                { value: 'shawarmaTitle', text: 'Название продукта' }
                            ]}
                        />
                    </div>

                    <div className="mt-4 ml-1">
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={(page) => setPagination(prev => ({
                                ...prev,
                                currentPage: page
                            }))}
                            onSizeChange={(size) => setPagination(prev => ({
                                ...prev,
                                size: size,
                                currentPage: 0
                            }))}
                            className="mx-3"
                        />

                        <div className="container-fluid">
                            <div className="row">
                                {products.length === 0 ? (
                                    <div className="col-lg-12 my-5">
                                        <h3 className="text-center mx-5">Продукт не найден</h3>
                                    </div>
                                ) : (
                                    products.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                )}
                            </div>
                        </div>

                        {products.length > 0 && (
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={(page) => setPagination(prev => ({
                                    ...prev,
                                    currentPage: page
                                }))}
                                onSizeChange={(size) => setPagination(prev => ({
                                    ...prev,
                                    size: size,
                                    currentPage: 0
                                }))}
                                className="mx-3"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShwarmasPage;