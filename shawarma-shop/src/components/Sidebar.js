
import React from 'react';

const Sidebar = ({ filters, setFilters }) => {
    const categories = ['Шаурма', 'Денер', 'Бургер', 'Пицца', 'Напиток', 'Классика'];
    const moralities = ['Халяль', 'Харам'];
    const priceRanges = [
        { start: 0, end: 9999999, label: 'Все' },
        { start: 10, end: 160, label: '10₽ - 160₽' },
        { start: 160, end: 250, label: '160₽ - 250₽' },
        { start: 250, end: 500, label: '250₽ - 500₽' },
        { start: 500, end: 5000, label: '500₽ - 5000₽' }
    ];

    const selectedCategories = filters.categorys || [];
    const selectedMoralities = filters.moralitys || [];

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            categorys: selectedCategories.includes(category)
                ? selectedCategories.filter(c => c !== category)
                : [...selectedCategories, category]
        }));
    };

    const handleMoralityChange = (morality) => {
        setFilters(prev => ({
            ...prev,
            moralitys: selectedMoralities.includes(morality)
                ? selectedMoralities.filter(m => m !== morality)
                : [...selectedMoralities, morality]
        }));
    };

    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Меню</h3>
            </div>
            <form>
                <ul className="list-unstyled components">
                    <h5>Категории</h5>
                    <li className="active mb-2">
                        <ul className="list-unstyled">
                            {categories.map(category => (
                                <li key={category}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <label className="form-check-label">
                                            {category}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <h5>Моральность</h5>
                    <li className="active mb-2">
                        <ul className="list-unstyled">
                            {moralities.map(morality => (
                                <li key={morality}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={selectedMoralities.includes(morality)}
                                            onChange={() => handleMoralityChange(morality)}
                                        />
                                        <label className="form-check-label">
                                            {morality}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <h5>Цена</h5>
                    <li className="active mb-2">
                        <ul className="list-unstyled">
                            {priceRanges.map(range => (
                                <li key={`${range.start}-${range.end}`}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={filters.startingPrice === range.start && filters.endingPrice === range.end}
                                            onChange={() => setFilters(prev => ({
                                                ...prev,
                                                startingPrice: range.start,
                                                endingPrice: range.end
                                            }))}
                                        />
                                        <label className="form-check-label">
                                            {range.label}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </form>
        </nav>
    );
};

export default Sidebar;