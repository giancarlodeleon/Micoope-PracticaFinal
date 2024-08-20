import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRols } from "../context/RolContext";

function Roles() {
  const { getRols, rol, deleteRol } = useRols();
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const rolsPerPage = 10; // Número de roles por página

  useEffect(() => {
    getRols();
  }, []);

  const handleDeleteClick = (roleId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este rol?"
    );
    if (confirmDelete) {
      deleteRol(roleId);
    }
  };

  // Filtrar roles según el término de búsqueda
  const filteredRols = rol.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas para los roles filtrados
  const totalPages = Math.ceil(filteredRols.length / rolsPerPage);

  // Lógica para calcular los índices de inicio y fin de los roles en la página actual
  const indexOfLastRol = currentPage * rolsPerPage;
  const indexOfFirstRol = indexOfLastRol - rolsPerPage;
  const currentRols = filteredRols.slice(indexOfFirstRol, indexOfLastRol);

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Roles
          <Link
            to="/add-rol"
            className="bg-green-400 text-white hover:bg-green-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        {/* Campo de búsqueda */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
          />
        </div>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Manejo de informacion</th>
                <th className="py-2 text-center">Inventario</th>
                <th className="py-2 text-center">Reporte</th>
                <th className="py-2 text-center">Clientes</th>
                <th className="py-2 text-center">Agregar Clientes</th>
                <th className="py-2 text-center">Agregar Productos</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentRols.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.name}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.permission_of_information ? "Activo" : "Desactivo"}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.permission_Warehouse ? "Activo" : "Desactivo"}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.permission_Summary ? "Activo" : "Desactivo"}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.permission_of_Client ? "Activo" : "Desactivo"}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.permission_of_add_Client ? "Activo" : "Desactivo"}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.permission_of_add_Product ? "Activo" : "Desactivo"}
                  </td>
                  <td className="flex justify-center items-center border border-green-100">
                    <Link
                      to={`/rols/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
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
            {/* Botón para ir a la página anterior (solo se muestra si no está en la primera página) */}
            {currentPage !== 1 && (
              <button
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {/* Botón para ir a la página siguiente (solo se muestra si no está en la última página) */}
            {indexOfLastRol < filteredRols.length && (
              <button
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg"
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

export default Roles;
