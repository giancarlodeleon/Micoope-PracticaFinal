import { Link } from "react-router-dom";

function InfantoEntregadoPage() {
    return (
        <div className="flex justify-center p-4 ">
          <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
            <h1
              className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
              style={{ fontSize: "30px" }}
            >
              Infanto Juvenil
            </h1>
            <div className="my-2 overflow-x-auto rounded-lg">
              <div className="flex justify-between">
                {/* Botones que están pegados mutuamente y abarcan el ancho de la tabla */}
                <div class="flex-1 " style={{ marginLeft: '50px' }}>
                <Link to="/infanto-ingresado" className="bg-white font-bold text-blue-900 border-2 border-blue-900  hover:bg-blue-500 hover:text-blue-50 w-full rounded-bl-lg rounded-tl-lg px-6 py-2 text-center block">Correlativo Ingresado Agencia</Link>
                </div>
                <div className="flex-1" style={{ marginRight: '50px' }}>
                <Link to="" className="bg-blue-900 font-bold text-blue-50  hover:text-blue-50 border-2 border-blue-300 w-full rounded-tr-lg rounded-br-lg px-6 py-2 text-center block">Correlativo Entregado Asociados</Link>
                </div>
              </div>
              <table className="w-full border-collapse rounded-lg mt-2">
                <thead>
                  <tr >
                    
                    <th colSpan="6" className="py-3 text-center bg-blue-900 text-white rounded-t-lg">Correlativo Entregado Asociados</th>
                  </tr>
                  <tr className="bg-blue-900 text-white">
                    <th className="py-3 text-center px-10 ">Fecha de Ingreso</th>
                    <th className="py-3 text-center px-10">De</th>
                    <th className="py-3 text-center px-10">Hasta</th>
                    <th className="py-3 text-center px-10">Total Salidas</th>
                    <th className="py-3 text-center px-10">Saldo</th>
                    <th className="py-3 text-center ">Comentario(anuladas o sin correlativo)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapea sobre las aportaciones y renderiza cada una como una fila en la tabla */}
                  {/* Reemplaza aportaciones con el nombre del array de aportaciones obtenido del contexto */}
                  {/* {aportaciones.map((aportacion) => ( */}
                  <tr>
                    <td className="text-center border border-blue-100">
                      {/* Reemplaza por la fecha de ingreso de la aportación */}
                    </td>
                    <td className="text-center border border-blue-100">
                      {/* Reemplaza por el valor "De" de la aportación */}
                    </td>
                    <td className="text-center border border-blue-100">
                      {/* Reemplaza por el valor "Hasta" de la aportación */}
                    </td>
                    <td className="text-center border border-blue-100">
                      {/* Reemplaza por el valor "Total Ingreso" de la aportación */}
                    </td>
                    <td className="text-center border border-blue-100">
                      {/* Reemplaza por el valor "Saldo" de la aportación */}
                    </td>
                    <td className="text-center border border-blue-100">
                      {/* Reemplaza por el valor "Saldo" de la aportación */}
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
}

export default InfantoEntregadoPage