import { Link} from "react-router-dom";
import { useEffect } from "react";
import {useAgencias} from "../context/AgenciaContext"


function Agencias() {
  const { getAgencias, agencias, deleteAgencia } = useAgencias();


  useEffect(() => {
    getAgencias();
  });

  const handleDeleteClick = (useId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (confirmDelete) {
      deleteAgencia(useId);
    }
  };
  

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Agencias
          <Link
            to="/add-agencia"
            className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Codigo</th>
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Acciones</th>

              </tr>
            </thead>
            <tbody>
            {agencias.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-blue-100">
                    {place.code}
                  </td>
                  <td className="text-center border border-blue-100">
                    {place.name}
                  </td>
                  
                  <td className="flex justify-center items-center border border-blue-100">
                    <Link
                      to={`/agencias/${place._id}`}
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
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

export default Agencias