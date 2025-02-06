import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePedidos } from "../context/PedidoContext";
import { useSolicituds } from "../context/SolicitudContext";
import { useHistorials } from "../context/HistorialContext";
import { useClients } from "../context/ClientContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { jsPDF } from "jspdf"; // Importar jsPDF
import "jspdf-autotable"; // Para tablas
import Logo from "../assets/cinagro.jpg";

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
  const [observacionSolicitud, setObservacionSolicitud] = useState("");
  const { getClients, client } = useClients();
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [clienteSolicitud, setClienteSolicitud] = useState("");
  const [clienteNit, setClienteNit] = useState("");
  const [estadoSolicitud, setEstadoSolicitud] = useState(false);
  const [clienteDireccion, setClienteDireccion] = useState("");
  const [clienteMunicipio, setClienteMunicipio] = useState("");
  const [clienteCode, setClienteCode] = useState("");
  const [clienteDepartamento, setClienteDepartamento] = useState("");
  const { createHistorial } = useHistorials();
  const { user } = useAuth();
  const { getProducts, products, updateProduct } = useProducts();

  useEffect(() => {
    getSolicituds();
    getClients();
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
      setObservacionSolicitud(solicitud.observacion);
      setFechaSolicitud(new Date(solicitud.date).toLocaleDateString("es-GT"));
      setClienteSolicitud(solicitud.cliente);
      setEstadoSolicitud(solicitud.estado);
      setClienteNit(solicitud.nit);

      const cliente = client.find((c) => c.nit === solicitud.nit);
      setClienteDireccion(cliente?.direction || "Dirección no disponible");
      setClienteMunicipio(cliente?.municipio || "Municipio no disponible");
      setClienteDepartamento(
        cliente?.department || "Departamento no disponible"
      );
      setClienteCode(cliente?.code || "Codigo no disponible");
    }
  }, [solicituds, id]);

  const handleAprobar = async () => {
    const confirmAprobar = window.confirm(
      "¿Estás seguro de que quieres aprobar esta solicitud?"
    );
    if (confirmAprobar) {
      try {
        const pedidosRelacionados = pedido.filter(
          (place) => place.nombre === nombreSolicitud
        );
        const missingOrInsufficientProducts = pedidosRelacionados.filter(
          (place) => {
            const productoEncontrado = products.find(
              (product) => product.name === place.producto
            );
            return (
              !productoEncontrado || place.cantidad > productoEncontrado.stock
            );
          }
        );

        if (missingOrInsufficientProducts.length > 0) {
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
          return;
        }

        await updateSolicitud(id, {
          estado: true,
          codigo: codigoSolicitud,
          tipo: tipoSolicitud,
          dias_credito: dias_creditoSolicitud,
          nit: clienteNit,
          nombre: nombreSolicitud,
          cliente: clienteSolicitud,
          descripcion: descripcionSolicitud,
          observacion: observacionSolicitud,
        });

        const date = new Date();
        const historialData = {
          num_doc: "n/a",
          recibo: "n/a",
          banco: "n/a",
          tipo_pago: "n/a",
          cliente: "n/a",
          tipo: "Aprobar",
          descripcion: `Se aprobó la solicitud ${nombreSolicitud}`,
          cantidad: 0,
          date,
          user,
        };
        await createHistorial(historialData);

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
            });
          }
        }

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
          num_doc: "n/a",
          recibo: "n/a",
          banco: "n/a",
          tipo_pago: "n/a",
          cliente: "n/a",
          tipo: "Eliminar",
          descripcion: `Se eliminó la solicitud de venta ${nombreSolicitud}`,
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

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Logo
    const logo = new Image();
    logo.src = Logo;
    doc.addImage(logo, "JPEG", 10, 10, 50, 20); // Ancho ajustado de 40 a 50

    // Encabezado
    doc.setFontSize(12);
    doc.text("CINAGRO SOCIEDAD ANONIMA", 60, 15);
    doc.setFontSize(10);
    doc.text("Trabajando por un mejor futuro agrícola", 60, 20);
    doc.text("GUATEMALA - GUATEMALA", 60, 25);
    doc.text("Tel: 5466-48578", 60, 30);

    const fechaVencimiento =
      dias_creditoSolicitud && dias_creditoSolicitud > 0
        ? new Date(
            new Date(fechaSolicitud.split("/").reverse().join("-")).getTime() +
              dias_creditoSolicitud * 24 * 60 * 60 * 1000
          ).toLocaleDateString("es-GT")
        : "N/A";

    // Información del cliente y solicitud
    doc.setFontSize(11);
    doc.text("No. de Documento:", 150, 20);
    doc.setTextColor(255, 0, 0);
    doc.text(`${codigoSolicitud}`, 185, 20);
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    doc.text("Fecha de Creacion:", 150, 25);
    doc.text(`${fechaSolicitud}`, 185, 25);
    doc.text("Forma de Pago:", 150, 30);
    doc.text(
      `${
        dias_creditoSolicitud
          ? "Crédito (" + dias_creditoSolicitud + " días)"
          : "Contado"
      }`,
      180,
      30
    );
    doc.text("Fecha de Vencimiento:", 150, 35); // Nueva línea
    doc.text(`${fechaVencimiento}`, 190, 35); // Nueva línea

    doc.text("Nombre del cliente:", 10, 40);
    doc.text(`${clienteSolicitud}`, 45, 40);
    doc.text("Dirección:", 10, 45);
    doc.text(
      `${clienteDireccion},${clienteMunicipio},${clienteDepartamento}`,
      40,
      45
    );
    doc.text("Nit cliente:", 10, 50);
    doc.text(`${clienteNit}`, 40, 50);
    doc.text("Codigo de Cliente:", 10, 55);
    doc.text(`${clienteCode}`, 40, 55);

    // Tabla de productos
    const pedidosRelacionados = pedido.filter(
      (place) => place.nombre === nombreSolicitud
    );

    const rows = pedidosRelacionados.map((place) => {
      const productoEncontrado = products.find(
        (product) => product.name === place.producto
      );
      return [
        productoEncontrado?.presentation || "N/A", // Presentación
        place.producto, // Descripción
        `${place.cantidad}`, // Cantidad
        `Q.${place.precio}`, // Valor unitario
        `Q.${place.total}`, // Total
      ];
    });

    doc.autoTable({
      startY: 60,
      head: [["Presentación", "Descripción", "Cantidad", "Unidad", "Total"]],
      body: rows,
      styles: { fontSize: 9 },
    });

    // Totales
    const finalY = doc.autoTable.previous.finalY;
    doc.text("Sub Total:", 150, finalY + 10);
    doc.text(`Q.${totalSum}`, 180, finalY + 10);
    doc.text("TOTAL:", 150, finalY + 15);
    doc.text(`Q.${totalSum}`, 180, finalY + 15);

    // Observaciones
    doc.text("Observaciones:", 10, finalY + 25);
    if (observacionSolicitud.trim() === "") {
      doc.text(
        "Producto entregado en lugar indicado por el cliente.",
        10,
        finalY + 30
      );
    } else {
      doc.text(observacionSolicitud, 10, finalY + 30);
    }

    // Firma
    doc.text("Recibí Conforme__________________________", 105, finalY + 50, {
      align: "center",
    });
    doc.text("Firma y Sello_____________________________", 105, finalY + 60, {
      align: "center",
    });
    doc.text("¡TRABAJANDO POR UN MEJOR FUTURO AGRÍCOLA!", 105, finalY + 70, {
      align: "center",
    });

    // Guardar el archivo PDF
    doc.save(`Solicitud_${codigoSolicitud}.pdf`);
  };

  const totalSum = pedido
    .filter((place) => place.nombre === nombreSolicitud)
    .reduce((sum, place) => sum + place.total, 0);

  return (
    <div className="my-2 flex flex-col items-center">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        <Link
          to={estadoSolicitud ? "/requestsaprobadas" : "/requests"}
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
              <th className="py-2 text-center">Valor Unitario</th>
              <th className="py-2 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {pedido
              .filter((place) => place.nombre === nombreSolicitud)
              .map((place) => {
                const productoEncontrado = products.find(
                  (product) => product.name === place.producto
                );

                return (
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
                      Q.{place.precio}
                    </td>
                    <td className="text-center border border-green-100">
                      Q.{place.total}
                    </td>
                  </tr>
                );
              })}
            <tr className="bg-green-200">
              <td colSpan="4" className="text-right font-bold py-2">
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
            onClick={handleGeneratePDF}
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
