import { useForm } from "react-hook-form";
import { useGastos } from "../context/GastoContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

function GastoFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createGasto, getGasto, updateGasto, gastos } = useGastos();

  const navigate = useNavigate();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  useEffect(() => {
    async function loadGasto() {
      if (params.id) {
        const gasto = await getGasto(params.id);
        console.log(gasto);
        setValue("nombre", gasto.nombre);
        setValue("precio", gasto.precio);
      }
    }
    loadGasto();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.precio = Number(data.precio);
      await updateGasto(params.id, data);
      const date = new Date();
      const historialData = {
        cliente:"n/a",
        tipo: "Modificar",
        descripcion: `Se Modifico el gasto ${data.nombre}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/gastos");
    } else {
      data.precio = Number(data.precio);
      await createGasto(data);
      const date = new Date();
      const historialData = {
        cliente:"n/a",
        tipo: "Agregar",
        descripcion: `Se Agrego el gasto ${data.nombre}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/gastos");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Gasto Pagado</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-white">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              {...register("nombre", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.name && <p className="text-red-500">Nombre Requerido</p>}
          </div>

          <div>
            <label className="text-white">Monto</label>
            <input
              type="number"
              placeholder="Precio"
              {...register("precio", { required: false })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/gastos"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default GastoFormPage;
