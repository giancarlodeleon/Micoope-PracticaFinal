import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

function RegistroVentaFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createVenta, getVenta, updateVenta, ventas } = useVentas();

  const navigate = useNavigate();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  useEffect(() => {
    async function loadVenta() {
      if (params.id) {
        const venta = await getVenta(params.id);
        console.log(venta);
        setValue("numero", venta.numero);
        setValue("numero_factura", venta.numero_factura);
        setValue("FEL_serie", venta.FEL_serie);
        setValue("FEL_numero", venta.FEL_numero);
        setValue("monto", venta.monto);
        setValue("pendiente", venta.pendiente);
        setValue("fecha_pago", venta.fecha_pago);
        setValue("date", venta.date);
      }
    }
    loadVenta();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.numero = Number(data.numero);
      data.numero_factura = Number(data.numero_factura);
      data.FEL_numero = Number(data.FEL_numero);
      data.monto = Number(data.monto);
      data.pendiente = Number(data.pendiente);
      await updateVenta(params.id, data);
      const date = new Date();
      const historialData = {
        tipo: "Modificar",
        descripcion: `Se Modifico la venta ${data.FEL_serie}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/registro-venta");
    } else {
      data.numero = Number(data.numero);
      data.numero_factura = Number(data.numero_factura);
      data.FEL_numero = Number(data.FEL_numero);
      data.monto = Number(data.monto);
      data.pendiente = Number(data.pendiente);
      await createVenta(data);
      const date = new Date();
      const historialData = {
        tipo: "Agregar",
        descripcion: `Se Agrego la venta ${data.nombre}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/registro-venta");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Venta Facturada</h1>
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
