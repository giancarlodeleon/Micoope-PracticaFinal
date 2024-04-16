import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovimientos } from "../context/MovimientoContext";

function MovimientoFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    getMovimiento,
    updateMovimiento,
    errors: MovimientoErrors,
    movimiento
  } = useMovimientos();

  const navigate = useNavigate();
  const [movimientoToShow, setMovimientoToShow] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function loadMovimiento() {
      if (params.id) {
        const movimiento = await getMovimiento(params.id);
        setValue("tipo", movimiento.tipo);
        setValue("agencia", movimiento.agencia);
        setValue("serie", movimiento.serie);
        setValue("de", movimiento.de);
        setValue("hasta", movimiento.hasta);
        setValue("total", movimiento.total);
        setValue("saldo", movimiento.saldo);
      }
    }
    loadMovimiento();
  }, []);

  useEffect(() => {
    if (params.id) {
      const movi = movimiento.find((movi) => movi.id === params._id);
      setMovimientoToShow(movi);
    }
  },[]);

  const onSubmit = handleSubmit(async (data) => {
    // Verificar que los valores de "De" y "Hasta" no sean negativos
    if (
      parseInt(data.de) < 0 ||
      parseInt(data.hasta) < 0 ||
      parseInt(data.total) < 0
    ) {
      alert("No pueden haber valores negativos");
      return;
    }

    if (parseInt(data.de) > parseInt(data.hasta)) {
      alert('El valor de "De" no puede ser mayor que el valor de "Hasta"');
      return;
    }

    if (params.id) {
      data.de = parseInt(data.de);
      data.hasta = parseInt(data.hasta);
      data.total = parseInt(data.total);
      data.saldo = data.hasta - data.de + 1;
      await updateMovimiento(params.id, data);
      if (movimientoToShow && movimientoToShow.tipo === "Aportaciones") {
        navigate("/aportacionesIngresado");
      }
    }
  });



  return (
    <div className="items-center justify-center py-20">
      <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
         {/* Mostrar el tipo del movimientoToShow si existe */}
  
        <h1 className="text-2xl text-white font-bold">Movimiento</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Serie"
            {...register("serie", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.serie && <p className="text-red-500">Serie Requerida</p>}

          <div className="flex items-center py-2">
            <label className="text-white font "></label>
            <input
              type="number"
              {...register("de", { required: true })}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          {errors.de && <p className="text-red-500">De Requerido</p>}

          <div className="flex items-center py-2">
            <label className="text-white font "></label>
            <input
              type="number"
              {...register("hasta", { required: true })}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          {errors.hasta && <p className="text-red-500">De Requerido</p>}

          <div className="flex items-center py-2">
            <label className="text-white font "></label>
            <input
              type="number"
              {...register("total", { required: true })}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          {errors.total && <p className="text-red-500">Total Requerido</p>}

          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/aportacionesIngresado"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default MovimientoFormPage;
