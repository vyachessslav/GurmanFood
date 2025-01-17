
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
    const pageSizes = [12, 24, 36];


    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i + 1);
            }
        } else {
            pages.push(1);

            let start = Math.max(currentPage - 1, 2);
            let end = Math.min(start + 2, totalPages - 1);
            start = Math.min(start, totalPages - 3);
            if (start > 2) {
                pages.push(-1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push(-1);
            }
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