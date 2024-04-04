import { Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useBoletas } from "../context/BoletaContext";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

function Almacen() {

  const { getBoletas, boletas, deleteBoleta } = useBoletas();

  useEffect(() => {
    getBoletas();
  }, []);

  const handleDeleteClick = (boletaId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este rol?"
    );
    if (confirmDelete) {
      deleteBoleta(boletaId);
    }
  };

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Almacen
          <Link
            to="/add-boleta"
            className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        
        <div className="my-2 overflow-x-auto rounded-lg">
         
          <table className="w-full border-collapse rounded-lg mt-2">
            <thead>
            
              <tr className="bg-blue-900 text-white ">
                <th className="py-3 text-center rounded-tl-lg ">Fecha de Ingreso</th>
                <th className="py-3 text-center px-10">Tipo</th>
                <th className="py-3 text-center px-8">Serie</th>
                <th className="py-3 text-center px-8">De</th>
                <th className="py-3 text-center px-6">Hasta</th>
                <th className="py-3 text-center px-6">Existencia</th>
                <th className="py-3 text-center px-6  rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {boletas.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-blue-100">
                    {formatDate(place.date)}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.tipo_boleta}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.serie}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.de}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.hasta}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.existencia}
                  </td>
                  <td className="flex justify-center items-center border border-blue-100">
                    <Link
                      to={`/boletas/${place._id}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <Link
                      to={`/boletas/ingreso/${place._id}`}
                      className="bg-green-600 font-bold hover:bg-green-500 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Ingresar
                    </Link>
                    <Link
                      to={`/boletas/egreso/${place._id}`}
                      className="bg-green-600 font-bold hover:bg-green-500 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Enviar
                    </Link>
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
        </div>
      </div>
    </div>
  );
}

export default Almacen
