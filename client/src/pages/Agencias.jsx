import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAgencias } from "../context/AgenciaContext";

function Agencias() {
  const { getAgencias, agencias, deleteAgencia } = useAgencias();
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const agenciasPerPage = 10; // Número de agencias por página

  useEffect(() => {
    getAgencias();
  }, []);

  const handleDeleteClick = (agenciaId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta agencia?"
    );
    if (confirmDelete) {
      deleteAgencia(agenciaId);
    }
  };

  // Filtrar agencias según el término de búsqueda
  const filteredAgencias = agencias.filter((agencia) =>
    agencia.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas para las agencias filtradas
  const totalPages = Math.ceil(filteredAgencias.length / agenciasPerPage);

  // Lógica para calcular los índices de inicio y fin de las agencias en la página actual
  const indexOfLastAgencia = currentPage * agenciasPerPage;
  const indexOfFirstAgencia = indexOfLastAgencia - agenciasPerPage;
  const currentAgencias = filteredAgencias.slice(indexOfFirstAgencia, indexOfLastAgencia);

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Agencias
          <Link
            to="/add-agencia"
            className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        {/* Campo de búsqueda */}
        <div className="p-4 flex justify-between">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
          />
        </div>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Codigo</th>
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentAgencias.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-blue-100">
                    {place.code}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.name}
                  </td>
                  <td className="flex justify-center items-center border border-blue-100">
                    <Link
                      to={`/agencias/${place._id}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(place._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Controles de paginación */}
          <div className="flex justify-center mt-4">
            {currentPage > 1 && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {indexOfLastAgencia < filteredAgencias.length && (
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

export default Agencias;