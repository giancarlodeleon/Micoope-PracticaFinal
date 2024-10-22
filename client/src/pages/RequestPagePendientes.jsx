import React from 'react';
import { Link } from "react-router-dom";

function RequestPagePendientes(){
  return (
    <div className="my-2 overflow-x-auto rounded-lg">
    <div className="flex justify-between">
    <div className="flex-1" style={{ marginLeft: "50px" }}>
      <Link
        to=""
        className="bg-green-900 font-bold text-green-50  hover:text-green-50 border-2  border-green-300  w-full rounded-tl-lg rounded-bl-lg px-6 py-2 text-center block"
      >
        Solicitudes Pendientes 
      </Link>
    </div>
    <div className="flex-1 " style={{ marginRight: "50px" }}>
      <Link
        to="/requestsaprobadas"
        className="bg-white font-bold text-green-900 border-2 border-green-900  hover:bg-green-500 hover:text-green-50 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block"
      >
        Solicitudes Aprobadas 
      </Link>
    </div>
  </div>
  </div>
  );
}

export default RequestPagePendientes;
