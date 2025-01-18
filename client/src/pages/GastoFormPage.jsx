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

  const [isOtherSelected, setIsOtherSelected] = useState(false);

  useEffect(() => {
    async function loadGasto() {
      if (params.id) {
        const gasto = await getGasto(params.id);
        console.log(gasto);
        setValue("nombre", gasto.nombre);
        setValue("factura", gasto.factura);
        setValue("tipo", gasto.tipo);
        setValue("precio", gasto.precio);
        if (gasto.tipo === "Otros") {
          setIsOtherSelected(true);
          setValue("otroTipo", gasto.otroTipo);
        }
      }
    }
    loadGasto();
  }, [params.id, setValue, getGasto]);

  const onSubmit = handleSubmit(async (data) => {
    if (isOtherSelected) {
      data.tipo = data.otroTipo; // Usar el valor del campo adicional
    }
    data.precio = Number(data.precio);

    if (params.id) {
      data.nombre= data.nombre || "N/A",
      await updateGasto(params.id, data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Modificar",
        descripcion: `Se Modificó el gasto ${data.tipo}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
    } else {
      data.nombre= data.nombre || "N/A",
      await createGasto(data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Agregar",
        descripcion: `Se Agregó el gasto ${data.tipo}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
    }
    navigate("/gastos");
  });

  const handleTipoChange = (event) => {
    setIsOtherSelected(event.target.value === "Otros");
  };

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Gasto Pagado</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          
        <div>
            <label className="text-white">Tipo</label>
            <select
              {...register("tipo", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
              onChange={handleTipoChange}
            >
              <option value="">Selecciona un tipo</option>
              <option value="IGGS">IGGS</option>
              <option value="Salarios">Salarios</option>
              <option value="Impuestos">Impuestos</option>
              <option value="Alimentacion">Alimentación</option>
              <option value="Hospedeaje">Hospedaje</option>
              <option value="Combustible">Combustible</option>
              <option value="Mant.Vehiculos">Mantenimiento Vehículos</option>
              <option value="Servicios Profesionales">
                Servicios Profesionales
              </option>
              <option value="Pago Comisiones">Pago Comisiones</option>
              <option value="Otros">Otros</option>
            </select>
            {errors.tipo && <p className="text-red-500">Tipo requerido</p>}
          </div>
          {isOtherSelected && (
            <div>
              <label className="text-white">Especificar Tipo</label>
              <input
                type="text"
                placeholder="Especificar tipo"
                {...register("otroTipo", { required: true })}
                className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
              />
              {errors.otroTipo && (
                <p className="text-red-500">Especificar tipo requerido</p>
              )}
            </div>
          )}
          <div>
            <label className="text-white">No. Factura</label>
            <input
              type="text"
              placeholder="No. Factura"
              {...register("factura", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.factura && (
              <p className="text-red-500">No. Factura Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">Monto</label>
            <input
              type="number"
              placeholder="Precio"
              {...register("precio", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.precio && <p className="text-red-500">Precio requerido</p>}
          </div>


          <div>
            <label className="text-white">Descripcion(opcional)</label>
            <input
              type="text"
              placeholder="Descripcion"
              {...register("nombre", { required: false })}
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
