import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useGastos } from "../context/GastoContext";
import { useDatos } from "../context/DatoContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function SimuladorPage() {
  const [Tservicio, setTservicio] = useState(
    localStorage.getItem("Tservicio") || ""
  );
  const [Mprods, setMprods] = useState(localStorage.getItem("Mprods") || "");
  const [HSimular, setHSimular] = useState(
    localStorage.getItem("HSimular") || ""
  );
  const [tablaDatos, setTablaDatos] = useState(
    JSON.parse(localStorage.getItem("tablaDatos")) || []
  );
  const [datosOriginales, setDatosOriginales] = useState(
    JSON.parse(localStorage.getItem("datosOriginales")) || []
  );
  const [tablaVacia, setTablaVacia] = useState(true); // Estado para verificar si la tabla está vacía

  const { getProducts, products } = useProducts();
  const { getGastos } = useGastos();
  const { createDato, deleteDato, getDatos } = useDatos();

  useEffect(() => {
    getProducts();
    getGastos();
    getDatos();
  }, []);

  useEffect(() => {
    localStorage.setItem("Tservicio", Tservicio);
    localStorage.setItem("Mprods", Mprods);
    localStorage.setItem("HSimular", HSimular);
    localStorage.setItem("tablaDatos", JSON.stringify(tablaDatos));
    localStorage.setItem("datosOriginales", JSON.stringify(datosOriginales));
  }, [Tservicio, Mprods, HSimular, tablaDatos, datosOriginales]);

  const handleSimulate = async () => {
    // Verificar si la tabla está vacía
    if (tablaDatos.length === 0) {
      // Verificar si todos los campos están llenos
      if (
        Tservicio.trim() !== "" &&
        Mprods.trim() !== "" &&
        HSimular.trim() !== ""
      ) {
        try {
          // Aquí llamamos a la función asincrónica y esperamos su finalización

          const total = 3;
          const numFilas = parseInt(HSimular);
          const tiemposLlegada = [];

          for (let t = 1; t <= 3; t++) {
            for (let i = 1; i <= numFilas; i++) {
              const tiempoLlegadaAleatorio =
                Math.floor(Math.random() * parseInt(Tservicio)) + 1;
              tiemposLlegada.push(tiempoLlegadaAleatorio);
              for (let j = 1; j <= tiempoLlegadaAleatorio; j++) {
                const productoAleatorio =
                  Math.floor(Math.random() * parseInt(Mprods)) + 1;
                for (let k = 1; k <= productoAleatorio; k++) {
                  const productoSeleccionado =
                    products[Math.floor(Math.random() * products.length)];

                  const caso = t;
                  const hora = i;
                  const cliente = j;
                  const producto = k;
                  const nombre_producto = productoSeleccionado.nombre;
                  const precio_compra = productoSeleccionado.precio_compra;
                  const precio_venta = productoSeleccionado.precio_venta;

                  await createDato({
                    _id: uuidv4(),
                    caso,
                    hora,
                    cliente,
                    producto,
                    nombre_producto,
                    precio_compra,
                    precio_venta,
                  });
                }
              }
            }
          }

          // Obtener el valor de HSimular y convertirlo a un número entero

          // Verificar si HSimular es un número válido
          if (isNaN(numFilas) || numFilas <= 0) {
            // Si HSimular no es un número válido o es menor o igual a cero, no se simula nada
            console.error(
              "Ingrese un valor válido para la cantidad de filas a simular."
            );
            return;
          }

          // Generar datos simulados según el valor de HSimular y Tservicio
          const datosSimulados = [];
          let contador = 0;
          for (let j = 1; j <= total; j++) {
            for (let i = 1; i <= numFilas; i++) {
              // Agregar el dato simulado a la tabla de datos
              datosSimulados.push({
                caso: j,
                hora: i,
                tiempoLlegada: tiemposLlegada[contador],
                tiempoServicio: parseInt(Tservicio), // Utilizamos el valor de Tservicio introducido manualmente
              });
              contador++; // Incrementar contador en 1
            }
          }

          // Actualizar el estado de la tabla con los datos simulados
          setTablaDatos(datosSimulados);
          setDatosOriginales(datosSimulados); // Guardar una copia de respaldo de los datos originales
        } catch (error) {
          console.error("Error al crear el rol:", error);
        }
      } else {
        // Si no todos los campos están llenos, mostrar un mensaje de error
        console.error("Por favor, complete todos los campos antes de simular.");
      }
    } else {
      console.error(
        "La tabla no está vacía. Por favor, limpie los datos antes de simular."
      );
    }
  };

  // Función para limpiar los campos de entrada y la tabla
  const handleClear = async () => {
    try {
      deleteDato();
      // Limpiar la tabla de datos
      setTablaDatos([]);
      setDatosOriginales([]); // Limpiar la copia de respaldo de los datos originales
      // Limpiar los estados de los campos de entrada
      setTservicio("");
      setMprods("");
      setHSimular("");

      // Limpiar el almacenamiento local
      localStorage.removeItem("tablaDatos");
    } catch (error) {
      console.error("Error al limpiar los datos:", error);
    }
  };

  // Calcula la suma total de clientes que llegaron
  const totalClientesLlegaron = tablaDatos.reduce(
    (total, dato) => total + dato.tiempoLlegada,
    0
  );

  // Añade una fila adicional en la tabla para mostrar la suma total
  const mostrarSumaTotal = tablaDatos.length > 0 && (
    <tr className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative">
      <td colSpan="2">
        <strong>Total Clientes que Llegaron:</strong>
      </td>
      <td className="text-center border rounded-br-lg border-blue-100">
        <strong>{totalClientesLlegaron}</strong>
      </td>
    </tr>
  );

  // Función para mostrar los datos originales en la tabla
  const handleMostrarOriginales = () => {
    // Establecer la tabla con los datos originales
    setTablaDatos(datosOriginales);
  };

  // Función para mostrar solo los datos del caso indicado
  const handleMostrarCaso = (caso) => {
    // Filtrar los datos originales para mostrar solo los datos del caso indicado
    const datosCaso = datosOriginales.filter((dato) => dato.caso === caso);
    // Establecer la tabla con los datos filtrados
    setTablaDatos(datosCaso);
  };

  // Verificar si la tabla está vacía y habilitar o deshabilitar el botón de Simular
  useEffect(() => {
    if (tablaDatos.length === 0) {
      setTablaVacia(true);
    } else {
      setTablaVacia(false);
    }
  }, [tablaDatos]);

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
        <div className="flex flex-col md:flex-row justify-between my-4">
          <input
            type="text"
            value={Tservicio}
            onChange={(e) => setTservicio(e.target.value)}
            placeholder="Tiempo Servicio"
            className="px-3 py-2 border border-gray-300 rounded-lg mb-2 md:mb-0 md:mr-4"
          />
          <input
            type="text"
            value={Mprods}
            onChange={(e) => setMprods(e.target.value)}
            placeholder="Media Productos"
            className="px-3 py-2 border border-gray-300 rounded-lg mb-2 md:mb-0 md:mr-4"
          />
          <input
            type="text"
            value={HSimular}
            onChange={(e) => setHSimular(e.target.value)}
            placeholder="Horas a Simular"
            className="px-3 py-2 border border-gray-300 rounded-lg mb-2 md:mb-0"
          />
        </div>

        {/* Botones para simular y limpiar */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleSimulate}
            className={`bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2 ${
              tablaVacia ? "" : "cursor-not-allowed opacity-50"
            }`}
            disabled={!tablaVacia}
          >
            Simular
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 py-2 px-4 rounded-lg"
          >
            Limpiar
          </button>
        </div>

        {/* Botones para mostrar datos por caso */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleMostrarOriginales}
            className="bg-red-500 text-white font-bold hover:bg-red-400 py-2 px-4 rounded-lg mr-2"
          >
            Mostrar Todos
          </button>
          <button
            onClick={() => handleMostrarCaso(1)}
            className="bg-green-500 text-white font-bold hover:bg-green-400 py-2 px-4 rounded-lg mr-2"
          >
            Mostrar Caso 1
          </button>
          <button
            onClick={() => handleMostrarCaso(2)}
            className="bg-green-500 text-white font-bold hover:bg-green-400 py-2 px-4 rounded-lg mr-2"
          >
            Mostrar Caso 2
          </button>
          <button
            onClick={() => handleMostrarCaso(3)}
            className="bg-green-500 text-white font-bold hover:bg-green-400 py-2 px-4 rounded-lg"
          >
            Mostrar Caso 3
          </button>
        </div>

        {/* Tabla */}
        <div className="my-2 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Caso</th>
                <th className="py-2 text-center">Hora</th>
                <th className="py-2 text-center">Clientes que llegaron</th>
                <th className="py-2 text-center">Tiempo Servicio</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapea los datos de la tabla */}
              {tablaDatos.map((dato, index) => (
                <tr key={index}>
                  {console.log(dato)}
                  <td className="text-center border border-blue-100">
                    {dato.caso}
                  </td>
                  <td className="text-center border border-blue-100">
                    {dato.hora}
                  </td>
                  <td className="text-center border border-blue-100">
                    {dato.tiempoLlegada}
                  </td>
                  <td className="text-center border border-blue-100">
                    {dato.tiempoServicio}
                  </td>
                  <td className="flex justify-center items-center border border-blue-100">
                    <Link
                      to={`/simulador/hora/?caso=${dato.caso}&hora=${dato.hora}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Ver Hora
                    </Link>
                  </td>
                </tr>
              ))}
              {/* Muestra la suma total de clientes que llegaron */}
              {mostrarSumaTotal}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SimuladorPage;
