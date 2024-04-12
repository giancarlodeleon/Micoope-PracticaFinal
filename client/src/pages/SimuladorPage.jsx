import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useGastos } from "../context/GastoContext";
import { useDatos} from "../context/DatoContext";
import { Link } from "react-router-dom";

function SimuladorPage() {
  const [Tllegada, setTllegada] = useState("");
  const [Tservicio, setTservicio] = useState("");
  const [Mprods, setMprods] = useState("");
  const [HSimular, setHSimular] = useState("");

  const { getProducts } = useProducts();
  const { getGastos } = useGastos();
  const { createDato, deleteDato, getDatos } = useDatos();

  useEffect(() => {
    getProducts();
    getGastos();
    getDatos();
  },[]);


  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Tabla de Horas
        </h1>

        {/* Campos de ingreso de datos */}
        <div className="flex justify-between my-4">
          <input
            type="text"
            value={Tllegada}
            onChange={(e) => setTllegada(e.target.value)}
            placeholder="Tiempo Llegada"
            className="px-3 py-2 border border-gray-300 rounded-lg mr-4"
          />
          <input
            type="text"
            value={Tservicio}
            onChange={(e) => setTservicio(e.target.value)}
            placeholder="Tiempo Servicio"
            className="px-3 py-2 border border-gray-300 rounded-lg mr-4"
          />
          <input
            type="text"
            value={Mprods}
            onChange={(e) => setMprods(e.target.value)}
            placeholder="Media Productos"
            className="px-3 py-2 border border-gray-300 rounded-lg mr-4"
          />
          <input
            type="text"
            value={HSimular}
            onChange={(e) => setHSimular(e.target.value)}
            placeholder="Horas a Simular"
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Tabla */}
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Hora</th>
                <th className="py-2 text-center">Tiempo llegada</th>
                <th className="py-2 text-center">Tiempo Servicio</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center border border-blue-100">1</td>
                <td className="text-center border border-blue-100">15</td>
                <td className="text-center border border-blue-100">18</td>
                <td className="flex justify-center items-center border border-blue-100">
                  <Link
                    to={``}
                    className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                  >
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SimuladorPage;