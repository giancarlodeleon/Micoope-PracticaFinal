import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSolicituds } from "../context/SolicitudContext";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useHistorials } from "../context/HistorialContext";

function RequestPagePendientes(){
  const { user } = useAuth();
  const { getSolicituds, solicituds, deleteSolicitud } = useSolicituds();
  const { getRols, rol } = useRols();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const solicitudsPerPage = 10;
  const [Setpermiso, setPermisoToShow] = useState(null);
  const { createHistorial } = useHistorials(); 

  useEffect(() => {
    getSolicituds();
  }, []);

  useEffect(() => {
    getRols();
  }, []);

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_Request);
  }, []);

  const handleDeleteClick = (solicitudId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta Solicitud?"
    );
    if (confirmDelete) {
      const date = new Date();
      const historialData = {
        tipo: "Eliminar",
        descripcion: `Se elimino la solicitud ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteSolicitud(solicitudId);
    }
  };

  const filteredSolicituds = solicituds.filter(
    (place) =>
      place.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      place.estado === true // Filtra solo las solicitudes con estado true
  );

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
    <div className="flex-1" style={{ marginLeft: "50px" }}>
      <Link
        to=""
        className="bg-green-900 font-bold text-green-50  hover:text-green-50 border-2  border-green-300  w-full rounded-tl-lg rounded-bl-lg px-6 py-2 text-center block"
      >
        Solicitudes Pendientes 
      </Link>
    </div>
    <div className="flex-1 " style={{ marginRight: "50px" }}>
      <Link
        to="/requestsaprobadas"
        className="bg-white font-bold text-green-900 border-2 border-green-900  hover:bg-green-500 hover:text-green-50 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block"
      >
        Solicitudes Aprobadas
      </Link>
    </div>
  </div>
  <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Solicitudes Pendientes
          {Setpermiso && (
            <Link
              to="/add-request"
              className="bg-green-400 text-white hover:bg-green-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
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
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
          />
        </div>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">Nombre</th>
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
                    {place.nombre}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.descripcion}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.cliente}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.user}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.date}
                  </td>
                 
                  <td className="flex justify-center items-center border border-green-100">
                    <Link
                      to={`/clients/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(place._id, place.nombre)}
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
            {indexOfLastSolicitud < filteredSolicituds.length && (
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
  </div>
  
  );
}

export default RequestPagePendientes;
