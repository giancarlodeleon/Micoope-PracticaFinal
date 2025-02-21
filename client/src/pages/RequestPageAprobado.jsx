import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSolicituds } from "../context/SolicitudContext";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";
import { usePedidos } from "../context/PedidoContext";

function RequestPageAprobado() {
  const { user } = useAuth();
  const { getSolicituds, solicituds, deleteSolicitud } = useSolicituds();
  const { getRols, rol } = useRols();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada
  const solicitudsPerPage = 10;
  const [Setpermiso2, setPermisoToShow2] = useState(null);
  const { createHistorial } = useHistorials();
  const { getUsers, users } = useUsers();
  const { getPedidos, pedido, deletePedido } = usePedidos();

  useEffect(() => {
    getSolicituds();
  }, []);

  useEffect(() => {
    getRols();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getPedidos();
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
        descripcion: `Se elimino la solicitud de venta ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteSolicitud(solicitudId);
      const pedidosAEliminar = pedido.filter((p) => p.nombre === Nombre);

      for (const pedidoToDelete of pedidosAEliminar) {
        deletePedido(pedidoToDelete._id);
      }
    }
  };

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  // Filtrar solicitudes por nombre y fecha seleccionada
  const filteredSolicituds = solicituds.filter((place) => {
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
      place.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      place.estado === true &&
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
      <div className="flex justify-between">
        <div className="flex-1 " style={{ marginLeft: "50px" }}>
          <Link
            to="/requests"
            className="bg-white font-bold text-blue-900 border-2 border-blue-900  hover:bg-blue-500 hover:text-blue-50 w-full rounded-bl-lg rounded-tl-lg px-6 py-2 text-center block"
          >
            Solicitudes de Ventas Pendientes
          </Link>
        </div>
        <div className="flex-1" style={{ marginRight: "50px" }}>
          <Link
            to=""
            className="bg-blue-900 font-bold text-blue-50  hover:text-blue-50 border-2 border-blue-300 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block"
          >
            Solicitudes de Ventas Aprobadas
          </Link>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
          <h1
            className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
            style={{ fontSize: "30px" }}
          >
            Solicitudes de Ventas Aprobadas
          </h1>
          {/* Campo de búsqueda y filtro de fecha */}
          <div className="flex p-4 space-x-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
            <div>
              <label>Fecha: </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
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
                  <th className="py-2 text-center">Descripcion</th>
                  <th className="py-2 text-center">Cliente</th>
                  <th className="py-2 text-center">Usuario</th>
                  <th className="py-2 text-center">Fecha</th>
                  <th className="py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentSolicituds.map((place) => (
                  <tr key={place._id}>
                    <td className="text-center border border-green-100">
                      {place.codigo}
                    </td>
                    <td className="text-center border border-green-100">
                      {place.nombre}
                    </td>
                    <td className="text-center border border-green-100">
                      {place.tipo}
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
                    <td className="flex justify-center items-center border border-green-100">
                      {Setpermiso2 && (
                        <Link
                          to={{
                            pathname: `/solicitudes/${place._id}`,
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
            <p className="text-center text-sm text-gray-500 my-2">
              Página {currentPage} de {totalPages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPageAprobado;
