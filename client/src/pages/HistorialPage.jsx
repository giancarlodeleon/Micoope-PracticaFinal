import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useUsers } from "../context/UserContext";

function HistorialPage() {
  const { getUsers, users } = useUsers();
  const { getHistorials, historials, deleteHistorial } = useHistorials();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const historialsPerPage = 10;

  useEffect(() => {
    getHistorials();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteClick = (historialId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este Historial?"
    );
    if (confirmDelete) {
      deleteHistorial(historialId);
    }
  };

  const getUsernameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  const filteredHistorials = historials.filter((place) => {
    const placeDate = new Date(place.date);
    let selectedDateObj = selectedDate ? new Date(selectedDate) : null;

    // Restar un día a la fecha seleccionada
    if (selectedDateObj) {
      selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    }

    const isSameDay =
      selectedDateObj &&
      placeDate.getFullYear() === selectedDateObj.getFullYear() &&
      placeDate.getMonth() === selectedDateObj.getMonth() &&
      placeDate.getDate() === selectedDateObj.getDate();

    return (
      place.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedDate || isSameDay)
    );
  });

  const totalPages = Math.ceil(filteredHistorials.length / historialsPerPage);
  const indexOfLastHistorial = currentPage * historialsPerPage;
  const indexOfFirstHistorial = indexOfLastHistorial - historialsPerPage;
  const currentHistorials = filteredHistorials.slice(
    indexOfFirstHistorial,
    indexOfLastHistorial
  );

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Historial
        </h1>
        {/* Campo de búsqueda y campo de filtro de fecha */}
        <div className="p-4 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
              Descripcion:
            </label>
            <input
              type="text"
              placeholder="Buscar por descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
            />
          </div>
        </div>
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">Tipo</th>
                <th className="py-2 text-center">Descripción</th>
                <th className="py-2 text-center">Cantidad</th>
                <th className="py-2 text-center">Fecha</th>
                <th className="py-2 text-center">Hora</th>
                <th className="py-2 text-center">Usuario</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentHistorials.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.tipo}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.descripcion}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.cantidad === 0 ? "N/A" : place.cantidad}
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
                  <td className="flex justify-center items-center border border-green-100">
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(place._id)}
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
            {indexOfLastHistorial < filteredHistorials.length && (
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
      </div>
    </div>
  );
}

export default HistorialPage;
