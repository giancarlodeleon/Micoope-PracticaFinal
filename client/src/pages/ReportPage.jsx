import { useEffect, useState } from "react";
import { useSolicituds } from "../context/SolicitudContext";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";
import { usePedidos } from "../context/PedidoContext";
import { useClients } from "../context/ClientContext";
import { useProveedors } from "../context/ProveedorContext";
import { useProducts } from "../context/ProductContext";
import { useSolicitudsCompra } from "../context/SolicitudCompraContext";
import { useGastos } from "../context/GastoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar las escalas y elementos necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportPage = () => {
  const { user } = useAuth();
  const { getClients, client } = useClients();
  const { getSolicituds, solicituds } = useSolicituds();
  const { getSolicitudsCompra, solicituds_compra } = useSolicitudsCompra();
  const { getPedidos, pedido } = usePedidos();
  const { getUsers, users } = useUsers();
  const { getProducts, products } = useProducts();
  const { getProveedors, proveedors } = useProveedors();
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSolicitud, setSelectedSolicitud] = useState("");
  const { getGastos, gastos } = useGastos();

  // Fechas de filtro
  const [startDateSolicitud, setStartDateSolicitud] = useState("");
  const [endDateSolicitud, setEndDateSolicitud] = useState("");
  const [startDatePedido, setStartDatePedido] = useState("");
  const [endDatePedido, setEndDatePedido] = useState("");
  const [startDateGastos, setStartDateGastos] = useState("");
  const [endDateGastos, setEndDateGastos] = useState("");

  useEffect(() => {
    getProducts();
    getUsers();
    getPedidos();
    getSolicituds();
    getClients();
    getSolicitudsCompra();
    getProveedors();
    getGastos();
  }, []);

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  // Filtro de solicitudes por fechas
  const filteredSolicituds = solicituds.filter((solicitud) => {
    const clientMatch = selectedClient
      ? solicitud.cliente === selectedClient
      : true;
    const userMatch = selectedUser
      ? getUsernameById(solicitud.user) === selectedUser
      : true;
    const dateMatch =
      (startDateSolicitud
        ? new Date(solicitud.date) >= new Date(startDateSolicitud)
        : true) &&
      (endDateSolicitud
        ? new Date(solicitud.date) <
          new Date(
            new Date(endDateSolicitud).setDate(
              new Date(endDateSolicitud).getDate() + 1
            )
          )
        : true);

    return clientMatch && userMatch && dateMatch;
  });

  const filteredPedidos = pedido.filter((ped) => {
    const productMatch = selectedProduct
      ? ped.producto === selectedProduct
      : true;
    const solicitudMatch = selectedSolicitud
      ? ped.nombre === selectedSolicitud
      : true;
    const dateMatch =
      (startDatePedido
        ? new Date(ped.date) >= new Date(startDatePedido)
        : true) &&
      (endDatePedido
        ? new Date(ped.date) <
          new Date(
            new Date(endDatePedido).setDate(
              new Date(endDatePedido).getDate() + 1
            )
          )
        : true);

    return productMatch && solicitudMatch && dateMatch;
  });

  const filteredGastos = gastos.filter((gasto) => {
    const dateMatch =
      (startDateGastos
        ? new Date(gasto.date) >= new Date(startDateGastos)
        : true) &&
      (endDateGastos
        ? new Date(gasto.date) <
          new Date(
            new Date(endDateGastos).setDate(
              new Date(endDateGastos).getDate() + 1
            )
          )
        : true);

    return dateMatch;
  });

  const getProductCostPrice = (productName) => {
    const product = products.find((p) => p.name === productName);
    return product ? product.cost_price : 0;
  };

  const calculateTotals = () => {
    let totalCost = 0;
    let totalSales = 0;
    let totalProfit = 0;

    filteredPedidos.forEach((place) => {
      const costPrice = getProductCostPrice(place.producto);
      const totalCostForPlace = costPrice * place.cantidad;
      totalCost += totalCostForPlace;
      totalSales += place.total;
      totalProfit += place.total - totalCostForPlace;
    });

    return { totalCost, totalSales, totalProfit };
  };

  const { totalCost, totalSales, totalProfit } = calculateTotals();

  // Cálculo de los gastos totales
  const totalGastos = filteredGastos.reduce(
    (acc, gasto) => acc + gasto.precio,
    0
  );

  // Cálculo del balance general
  const balanceGeneral = totalProfit - totalGastos;

  // Nueva función para obtener el producto con más cantidad de pedidos en el mes
  const getTopProductThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Filtrar pedidos del mes actual
    const pedidosThisMonth = filteredPedidos.filter((ped) => {
      const pedidoDate = new Date(ped.date);
      return (
        pedidoDate.getMonth() === currentMonth &&
        pedidoDate.getFullYear() === currentYear
      );
    });

    // Contar las cantidades por producto
    const productCount = pedidosThisMonth.reduce((acc, ped) => {
      if (acc[ped.producto]) {
        acc[ped.producto] += ped.cantidad;
      } else {
        acc[ped.producto] = ped.cantidad;
      }
      return acc;
    }, {});

    // Encontrar el producto con mayor cantidad
    let topProduct = "";
    let maxQuantity = 0;
    for (const product in productCount) {
      if (productCount[product] > maxQuantity) {
        maxQuantity = productCount[product];
        topProduct = product;
      }
    }

    return topProduct;
  };

  // Obtener el producto con más cantidad en este mes
  const topProduct = getTopProductThisMonth();

  const getMonthlyData = (pedidos, gastos) => {
    const currentYear = new Date().getFullYear();

    // Inicializar estructura con 0 en cada mes
    const monthlyData = Array.from({ length: 12 }, () => ({
      ganancias: 0,
      gastos: 0,
    }));

    pedidos.forEach((pedido) => {
      const date = new Date(pedido.date);
      const month = date.getMonth(); // 0 = Enero, 11 = Diciembre
      const year = date.getFullYear();

      if (year === currentYear) {
        const costPrice = getProductCostPrice(pedido.producto);
        const totalCost = costPrice * pedido.cantidad;
        monthlyData[month].ganancias += pedido.total - totalCost; // Sumar las ganancias del pedido
      }
    });

    gastos.forEach((gasto) => {
      const date = new Date(gasto.date);
      const month = date.getMonth(); // 0 = Enero, 11 = Diciembre
      const year = date.getFullYear();

      if (year === currentYear) {
        monthlyData[month].gastos += gasto.precio; // Sumar los gastos del pedido
      }
    });

    return monthlyData;
  };

  const monthlyData = getMonthlyData(filteredPedidos, filteredGastos);

  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ganancias",
        data: monthlyData.map((m) => m.ganancias),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Gastos",
        data: monthlyData.map((m) => m.gastos),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Ganancias y Gastos Mensuales" },
    },
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
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
            <h2 className="font-bold text-xl">Total de Solicitudes de Venta</h2>
            <p className="text-2xl">{solicituds.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Proveedores</h2>
            <p className="text-2xl">{proveedors.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">Total de Usuarios</h2>
            <p className="text-2xl">{users.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg shadow p-4 text-center">
            <h2 className="font-bold text-xl">
              Total de Solicitudes de Compra
            </h2>
            <p className="text-2xl">{solicituds_compra.length}</p>
          </div>
        </div>
        <div className="bg-green-100 rounded-lg shadow p-4 text-center">
          <h2 className="font-bold text-xl">
            Producto con Más Pedidos Este Mes
          </h2>
          <p className="text-2xl">{topProduct || "No hay pedidos este mes"}</p>
        </div>

        {/* Sección de Solicitudes de Venta */}
        <div className="border border-green-700 rounded-lg mb-4 py-3">
          <h1
            className="text-center rounded-lg bg-green-900 font-bold text-white py-1 relative"
            style={{ fontSize: "20px" }}
          >
            Solicitudes de Venta
          </h1>

          {/* Filtros para solicitudes */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todos los Clientes</option>
              {client.map((client) => (
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
              {users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>

            {/* Filtros de fecha */}
            <div>
              <label htmlFor="startDateSolicitud" className="font-semibold">
                Fecha Inicio
              </label>
              <input
                id="startDateSolicitud"
                type="date"
                value={startDateSolicitud}
                onChange={(e) => setStartDateSolicitud(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="endDateSolicitud" className="font-semibold">
                Fecha Fin
              </label>
              <input
                id="endDateSolicitud"
                type="date"
                value={endDateSolicitud}
                onChange={(e) => setEndDateSolicitud(e.target.value)}
                className="p-2 border rounded"
              />
            </div>
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

        {/* Sección de Pedidos */}
        <div className="border border-green-700 rounded-lg mb-4">
          <h1
            className="text-center rounded-lg bg-green-900 font-bold text-white py-1 relative"
            style={{ fontSize: "20px" }}
          >
            Pedidos
          </h1>

          {/* Filtros para pedidos */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todos los Productos</option>
              {products.map((product) => (
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
              {solicituds.map((solicitud) => (
                <option key={solicitud._id} value={solicitud.nombre}>
                  {solicitud.nombre}
                </option>
              ))}
            </select>

            {/* Filtros de fecha */}
            <div>
              <label htmlFor="startDatePedido" className="font-semibold">
                Fecha Inicio
              </label>
              <input
                id="startDatePedido"
                type="date"
                value={startDatePedido}
                onChange={(e) => setStartDatePedido(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="endDatePedido" className="font-semibold">
                Fecha Fin
              </label>
              <input
                id="endDatePedido"
                type="date"
                value={endDatePedido}
                onChange={(e) => setEndDatePedido(e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="my-2 overflow-x-auto rounded-lg">
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
                  <td
                    className="text-center border border-green-100"
                    colSpan="3"
                  >
                    Total
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{totalCost.toFixed(2)}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{totalSales.toFixed(2)}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{totalProfit.toFixed(2)}
                  </td>
                  <td className="border border-green-100"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección de Gastos */}
        <div className="border border-green-700 rounded-lg mb-4">
          <h1
            className="text-center rounded-lg bg-green-900 font-bold text-white py-1 relative"
            style={{ fontSize: "20px" }}
          >
            Gastos
          </h1>

          {/* Filtros de fecha */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div>
              <label htmlFor="startDateGastos" className="font-semibold">
                Fecha Inicio
              </label>
              <input
                id="startDateGastos"
                type="date"
                value={startDateGastos}
                onChange={(e) => setStartDateGastos(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="endDateGastos" className="font-semibold">
                Fecha Fin
              </label>
              <input
                id="endDateGastos"
                type="date"
                value={endDateGastos}
                onChange={(e) => setEndDateGastos(e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="my-2 overflow-x-auto rounded-lg">
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-2 text-center">Concepto</th>
                  <th className="py-2 text-center">Precio</th>
                  <th className="py-2 text-center">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredGastos.map((place) => (
                  <tr key={place._id}>
                    <td className="text-center border border-green-100">
                      {place.tipo}
                    </td>
                    <td className="text-center border border-green-100">
                      Q.{place.precio}
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

        {/* Balance General */}
        <div className="border border-green-700 rounded-lg mb-4">
          <h1
            className="text-center rounded-lg bg-green-900 font-bold text-white py-1 relative"
            style={{ fontSize: "20px" }}
          >
            Balance General
          </h1>
          <div className="text-center py-4">
            <p>Total Ganancia: Q.{totalProfit}</p>
            <p>Total Gastos: Q.{totalGastos}</p>
            <p>Balance General: Q.{balanceGeneral}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-center font-bold text-xl mb-4">
            Grafica por Fecha
          </h2>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
