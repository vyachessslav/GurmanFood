// components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
    const pageSizes = [12, 24, 36];

    // Создаем массив номеров страниц для отображения
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Максимальное количество страниц для отображения

        if (totalPages <= maxPagesToShow) {
            // Если общее количество страниц меньше максимального, показываем все
            for (let i = 0; i < totalPages; i++) {
                pages.push(i + 1);
            }
        } else {
            // Всегда показываем первую страницу
            pages.push(1);

            // Вычисляем начальную и конечную страницы для текущего диапазона
            let start = Math.max(currentPage - 1, 2);
            let end = Math.min(start + 2, totalPages - 1);
            start = Math.min(start, totalPages - 3);

            // Добавляем многоточие перед текущим диапазоном, если нужно
            if (start > 2) {
                pages.push(-1); // -1 означает многоточие
            }

            // Добавляем страницы текущего диапазона
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Добавляем многоточие после текущего диапазона, если нужно
            if (end < totalPages - 1) {
                pages.push(-1); // -1 означает многоточие
            }

            // Всегда показываем последнюю страницу
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <ul className={`pagination d-flex justify-content-between ${className}`}>
            <div className="d-flex">
                <li className="page-item disabled">
                    <span className="page-link">Страницы</span>
                </li>
                {getPageNumbers().map((pageNum, index) => (
                    <li key={index}
                        className={`page-item ${pageNum === -1 ? 'disabled' : ''} ${pageNum === currentPage + 1 ? 'active' : ''}`}>
                        {pageNum === -1 ? (
                            <span className="page-link">...</span>
                        ) : (
                            <button
                                className={`page-link ${pageNum === currentPage + 1 ? 'bg-dark border-dark' : 'text-dark'}`}
                                onClick={() => onPageChange(pageNum - 1)}
                            >
                                {pageNum}
                            </button>
                        )}
                    </li>
                ))}
            </div>

            <div className="d-flex">
                <li className="page-item disabled ml-5">
                    <span className="page-link text-dark">Размер страницы</span>
                </li>
                {pageSizes.map(size => (
                    <li key={size} className={`page-item`}>
                        <button
                            className={`page-link text-dark`}
                            onClick={() => {
                                // Здесь должна быть логика изменения размера страницы
                                // Например, вызов родительской функции
                                console.log(`Change page size to ${size}`);
                            }}
                        >
                            {size}
                        </button>
                    </li>
                ))}
            </div>
        </ul>
    );
};

export default Pagination;