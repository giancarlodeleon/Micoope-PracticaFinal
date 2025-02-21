import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePedidosCompra } from "../context/PedidoCompraContext";
import { useSolicitudsCompra } from "../context/SolicitudCompraContext";
import { useHistorials } from "../context/HistorialContext";
import { useProveedors } from "../context/ProveedorContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { jsPDF } from "jspdf"; // Importar jsPDF
import "jspdf-autotable"; // Para tablas
import Logo from "../assets/cinagro.jpg";

function VerSolicitudCompraPage() {
  const { getSolicitudsCompra, solicituds_compra, deleteSolicitudCompra } =
    useSolicitudsCompra();
  const { getPedidosCompra, pedido_compra, deletePedidoCompra } =
    usePedidosCompra();
  const { id } = useParams();
  const navigate = useNavigate();
  const [codigoSolicitud, setCodigoSolicitud] = useState("");
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [nombreSolicitud, setNombreSolicitud] = useState("");
  const [descripcionSolicitud, setDescripcionSolicitud] = useState("");
  const { getProveedors, proveedors } = useProveedors();
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [proveedorSolicitud, setProveedorSolicitud] = useState("");
  const [proveedorNit, setProveedorNit] = useState("");
  const [proveedorDireccion, setProveedorDireccion] = useState("");
  const [proveedorCode, setProveedorCode] = useState("");
  const [proveedorEmpresa, setProveedorEmpresa] = useState("");
  const { createHistorial } = useHistorials();
  const { user } = useAuth();
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getSolicitudsCompra();
    getProveedors();
  }, []);

  useEffect(() => {
    getPedidosCompra();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const solicitud = solicituds_compra.find(
      (solicitud) => solicitud._id === id
    );
    if (solicitud) {
      setCodigoSolicitud(solicitud.codigo);
      setTipoSolicitud(solicitud.tipo);
      setNombreSolicitud(solicitud.nombre);
      setDescripcionSolicitud(solicitud.descripcion);
      setFechaSolicitud(new Date(solicitud.date).toLocaleDateString("es-GT"));
      setProveedorSolicitud(solicitud.proveedor);
      setProveedorNit(solicitud.nit);

      const proveedor = proveedors.find((c) => Number(c.nit) === Number(proveedorNit));
      setProveedorDireccion(proveedor?.direccion || "Dirección no disponible");
      setProveedorCode(proveedor?.code || "Codigo no disponible");
      setProveedorEmpresa(proveedor?.empresa || "Empresa no disponible");
    }
  }, [solicituds_compra, id]);

  const handleEliminar = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta Solicitud?"
    );
    if (confirmDelete) {
      try {
        await deleteSolicitudCompra(id);

        const pedidosRelacionados = pedido_compra.filter(
          (place) => place.solicitud === nombreSolicitud
        );
        for (const place of pedidosRelacionados) {
          await deletePedidoCompra(place._id);
        }
        const date = new Date();
        const historialData = {
          num_doc: "n/a",
          recibo: "n/a",
          banco: "n/a",
          tipo_pago: "n/a",
          cliente: "n/a",
          tipo: "Eliminar",
          descripcion: `Se eliminó la solicitud de compra ${nombreSolicitud}`,
          cantidad: 0,
          date,
          user,
        };
        createHistorial(historialData);

        navigate("/solicitud-compra");
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

    // Información del cliente y solicitud
    doc.setFontSize(11);
    doc.text("No. de Documento:", 150, 20);
    doc.setTextColor(255, 0, 0);
    doc.text(`${codigoSolicitud}`, 185, 20);
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    doc.text("Fecha de Creacion:", 150, 25);
    doc.text(`${fechaSolicitud}`, 185, 25);
    doc.text("Nombre del Proveedor:", 10, 40);
    doc.text(`${proveedorSolicitud}`, 50, 40);
    doc.text("Empresa:", 10, 45);
    doc.text(`${proveedorEmpresa}`, 30, 45);
    doc.text("Dirección:", 10, 50);
    doc.text(`${proveedorDireccion}`, 30, 50);
    doc.text("Nit cliente:", 10, 55);
    doc.text(`${proveedorNit}`, 30, 55);
    doc.text("Codigo de Proveedor:", 10, 60);
    doc.text(`${proveedorCode}`, 46, 60);

    // Tabla de productos
    const pedidosRelacionados = pedido_compra.filter(
      (place) => place.solicitud === nombreSolicitud
    );

    const rows = pedidosRelacionados.map((place) => {
      const productoEncontrado = products.find(
        (product) => product.name === place.producto
      );
      return [
        place.producto,
        productoEncontrado?.presentation || "N/A", // Presentación
        `${place.cantidad}`
      ];
    });

    doc.autoTable({
      startY: 65,
      head: [[tipoSolicitud+` a CINAGRO`]],
      styles: { fontSize: 12 },
      headStyles: { halign: 'center' } // Centra el texto del encabezado
    });


    doc.autoTable({
      startY: 75,
      head: [["Presentación", "Producto", "Cantidad"]],
      body: rows,
      styles: { fontSize: 9 },
    });

    // Guardar el archivo PDF
    doc.save(`Solicitud_Compra_${codigoSolicitud}.pdf`);
  };

  return (
    <div className="my-2 flex flex-col items-center">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        <Link
          to="/solicitud-compra"
          className="absolute right-4 top-4 text-gray-50 hover:text-gray-300 font-bold py-1 px-2 rounded-lg"
        >
          Regresar
        </Link>
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2"
          style={{ fontSize: "30px" }}
        >
          {nombreSolicitud}
        </h1>
      </div>
      <div className="my-4 w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h2 className="font-bold text-lg">Descripción:</h2>
          <p>{descripcionSolicitud}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Tipo:</h2>
          <p>{tipoSolicitud}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Fecha de creacion:</h2>
          <p>{fechaSolicitud}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Proveedor:</h2>
          <p>{proveedorSolicitud}</p>
        </div>
      </div>
      <div className="my-4 overflow-x-auto w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-2 text-center">Producto</th>
              <th className="py-2 text-center">Presentacion</th>
              <th className="py-2 text-center">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {pedido_compra
              .filter((place) => place.solicitud === nombreSolicitud)
              .map((place) => {
                const productoEncontrado = products.find(
                  (product) => product.name === place.producto
                );

                return (
                  <tr key={place._id}>
                    <td className="text-center border border-blue-100">
                      {place.producto}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.presentacion}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.cantidad}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={handleGeneratePDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Imprimir PDF
        </button>

        <button
          onClick={handleEliminar}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default VerSolicitudCompraPage;
