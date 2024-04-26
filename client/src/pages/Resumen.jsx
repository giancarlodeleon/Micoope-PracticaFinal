import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useRols } from "../context/RolContext";
import { useAgencias } from "../context/AgenciaContext";
import { useMovimientos } from "../context/MovimientoContext";
import { useSalidas } from "../context/SalidaContext";

function Resumen() {
  const { user } = useAuth();
  const [selectedAgencia, setSelectedAgencia] = useState("");
  const { getAgencias, agencias } = useAgencias();
  const [permisoToShow, setPermisoToShow] = useState(null);
  const { getRols, rol } = useRols();
  const { movimiento, getMovimientos } = useMovimientos();
  const { getSalidas, salidas } = useSalidas();

  useEffect(() => {
    getSalidas();
    getAgencias();
    getRols();
    getMovimientos();
  }, []);

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_of_all_Agencys);
  }, []);

  useEffect(() => {
    // Llamada a funciones para obtener datos filtrados cuando se selecciona una agencia
    if (selectedAgencia) {
      // Aquí puedes realizar las llamadas para obtener datos específicos según la agencia seleccionada
    }
  }, [selectedAgencia]);

  // Filtrar los movimientos por la agencia del usuario o la agencia seleccionada
  const filteredMovimientos = movimiento.filter(
    (mov) => mov.agencia === (selectedAgencia || user.agencia)
  );

  // Agrupar los movimientos por tipo
  const groupedMovimientos = filteredMovimientos.reduce((acc, curr) => {
    if (!acc[curr.tipo]) {
      acc[curr.tipo] = {
        agencia: curr.agencia,
        tipo: curr.tipo,
        saldo: curr.saldo,
        usado: curr.usado,
      };
    } else {
      acc[curr.tipo].saldo += curr.saldo;
      acc[curr.tipo].usado += curr.usado;
    }
    return acc;
  }, {});

  // Convertir los movimientos agrupados en un array
  const movimientosArray = Object.values(groupedMovimientos);

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Resumen
        </h1>
        <div className="my-2 overflow-x-auto rounded-lg">
          <h1
            className="text-center rounded-lg bg-blue-900 font-bold text-white relative"
            style={{ fontSize: "20px" }}
          >
            Saldos en formas en Blanco Agencia
          </h1>

          <table className="mt-4 mx-auto">
            {permisoToShow && (
              <>
                <thead>
                  <tr>
                    <td className="py-1 text-center font-bold">
                      <div className="flex justify-center">Agencia:</div>
                    </td>
                    <td className="px-4">
                      <div className="flex justify-center">
                        <select
                          className="border-blue-500 border-2 rounded p-1"
                          value={selectedAgencia}
                          onChange={(e) => setSelectedAgencia(e.target.value)}
                        >
                          <option value="">Selecciona una agencia</option>
                          {agencias.map((agencia) => (
                            <option key={agencia.id} value={agencia.id}>
                              {agencia.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                </thead>
              </>
            )}
            <tbody></tbody>
          </table>
          <table className="w-full border-collapse rounded-lg mt-6">
            <thead>
              <tr>
                <th
                  className="py-1 text-center bg-blue-900 text-white rounded-lg"
                  colSpan="5"
                >
                  Entradas
                </th>
              </tr>
              <tr>
                <th className="py-1"></th>
              </tr>
              <tr className="bg-blue-800 text-white">
                <th className="py-3 px-10 text-center rounded-tl-lg w-1/5">
                  Agencia
                </th>
                <th className="py-3 text-center px-8 w-1/5">Tipo de Boleta</th>
                <th className="py-3 text-center px-8 w-1/5">Saldo</th>
                <th className="py-3 text-center px-8 w-1/5">Usado</th>
                <th className="py-3 text-center px-8 rounded-tr-lg w-1/5">
                  Total
                </th>
              </tr>
              <tr className="h-4"></tr>
            </thead>
            <tbody>
              {movimientosArray.map((mov) => (
                <tr key={mov.tipo}>
                  <td className="text-center border border-blue-100">
                    {mov.agencia}
                  </td>
                  <td className="text-center border border-blue-100">
                    {mov.tipo}
                  </td>
                  <td className="text-center border border-blue-100">
                    {mov.saldo}
                  </td>
                  <td className="text-center border border-blue-100">
                    {mov.usado}
                  </td>
                  <td className="text-center border border-blue-100">
                    <span className="mr-1" style={{ verticalAlign: "middle" }}>
                      {mov.saldo - mov.usado}
                    </span>
                    {mov.tipo === "Boletas TRX" ? (
                      // Bloque que se muestra si la condición es verdadera
                      <span>
                        {mov.saldo - mov.usado <= 2000 && (
                          <span
                            className="text-red-500"
                            style={{ verticalAlign: "middle" }}
                            title="Queda poca existencia, recomendado enviar mas"
                          >
                            ⚠️
                          </span>
                        )}
                      </span>
                    ) : (
                      // Bloque que se muestra si la condición es falsa
                      <span>
                        {mov.saldo - mov.usado <= 50 && (
                          <span
                            className="text-red-500"
                            style={{ verticalAlign: "middle" }}
                            title="Queda poca existencia, recomendado enviar mas"
                          >
                            ⚠️
                          </span>
                        )}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full border-collapse rounded-lg mt-6">
            <thead>
              <tr>
                <th
                  className="py-1 text-center bg-blue-900 text-white rounded-lg"
                  colSpan="3"
                >
                  Salidas
                </th>
              </tr>
              <tr>
                <th className="py-1"></th>
              </tr>
              <tr className="bg-blue-800 text-white">
                <th className="py-3 px-10 text-center rounded-tl-lg w-1/3">
                  Agencia
                </th>
                <th className="py-3 text-center px-8 w-1/3">Tipo de Boleta</th>
                <th className="py-3 text-center px-8 rounded-tr-lg w-1/3">
                  Total
                </th>
              </tr>
              <tr className="h-4"></tr>
            </thead>
            <tbody>
              {/* Filtrar y agrupar las salidas por tipo y mostrar solo las de la misma agencia */}
              {salidas
                .filter((salida) => salida.agencia === (selectedAgencia || user.agencia))
                .reduce((acc, curr) => {
                  const existing = acc.find((item) => item.tipo === curr.tipo);
                  if (existing) {
                    existing.total += curr.cantidad;
                  } else {
                    acc.push({
                      agencia: curr.agencia,
                      tipo: curr.tipo,
                      total: curr.cantidad,
                    });
                  }
                  return acc;
                }, [])
                .map((salida) => (
                  <tr key={salida.tipo}>
                    <td className="text-center border border-blue-100">
                      {salida.agencia}
                    </td>
                    <td className="text-center border border-blue-100">
                      {salida.tipo}
                    </td>
                    <td className="text-center border border-blue-100">
                      {salida.total}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Resumen;
