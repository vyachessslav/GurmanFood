export const UserDetailPage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="w-full">
            <h4 className="flex items-center mb-4">
                <i className="fas fa-user-edit mr-2"></i>
                Пользователь: {user.firstName} {user.lastName}
            </h4>

            <div className="grid grid-cols-3 gap-4 border p-4 mb-8">
                <div>
                    <p className="mb-2"><span className="font-bold">ID пользователя:</span> {user.id}</p>
                    <p className="mb-2"><span className="font-bold">Email:</span> {user.email}</p>
                    <p className="mb-2"><span className="font-bold">Роль:</span> {user.roles[0]}</p>
                </div>
                <div>
                    <p className="mb-2"><span className="font-bold">Имя:</span> {user.firstName}</p>
                    <p className="mb-2"><span className="font-bold">Фамилия:</span> {user.lastName}</p>
                    <p className="mb-2"><span className="font-bold">Город:</span> {user.city}</p>
                </div>
                <div>
                    <p className="mb-2"><span className="font-bold">Адрес:</span> {user.address}</p>
                    <p className="mb-2"><span className="font-bold">Номер телефона:</span> {user.phoneNumber}</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <h5 className="text-center">Заказы отсутствуют</h5>
            ) : (
                <>
                    <h5 className="text-center mb-4">Заказы</h5>
                    <table className="w-full border-collapse border text-center">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Заказ №</th>
                            <th className="border p-2">Дата</th>
                            <th className="border p-2">Город</th>
                            <th className="border p-2">Адрес</th>
                            <th className="border p-2">Итог</th>
                            <th className="border p-2"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="border p-2">{order.id}</td>
                                <td className="border p-2">{new Date(order.date).toLocaleString()}</td>
                                <td className="border p-2">{order.city}</td>
                                <td className="border p-2">{order.address}</td>
                                <td className="border p-2">${order.totalPrice}.00</td>
                                <td className="border p-2">
                                    <a href={`/admin/order/${order.id}`} className="text-blue-600 hover:underline">
                                        Подробности
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};
export default UserDetailPage;