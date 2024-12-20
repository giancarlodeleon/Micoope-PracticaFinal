import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePedidos } from "../context/PedidoContext";
import { useSolicituds } from "../context/SolicitudContext";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

const VerSolicitudPage = () => {
  const { getSolicituds, solicituds, deleteSolicitud, updateSolicitud } =
    useSolicituds();
  const { getPedidos, pedido, deletePedido } = usePedidos();
  const { id } = useParams();
  const navigate = useNavigate();
  const [codigoSolicitud, setCodigoSolicitud] = useState("");
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [dias_creditoSolicitud, setDias_creditoSolicitud] = useState("");
  const [nombreSolicitud, setNombreSolicitud] = useState("");
  const [descripcionSolicitud, setDescripcionSolicitud] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState(""); // Estado para la fecha de la solicitud
  const [clienteSolicitud, setClienteSolicitud] = useState(""); // Estado para el cliente de la solicitud
  const [estadoSolicitud, setEstadoSolicitud] = useState(false);
  const { createHistorial } = useHistorials();
  const { user } = useAuth();
  const { getProducts, products, updateProduct } = useProducts();

  useEffect(() => {
    getSolicituds();
  }, []);

  useEffect(() => {
    getPedidos();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const solicitud = solicituds.find((solicitud) => solicitud._id === id);
    if (solicitud) {
      setCodigoSolicitud(solicitud.codigo);
      setTipoSolicitud(solicitud.tipo);
      setDias_creditoSolicitud(solicitud.dias_credito);
      setNombreSolicitud(solicitud.nombre);
      setDescripcionSolicitud(solicitud.descripcion);
      setFechaSolicitud(new Date(solicitud.date).toLocaleDateString("es-GT")); // Formatear la fecha
      setClienteSolicitud(solicitud.cliente); // Asignar el cliente
      setEstadoSolicitud(solicitud.estado);
    }
  }, [solicituds, id]);

  const handleAprobar = async () => {
    const confirmAprobar = window.confirm(
      "¿Estás seguro de que quieres aprobar esta solicitud?"
    );
    if (confirmAprobar) {
      try {
        // Verificar si todos los productos existen y tienen stock suficiente
        const pedidosRelacionados = pedido.filter(
          (place) => place.nombre === nombreSolicitud
        );
        const missingOrInsufficientProducts = pedidosRelacionados.filter(
          (place) => {
            const productoEncontrado = products.find(
              (product) => product.name === place.producto
            );

            // Verificar si el producto existe y tiene stock suficiente
            return (
              !productoEncontrado || place.cantidad > productoEncontrado.stock
            );
          }
        );

        if (missingOrInsufficientProducts.length > 0) {
          // Listar productos faltantes o con stock insuficiente en una alerta
          const productIssues = missingOrInsufficientProducts
            .map((place) => {
              const productoEncontrado = products.find(
                (product) => product.name === place.producto
              );
              return productoEncontrado
                ? `${place.producto} (solicitado: ${place.cantidad}, disponible: ${productoEncontrado.stock})`
                : `${place.producto} (no disponible)`;
            })
            .join(", ");

          alert(
            `No se puede aprobar la solicitud. Problemas con los siguientes productos: ${productIssues}`
          );
          return; // Detener la función si hay productos con problemas
        }

        // Si todos los productos cumplen con las condiciones, actualizar la solicitud a aprobada
        await updateSolicitud(id, {
          estado: true,
          codigo: codigoSolicitud,
          tipo: tipoSolicitud,
          dias_credito: dias_creditoSolicitud,
          nombre: nombreSolicitud,
          cliente: clienteSolicitud,
          descripcion: descripcionSolicitud,
        });

        // Registrar la aprobación en el historial
        const date = new Date();
        const historialData = {
          tipo: "Aprobar",
          descripcion: `Se aprobó la solicitud ${nombreSolicitud}`,
          cantidad: 0,
          date,
          user,
        };
        await createHistorial(historialData);

        // Actualizar el stock de los productos
        for (const place of pedidosRelacionados) {
          const productoEncontrado = products.find(
            (product) => product.name === place.producto
          );
          if (productoEncontrado) {
            const nuevoStock = productoEncontrado.stock - place.cantidad;
            await updateProduct(productoEncontrado._id, {
              stock: nuevoStock,
              code: productoEncontrado.code,
              name: productoEncontrado.name,
              presentation: productoEncontrado.presentation,
              cost_price: productoEncontrado.cost_price,
              selling_price_1: productoEncontrado.selling_price_1,
              selling_price_2: productoEncontrado.selling_price_2,
              selling_price_3: productoEncontrado.selling_price_3,
              minimum_stock: productoEncontrado.minimum_stock,
              comision: productoEncontrado.comision,
            }); // Actualizar el stock del producto
          }
        }

        console.log("Solicitud aprobada y stock actualizado:", id);
        navigate("/requests");
      } catch (error) {
        console.error(
          "Error al aprobar la solicitud o actualizar el stock:",
          error
        );
      }
    }
  };

  const handleEliminar = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta Solicitud?"
    );
    if (confirmDelete) {
      try {
        await deleteSolicitud(id);

        const pedidosRelacionados = pedido.filter(
          (place) => place.nombre === nombreSolicitud
        );
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
                  <td className="text-center border border-green-100">
                    {place.nombre}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.producto}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.cantidad}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{place.total}
                  </td>
                </tr>
              ))}
            <tr className="bg-green-200">
              <td colSpan="3" className="text-right font-bold py-2">
                Total General:
              </td>
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
        {estadoSolicitud === true && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Imprimir PDF
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
