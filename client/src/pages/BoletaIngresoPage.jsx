import { useForm } from "react-hook-form";
import { useBoletas } from "../context/BoletaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BoletaIngresoPage() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

      
      const { getBoleta, updateBoleta, errors: BoletaErrors } = useBoletas();


      const navigate = useNavigate();
      const params = useParams();
      const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
      const [existenciaActual, setExistenciaActual] = useState(0);

      useEffect(() => {
        async function loadBoleta() {
          if (params.id) {
            const boleta = await getBoleta(params.id);
            setValue("tipo_boleta", boleta.tipo_boleta);
            setValue("serie", boleta.serie);
            setValue("de", boleta.de);
            setValue("hasta", boleta.hasta);
            setExistenciaActual(boleta.existencia);
          }
        }
        loadBoleta();
      }, [params.id, getBoleta, setValue]);

      const onSubmit = handleSubmit(async (data) => {
        // Verificar que el valor de "existencia" no sea negativo
        if (parseInt(data.existencia) < 0) {
          alert('La cantidad no puede ser negativa');
          return;
        }
      
        if (params.id) {
          const existencia = parseInt(data.existencia);
          const nuevaExistencia = existenciaActual + existencia;
          await updateBoleta(params.id, {
              ...data,
              existencia: nuevaExistencia,
              hasta: data.hasta + existencia
          });
        }
        setRedirectOnSuccess(true);
        setTimeout(() => {
            setRedirectOnSuccess(false);
        }, 4000);
      });

      useEffect(() => {
        if (redirectOnSuccess && BoletaErrors.length === 0) {
          navigate("/inventario");
        }
      }, [redirectOnSuccess, BoletaErrors, navigate]);
    


      return (
        <div className="items-center justify-center py-20">
          <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
            {BoletaErrors.map((error, i) => (
              <div
                className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
                key={i}
              >
                {error}
              </div>
            ))}
            <h1 className="text-2xl text-white font-bold">Ingreso de Boletas</h1>
            <form onSubmit={onSubmit}>
           
            <input
            type="number"
            {...register("existencia", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Ingrese la cantidad a agregar"
          />
          {errors.existencia && (
            <p className="text-red-500">La cantidad es necesaria</p>
          )}
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
              >
                Ingresar
              </button>
            </form>
            <Link
              to="/inventario"
              className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
            >
              Regresar
            </Link>
          </div>
        </div>
        
      );
}

export default BoletaIngresoPage