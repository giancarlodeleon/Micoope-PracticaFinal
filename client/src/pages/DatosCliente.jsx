import { useLocation } from "react-router-dom";
import { useDatos } from "../context/DatoContext";
import React, { useEffect, useState } from "react";

function DatosCliente() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { getDatos, datos } = useDatos();
  const caso = parseInt(params.get("caso"));
  const hora = parseInt(params.get("hora"));
  const cliente = parseInt(params.get("cliente"));

  // Utilizar un objeto para realizar un seguimiento de cuántas veces aparece cada producto
  const productCounts = {};

  useEffect(() => {
    getDatos();
  }, []);

  // Contar la cantidad de veces que aparece cada producto
  datos.forEach((place) => {
    if (
      place.caso === caso &&
      place.hora === hora &&
      place.cliente === cliente
    ) {
      const productName = place.nombre_producto;
      if (productName in productCounts) {
        productCounts[productName]++;
      } else {
        productCounts[productName] = 1;
      }
    }
  });

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Productos del Cliente {cliente}
        </h1>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">No. Producto</th>
                <th className="py-2 text-center">Nombre Producto</th>
                <th className="py-2 text-center">Cantidad</th>
                <th className="py-2 text-center">Precio Compra</th>
                <th className="py-2 text-center">Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((place) => {
                if (
                  place.caso === caso &&
                  place.hora === hora &&
                  place.cliente === cliente
                ) {
                  // Solo renderizar una fila para cada nombre de producto
                  if (productCounts[place.nombre_producto] > 0) {
                    const cantidad = productCounts[place.nombre_producto];
                    // Reducir la cantidad para que no se repita la misma fila
                    productCounts[place.nombre_producto] = 0;
                    return (
                      <tr key={place._id}>
                        <td className="text-center border border-blue-100">
                          {place.producto}
                        </td>
                        <td className="text-center border border-blue-100">
                          {place.nombre_producto}
                        </td>
                        <td className="text-center border border-blue-100">
                          {cantidad}
                        </td>
                        <td className="text-center border border-blue-100">
                          {place.precio_compra}
                        </td>

                        <td className="text-center border border-blue-100">
                          {place.precio_venta}
                        </td>
                      </tr>
                    );
                  }
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DatosCliente;
