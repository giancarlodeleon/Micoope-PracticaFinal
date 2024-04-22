import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovimientos } from "../context/MovimientoContext";
import { useSalidas } from "../context/SalidaContext";

function EntregadoFormPage() {
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
    movimiento,
  } = useMovimientos();

  const { createSalida } = useSalidas();

  const navigate = useNavigate();
  const [movimientoToShow, setMovimientoToShow] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function loadMovimiento() {
      if (params.id) {
        const movimiento = await getMovimiento(params.id);
        setValue("tipoM", movimiento.tipo);
        setValue("agenciaM", movimiento.agencia);
        setValue("serieM", movimiento.serie);
        setValue("deM", movimiento.de);
        setValue("hastaM", movimiento.hasta);
        setValue("totalM", movimiento.total);
        setValue("saldoM", movimiento.saldo);
      }
    }
    loadMovimiento();
  }, []);

  useEffect(() => {
    if (params.id) {
      const movi = movimiento.find((movi) => movi._id === params.id);
      setMovimientoToShow(movi.tipo);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      if (movimientoToShow && movimientoToShow === "Aportaciones") {
        navigate("/aportacionesIngresado");
      }
      if (movimientoToShow && movimientoToShow === "Ahorro Disponible") {
        navigate("/ahorro-ingresado");
      }
      if (movimientoToShow && movimientoToShow === "Infanto Juvenil") {
        navigate("/infanto-ingresado");
      }
      if (movimientoToShow && movimientoToShow === "Plazo Fijo") {
        navigate("/plazo-ingresado");
      }
      if (movimientoToShow && movimientoToShow === "Programado") {
        navigate("/programado-ingresado");
      }
      if (movimientoToShow && movimientoToShow === "Boletas TRX") {
        navigate("/TRX-ingresado");
      }
      if (movimientoToShow && movimientoToShow === "Vales de Efectivo") {
        navigate("/vales-ingresado");
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
            <label className="text-white font "></label>
            <input
              type="number"
              placeholder="Comentario"
              {...register("cantidad", { required: true })}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          {errors.cantidad && (
            <p className="text-red-500">Cantidad Requerido</p>
          )}

          <div className="flex items-center py-2">
            <label className="text-white font "></label>
            <input
              type="number"
              placeholder="De"
              {...register("de", { required: true })}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          {errors.de && <p className="text-red-500">De Requerido</p>}

          <div className="flex items-center py-2">
            <label className="text-white font "></label>
            <input
              type="number"
              placeholder="Hasta"
              {...register("hasta", { required: true })}
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          {errors.hasta && <p className="text-red-500">De Requerido</p>}

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
        {movimientoToShow && movimientoToShow === "Aportaciones" && (
          <Link
            to="/aportacionesIngresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
        {movimientoToShow && movimientoToShow === "Ahorro Disponible" && (
          <Link
            to="/ahorro-ingresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
        {movimientoToShow && movimientoToShow === "Infanto Juvenil" && (
          <Link
            to="/infanto-ingresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
        {movimientoToShow && movimientoToShow === "Plazo Fijo" && (
          <Link
            to="/plazo-ingresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
        {movimientoToShow && movimientoToShow === "Programado" && (
          <Link
            to="/programado-ingresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
        {movimientoToShow && movimientoToShow === "Boletas TRX" && (
          <Link
            to="/TRX-ingresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
        {movimientoToShow && movimientoToShow === "Vales de Efectivo" && (
          <Link
            to="/vales-ingresado"
            className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
          >
            Regresar
          </Link>
        )}
      </div>
    </div>
  );
}

export default EntregadoFormPage;
