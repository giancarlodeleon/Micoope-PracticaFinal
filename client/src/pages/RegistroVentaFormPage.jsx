import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";
import { useSolicituds } from "../context/SolicitudContext";
import { usePedidos } from "../context/PedidoContext";

function RegistroVentaFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createVenta, getVenta, updateVenta } = useVentas();
  const navigate = useNavigate();
  const { getSolicituds, solicituds } = useSolicituds();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();
  const { getPedidos, pedido } = usePedidos();

  useEffect(() => {
    getPedidos();
  });

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

    async function loadSolicituds() {
      await getSolicituds();
    }

    loadVenta();
    loadSolicituds();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Convertimos los datos de entrada al formato esperado
      data.numero_factura = Number(data.numero_factura);
      data.FEL_numero = Number(data.FEL_numero);
      data.monto = parseFloat(data.monto); // Aceptamos decimales
      data.pendiente = parseFloat(data.monto);
      data.solicitud = Number(data.solicitud);
      data.fecha_pago = "0/0/0";

      // Encontrar la solicitud seleccionada
      const solicitudSeleccionada = solicituds.find(
        (solicitud) => Number(solicitud.codigo) === Number(data.solicitud)
      );

      if (solicitudSeleccionada) {
        data.cliente = solicitudSeleccionada.cliente;
        data.numero = Number(solicitudSeleccionada.codigo);
        data.date = solicitudSeleccionada.date; // Asignar el date de la solicitud seleccionada
      } else {
        data.cliente = "";
        data.numero = 0;
        data.date = ""; // En caso de que no haya solicitud seleccionada
      }

      // Filtrar pedidos por nombre de solicitud seleccionada
      const pedidosRelacionados = pedido.filter(
        (p) => p.nombre === solicitudSeleccionada.nombre
      );

      // Calcular la suma total del atributo "total" de los pedidos relacionados
      const sumaPedidos = pedidosRelacionados.reduce(
        (total, p) => total + Number(p.total),
        0
      );

      if (data.monto !== sumaPedidos) {
        alert(
          `El monto ingresado (${data.monto}) no coincide con la suma de "total" de los pedidos relacionados (${sumaPedidos}).`
        );
        return;
      }

      if (params.id) {
        await updateVenta(params.id, data);
        const date = new Date();
        const historialData = {
          num_doc: "n/a",
          recibo: "n/a",
          banco: "n/a",
          tipo_pago: "n/a",
          cliente: "n/a",
          tipo: "Modificar",
          descripcion: `Se Modificó la venta ${data.FEL_serie}`,
          cantidad: 0,
          date,
          user,
        };
        await createHistorial(historialData);
        navigate("/registro-venta");
      } else {
        await createVenta(data);
        const date = new Date();
        const historialData = {
          num_doc: "n/a",
          recibo: "n/a",
          banco: "n/a",
          tipo_pago: "n/a",
          cliente: "n/a",
          tipo: "Agregar",
          descripcion: `Se Agregó la venta ${data.numero}`,
          cantidad: 0,
          date,
          user,
        };
        await createHistorial(historialData);
        navigate("/registro-venta");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Esta solicitud ya tiene una factura.");
      } else {
        alert("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
      }
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Venta Facturada</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-white">No. Factura</label>
            <input
              type="number"
              placeholder="Numero de Factura"
              {...register("numero_factura", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.numero_factura && (
              <p className="text-red-500">Numero de Factura Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">FEL Serie</label>
            <input
              type="text"
              placeholder="FEL Serie"
              {...register("FEL_serie", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.FEL_serie && (
              <p className="text-red-500">FEL de Serie Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">FEL Numero</label>
            <input
              type="number"
              placeholder="FEL Numero"
              {...register("FEL_numero", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.FEL_numero && (
              <p className="text-red-500">FEL de Numero Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">Solicitud</label>
            <select
              {...register("solicitud", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Selecciona una solicitud</option>
              {solicituds &&
                solicituds
                  .filter((solicitud) => solicitud.estado) // Filtra las solicitudes con estado true
                  .map((solicitud) => (
                    <option key={solicitud.codigo} value={solicitud.codigo}>
                      {solicitud.nombre}
                    </option>
                  ))}
            </select>
            {errors.solicitud && (
              <p className="text-red-500">Solicitud Requerida</p>
            )}
          </div>

          <div>
            <label className="text-white">Monto</label>
            <input
              type="number"
              step="0.01" // Permite decimales
              placeholder="Monto"
              {...register("monto", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.monto && <p className="text-red-500">Monto Requerido</p>}
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/registro-venta"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default RegistroVentaFormPage;
