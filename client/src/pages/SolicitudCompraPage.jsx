import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSolicitudsCompra } from "../context/SolicitudCompraContext";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";
import { usePedidosCompra } from "../context/PedidoCompraContext";

function SolicitudCompraPage() {
  const { user } = useAuth();
  const { getSolicitudsCompra, solicituds_compra, deleteSolicitudCompra } = useSolicitudsCompra();
  const { getRols, rol } = useRols();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada
  const solicitudsPerPage = 10;
  const [Setpermiso, setPermisoToShow] = useState(null);
  const [Setpermiso2, setPermisoToShow2] = useState(null);
  const { createHistorial } = useHistorials();
  const { getUsers, users } = useUsers();
  const { getPedidosCompra, pedido_compra, deletePedidoCompra } = usePedidosCompra();

  useEffect(() => {
    getSolicitudsCompra();
  }, []);

  useEffect(() => {
    getRols();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getPedidosCompra();
  }, []);

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_Request);
  }, []);

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow2(permiso.permission_See_Request);
  }, []);

  const handleDeleteClick = (solicitudId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta Solicitud?"
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
        descripcion: `Se elimino la solicitud de compra ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteSolicitudCompra(solicitudId);
      const pedidosAEliminar = pedido_compra.filter((p) => p.solicitud === Nombre);

      for (const pedidoToDelete of pedidosAEliminar) {
        deletePedidoCompra(pedidoToDelete._id);
      }
    }
  };

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  // Filtrar solicitudes por nombre y fecha seleccionada
  const filteredSolicituds = solicituds_compra.filter((place) => {
    const placeDate = new Date(place.date);
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

    if (selectedDateObj) {
      selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    }

    const isSameDay =
      selectedDateObj &&
      placeDate.getFullYear() === selectedDateObj.getFullYear() &&
      placeDate.getMonth() === selectedDateObj.getMonth() &&
      placeDate.getDate() === selectedDateObj.getDate();

    return (
      place.nombre.toLowerCase().includes(searchTerm.toLowerCase())  &&
      (!selectedDate || isSameDay)
    );
  });

  const totalPages = Math.ceil(filteredSolicituds.length / solicitudsPerPage);
  const indexOfLastSolicitud = currentPage * solicitudsPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudsPerPage;
  const currentSolicituds = filteredSolicituds.slice(
    indexOfFirstSolicitud,
    indexOfLastSolicitud
  );


  return (
    <div className="my-2 overflow-x-auto rounded-lg">
     
      <div className="flex justify-center p-4">
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
          <h1
            className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
            style={{ fontSize: "30px" }}
          >
            Solicitudes de Compras
            {Setpermiso && (
              <Link
                to="/add-solicitud-compra"
                className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
                style={{ width: "36px", height: "36px" }}
              >
                +
              </Link>
            )}
          </h1>
          {/* Contenedor para el campo de búsqueda y el campo de filtro de fecha */}
          <div className="flex p-4 space-x-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
            />
            <div>
              <label>Fecha: </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
              />
            </div>
          </div>
          <div className="my-2 overflow-x-auto rounded-lg">
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-2 text-center">Codigo</th>
                  <th className="py-2 text-center">Nombre</th>
                  <th className="py-2 text-center">Tipo</th>
                  <th className="py-2 text-center">NIT</th>
                  <th className="py-2 text-center">Proveedor</th>
                  <th className="py-2 text-center">Descripcion</th>
                  <th className="py-2 text-center">Usuario</th>
                  <th className="py-2 text-center">Fecha</th>
                  <th className="py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentSolicituds.map((place) => (
                  <tr key={place._id}>
                    <td className="text-center border border-blue-100">
                      {place.codigo}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.nombre}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.tipo}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.nit}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.proveedor}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.descripcion}
                    </td>
                    <td className="text-center border border-blue-100">
                      {getUsernameById(place.user)}
                    </td>
                    <td className="text-center border border-blue-100">
                      {new Date(place.date).toLocaleDateString()}
                    </td>
                    <td className="flex justify-center items-center border border-green-100">
                      {Setpermiso2 && (
                        <Link
                          to={{
                            pathname: `/solicitudes_compra/${place._id}`,
                            state: { name: place.nombre },
                          }}
                          className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                        >
                          Ver
                        </Link>
                      )}
                      <button
                        className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                        onClick={() =>
                          handleDeleteClick(place._id, place.nombre)
                        }
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
              {currentPage !== 1 && (
                <button
                  className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </button>
              )}
              {indexOfLastSolicitud < filteredSolicituds.length && (
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
    </div>
  );
}

export default SolicitudCompraPage