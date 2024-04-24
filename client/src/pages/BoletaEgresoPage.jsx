import { useForm } from "react-hook-form";
import { useBoletas } from "../context/BoletaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAgencias } from "../context/AgenciaContext";
import { useMovimientos } from "../context/MovimientoContext";

function BoletaEgresoPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { getAgencias, agencias } = useAgencias();
  const { getBoleta, updateBoleta, errors: BoletaErrors } = useBoletas();
  const { createMovimiento, movimiento, updateMovimiento } =
    useMovimientos();

  const navigate = useNavigate();
  const params = useParams();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const [existenciaActual, setExistenciaActual] = useState(0);
  const [boletaSerie, setBoletaSerie] = useState("");
  const [boletaTipo, setBoletaTipo] = useState("");
  const [boletaDe, setBoletaDe] = useState("");

  useEffect(() => {
    async function loadBoleta() {
      if (params.id) {
        const boleta = await getBoleta(params.id);
        setValue("tipo_boleta", boleta.tipo_boleta);
        setValue("serie", boleta.serie);
        setValue("de", boleta.de);
        setValue("hasta", boleta.hasta);
        setExistenciaActual(boleta.existencia);
        setBoletaSerie(boleta.serie);
        setBoletaTipo(boleta.tipo_boleta);
        setBoletaDe(boleta.de);
      }
    }
    loadBoleta();
  }, [params.id, getBoleta, setValue]);

  useEffect(() => {
    getAgencias();
  }, [getAgencias]);

  const onSubmit = handleSubmit(async (data) => {
    // Verificar que el valor de "existencia" no sea negativo
    if (parseInt(data.existencia) < 0) {
      alert("La cantidad no puede ser negativa");
      return;
    }

    // Verificar que el valor de "existencia" no sea mayor que la existencia actual
    if (parseInt(data.existencia) > existenciaActual) {
      alert("La cantidad no puede ser mayor que la existencia actual");
      return;
    }

    // Verificar si el código de la agencia coincide con la serie
    const agenciaSeleccionada = agencias.find(
      (agencia) => agencia.name === data.agencia
    );
    if (agenciaSeleccionada.code !== data.serie) {
      const confirmacion = window.confirm(
        "El código de la agencia no coincide con la serie. ¿Estás seguro de continuar?"
      );
      if (!confirmacion) {
        return;
      }
    }

    if (params.id) {
      const existencia = parseInt(data.existencia);
      const nuevaExistencia = existenciaActual - existencia;
      await updateBoleta(params.id, {
        ...data,
        existencia: nuevaExistencia,
        de: data.de + existencia,
      });
    }

    const existencia = parseInt(data.existencia);
    data.de = parseInt(boletaDe);
    data.serie = boletaSerie;
    data.tipo = boletaTipo;
    data.total = parseInt(data.existencia);
    data.saldo = parseInt(data.existencia);

    const existingMovimiento = movimiento.find(
      (movimiento) =>
        movimiento.serie === data.serie && movimiento.agencia === data.agencia && movimiento.hasta === data.de-1
    );
    console.log("Movimiento existente:", existingMovimiento);
    if (existingMovimiento) {
      // Si existe un movimiento, actualizarlo
      const existencia = parseInt(data.existencia);
      const currentDate = new Date();
      existingMovimiento.date = currentDate;

      await updateMovimiento(existingMovimiento._id, {
        ...existingMovimiento,
        hasta: existingMovimiento.hasta + existencia,
        total: existencia,
        saldo: existingMovimiento.saldo + existencia,
      });
    } else {

    await createMovimiento({ ...data, hasta: data.de + existencia - 1 ,usado:0});
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
        <h1 className="text-2xl text-white font-bold">Envío de Boletas</h1>
        <form onSubmit={onSubmit}>
          <select
            {...register("agencia", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          >
            <option value="">Seleccione una agencia</option>
            {agencias.map((agencia) => (
              <option key={agencia.id} value={agencia.name}>
                {agencia.name}
              </option>
            ))}
          </select>
          {errors.agencia && <p className="text-red-500">Agencia requerida</p>}
          <input
            type="number"
            {...register("existencia", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Ingrese la cantidad a enviar"
          />
          {errors.existencia && (
            <p className="text-red-500">La cantidad es necesaria</p>
          )}
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
          >
            Enviar
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
export default BoletaEgresoPage;
