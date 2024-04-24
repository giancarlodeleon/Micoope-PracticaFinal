import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSalidas } from "../context/SalidaContext";

function SalidaFormPage() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();
      const params = useParams();
      const { getSalida,updateSalida,salidas } = useSalidas();
      const [salidaData, setSalidaData] = useState(null);
      const [salidaDataFull, setSalidaDataFull] = useState(null);

      useEffect(() => {
        async function loadSalida() {
          if (params.id) {
            const salidas = await getSalida(params.id);
            setSalidaData(salidas.tipo);
            setSalidaDataFull(salidas);
            setValue("agencia", salidas.agencia);
            setValue("tipo", salidas.tipo);
            setValue("serie", salidas.serie);
            setValue("cantidad", salidas.cantidad);
            setValue("de", salidas.de);
            setValue("hasta", salidas.hasta);
            setValue("comentario", salidas.comentario);
          }
        }
        loadSalida();
      }, []);

  
      const onSubmit = handleSubmit(async (data) => {
        if (
          parseInt(data.de) < 0 ||
          parseInt(data.hasta) < 0 ||
          parseInt(data.cantidad) < 0
        ) {
          alert("No pueden haber numeros negativos");
          return;
        }
    
        // Verificar que el valor de "De" no sea mayor que el valor de "Hasta"
        if (parseInt(data.de) > parseInt(data.hasta)) {
          alert('El valor de "De" no puede ser mayor que el valor de "Hasta"');
          return;
        }
    
        if (params.id) {

            const newData = {
                ...data,
                agencia: salidaDataFull.agencia,
                tipo: salidaDataFull.tipo,
                serie: salidaDataFull.serie,
                cantidad: parseInt(data.hasta-data.de+1),
                de: parseInt(data.de),
                hasta:parseInt(data.hasta),
                comentario:data.comentario,
              };
              await updateSalida(params.id, newData);
          
    
          if (salidaData && salidaData === "Aportaciones") {
            navigate("/aportacionesEntregado");
          }
          if (salidaData && salidaData === "Ahorro Disponible") {
            navigate("/ahorro-entregado");
          }
          if (salidaData && salidaData === "Infanto Juvenil") {
            navigate("/infanto-entregado");
          }
          if (salidaData && salidaData === "Plazo Fijo") {
            navigate("/plazo-entregado");
          }
          if (salidaData && salidaData === "Programado") {
            navigate("/programado-entregado");
          }
          if (salidaData && salidaData === "Boletas TRX") {
            navigate("/TRX-entregado");
          }
          if (salidaData && salidaData === "Vales de Efectivo") {
            navigate("/vales-entregado");
          }
        }
      });
      
      return (
        <div className="items-center justify-center py-20">
          <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
            {/* Mostrar el tipo del movimientoToShow si existe */}
    
            <h1 className="text-2xl text-white font-bold">Usar Boleta</h1>
            <form onSubmit={onSubmit}>
             
    
              <div className="flex items-center py-2">
                <div className="flex-1">
                  <label className="text-white font "></label>
                  <input
                    type="number"
                    placeholder="De"
                    {...register("de", { required: true })}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2 w-full"
                  />
                  {errors.de && <p className="text-red-500">De Requerido</p>}
                </div>
                <div className="mx-2"></div>{" "}
                {/* Aquí agregamos un pequeño espacio */}
                <div className="flex-1">
                  <label className="text-white font "></label>
                  <input
                    type="number"
                    placeholder="Hasta"
                    {...register("hasta", { required: true })}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2 w-full"
                  />
                  {errors.hasta && <p className="text-red-500">Hasta Requerido</p>}
                </div>
              </div>
              <div className="flex items-center py-2">
                <label className="text-white font "></label>
                <textarea
                  placeholder="Comentario"
                  {...register("comentario", { required: true })}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2 resize-none w-full" // Agregamos la clase "w-full" para que ocupe todo el ancho disponible
                  rows={4} // Puedes ajustar el número de filas según lo necesites
                />
              </div>
              {errors.comentario && (
                <p className="text-red-500">Comentario Requerido</p>
              )}
    
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
              >
                Guardar
              </button>
            </form>
            {salidaData && salidaData === "Aportaciones" && (
              <Link
                to="/aportacionesEntregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
            {salidaData && salidaData === "Ahorro Disponible" && (
              <Link
                to="/ahorro-entregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
            {salidaData && salidaData === "Infanto Juvenil" && (
              <Link
                to="/infanto-entregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
            {salidaData && salidaData === "Plazo Fijo" && (
              <Link
                to="/plazo-entregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
            {salidaData && salidaData === "Programado" && (
              <Link
                to="/programado-entregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
            {salidaData && salidaData === "Boletas TRX" && (
              <Link
                to="/TRX-entregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
            {salidaData && salidaData === "Vales de Efectivo" && (
              <Link
                to="/vales-entregado"
                className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
              >
                Regresar
              </Link>
            )}
          </div>
        </div>
      );
}

export default SalidaFormPage