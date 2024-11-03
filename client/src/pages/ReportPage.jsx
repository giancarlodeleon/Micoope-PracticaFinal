import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSolicituds } from "../context/SolicitudContext";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";
import { usePedidos } from "../context/PedidoContext";
import { useClients } from "../context/ClientContext";
import { useProducts } from "../context/ProductContext";

const ReportPage = () => {
  const { user } = useAuth();
  const { getClients, client } = useClients();
  const { getSolicituds, solicituds } = useSolicituds();
  const { getPedidos, pedido } = usePedidos();
  const { getUsers, users } = useUsers();
  const { getProducts, products } = useProducts();

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSolicitud, setSelectedSolicitud] = useState('');

  useEffect(() => {
    getProducts();
    getUsers();
    getPedidos();
    getSolicituds();
    getClients();
  }, []);

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  const filteredSolicituds = solicituds.filter(solicitud => {
    const clientMatch = selectedClient ? solicitud.cliente === selectedClient : true;
    const userMatch = selectedUser ? getUsernameById(solicitud.user) === selectedUser : true;
    return clientMatch && userMatch;
  });

  const filteredPedidos = pedido.filter(ped => {
    const productMatch = selectedProduct ? ped.producto === selectedProduct : true;
    const solicitudMatch = selectedSolicitud ? ped.nombre === selectedSolicitud : true;
    return productMatch && solicitudMatch;
  });

  const getProductCostPrice = (productName) => {
    const product = products.find((p) => p.name === productName);
    return product ? product.cost_price : 0;
  };

  const calculateTotals = () => {
    let totalCost = 0;
    let totalSales = 0;
    let totalProfit = 0;

    filteredPedidos.forEach(place => {
      const costPrice = getProductCostPrice(place.producto);
      const totalCostForPlace = costPrice * place.cantidad;
      totalCost += totalCostForPlace;
      totalSales += place.total;
      totalProfit += place.total - totalCostForPlace;
    });

    return { totalCost, totalSales, totalProfit };
  };

  const { totalCost, totalSales, totalProfit } = calculateTotals();

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <h1 className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative" style={{ fontSize: "30px" }}>
          Reporte
        </h1>

        {/* Mostrar conteos de manera más bonita */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Clientes</h2>
            <p className="text-2xl">{client.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Productos</h2>
            <p className="text-2xl">{products.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Solicitudes</h2>
            <p className="text-2xl">{solicituds.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Pedidos</h2>
            <p className="text-2xl">{pedido.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Usuarios</h2>
            <p className="text-2xl">{users.length}</p>
          </div>
        </div>

        {/* Sección de Solicitudes con borde verde */}
        <div className="border border-green-700 rounded-lg mb-4">
          <h1 className="text-center rounded-lg bg-green-900 font-bold text-white py-1 relative" style={{ fontSize: "20px" }}>
            Solicitudes
          </h1>

          {/* Contenedor de campos de filtro para solicitudes */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todos los Clientes</option>
              {client.map(client => (
                <option key={client._id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todos los Usuarios</option>
              {users.map(user => (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="my-2 overflow-x-auto rounded-lg">
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-2 text-center">Nombre</th>
                  <th className="py-2 text-center">Descripción</th>
                  <th className="py-2 text-center">Cliente</th>
                  <th className="py-2 text-center">Usuario</th>
                  <th className="py-2 text-center">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredSolicituds.map((place) => (
                  <tr key={place._id}>
                    <td className="text-center border border-green-100">
                      {place.nombre}
                    </td>
                    <td className="text-center border border-green-100">
                      {place.descripcion}
                    </td>
                    <td className="text-center border border-green-100">
                      {place.cliente}
                    </td>
                    <td className="text-center border border-green-100">
                      {getUsernameById(place.user)}
                    </td>
                    <td className="text-center border border-green-100">
                      {new Date(place.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección de Pedidos con borde verde */}
        <div className="border border-green-700 rounded-lg mb-4">
          <h1 className="text-center rounded-lg bg-green-900 font-bold text-white py-1 relative" style={{ fontSize: "20px" }}>
            Pedidos
          </h1>

          {/* Contenedor de campos de filtro para pedidos */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todos los Productos</option>
              {products.map(product => (
                <option key={product._id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSolicitud}
              onChange={(e) => setSelectedSolicitud(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todas las Solicitudes</option>
              {solicituds.map(solicitud => (
                <option key={solicitud._id} value={solicitud.nombre}>
                  {solicitud.nombre}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full border-collapse rounded-lg mt-4">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Producto</th>
                <th className="py-2 text-center">Cantidad</th>
                <th className="py-2 text-center">Costo Total</th>
                <th className="py-2 text-center">Venta Total</th>
                <th className="py-2 text-center">Ganancia</th> 
                <th className="py-2 text-center">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredPedidos.map((place) => {
                const costPrice = getProductCostPrice(place.producto);
                const totalCost = costPrice * place.cantidad;
                return (
                  <tr key={place._id}>
                    <td className="text-center border border-green-100">
                      {place.nombre}
                    </td>
                    <td className="text-center border border-green-100">
                      {place.producto}
                    </td>
                    <td className="text-center border border-green-100">
                      {place.cantidad}
                    </td>
                    <td className="text-center border border-green-100">
                      Q.{totalCost.toFixed(2)}
                    </td>
                    <td className="text-center border border-green-100">
                      Q.{place.total}
                    </td>
                    <td className="text-center border border-green-100">
                      Q.{(place.total - totalCost).toFixed(2)}
                    </td>
                    <td className="text-center border border-green-100">
                      {new Date(place.date).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-green-200 font-bold">
                <td className="text-center border border-green-100" colSpan="3">Total</td>
                <td className="text-center border border-green-100">Q.{totalCost.toFixed(2)}</td>
                <td className="text-center border border-green-100">Q.{totalSales.toFixed(2)}</td>
                <td className="text-center border border-green-100">Q.{totalProfit.toFixed(2)}</td>
                <td className="border border-green-100"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
