import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentaContext";
import { useClients } from "../context/ClientContext";
import { useUsers } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

function EstadoFacturaPage() {
  const { getVentas, ventas } = useVentas();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { getClients, client } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const ventasPerPage = 10;
  const { getUsers } = useUsers();

  useEffect(() => {
    getVentas();
    getClients();
  }, []);

  const getClientNameById = (clientId) => {
    const foundClient = client.find((c) => c._id === clientId);
    return foundClient ? foundClient.name : null;
  };

  const clientName = getClientNameById(id); // Obtener el nombre del cliente

  // Filtrar las ventas según el cliente y el término de búsqueda
  const filteredVentas = ventas.filter(
    (place) =>
      (!clientName || place.cliente === clientName) &&
      place.FEL_serie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas para las ventas filtradas
  const totalPages = Math.ceil(filteredVentas.length / ventasPerPage);

  // Lógica para calcular los índices de inicio y fin de las ventas en la página actual
  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = filteredVentas.slice(
    indexOfFirstVenta,
    indexOfLastVenta
  );

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        {/* Botón "Regresar" */}
        <Link
          to={"/estado-cuenta"}
          className="absolute right-4 top-4  text-white font-bold py-2 px-4 rounded-lg hover:text-gray-300"
        >
          Regresar
        </Link>
        {/* Título */}
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2"
          style={{ fontSize: "30px" }}
        >
          Facturas de {clientName || "Cliente no encontrado"}
        </h1>
        {/* Campo de búsqueda */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por FEL Serie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
          />
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
                <th className="py-2 text-center">Acciones</th>
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
                  <td className="flex justify-center items-center border border-green-100">
                    <Link
                      to={`/estado-cuenta/historial/${id}/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Abonar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Controles de paginación */}
          <div className="flex justify-center mt-4">
            {currentPage !== 1 && (
              <button
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {indexOfLastVenta < filteredVentas.length && (
              <button
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Página {currentPage} de {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EstadoFacturaPage;
