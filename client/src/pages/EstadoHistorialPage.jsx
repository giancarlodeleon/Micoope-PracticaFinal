import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentaContext";
import { useClients } from "../context/ClientContext";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";
import { useSolicituds } from "../context/SolicitudContext";
import "jspdf-autotable"; // Para tablas
import Logo from "../assets/cinagro.jpg"; // Asegúrate de importar correctamente el logo
import { jsPDF } from "jspdf"; // Importar jsPDF

function EstadoHistorialPage() {
  const { getUsers, users } = useUsers();
  const { getHistorials, historials } = useHistorials();
  const { getVentas, ventas } = useVentas();
  const { id } = useParams();
  const [currentVentasPage, setCurrentVentasPage] = useState(1);
  const [currentHistorialPage, setCurrentHistorialPage] = useState(1);
  const { getClients, client } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const { getSolicituds, solicituds } = useSolicituds();
  const ventasPerPage = 10;
  const historialsPerPage = 10;
  const [startDate, setStartDate] = useState(""); // Estado para la fecha inicial
  const [endDate, setEndDate] = useState(""); // Estado para la fecha final
  const [tipoSolicitud, setTipoSolicitud] = useState(""); // Estado para el tipo de solicitud

  useEffect(() => {
    getVentas();
    getClients();
    getHistorials();
    getUsers();
    getSolicituds();
  }, []);

  const getClientNameById = (clientId) => {
    const foundClient = client.find((c) => c._id === clientId);
    return foundClient ? foundClient.name : null;
  };

  const clientName = getClientNameById(id);

  if (!clientName) {
    return (
      <div className="text-center">
        <p>Cargando cliente...</p>
      </div>
    );
  }

  const getTipoByCodigo = (codigo) => {
    const solicitud = solicituds.find((sol) => sol.codigo === String(codigo));
    return solicitud ? solicitud.tipo : "No encontrado";
  };

  const filteredHistorials = historials.filter((place) => {
    const placeDate = new Date(place.date);
    let selectedDateObj = selectedDate ? new Date(selectedDate) : null;

    if (selectedDateObj) {
      selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    }

    const isSameDay =
      selectedDateObj &&
      placeDate.getFullYear() === selectedDateObj.getFullYear() &&
      placeDate.getMonth() === selectedDateObj.getMonth() &&
      placeDate.getDate() === selectedDateObj.getDate();

    return (
      place.descripcion.toLowerCase().includes(searchTerm2.toLowerCase()) &&
      place.cliente === clientName &&
      (!selectedDate || isSameDay)
    );
  });

  // Filtrado de ventas sin el filtro de FEL
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
        (tipoSolicitud
          ? getTipoByCodigo(place.solicitud) === tipoSolicitud
          : true) &&
        place.pendiente == 0
      );
    }

    return (
      (!clientName || place.cliente === clientName) &&
      (tipoSolicitud
        ? getTipoByCodigo(place.solicitud) === tipoSolicitud
        : true) &&
      place.pendiente == 0
    );
  });

  const totalVentasPages = Math.ceil(filteredVentas.length / ventasPerPage);
  const totalHistorialPages = Math.ceil(
    filteredHistorials.length / historialsPerPage
  );

  const currentVentas = filteredVentas.slice(
    (currentVentasPage - 1) * ventasPerPage,
    currentVentasPage * ventasPerPage
  );

  const currentHistorials = filteredHistorials.slice(
    (currentHistorialPage - 1) * historialsPerPage,
    currentHistorialPage * historialsPerPage
  );

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
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
      doc.text(`Reporte de Facturas Pagadas de ${clientName} (${rangoFechas})`, 14, 50);
    
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
      const nombreArchivo = `Reporte_Facturas_Pagadas_${clientName}_${fechaArchivo}.pdf`;
    
      doc.save(nombreArchivo);
    };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md relative">
        <Link
          to={"/estado-cuenta"}
          className="absolute right-4 top-4 text-white font-bold py-2 px-4 rounded-lg hover:text-gray-300"
        >
          Regresar
        </Link>
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2"
          style={{ fontSize: "30px" }}
        >
          Historial de {clientName || "Cliente no encontrado"}
        </h1>

        {/* Tabla de ventas */}
        <div className="bg-blue-900 text-white text-center py-2 my-2 font-bold">
          Facturas pagadas
        </div>

        <div className="my-2 overflow-x-auto rounded-lg">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Inicial:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Final:
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Solicitud:
                </label>
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
                <th className="py-2 text-center">Fecha Emision</th>
                <th className="py-2 text-center">Fecha Pago</th>
                <th className="py-2 text-center">Tipo de Solicitud</th>
                <th className="py-2 text-center">Fecha de Vencimiento</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación Ventas */}
        <div className="flex justify-center mt-4">
          {currentVentasPage > 1 && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setCurrentVentasPage(currentVentasPage - 1)}
            >
              Anterior
            </button>
          )}
          {currentVentasPage < totalVentasPages && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
              onClick={() => setCurrentVentasPage(currentVentasPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-400"
          >
            Imprimir PDF
          </button>
        </div>

        {/* Filtro de Historiales */}
        <div className="p-4 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Descripción:
            </label>
            <input
              type="text"
              placeholder="Buscar por descripción..."
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Fecha:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        {/* Tabla de Historiales */}
        <div className="bg-blue-900 text-white text-center py-2 font-bold">
          Historial de Abonos
        </div>
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Tipo</th>
                <th className="py-2 text-center">Descripción</th>
                <th className="py-2 text-center">Tipo de Pago</th>
                <th className="py-2 text-center">No.Doc</th>
                <th className="py-2 text-center">Banco</th>
                <th className="py-2 text-center">No.Recibo Caja</th>
                <th className="py-2 text-center">Cantidad</th>
                <th className="py-2 text-center">Fecha</th>
                <th className="py-2 text-center">Hora</th>
                <th className="py-2 text-center">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {currentHistorials.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-blue-100">
                    {place.tipo}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.descripcion}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.tipo_pago}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.num_doc}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.banco}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.recibo}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.cantidad}
                  </td>
                  <td className="text-center border border-blue-100">
                    {new Date(place.date).toLocaleDateString()}
                  </td>
                  <td className="text-center border border-blue-100">
                    {new Date(place.date).toLocaleTimeString()}
                  </td>
                  <td className="text-center border border-blue-100">
                    {getUsernameById(place.user)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación Historiales */}
        <div className="flex justify-center mt-4">
          {currentHistorialPage > 1 && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setCurrentHistorialPage(currentHistorialPage - 1)}
            >
              Anterior
            </button>
          )}
          {currentHistorialPage < totalHistorialPages && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
              onClick={() => setCurrentHistorialPage(currentHistorialPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EstadoHistorialPage;
