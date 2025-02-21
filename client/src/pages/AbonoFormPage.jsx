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
    watch,
    formState: { errors },
  } = useForm();

  const { getVenta, updateVenta } = useVentas();
  const navigate = useNavigate();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();
  const { userid } = useParams();

  const metodoPagoSeleccionado = watch("metodoPago"); // Monitorea el valor del método de pago

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
    const pendienteActual = Number(getValues("pendiente"));

    if (amountToAdd > pendienteActual) {
      alert("No puede abonar más de lo pendiente.");
      return;
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    data.fecha_pago = `${day}/${month}/${year}`;

    const newPendiente = pendienteActual - amountToAdd;
    data.pendiente = newPendiente;

    if (params.id) {
      await updateVenta(params.id, data);
      const date = new Date();
      const descripcion =
        newPendiente === 0
          ? `Se terminó de pagar la venta ${data.numero}`
          : `Se abonó a la venta ${data.numero}`;

      const historialData = {
        num_doc: data.num_doc || "N/A",
        recibo: data.reciboCaja || "N/A",
        banco: data.banco || "N/A",
        tipo_pago: data.metodoPago,
        cliente: data.cliente,
        tipo: "Abono",
        descripcion,
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
      <div className="bg-blue-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Abono a Factura</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Número de Recibo de Caja */}
          <div>
            <label className="text-white">Número de Recibo de Caja (Opcional)</label>
            <input
              type="text"
              placeholder="Ingrese el número de recibo"
              {...register("reciboCaja", {
                required: false,
                maxLength: {
                  value: 20,
                  message:
                    "El número de recibo no puede exceder 20 caracteres.",
                },
              })}
              className="w-full bg-blue-700 text-white px-4 py-2 rounded-md"
            />
            {errors.reciboCaja && (
              <p className="text-red-500">{errors.reciboCaja.message}</p>
            )}
          </div>

          {/* Método de Pago */}
          <div>
            <label className="text-white">Método de Pago</label>
            <select
              {...register("metodoPago", {
                required: "Seleccione un método de pago.",
              })}
              className="w-full bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Seleccione una opción</option>
              <option value="Cheque">Cheque</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Deposito">Depósito</option>
            </select>
            {errors.metodoPago && (
              <p className="text-red-500">{errors.metodoPago.message}</p>
            )}
          </div>

          {/* Banco (solo si el método de pago no es efectivo) */}
          {metodoPagoSeleccionado && metodoPagoSeleccionado !== "Efectivo" && (
            <div>
              <label className="text-white">Número de Documento</label>
              <input
                type="text"
                placeholder="Ingrese el numero del documento"
                {...register("num_doc", {
                  required: "El Numero del documento es obligatorio.",
                  maxLength: {
                    value: 50,
                    message:
                      "El numero del documento no puede exceder 50 caracteres.",
                  },
                })}
                className="w-full bg-blue-700 text-white px-4 py-2 rounded-md"
              />
              {errors.num_doc && (
                <p className="text-red-500">{errors.num_doc.message}</p>
              )}
            </div>
          )}

          {/* Número de Cheque (solo si el método de pago es Cheque) */}
          {metodoPagoSeleccionado === "Cheque" && (
            <div>
              <label className="text-white">Nombre del Banco</label>
              <select
              {...register("banco", {
                required: "Seleccione un Banco.",
              })}
              className="w-full bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Seleccione una opción</option>
              <option value="Banrural">Banrural</option>
              <option value="G&T">G&T</option>
              <option value="Industrial">Industrial</option>
              <option value="BAM">BAM</option>
            </select>
              {errors.banco && (
                <p className="text-red-500">{errors.banco.message}</p>
              )}
            </div>
          )}

          {/* Cantidad a Abonar */}
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
              className="w-full bg-blue-700 text-white px-4 py-2 rounded-md"
            />
            {errors.amountToAdd && (
              <p className="text-red-500">{errors.amountToAdd.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md"
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
