import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSalidas } from "../context/SalidaContext";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useAgencias } from "../context/AgenciaContext";


function InfantoEntregadoPage() {
  const { getSalidas, salidas } = useSalidas();
  const { user } = useAuth();
  const [filteredSalidas, setFilteredSalidas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { getRols, rol } = useRols();
  const [Setpermiso, setPermisoToShow] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState(localStorage.getItem("selectedAgency") || "");
  const { getAgencias, agencias } = useAgencias();
  const [currentPage, setCurrentPage] = useState(1); // Estado para almacenar la página actual
  const salidasPerPage = 10; // Número de salidas por página

  useEffect(() => {
    getSalidas();
    getAgencias();
    getRols();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedAgency", selectedAgency);
  }, [selectedAgency]);


  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_of_all_Agencys);
  }, []);

  useEffect(() => {
    const modifiedEndDate = endDate ? new Date(endDate) : null;
    if (modifiedEndDate) modifiedEndDate.setDate(modifiedEndDate.getDate() + 1);
  
    const filteredSalidas = salidas.filter((salida) => {
      const salidaDate = new Date(salida.fecha);
      const isAfterStartDate = !startDate || salidaDate >= startDate;
      const isBeforeEndDate = !endDate || salidaDate <= modifiedEndDate;
  
      if (!isAfterStartDate || !isBeforeEndDate) return false;
  
      if (selectedAgency) {
        return salida.agencia === selectedAgency && salida.tipo === "Infanto Juvenil";
      } else {
        return (!Setpermiso && salida.agencia === user.agencia && salida.tipo === "Infanto Juvenil");
      }
    });
  
    setFilteredSalidas(filteredSalidas);
  }, [salidas, selectedAgency, startDate, endDate, user.agencia, Setpermiso]);

  const indexOfLastSalida = currentPage * salidasPerPage;
  const indexOfFirstSalida = indexOfLastSalida - salidasPerPage;
  const currentSalidas = filteredSalidas.slice(indexOfFirstSalida, indexOfLastSalida);
  const totalPages = Math.ceil(filteredSalidas.length / salidasPerPage);

  // Calcula la suma total de todas las cantidades
  const totalCantidad = filteredSalidas.reduce((total, salida) => total + salida.cantidad, 0);

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Infanto Juvenil
        </h1>
        <div className="my-2 overflow-x-auto rounded-lg">
          <div className="flex justify-between">
            <div className="flex-1 " style={{ marginLeft: "50px" }}>
              <Link
                to="/infanto-ingresado"
                className="bg-white font-bold text-blue-900 border-2 border-blue-900  hover:bg-blue-500 hover:text-blue-50 w-full rounded-bl-lg rounded-tl-lg px-6 py-2 text-center block"
              >
                Correlativo Ingresado
              </Link>
            </div>
            <div className="flex-1" style={{ marginRight: "50px" }}>
              <Link
                to=""
                className="bg-blue-900 font-bold text-blue-50  hover:text-blue-50 border-2 border-blue-300 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block"
              >
                Correlativo Entregado
              </Link>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <h1 className=" rounded p-2 font-bold">De</h1>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="mm/dd/aa"
              className="border-blue-500 border-2 rounded p-1"
            />
            <h1 className=" rounded p-2 font-bold">Hasta</h1>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="mm/dd/aa"
              className="border-blue-500 border-2 rounded p-1"
            />
            {Setpermiso && (
              <>
                <h1 className=" rounded p-2 font-bold">Agencia</h1>
                <select
                  className="border-blue-500 border-2 rounded p-1"
                  onChange={(e) => setSelectedAgency(e.target.value)}
                >
                  <option value="">Selecciona una agencia</option>
                  {agencias.map((agencia) => (
                    <option key={agencia.id} value={agencia.name}>
                      {agencia.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <table className="w-full border-collapse rounded-lg mt-2">
            <thead>
              <tr>
                <th
                  colSpan="7"
                  className="py-3 text-center bg-blue-900 text-white rounded-t-lg"
                >
                  Correlativo Entregado Asociados
                </th>
              </tr>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 text-center px-10 ">Fecha de Ingreso</th>
                <th className="py-3 text-center px-10">Serie</th>
                <th className="py-3 text-center px-10">Cantidad</th>
                <th className="py-3 text-center px-10">De</th>
                <th className="py-3 text-center px-10">Hasta</th>
                <th className="py-3 text-center ">
                  Comentario(anuladas o sin correlativo)
                </th>
                <th className="py-3 text-center px-10">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentSalidas.map((salida) => (
                <tr key={salida.id}>
                  <td className="text-center border border-blue-100">
                    {formatDate(salida.fecha)}
                  </td>
                  <td className="text-center border border-blue-100">
                    {salida.serie}
                  </td>
                  <td className="text-center border border-blue-100">
                    {salida.cantidad}
                  </td>
                  <td className="text-center border border-blue-100">
                    {salida.de}
                  </td>
                  <td className="text-center border border-blue-100">
                    {salida.hasta}
                  </td>
                  <td className="text-center border border-blue-100">
                    {salida.comentario}
                  </td>
                  <td className="text-center border border-blue-100 flex justify-center items-center">
                  <Link
                      to={`/salida/${salida._id}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4">
          <p className="text-lg font-semibold text-blue-900">
           Cantidad Total: {totalCantidad}
          </p>

        </div>
        {/* Controles de paginación */}
        <div className="flex justify-center mt-4">
          {currentPage !== 1 && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
          )}
          {indexOfLastSalida < filteredSalidas.length && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>
        {/* Mostrar el total de páginas */}
        <p className="text-center text-sm text-gray-500 mt-2">
          Página {currentPage} de {totalPages}
        </p>
      </div>
    </div>
  );
}

export default InfantoEntregadoPage