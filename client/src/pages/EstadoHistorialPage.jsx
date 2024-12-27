import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentaContext";
import { useClients } from "../context/ClientContext";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";

function EstadoHistorialPage() {
  const { getUsers, users } = useUsers();
  const { getHistorials, historials } = useHistorials();
  const { getVentas, ventas } = useVentas();
  const { id } = useParams();
  const [currentVentasPage, setCurrentVentasPage] = useState(1);
  const [currentHistorialPage, setCurrentHistorialPage] = useState(1);
  const { getClients, client } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const ventasPerPage = 10;
  const historialsPerPage = 10;

  useEffect(() => {
    getVentas();
    getClients();
    getHistorials();
    getUsers();
  }, []);

  const getClientNameById = (clientId) => {
    const foundClient = client.find((c) => c._id === clientId);
    return foundClient ? foundClient.name : null;
  };

  const clientName = getClientNameById(id);

  if (!clientName) {
    return (
      <div className="text-center">
        <p>Cargando cliente...</p>
      </div>
    );
  }

  const filteredHistorials = historials.filter((place) => {
    const placeDate = new Date(place.date);
    let selectedDateObj = selectedDate ? new Date(selectedDate) : null;

    if (selectedDateObj) {
      selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    }

    const isSameDay =
      selectedDateObj &&
      placeDate.getFullYear() === selectedDateObj.getFullYear() &&
      placeDate.getMonth() === selectedDateObj.getMonth() &&
      placeDate.getDate() === selectedDateObj.getDate();

    return (
      place.descripcion.toLowerCase().includes(searchTerm2.toLowerCase()) &&
      place.cliente === clientName &&
      (!selectedDate || isSameDay)
    );
  });

  const filteredVentas = ventas.filter(
    (place) =>
      place.cliente === clientName &&
      place.FEL_serie.toLowerCase().includes(searchTerm.toLowerCase()) &&
      place.pendiente === 0
  );

  const totalVentasPages = Math.ceil(filteredVentas.length / ventasPerPage);
  const totalHistorialPages = Math.ceil(
    filteredHistorials.length / historialsPerPage
  );

  const currentVentas = filteredVentas.slice(
    (currentVentasPage - 1) * ventasPerPage,
    currentVentasPage * ventasPerPage
  );

  const currentHistorials = filteredHistorials.slice(
    (currentHistorialPage - 1) * historialsPerPage,
    currentHistorialPage * historialsPerPage
  );

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        <Link
          to={"/estado-cuenta"}
          className="absolute right-4 top-4 text-white font-bold py-2 px-4 rounded-lg hover:text-gray-300"
        >
          Regresar
        </Link>
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2"
          style={{ fontSize: "30px" }}
        >
          Historial de {clientName || "Cliente no encontrado"}
        </h1>

        {/* Buscador de ventas */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por FEL Serie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
          />
        </div>

        {/* Tabla de ventas */}
        <div className="bg-green-900 text-white text-center py-2 font-bold">
          Facturas pagadas
        </div>
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">No. Docu</th>
                <th className="py-2 text-center">No. Fact</th>
                <th className="py-2 text-center">FEL Serie</th>
                <th className="py-2 text-center">FEL Numero</th>
                <th className="py-2 text-center">Solicitud</th>
                <th className="py-2 text-center">Monto</th>
                <th className="py-2 text-center">Pendiente</th>
                <th className="py-2 text-center">Fecha Emision</th>
                <th className="py-2 text-center">Fecha Pago</th>
              </tr>
            </thead>
            <tbody>
              {currentVentas.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.numero}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.numero_factura}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.FEL_serie}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.FEL_numero}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.solicitud}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.monto}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.pendiente}
                  </td>
                  <td className="text-center border border-green-100">
                    {new Date(place.date).toLocaleDateString()}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.fecha_pago}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación Ventas */}
        <div className="flex justify-center mt-4">
          {currentVentasPage > 1 && (
            <button
              className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setCurrentVentasPage(currentVentasPage - 1)}
            >
              Anterior
            </button>
          )}
          {currentVentasPage < totalVentasPages && (
            <button
              className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg"
              onClick={() => setCurrentVentasPage(currentVentasPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>

        {/* Filtro de Historiales */}
        <div className="p-4 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Descripción:
            </label>
            <input
              type="text"
              placeholder="Buscar por descripción..."
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Fecha:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
          </div>
        </div>

        {/* Tabla de Historiales */}
        <div className="bg-green-900 text-white text-center py-2 font-bold">
          Historial de Abonos
        </div>
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">Tipo</th>
                <th className="py-2 text-center">Descripción</th>
                <th className="py-2 text-center">Cantidad</th>
                <th className="py-2 text-center">Fecha</th>
                <th className="py-2 text-center">Hora</th>
                <th className="py-2 text-center">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {currentHistorials.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.tipo}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.descripcion}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.cantidad}
                  </td>
                  <td className="text-center border border-green-100">
                    {new Date(place.date).toLocaleDateString()}
                  </td>
                  <td className="text-center border border-green-100">
                    {new Date(place.date).toLocaleTimeString()}
                  </td>
                  <td className="text-center border border-green-100">
                    {getUsernameById(place.user)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación Historiales */}
        <div className="flex justify-center mt-4">
          {currentHistorialPage > 1 && (
            <button
              className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setCurrentHistorialPage(currentHistorialPage - 1)}
            >
              Anterior
            </button>
          )}
          {currentHistorialPage < totalHistorialPages && (
            <button
              className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg"
              onClick={() => setCurrentHistorialPage(currentHistorialPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EstadoHistorialPage;
