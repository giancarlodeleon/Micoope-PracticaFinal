import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProveedors } from "../context/ProveedorContext";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useHistorials } from "../context/HistorialContext";

function ProveedorPage() {
  const { user } = useAuth();
  const { getProveedors, proveedors, deleteProveedor } = useProveedors();
  const { getRols, rol } = useRols();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const proveedorsPerPage = 10;
  const [Setpermiso, setPermisoToShow] = useState(null);
  const { createHistorial } = useHistorials();

  useEffect(() => {
    getProveedors();
  }, []);

  useEffect(() => {
    getRols();
  }, []);

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_of_Proveedor);
  }, []);

  const handleDeleteClick = (clientId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este Proveedor?"
    );
    if (confirmDelete) {
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Eliminar",
        descripcion: `Se elimino el cliente ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteProveedor(clientId);
    }
  };

  // Filtrar roles según el término de búsqueda
  const filteredProveedors = proveedors.filter((place) =>
    place.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas para los roles filtrados
  const totalPages = Math.ceil(filteredProveedors.length / proveedorsPerPage);

  // Lógica para calcular los índices de inicio y fin de los roles en la página actual
  const indexOfLastProveedor = currentPage * proveedorsPerPage;
  const indexOfFirstProveedor = indexOfLastProveedor - proveedorsPerPage;
  const currentProveedors = filteredProveedors.slice(
    indexOfFirstProveedor,
    indexOfLastProveedor
  );
  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Proveedores
          {Setpermiso && (
            <Link
              to="/add-proveedor"
              className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
              style={{ width: "36px", height: "36px" }}
            >
              +
            </Link>
          )}
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
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Codigo</th>
                <th className="py-2 text-center">Nit</th>
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Empresa</th>
                <th className="py-2 text-center">Correo</th>
                <th className="py-2 text-center">Direccion</th>
                <th className="py-2 text-center">Telefono</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProveedors.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.code}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.nit}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.nombre}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.empresa}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.email}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.direccion}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.telefono}
                  </td>

                  <td className="flex justify-center items-center border border-green-100">
                    <Link
                      to={`/proveedors/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(place._id, place.name)}
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
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {/* Botón para ir a la página siguiente (solo se muestra si no está en la última página) */}
            {indexOfLastProveedor < filteredProveedors.length && (
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

export default ProveedorPage;
