import { useForm } from "react-hook-form";
import { useBoletas } from "../context/BoletaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAgencias } from "../context/AgenciaContext";

function BoletaFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createBoleta, getBoleta, updateBoleta, errors: BoletaErrors } = useBoletas();

  const { getAgencias, agencias } = useAgencias();

  const navigate = useNavigate();
  const params = useParams();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);

  useEffect(() => {
    async function loadBoleta() {
      if (params.id) {
        const boleta = await getBoleta(params.id);
        setValue("tipo_boleta", boleta.tipo_boleta);
        setValue("serie", boleta.serie);
        setValue("de", boleta.de);
        setValue("hasta", boleta.hasta);
      }
    }
    loadBoleta();
  }, [params.id, getBoleta, setValue]);

  useEffect(() => {
    getAgencias();
  }, [getAgencias]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.de = parseInt(data.de);
      data.hasta = parseInt(data.hasta);
      data.existencia = data.hasta - data.de + 1;
      await updateBoleta(params.id, data);
    } else {
      data.de = parseInt(data.de);
      data.hasta = parseInt(data.hasta);
      const existencia = data.hasta - data.de + 1;
      await createBoleta({ ...data, existencia});
    }
    setRedirectOnSuccess(true);
    setTimeout(() => {
      setRedirectOnSuccess(false);
    }, 4000);
  });

  useEffect(() => {
    if (redirectOnSuccess && BoletaErrors.length === 0) {
      navigate("/boletas");
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
        <h1 className="text-2xl text-white font-bold">Boleta</h1>
        <form onSubmit={onSubmit}>
          <select
            {...register("tipo_boleta", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          >
            <option value="">----------</option>
            <option value="Aportaciones">Aportaciones</option>
            <option value="Ahorro Disponible">Ahorro Disponible</option>
            <option value="Infanto Juvenil">Infanto Juvenil</option>
            <option value="Plazo Fijo">Plazo Fijo</option>
            <option value="Programado">Programado</option>
            <option value="Boletas TRX">Boletas TRX</option>
            <option value="Vales de Efectivo">Vales de Efectivo</option>
          </select>
          {errors.tipo_boleta && (
            <p className="text-red-500">Tipo de Boleta Requerido</p>
          )}
          <select
            {...register("serie", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione una serie de agencia</option>
            {agencias.map((agencia) => (
              <option key={agencia.id} value={agencia.code}>
                {agencia.name} ------- {agencia.code}
              </option>
            ))}
          </select>
          {errors.serie && <p className="text-red-500">Serie Requerida</p>}
          <div className="flex">
            <input
              type="number"
              placeholder="De"
              {...register("de", { required: true })}
              className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md my-2 mr-1"
            />
            <input
              type="number"
              placeholder="Hasta"
              {...register("hasta", { required: true })}
              className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md my-2 ml-1"
            />
          </div>
          <div className="flex justify-between">
            {errors.de && <p className="text-red-500">De requerido</p>}
            {errors.hasta && <p className="text-red-500">Hasta requerido</p>}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/boletas"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default BoletaFormPage;
