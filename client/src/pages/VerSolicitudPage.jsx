import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePedidos } from "../context/PedidoContext";
import { useSolicituds } from "../context/SolicitudContext";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

const VerSolicitudPage = () => {
  const { getSolicituds, solicituds, deleteSolicitud, updateSolicitud } = useSolicituds();
  const { getPedidos, pedido, deletePedido } = usePedidos();
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombreSolicitud, setNombreSolicitud] = useState("");
  const [descripcionSolicitud, setDescripcionSolicitud] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState(""); // Estado para la fecha de la solicitud
  const [clienteSolicitud, setClienteSolicitud] = useState(""); // Estado para el cliente de la solicitud
  const [estadoSolicitud, setEstadoSolicitud] = useState(false);
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  useEffect(() => {
    getSolicituds();
  }, []);

  useEffect(() => {
    getPedidos();
  }, []);

  useEffect(() => {
    const solicitud = solicituds.find((solicitud) => solicitud._id === id);
    if (solicitud) {
      setNombreSolicitud(solicitud.nombre);
      setDescripcionSolicitud(solicitud.descripcion);
      setFechaSolicitud(new Date(solicitud.date).toLocaleDateString("es-GT")); // Formatear la fecha
      setClienteSolicitud(solicitud.cliente); // Asignar el cliente
      setEstadoSolicitud(solicitud.estado);
    }
  }, [solicituds, id]);

  const handleAprobar = async () => {
    const confirmAprobar = window.confirm("¿Estás seguro de que quieres aprobar esta solicitud?");
    if (confirmAprobar) {
      try {
        // Actualizar la solicitud cambiando su estado a true
        await updateSolicitud(id, { estado: true, nombre: nombreSolicitud, cliente: clienteSolicitud, descripcion: descripcionSolicitud });
        
        // Registrar el historial de aprobación
        const date = new Date();
        const historialData = {
          tipo: "Aprobar",
          descripcion: `Se aprobó la solicitud ${nombreSolicitud}`,
          cantidad: 0,
          date,
          user,
        };
        createHistorial(historialData);

        console.log("Solicitud aprobada:", id);
        navigate("/requests");
      } catch (error) {
        console.error("Error al aprobar la solicitud:", error);
      }
    }
  };

  const handleEliminar = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta Solicitud?");
    if (confirmDelete) {
      try {
        await deleteSolicitud(id);

        const pedidosRelacionados = pedido.filter((place) => place.nombre === nombreSolicitud);
        for (const place of pedidosRelacionados) {
          await deletePedido(place._id);
        }
        const date = new Date();
        const historialData = {
          tipo: "Eliminar",
          descripcion: `Se eliminó la solicitud ${nombreSolicitud}`,
          cantidad: 0,
          date,
          user,
        };
        createHistorial(historialData);

        navigate("/requests");
      } catch (error) {
        console.error("Error al eliminar la solicitud o los pedidos:", error);
      }
    }
  };

  const totalSum = pedido
    .filter((place) => place.nombre === nombreSolicitud)
    .reduce((sum, place) => sum + place.total, 0);

  return (
    <div className="my-2 flex flex-col items-center">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        <Link
          to={estadoSolicitud ? "/requestsaprobadas" : "/requests"} // Navegar según el estado
          className="absolute right-4 top-4 text-gray-50 hover:text-gray-300 font-bold py-1 px-2 rounded-lg"
        >
          Regresar
        </Link>
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2"
          style={{ fontSize: "30px" }}
        >
          {nombreSolicitud}
        </h1>
      </div>

      {/* Espacio ordenado para la descripción, fecha y cliente */}
      <div className="my-4 w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="font-bold text-lg">Descripción:</h2>
          <p>{descripcionSolicitud}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Fecha de creacion:</h2>
          <p>{fechaSolicitud}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Cliente:</h2>
          <p>{clienteSolicitud}</p>
        </div>
      </div>

      <div className="my-4 overflow-x-auto w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="py-2 text-center">Nombre</th>
              <th className="py-2 text-center">Producto</th>
              <th className="py-2 text-center">Cantidad</th>
              <th className="py-2 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {pedido
              .filter((place) => place.nombre === nombreSolicitud)
              .map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">{place.nombre}</td>
                  <td className="text-center border border-green-100">{place.producto}</td>
                  <td className="text-center border border-green-100">{place.cantidad}</td>
                  <td className="text-center border border-green-100">Q.{place.total}</td>
                </tr>
              ))}
            <tr className="bg-green-200">
              <td colSpan="3" className="text-right font-bold py-2">Total General:</td>
              <td className="text-center font-bold py-2">Q.{totalSum}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 my-4">
        {estadoSolicitud === false && (
          <button
            onClick={handleAprobar}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Aprobar
          </button>
        )}
        <button
          onClick={handleEliminar}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default VerSolicitudPage;
