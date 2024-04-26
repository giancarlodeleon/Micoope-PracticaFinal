import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useAgencias } from "../context/AgenciaContext";
import DatePicker from "react-datepicker"; // Importa react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Importa los estilos de react-datepicker

function Resumen() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada
  const [selectedAgencia, setSelectedAgencia] = useState("");
  const { getAgencias, agencias } = useAgencias();

  useEffect(() => {
    getAgencias();
  }, []);

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
  <tbody></tbody>
</table>
          <table className="w-full border-collapse rounded-lg mt-20">
            <thead>
              <tr>
            
                <th
                  className="py-1 text-center bg-blue-900 text-white rounded-lg"
                  colSpan="5"
                >
                  Inventario Final
                </th>
              </tr>
              <tr>
                <th className="py-1"></th>
              </tr>
              <tr className="bg-blue-800 text-white">
                <th className="py-3 px-10 text-center rounded-tl-lg ">
                  Agencia
                </th>
                <th className="py-3 text-center px-8">Ingresos</th>
                <th className="py-3 text-center px-8">Salidas</th>
                <th className="py-3 text-center px-8">Existencia Final</th>
                <th className="py-3 text-center px-8 rounded-tr-lg">
                  Observacion
                </th>
              </tr>
              <tr className="h-4"></tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center border border-blue-100"></td>
                <td className="text-center border border-blue-100"></td>
                <td className="text-center border border-blue-100"></td>
                <td className="text-center border border-blue-100"></td>
                <td className="text-center border border-blue-100"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Resumen;
