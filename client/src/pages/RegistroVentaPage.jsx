import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentaContext";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { useSolicituds } from "../context/SolicitudContext";
import { jsPDF } from "jspdf"; // Importar jsPDF
import "jspdf-autotable"; // Para tablas
import Logo from "../assets/cinagro.jpg";

function RegistroVentaPage() {
  const { getVentas, ventas, deleteVenta } = useVentas();
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tipoSolicitud, setTipoSolicitud] = useState(""); // Filtro de tipo de solicitud
  const ventasPerPage = 10;
  const { createHistorial } = useHistorials();
  const { getUsers, users } = useUsers();
  const { user } = useAuth();
  const { getSolicituds, solicituds } = useSolicituds();

  useEffect(() => {
    getVentas();
    getSolicituds();
    getUsers();
  }, []);

  const handleDeleteClick = (ventaId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta Venta?"
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
        descripcion: `Se Elimino la venta ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteVenta(ventaId);
    }
  };

  const getTipoByCodigo = (codigo) => {
    const solicitud = solicituds.find((sol) => sol.codigo === String(codigo));
    return solicitud ? solicitud.tipo : "No encontrado";
  };

  const getFechaVencimiento = (place, date) => {
    const solicitud = solicituds.find((sol) => sol.codigo === String(place));
    if (solicitud?.tipo === "Credito") {
      const fechaEmision = new Date(date);
      return new Date(
        new Date(date.split("/").reverse().join("-")).getTime() +
          solicitud.dias_credito * 24 * 60 * 60 * 1000
      ).toLocaleDateString("es-GT");
    }
    return "N/A";
  };

  const getDiasDeAtraso = (fechaVencimiento) => {
    if (fechaVencimiento === "N/A") return "N/A";
    const vencimiento = new Date(
      fechaVencimiento.split("/").reverse().join("-")
    );
    const hoy = new Date();
    const diferencia = Math.floor((hoy - vencimiento) / (1000 * 60 * 60 * 24));
    return diferencia > 0 ? diferencia : 0; // Si no hay atraso, retorna 0
  };

  // Filtro de ventas por rango de fechas y tipo de solicitud
  const filteredVentas = ventas.filter((venta) => {
    const ventaDate = new Date(venta.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const tipo = tipoSolicitud
      ? getTipoByCodigo(venta.numero) === tipoSolicitud
      : true;
    const pendienteCero = venta.pendiente !== 0; // Verifica si el pendiente es 0

    if (start && end) {
      // Incluir un día extra al rango
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
      return ventaDate >= start && ventaDate <= end && tipo && pendienteCero;
    }
    return tipo && pendienteCero; // Si no se seleccionaron fechas, mostrar todas las ventas que coincidan con el tipo y tengan pendiente 0
  });

  const totalPages = Math.ceil(filteredVentas.length / ventasPerPage);
  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = filteredVentas.slice(
    indexOfFirstVenta,
    indexOfLastVenta
  );

  const handleGeneratePDF = () => {
    const doc = new jsPDF("landscape");
  
    // Agregar logo y encabezado
    const logo = new Image();
    logo.src = Logo;
    doc.addImage(logo, "JPEG", 10, 10, 50, 20);
  
    doc.setFontSize(12);
    doc.text("CINAGRO SOCIEDAD ANONIMA", 90, 15);
    doc.setFontSize(10);
    doc.text("Trabajando por un mejor futuro agrícola", 90, 20);
    doc.text("GUATEMALA - GUATEMALA", 90, 25);
    doc.text("Tel: 5466-48578", 90, 30);
  
    const rangoFechas =
      startDate && endDate
        ? `Rango: ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
        : "General";
  
    doc.setFontSize(12);
    doc.text(`Reporte de Ventas Pendientes (${rangoFechas})`, 14, 50);
  
    // Ordenar ventas por fecha de vencimiento, colocando "N/A" al final
    const sortedVentas = [...filteredVentas].sort((a, b) => {
      const fechaA = getFechaVencimiento(a.numero, new Date(a.date).toLocaleDateString());
      const fechaB = getFechaVencimiento(b.numero, new Date(b.date).toLocaleDateString());
  
      // Convertir fechas a formato válido
      const dateA = fechaA === "N/A" ? Infinity : new Date(fechaA.split("/").reverse().join("-"));
      const dateB = fechaB === "N/A" ? Infinity : new Date(fechaB.split("/").reverse().join("-"));
  
      return dateA - dateB;
    });
  
    // Crear filas para la tabla
    const rows = sortedVentas.map((venta) => [
      venta.numero,
      venta.numero_factura,
      venta.FEL_serie,
      venta.FEL_numero,
      venta.solicitud,
      venta.monto,
      venta.pendiente,
      new Date(venta.date).toLocaleDateString(),
      venta.fecha_pago || "N/A",
      getTipoByCodigo(venta.numero),
      getFechaVencimiento(venta.numero, new Date(venta.date).toLocaleDateString()),
      getDiasDeAtraso(getFechaVencimiento(venta.numero, new Date(venta.date).toLocaleDateString())),
    ]);
  
    // Encabezados de la tabla
    const headers = [
      [
        "No. Docu",
        "No. Fact",
        "FEL Serie",
        "FEL Numero",
        "Solicitud",
        "Monto",
        "Pendiente",
        "Fecha Emisión",
        "Fecha Pago",
        "Tipo de Solicitud",
        "Fecha de Vencimiento",
        "Días de Atraso",
      ],
    ];
  
    // Generar la tabla con jsPDF-AutoTable
    doc.autoTable({
      startY: 60,
      head: headers,
      body: rows,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [0, 128, 0] },
      tableWidth: "auto",
    });
  
    const fechaArchivo = new Date().toLocaleDateString("es-GT").replace(/\//g, "-");
    const nombreArchivo = `Reporte_Ventas_Pendientes_${fechaArchivo}.pdf`;
  
    doc.save(nombreArchivo);
  };
  
  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Registro de Ventas
          <Link
            to="/add-venta"
            className="bg-green-400 text-white hover:bg-green-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        <div className="flex justify-between">
          <div className="flex-1 py-2">
            <Link
              to=""
              className="bg-green-900 font-bold text-green-50 hover:text-green-50 border-2 border-green-300 w-full rounded-tl-lg rounded-bl-lg px-6 py-2 text-center block"
            >
              Facturas Pendientes
            </Link>
          </div>
          <div className="flex-1 py-2">
            <Link
              to="/registro-venta-pagada"
              className="bg-white font-bold text-green-900 border-2 border-green-900 hover:bg-green-500 hover:text-green-50 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block"
            >
              Facturas Pagadas
            </Link>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Campo de fecha inicial */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha Inicial:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
          </div>

          {/* Campo de fecha final */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha Final:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
          </div>

          {/* Filtro de tipo de solicitud */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Solicitud:
            </label>
            <select
              value={tipoSolicitud}
              onChange={(e) => setTipoSolicitud(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            >
              <option value="">Todos</option>
              <option value="Credito">Crédito</option>
              <option value="Contado">Contado</option>
            </select>
          </div>
        </div>
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">No. Docu</th>
                <th className="py-2 text-center">No. Fact</th>
                <th className="py-2 text-center">FEL Serie</th>
                <th className="py-2 text-center">FEL Numero</th>
                <th className="py-2 text-center">Solicitud</th>
                <th className="py-2 text-center">Monto</th>
                <th className="py-2 text-center">Pendiente</th>
                <th className="py-2 text-center">Fecha Emision</th>
                <th className="py-2 text-center">Fecha Pago</th>
                <th className="py-2 text-center">Tipo de Solicitud</th>
                <th className="py-2 text-center">Fecha de Vencimiento</th>
                <th className="py-2 text-center">Días de Atraso</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentVentas.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.numero}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.numero_factura}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.FEL_serie}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.FEL_numero}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.solicitud}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.monto}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.pendiente}
                  </td>
                  <td className="text-center border border-green-100">
                    {new Date(place.date).toLocaleDateString()}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.fecha_pago}
                  </td>
                  <td className="text-center border border-green-100">
                    {getTipoByCodigo(place.numero)}
                  </td>
                  <td className="text-center border border-green-100">
                    {getFechaVencimiento(
                      place.numero,
                      new Date(place.date).toLocaleDateString()
                    )}
                  </td>
                  <td className="text-center border border-green-100">
                    {getDiasDeAtraso(
                      getFechaVencimiento(
                        place.numero,
                        new Date(place.date).toLocaleDateString()
                      )
                    )}
                  </td>
                  <td className="flex justify-center items-center border border-green-100">
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() =>
                        handleDeleteClick(place._id, place.numero_factura)
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
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {indexOfLastVenta < filteredVentas.length && (
              <button
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Página {currentPage} de {totalPages}
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-400"
          >
            Imprimir PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistroVentaPage;
