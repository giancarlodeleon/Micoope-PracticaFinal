import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentaContext";
import { useClients } from "../context/ClientContext";
import { jsPDF } from "jspdf"; // Importar jsPDF
import { useSolicituds } from "../context/SolicitudContext";
import "jspdf-autotable"; // Para tablas
import Logo from "../assets/cinagro.jpg"; // Asegúrate de importar correctamente el logo

function EstadoFacturaPage() {
  const { getVentas, ventas } = useVentas();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { getClients, client } = useClients();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getSolicituds, solicituds } = useSolicituds();
  const [tipoSolicitud, setTipoSolicitud] = useState(""); // Nuevo estado para el filtro de tipo de solicitud
  const ventasPerPage = 10;
  const [sortBy, setSortBy] = useState("fechaEmision"); // Ordenar por fecha de emisión por defecto
const [sortOrder, setSortOrder] = useState("asc"); // Orden ascendente por defecto

  useEffect(() => {
    getVentas();
    getClients();
    getSolicituds();
  }, []);

  const sortVentas = (ventas) => {
    return ventas.sort((a, b) => {
      let dateA, dateB;
  
      if (sortBy === "fechaEmision") {
        dateA = new Date(a.date);
        dateB = new Date(b.date);
      } else if (sortBy === "fechaVencimiento") {
        dateA = getFechaVencimiento(a.numero, a.date);
        dateB = getFechaVencimiento(b.numero, b.date);
      }
  
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  // Definir la función 'getTipoByCodigo' al principio
  const getTipoByCodigo = (codigo) => {
    const solicitud = solicituds.find((sol) => sol.codigo === String(codigo));
    return solicitud ? solicitud.tipo : "No encontrado";
  };

  const getClientNameById = (clientId) => {
    const foundClient = client.find((c) => c._id === clientId);
    return foundClient ? foundClient.name : null;
  };

  const clientName = getClientNameById(id);

  const filteredVentas = ventas.filter((place) => {
    const ventaDate = new Date(place.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    if (start && end) {
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
      return (
        (!clientName || place.cliente === clientName) &&
        ventaDate >= start &&
        ventaDate <= end &&
        (tipoSolicitud ? getTipoByCodigo(place.solicitud) === tipoSolicitud : true) &&
        place.pendiente !== 0 // Excluir ventas con pendiente 0
      );
    }
  
    return (
      (!clientName || place.cliente === clientName) &&
      (tipoSolicitud ? getTipoByCodigo(place.solicitud) === tipoSolicitud : true) &&
      place.pendiente !== 0 // Excluir ventas con pendiente 0
    );
  });

  const totalPages = Math.ceil(filteredVentas.length / ventasPerPage);

  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = filteredVentas.slice(indexOfFirstVenta, indexOfLastVenta);

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
    const vencimiento = new Date(fechaVencimiento.split("/").reverse().join("-"));
    const hoy = new Date();
    const diferencia = Math.floor((hoy - vencimiento) / (1000 * 60 * 60 * 24));
    return diferencia > 0 ? diferencia : 0; // Si no hay atraso, retorna 0
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF("landscape");
  
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
        ? `Rango: ${new Date(
            new Date(startDate).setDate(new Date(startDate).getDate() + 1)
          ).toLocaleDateString()} - ${new Date(
            new Date(endDate).setDate(new Date(endDate).getDate() + 1)
          ).toLocaleDateString()}`
        : "General";
  
    doc.setFontSize(12);
    doc.text(`Reporte de Facturas Pendientes de ${clientName} (${rangoFechas})`, 14, 50);
  
    // Primero, ordenamos las ventas por fecha de vencimiento y luego por "N/A"
    const sortedVentas = filteredVentas.sort((a, b) => {
      const fechaVencimientoA = getFechaVencimiento(
        a.numero,
        new Date(a.date).toLocaleDateString()
      );
      const fechaVencimientoB = getFechaVencimiento(
        b.numero,
        new Date(b.date).toLocaleDateString()
      );
  
      if (fechaVencimientoA !== "N/A" && fechaVencimientoB !== "N/A") {
        return new Date(fechaVencimientoA) - new Date(fechaVencimientoB);
      }
  
      if (fechaVencimientoA !== "N/A") return -1;
      if (fechaVencimientoB !== "N/A") return 1;
  
      return 0;
    });
  
    const rows = sortedVentas.map((place) => [
      place.numero,
      place.numero_factura,
      place.FEL_serie,
      place.FEL_numero,
      place.solicitud,
      place.monto,
      place.pendiente,
      new Date(place.date).toLocaleDateString(),
      place.fecha_pago || "N/A",
      getTipoByCodigo(place.numero),
      getFechaVencimiento(place.numero, new Date(place.date).toLocaleDateString()),
      getDiasDeAtraso(getFechaVencimiento(place.numero, new Date(place.date).toLocaleDateString())),
    ]);
  
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
  
    doc.autoTable({
      startY: 60,
      head: headers,
      body: rows,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [0, 128, 0] },
      tableWidth: "auto",
    });
  
    const fechaArchivo = new Date()
      .toLocaleDateString("es-GT")
      .replace(/\//g, "-");
    const nombreArchivo = `Reporte_Facturas_Pendientes_${clientName}_${fechaArchivo}.pdf`;
  
    doc.save(nombreArchivo);
  };
  
  
  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        {/* Botón "Regresar" */}
        <Link
          to={"/estado-cuenta"}
          className="absolute right-4 top-4 text-white font-bold py-2 px-4 rounded-lg hover:text-gray-300"
        >
          Regresar
        </Link>
        
        {/* Título */}
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2"
          style={{ fontSize: "30px" }}
        >
          Facturas de {clientName || "Cliente no encontrado"}
        </h1>
  
        {/* Filtros: Fecha Inicial, Fecha Final, Tipo de Solicitud */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fecha Inicial */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Inicial:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
              />
            </div>
  
            {/* Fecha Final */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha Final:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
              />
            </div>
  
            {/* Tipo de Solicitud */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Solicitud:</label>
              <select
                value={tipoSolicitud}
                onChange={(e) => setTipoSolicitud(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
              >
                <option value="">Todos</option>
                <option value="Contado">Contado</option>
                <option value="Credito">Crédito</option>
              </select>
            </div>
            
          </div>
        </div>
  
        {/* Tabla de ventas */}
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">No. Docu</th>
                <th className="py-2 text-center">No. Fact</th>
                <th className="py-2 text-center">FEL Serie</th>
                <th className="py-2 text-center">FEL Numero</th>
                <th className="py-2 text-center">Solicitud</th>
                <th className="py-2 text-center">Monto</th>
                <th className="py-2 text-center">Pendiente</th>
                <th className="py-2 text-center">Fecha Emisión</th>
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
                  <td className="text-center border border-blue-100">
                    {place.numero}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.numero_factura}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.FEL_serie}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.FEL_numero}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.solicitud}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.monto}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.pendiente}
                  </td>
                  <td className="text-center border border-blue-100">
                    {new Date(place.date).toLocaleDateString()}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.fecha_pago}
                  </td>
                  <td className="text-center border border-blue-100">
                    {getTipoByCodigo(place.numero)}
                  </td>
                  <td className="text-center border border-blue-100">
                    {getFechaVencimiento(
                      place.numero,
                      new Date(place.date).toLocaleDateString()
                    )}
                  </td>
                  <td className="text-center border border-blue-100">
                    {getDiasDeAtraso(
                      getFechaVencimiento(
                        place.numero,
                        new Date(place.date).toLocaleDateString()
                      )
                    )}
                  </td>
                  <td className="flex justify-center items-center border border-green-100">
                    <Link
                      to={`/estado-cuenta/historial/${id}/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Abonar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Paginación */}
          <div className="flex justify-center mt-4">
            {currentPage !== 1 && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {indexOfLastVenta < filteredVentas.length && (
              <button
                className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
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
  
        {/* Botón de PDF */}
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

export default EstadoFacturaPage;
