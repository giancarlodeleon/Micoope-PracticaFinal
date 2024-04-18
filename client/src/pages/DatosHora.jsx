import { useLocation } from 'react-router-dom';
import { useDatos } from "../context/DatoContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DatosHora() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { getDatos, datos } = useDatos();
  const caso = parseInt(params.get('caso'));
  const hora = parseInt(params.get('hora'));
  const [filteredDatos, setFilteredDatos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [totalVenta, setTotalVenta] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    getDatos();
  }, []);

  useEffect(() => {
    const filtered = datos.filter(dato => dato.caso === caso && dato.hora === hora);

    // Objeto para realizar el seguimiento de la suma de los precios de compra y venta para cada cliente
    const sumByCliente = {};

    // Calcular la suma del precio_compra y precio_venta para cada cliente
    filtered.forEach(dato => {
      const cliente = dato.cliente;
      const precioCompra = dato.precio_compra;
      const precioVenta = dato.precio_venta;
      if (!sumByCliente[cliente]) {
        sumByCliente[cliente] = { totalCompra: 0, totalVenta: 0, totalProductos: 0 };
      }
      sumByCliente[cliente].totalCompra += precioCompra;
      sumByCliente[cliente].totalVenta += precioVenta;
      sumByCliente[cliente].totalProductos += 1;
    });

    // Mapear los datos filtrados y actualizar el precio_compra y precio_venta con las sumas correspondientes
    const updatedFilteredDatos = filtered.map(dato => {
      return {
        ...dato,
        precio_compra: sumByCliente[dato.cliente].totalCompra,
        precio_venta: sumByCliente[dato.cliente].totalVenta
      };
    });

    // Filtrar los datos para mostrar solo el producto más alto por cliente
    const filteredByCliente = {};

    updatedFilteredDatos.forEach(dato => {
      const cliente = dato.cliente;
      if (!filteredByCliente[cliente] || filteredByCliente[cliente].producto < dato.producto) {
        filteredByCliente[cliente] = dato;
      }
    });

    // Convertir el objeto de clientes filtrados en un array
    const filteredArray = Object.values(filteredByCliente);

    setFilteredDatos(filteredArray);

    // Calcular la suma total del precio de compra, el precio de venta y de productos comprados
    const totalCompraSum = filteredArray.reduce((total, dato) => total + dato.precio_compra, 0);
    const totalVentaSum = filteredArray.reduce((total, dato) => total + dato.precio_venta, 0);
    const totalProductosSum = filteredArray.reduce((total, dato) => total + sumByCliente[dato.cliente].totalProductos, 0);
    setTotalCompra(totalCompraSum);
    setTotalVenta(totalVentaSum);
    setTotalProductos(totalProductosSum);
  }, [caso, hora, datos]);

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Tabla de Clientes Hora {hora}
        </h1>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">No. Cliente</th>
                <th className="py-2 text-center">Productos comprados</th>
                <th className="py-2 text-center">Compra total</th>
                <th className="py-2 text-center">Venta total</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatos.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-blue-100">
                    {place.cliente}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.producto}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.precio_compra}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.precio_venta}
                  </td>
                  <td className="flex justify-center items-center border border-blue-100">
                  <Link
                      to={`/simulador/cliente/?caso=${caso}&hora=${hora}&cliente=${place.cliente}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Ver Producto
                    </Link>
                  </td>
                </tr>
              ))}
              {/* Fila para mostrar la suma total de precio de compra y venta */}
              <tr className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative">
                <td className="bg-white" colSpan="1"></td>
                <td className="text-center border rounded-bl-lg border-blue-100">
                  <strong>Total de Productos Comprados: {totalProductos}</strong>
                </td>
                <td className="text-center border border-blue-100">
                  <strong>Suma Compra total: {totalCompra}</strong>
                </td>
                <td className="text-center border rounded-br-lg border-blue-100">
                  <strong>Suma Venta total: {totalVenta}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DatosHora;
