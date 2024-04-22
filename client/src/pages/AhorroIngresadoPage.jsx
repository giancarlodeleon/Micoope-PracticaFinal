import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovimientos } from "../context/MovimientoContext";
import { useAuth } from "../context/AuthContext";
import { useAgencias } from "../context/AgenciaContext";
import { useRols } from "../context/RolContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AhorroIngresadoPage() {

  const { getMovimientos, movimiento, deleteMovimiento } = useMovimientos();
  const [Setpermiso, setPermisoToShow] = useState(null);
  const { user } = useAuth();
  const { getAgencias, agencias } = useAgencias();
  const { getRols, rol } = useRols();
  const [selectedAgencia, setSelectedAgencia] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const movimientosPerPage = 10;

  const handleSelectChange = (event) => {
    const selectedAgencia = event.target.value;
    setSelectedAgencia(selectedAgencia);
    onChange(selectedAgencia);
  };

  useEffect(() => {
    getAgencias();
    getRols();
  }, []);

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_of_all_Agencys);
  }, []);

  useEffect(() => {
    getMovimientos();
  }, [getMovimientos]);

  const handleDeleteClick = (movimientoId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este movimiento?"
    );
    if (confirmDelete) {
      deleteMovimiento(movimientoId);
    }
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }


  const filteredMovimientos = movimiento.filter((movimiento) => {
    if (startDate && endDate) {
      // Clonamos la fecha de endDate para evitar modificar la fecha original
      const modifiedEndDate = new Date(endDate);
      // Incrementamos el día en 1
      modifiedEndDate.setDate(modifiedEndDate.getDate() + 1);

      const movimientoDate = new Date(movimiento.date);
      return movimientoDate >= startDate && movimientoDate < modifiedEndDate;
    }
    return true;
  });

  const combinedMovimientos = filteredMovimientos.filter((movimiento) => {
    if (Setpermiso) {
      // Mostrar todos los movimientos de la agencia si Setpermiso es true
      return movimiento.tipo === "Ahorro Disponible" && movimiento.agencia === selectedAgencia;
    } else {
      // Mostrar los movimientos filtrados según el usuario si Setpermiso es false
      return movimiento.tipo === "Ahorro Disponible" && movimiento.agencia === user.agencia;
    }
  });

  // Suma total de los saldos después de aplicar los filtros
  const totalSaldo = combinedMovimientos.reduce((acc, movimiento) => {
    return acc + movimiento.saldo;
  }, 0);

   // Calcula el número total de páginas basado en los movimientos filtrados
   const totalPages = Math.ceil(combinedMovimientos.length / movimientosPerPage);

   // Calcula el índice del último movimiento basado en la página actual y la cantidad de movimientos por página
   const indexOfLastMovimiento = currentPage * movimientosPerPage;
   // Calcula el índice del primer movimiento basado en el índice del último movimiento y la cantidad de movimientos por página
   const indexOfFirstMovimiento = indexOfLastMovimiento - movimientosPerPage;
 
   // Obtiene solo los movimientos para la página actual
   const currentMovimientos = combinedMovimientos.slice(
     indexOfFirstMovimiento,
     indexOfLastMovimiento
   );
  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Ahorro Disponible
        </h1>
        <div className="my-2 overflow-x-auto rounded-lg">
          <div className="flex justify-between">
            <div className="flex-1" style={{ marginLeft: "50px" }}>
              <Link
                to=""
                className="bg-blue-900 font-bold text-blue-50  hover:text-blue-50 border-2  border-blue-300  w-full rounded-tl-lg rounded-bl-lg px-6 py-2 text-center block"
              >
                Correlativo Ingresado Agencia
              </Link>
            </div>
            <div className="flex-1 " style={{ marginRight: "50px" }}>
              <Link
                to="/ahorro-entregado"
                className="bg-white font-bold text-blue-900 border-2 border-blue-900  hover:bg-blue-500 hover:text-blue-50 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block"
              >
                Correlativo Entregado Asociados
              </Link>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <h1 className=" rounded p-2 font-bold px-4">De</h1>
            <DatePicker
              selected={startDate}
              placeholderText="mm/dd/aa"
              onChange={(date) => setStartDate(date)}
              className="border-blue-500 border-2 rounded p-1"
              popperPlacement="bottom-end"
            />

            <h1 className=" rounded p-2 font-bold px-4">Hasta</h1>
            <DatePicker
              selected={endDate}
              placeholderText="mm/dd/aa"
              onChange={(date) => setEndDate(date)}
              className="border-blue-500 border-2 rounded p-1"
              popperPlacement="bottom-end"
            />

            {Setpermiso && (
              <>
                <h1 className=" rounded p-2 font-bold px-4">Agencia</h1>
                <select
                  className="border-blue-500 border-2 rounded p-1"
                  value={selectedAgencia}
                  onChange={handleSelectChange}
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
                  colSpan="8"
                  className="py-3 text-center bg-blue-900 text-white rounded-t-lg"
                >
                  Correlativo Ingresado Agencia
                </th>
              </tr>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 text-center ">Fecha de Ingreso</th>
                <th className="py-3 text-center px-8">Serie</th>
                <th className="py-3 text-center px-8">De</th>
                <th className="py-3 text-center px-8">Hasta</th>
                <th className="py-3 text-center px-8">
                  Cantidad Ultimo Ingreso
                </th>
                <th className="py-3 text-center px-8 ">Saldo</th>
                <th className="py-3 text-center px-8 ">Usado</th>
                <th className="py-3 text-center px-8 ">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentMovimientos.map((movimiento) => (
                <tr key={movimiento.id}>
                  <td className="text-center border border-blue-100">
                    {formatDate(movimiento.date)}
                  </td>
                  <td className="text-center border border-blue-100">
                    {movimiento.serie}
                  </td>
                  <td className="text-center border border-blue-100">
                    {movimiento.de}
                  </td>
                  <td className="text-center border border-blue-100">
                    {movimiento.hasta}
                  </td>
                  <td className="text-center border border-blue-100">
                    {movimiento.total}
                  </td>
                  <td className="text-center border border-blue-100">
                    {movimiento.saldo}
                  </td>
                  <td className="text-center border border-blue-100">
                    {movimiento.usado}
                  </td>
                  <td className="flex justify-center border border-blue-100">
                    <Link
                      to={`/movimientos/${movimiento._id}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <Link
                      to={`/entregar/${movimiento._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Usar
                    </Link>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(movimiento._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <p className="text-lg font-semibold text-blue-900">
            Total de Saldos: {totalSaldo}
          </p>
          {totalSaldo <= 50 && (
            <span
              className="text-red-500 ml-2"
              title="No quedan muchas boletas"
            >
              ⚠️
            </span>
          )}
        </div>

        <div className="flex justify-center mt-4">
          {currentPage !== 1 && (
            <button
              className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
          )}
         {currentPage < totalPages &&
            indexOfLastMovimiento < movimiento.length && (
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
    </div>
  );
}

export default AhorroIngresadoPage