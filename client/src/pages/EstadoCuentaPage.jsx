import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClients } from "../context/ClientContext";
import { useAuth } from "../context/AuthContext";
import { useVentas } from "../context/VentaContext";

function EstadoCuentaPage() {
  const { user } = useAuth();
  const { getClients, client } = useClients();
  const { getVentas, ventas } = useVentas();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const clientsPerPage = 10;

  useEffect(() => {
    getClients();
    getVentas(); // Obtener las ventas al cargar la página
  }, []);

  const filteredClients = client.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas para los roles filtrados
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  // Lógica para calcular los índices de inicio y fin de los roles en la página actual
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Estados de Cuenta
        </h1>
        {/* Campo de búsqueda */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
          />
        </div>
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Cliente</th>
                <th className="py-2 text-center">Nit</th>
                <th className="py-2 text-center">No. Facturas</th>
                <th className="py-2 text-center">Saldo</th>
                <th className="py-2 text-center">Pendiente</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((place) => {
                // Contar el número de ventas donde cliente coincide con el nombre del cliente
                const numFacturas = ventas.filter(
                  (venta) => venta.cliente === place.name
                ).length;

                // Calcular el saldo como la suma de los montos de las ventas asociadas al cliente
                const saldo = ventas
                  .filter((venta) => venta.cliente === place.name)
                  .reduce((total, venta) => total + venta.monto, 0);

                // Calcular el abonado como la suma del atributo pendiente de las ventas asociadas
                const abonado = ventas
                  .filter((venta) => venta.cliente === place.name)
                  .reduce((total, venta) => total + venta.pendiente, 0);

                return (
                  <tr key={place._id}>
                    <td className="text-center border border-blue-100">
                      {place.name}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.nit}
                    </td>
                    <td className="text-center border border-blue-100">
                      {numFacturas}
                    </td>
                    <td className="text-center border border-blue-100">
                      Q{saldo.toFixed(2)}
                    </td>
                    <td className="text-center border border-blue-100">
                      Q{abonado.toFixed(2)}
                    </td>
                    <td className="flex justify-center items-center border border-blue-100">
                      <Link
                        to={`/estado-cuenta/historial/${place._id}`}
                        className="bg-yellow-500 font-bold hover:bg-yellow-400 text-white py-1 px-2 rounded-lg mr-2"
                      >
                        Historial
                      </Link>

                      <Link
                        to={`/estado-cuenta/${place._id}`}
                        className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                      >
                        Facturas
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Controles de paginación */}
          <div className="flex justify-center mt-4">
            {/* Botón para ir a la página anterior */}
            {currentPage !== 1 && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {/* Botón para ir a la página siguiente */}
            {indexOfLastClient < filteredClients.length && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
          {/* Mostrar el total de páginas */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Página {currentPage} de {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EstadoCuentaPage;
