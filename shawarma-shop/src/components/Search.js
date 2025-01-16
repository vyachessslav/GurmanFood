
import React from 'react';

const Search = ({ searchParams, setSearchParams, options }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <select
                    name="searchType"
                    className="form-control"
                    value={searchParams.searchType}
                    onChange={(e) => setSearchParams(prev => ({
                        ...prev,
                        searchType: e.target.value
                    }))}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск..."
                    name="text"
                    value={searchParams.searchText}
                    onChange={(e) => setSearchParams(prev => ({
                        ...prev,
                        searchText: e.target.value
                    }))}
                />
            </div>
            <div className="col-md-5">
                <button type="submit" className="btn btn-dark">
                    <i className="fas fa-search mr-2"></i>
                    Поиск
                </button>
            </div>
        </div>
    );
};

export default Search;