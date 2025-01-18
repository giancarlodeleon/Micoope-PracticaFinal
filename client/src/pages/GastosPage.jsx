import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGastos } from "../context/GastoContext";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { jsPDF } from "jspdf"; // Importar jsPDF
import "jspdf-autotable"; // Para tablas
import Logo from "../assets/cinagro.jpg";

function GastosPage() {
  const { getGastos, gastos, deleteGasto } = useGastos();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const gastosPerPage = 10;
  const { createHistorial } = useHistorials();
  const { getUsers, users } = useUsers();
  const { user } = useAuth();

  useEffect(() => {
    getGastos();
    getUsers();
  }, []);

  const handleDeleteClick = (gastoId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este Gasto?"
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
        descripcion: `Se Elimino el gasto ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteGasto(gastoId);
    }
  };

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  // Filtrar gastos por rango de fechas y término de búsqueda
  const filteredGastos = gastos.filter((gasto) => {
    const gastoDate = new Date(gasto.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesSearchTerm = gasto.tipo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (start && end) {
      // Incluir un día extra al rango
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
      return gastoDate >= start && gastoDate <= end && matchesSearchTerm;
    }
    return matchesSearchTerm;
  });

  // Calcular el total de páginas para los gastos filtrados
  const totalPages = Math.ceil(filteredGastos.length / gastosPerPage);

  // Lógica para calcular los índices de inicio y fin de los gastos en la página actual
  const indexOfLastGasto = currentPage * gastosPerPage;
  const indexOfFirstGasto = indexOfLastGasto - gastosPerPage;
  const currentGastos = filteredGastos.slice(
    indexOfFirstGasto,
    indexOfLastGasto
  );

  // Función para exportar a PDF
  const exportarPDF = () => {
    // Crear un documento en orientación horizontal
    const doc = new jsPDF("landscape");

    // Agregar logo y encabezado
    const logo = new Image();
    logo.src = Logo; // Asegúrate de que `Logo` esté importado correctamente.
    doc.addImage(logo, "JPEG", 10, 10, 50, 20); // Ajusta el tamaño y posición según sea necesario

    doc.setFontSize(12);
    doc.text("CINAGRO SOCIEDAD ANONIMA", 90, 15);
    doc.setFontSize(10);
    doc.text("Trabajando por un mejor futuro agrícola", 90, 20);
    doc.text("GUATEMALA - GUATEMALA", 90, 25);
    doc.text("Tel: 5466-48578", 90, 30);

    // Determinar el texto del rango de fechas
    const rangoFechas =
      startDate && endDate
        ? `Rango: ${new Date(
            new Date(startDate).setDate(new Date(startDate).getDate() + 1)
          ).toLocaleDateString()} - ${new Date(
            new Date(endDate).setDate(new Date(endDate).getDate() + 1)
          ).toLocaleDateString()}`
        : "General";

    // Título y rango de fechas
    doc.setFontSize(12);
    doc.text(`Reporte de Gastos (${rangoFechas})`, 14, 50);

    // Crear filas para la tabla
    const rows = filteredGastos.map((place) => [
      place.tipo,
      `Q.${place.precio}`,
      new Date(place.date).toLocaleDateString(),
      new Date(place.date).toLocaleTimeString(),
      getUsernameById(place.user),
      place.nombre,
    ]);

    // Encabezados de la tabla
    const headers = [
      ["Tipo", "Monto", "Fecha", "Hora", "Usuario", "Descripción"],
    ];

    // Generar la tabla con jsPDF-AutoTable
    doc.autoTable({
      startY: 60, // Comienza debajo del encabezado
      head: headers,
      body: rows,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [0, 128, 0] }, // Color verde para el encabezado
      tableWidth: "auto", // Ajustar automáticamente el ancho de la tabla
    });

    const fechaActual = new Date().toLocaleDateString();

    const fechaArchivo = new Date()
      .toLocaleDateString("es-GT")
      .replace(/\//g, "-"); // Reemplazar las barras por guiones para evitar problemas en el nombre
    const nombreArchivo = `Reporte_Gastos_${fechaArchivo}.pdf`;

    // Guardar el archivo PDF
    doc.save(nombreArchivo);
  };

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Registro de Gastos
          <Link
            to="/add-gasto"
            className="bg-green-400 text-white hover:bg-green-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>

        {/* Filtros */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-16">
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Buscar:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por tipo..."
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">Tipo</th>
                <th className="py-2 text-center">Monto</th>
                <th className="py-2 text-center">Fecha</th>
                <th className="py-2 text-center">Hora</th>
                <th className="py-2 text-center">Usuario</th>
                <th className="py-2 text-center">Descripcion</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentGastos.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.tipo}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{place.precio}
                  </td>
                  <td className="text-center border border-green-100">
                    {new Date(place.date).toLocaleDateString()}
                  </td>
                  <td className="text-center border border-green-100">
                    {new Date(place.date).toLocaleTimeString()}
                  </td>
                  <td className="text-center border border-green-100">
                    {getUsernameById(place.user)}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.nombre}
                  </td>

                  <td className="flex justify-center items-center border border-green-100">
                    <Link
                      to={`/gastos/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(place._id, place.tipo)}
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
            {indexOfLastGasto < filteredGastos.length && (
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

        {/* Botón para Exportar centrado al final */}
        <div className="flex justify-center mt-4 pb-4">
          <button
            onClick={exportarPDF}
            className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
          >
            Exportar a PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default GastosPage;
