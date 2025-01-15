import React, { useState } from 'react';

export const AddProductPage = () => {
    const [formData, setFormData] = useState({
        shawarmaTitle: '',
        category: '',
        morality: '',
        description: '',
        price: '',
        file: null
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <div className="w-full">
            <h4 className="flex items-center mb-4">
                <i className="fas fa-plus-square mr-2"></i>
                Добавить продукт
            </h4>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2">Название продукта</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="Введите название продукта"
                            value={formData.shawarmaTitle}
                            onChange={(e) => setFormData({...formData, shawarmaTitle: e.target.value})}
                        />
                        {errors.shawarmaTitle && (
                            <div className="text-red-500 text-sm mt-1">{errors.shawarmaTitle}</div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2">Категория продукта</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="Введите категорию продукта"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2">Моральность</label>
                        <select
                            className="w-full border rounded p-2"
                            value={formData.morality}
                            onChange={(e) => setFormData({...formData, morality: e.target.value})}
                        >
                            <option value="">Выберите тип</option>
                            <option value="Халяль">Халяль</option>
                            <option value="Харам">Харам</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Описание</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="Введите описание продукта"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2">Цена</label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            placeholder="Введите цену"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Изображение</label>
                        <input
                            type="file"
                            onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                            className="mt-1"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
                >
                    <i className="fas fa-plus-square mr-2"></i>
                    Добавить
                </button>
            </form>
        </div>
    );
};
export default AddProductPage;