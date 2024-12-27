import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

function AbonoFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { getVenta, updateVenta } = useVentas();
  const navigate = useNavigate();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();
  const { userid } = useParams();

  useEffect(() => {
    async function loadVenta() {
      if (params.id) {
        const venta = await getVenta(params.id);
        setValue("cliente", venta.cliente);
        setValue("numero", venta.numero);
        setValue("numero_factura", venta.numero_factura);
        setValue("FEL_serie", venta.FEL_serie);
        setValue("FEL_numero", venta.FEL_numero);
        setValue("monto", venta.monto);
        setValue("solicitud", venta.solicitud);
        setValue("pendiente", venta.pendiente);
        setValue("fecha_pago", venta.fecha_pago);
        setValue("date", venta.date);
      }
    }
    loadVenta();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const amountToAdd = Number(data.amountToAdd);
    const pendienteActual = Number(getValues("pendiente")); // Obtener pendiente actualizado

    if (amountToAdd > pendienteActual) {
      alert("No puede abonar más de lo pendiente.");
      return;
    }

    data.numero = Number(data.numero);
    data.numero_factura = Number(data.numero_factura);
    data.FEL_numero = Number(data.FEL_numero);
    data.monto = Number(data.monto);
    data.solicitud = Number(data.solicitud);

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses son base 0
    const year = today.getFullYear();
    data.fecha_pago = `${day}/${month}/${year}`;
    data.cliente = data.cliente;

    const newPendiente = pendienteActual - amountToAdd;
    data.pendiente = newPendiente;

    if (params.id) {
      await updateVenta(params.id, data);
      const date = new Date();
      const historialData = {
        cliente: data.cliente,
        tipo: "Abono",
        descripcion: `Se Abonó la venta ${data.FEL_serie}`,
        cantidad: amountToAdd,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate(`/estado-cuenta/${userid}`);
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Abono a Factura</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-white">Cantidad a Abonar</label>
            <input
              type="number"
              placeholder="Cantidad a agregar"
              {...register("amountToAdd", {
                required: true,
                min: 1,
                validate: (value) =>
                  Number(value) <= Number(getValues("pendiente")) ||
                  "No puede abonar más de lo pendiente.",
              })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.amountToAdd && (
              <p className="text-red-500">{errors.amountToAdd.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            Abonar
          </button>
        </form>
        <Link
          to={`/estado-cuenta/${userid}`}
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default AbonoFormPage;
