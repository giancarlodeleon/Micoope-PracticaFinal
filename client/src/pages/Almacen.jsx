import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBoletas } from "../context/BoletaContext";

function Almacen() {
  const { getBoletas, boletas, deleteBoleta } = useBoletas();
  const [searchType, setSearchType] = useState(""); // Estado para el tipo de búsqueda
  const [searchSerie, setSearchSerie] = useState(""); // Estado para la serie de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual
  const boletasPerPage = 10; // Número de boletas por página

  useEffect(() => {
    getBoletas();
  }, []);

  const handleDeleteClick = (boletaId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta boleta?"
    );
    if (confirmDelete) {
      deleteBoleta(boletaId);
    }
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  // Opciones para el campo de búsqueda tipo
  const options = [
    "Aportaciones",
    "Ahorro Disponible",
    "Infanto Juvenil",
    "Plazo Fijo",
    "Programado",
    "Boletas TRX",
    "Vales de Efectivo"
  ];

  // Filtrar las boletas según los criterios de búsqueda
  const filteredBoletas = boletas.filter((boleta) => {
    return (
      (searchType === "" || boleta.tipo_boleta.toLowerCase().includes(searchType.toLowerCase())) &&
      boleta.serie.toLowerCase().includes(searchSerie.toLowerCase())
    );
  });

  // Calcular el total de páginas para las boletas filtradas
  const totalPages = Math.ceil(filteredBoletas.length / boletasPerPage);

  // Lógica para calcular los índices de inicio y fin de las boletas en la página actual
  const indexOfLastBoleta = currentPage * boletasPerPage;
  const indexOfFirstBoleta = indexOfLastBoleta - boletasPerPage;
  const currentBoletas = filteredBoletas.slice(indexOfFirstBoleta, indexOfLastBoleta);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <h1 className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative" style={{ fontSize: "30px" }}>
          Almacen
          <Link to="/add-boleta" className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center" style={{ width: "36px", height: "36px" }}>
            +
          </Link>
        </h1>

        {/* Agregar campos de búsqueda centrados */}
        <div className="flex justify-center my-4 gap-8">
          <select className="p-2 border border-gray-300 rounded px-6" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">Seleccionar tipo</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <input type="text" placeholder="Buscar por serie" className="p-2 border border-gray-300 rounded px-6" value={searchSerie} onChange={(e) => setSearchSerie(e.target.value)} />
        </div>

        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg mt-2">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 text-center rounded-tl-lg">Fecha de Ingreso</th>
                <th className="py-3 text-center px-10">Tipo</th>
                <th className="py-3 text-center px-8">Serie</th>
                <th className="py-3 text-center px-8">De</th>
                <th className="py-3 text-center px-6">Hasta</th>
                <th className="py-3 text-center px-6">Existencia</th>
                <th className="py-3 text-center px-6 rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {currentBoletas.map((boleta) => (
  <tr key={boleta._id}>
    <td className="text-center border border-blue-100">{formatDate(boleta.date)}</td>
    <td className="text-center border border-blue-100">{boleta.tipo_boleta}</td>
    <td className="text-center border border-blue-100">{boleta.serie}</td>
    <td className="text-center border border-blue-100">{boleta.existencia === 0 ? "---" : boleta.de}</td>
    <td className="text-center border border-blue-100">{boleta.existencia === 0 ? "---" : boleta.hasta}</td>
    <td className="text-center border border-blue-100">
      <div className="flex items-center justify-center">
        <span className="mr-1" style={{ verticalAlign: "middle" }}>
          {boleta.existencia}
        </span>
        {boleta.tipo_boleta === "Boletas TRX" ? (
          // Bloque que se muestra si la condición es verdadera
          <span>{boleta.existencia <= 5000 && (
            <span className="text-red-500" style={{ verticalAlign: "middle" }} title="Queda poca existencia, recomendado solicitar mas">⚠️</span>
          )}</span>
        ) : (
          // Bloque que se muestra si la condición es falsa
          <span>{boleta.existencia <= 100 && (
            <span className="text-red-500" style={{ verticalAlign: "middle" }} title="Queda poca existencia, recomendado solicitar mas">⚠️</span>
          )}</span>
        )}
        
      </div>
    </td>
    <td className="flex justify-center items-center border border-blue-100">
      <Link to={`/boletas/${boleta._id}`} className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2">Editar</Link>
      <Link to={`/boletas/ingreso/${boleta._id}`} className="bg-green-600 font-bold hover:bg-green-500 text-white py-1 px-2 rounded-lg mr-2">Ingresar</Link>
      <Link to={`/boletas/egreso/${boleta._id}`} className="bg-green-600 font-bold hover:bg-green-500 text-white py-1 px-2 rounded-lg mr-2">Enviar</Link>
      <button className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg" onClick={() => handleDeleteClick(boleta._id)}>Eliminar</button>
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        <div className="flex justify-center mt-4">
          {/* Botón para ir a la página anterior (solo se muestra si no está en la primera página) */}
          {currentPage !== 1 && (
            <button className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
          )}
          {/* Botón para ir a la página siguiente (solo se muestra si no está en la última página) */}
          {indexOfLastBoleta < filteredBoletas.length && (
            <button className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
          )}
        </div>

        {/* Mostrar el total de páginas */}
        <p className="text-center text-sm text-gray-500 mt-2">Página {currentPage} de {totalPages}</p>
      </div>
    </div>
  );
}

export default Almacen;
