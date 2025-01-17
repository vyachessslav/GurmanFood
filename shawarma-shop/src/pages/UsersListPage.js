import React, { useState } from 'react';

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchType, setSearchType] = useState('email');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);

  const searchOptions = [
    { value: 'email', text: 'Email' },
    { value: 'firstName', text: 'Имя' },
    { value: 'lastName', text: 'Фамилия' }
  ];

  return (
      <div className="w-full">
        <h4 className="flex items-center mb-4">
          <i className="fas fa-users mr-2"></i>
          Список всех пользователей
        </h4>

        <form className="my-6">
          <div className="grid grid-cols-3 gap-4">
            <select
                className="border rounded p-2"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
              {searchOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
              ))}
            </select>
            <input
                type="text"
                className="border rounded p-2"
                placeholder="Поиск..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
            >
              <i className="fas fa-search mr-2"></i>
              Поиск
            </button>
          </div>
        </form>

        {users.length === 0 ? (
            <div className="text-center my-8">
              <h3>Пользователи не найдены</h3>
            </div>
        ) : (
            <div>
              <table className="w-full border-collapse border text-center">
                <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">id</th>
                  <th className="border p-2">Имя</th>
                  <th className="border p-2">Фамилия</th>
                  <th className="border p-2">E-mail</th>
                  <th className="border p-2">Роль</th>
                  <th className="border p-2"></th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                      <td className="border p-2">{user.id}</td>
                      <td className="border p-2">{user.firstName}</td>
                      <td className="border p-2">{user.lastName}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">{user.roles[0]}</td>
                      <td className="border p-2">
                        <a href={`/admin/user/${user.id}`} className="text-blue-600 hover:underline">
                          Подробности
                        </a>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default UsersListPage;