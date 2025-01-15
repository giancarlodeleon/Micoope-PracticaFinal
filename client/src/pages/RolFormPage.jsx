import { useForm } from "react-hook-form";
import { useRols } from "../context/RolContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

function RolFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createRol, getRol, updateRol } = useRols();

  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadRol() {
      if (params.id) {
        const rol = await getRol(params.id);
        console.log(rol);
        setValue("name", rol.name);
        setValue("permission_of_information", rol.permission_of_information);
        setValue("permission_Warehouse", rol.permission_Warehouse);
        setValue("permission_Summary", rol.permission_Summary);
        setValue("permission_of_Client", rol.permission_of_Client);
        setValue("permission_of_add_Client", rol.permission_of_add_Client);
        setValue("permission_of_add_Product", rol.permission_of_add_Product);
        setValue("permission_add_stock", rol.permission_add_stock);
        setValue("permission_takeout_stock", rol.permission_takeout_stock);
        setValue("permission_Request", rol.permission_Request);
        setValue("permission_See_Request", rol.permission_See_Request);
        setValue("permission_Historial", rol.permission_Historial);
        setValue("permission_Register_Sell", rol.permission_Register_Sell);
        setValue("permission_Payouts", rol.permission_Payouts);
        setValue("permission_Account", rol.permission_Account);
        setValue("permission_Financial", rol.permission_Financial);
      }
    }
    loadRol();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateRol(params.id, data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Modificar",
        descripcion: `Se Modifico el rol ${data.name}'`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/roles");
    } else {
      await createRol(data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Agregar",
        descripcion: `Se Agrego el rol ${data.name}'`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);

      navigate("/roles");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-md p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold">Rol</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.name && <p className="text-red-500">Nombre Requerido</p>}
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso al Manejo de informacion
            </label>
            <input
              type="checkbox"
              {...register("permission_of_information", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso al Inventario</label>
            <input
              type="checkbox"
              {...register("permission_Warehouse", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso al Reporte</label>
            <input
              type="checkbox"
              {...register("permission_Summary", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso al los Clientes</label>
            <input
              type="checkbox"
              {...register("permission_of_Client", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso para agregar Clientes
            </label>
            <input
              type="checkbox"
              {...register("permission_of_add_Client", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso para agregar Productos
            </label>
            <input
              type="checkbox"
              {...register("permission_of_add_Product", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso para agregar a Stock
            </label>
            <input
              type="checkbox"
              {...register("permission_add_stock", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso para quitar a Stock
            </label>
            <input
              type="checkbox"
              {...register("permission_takeout_stock", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso para Solicitudes</label>
            <input
              type="checkbox"
              {...register("permission_Request", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso para ver Solicitudes
            </label>
            <input
              type="checkbox"
              {...register("permission_See_Request", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso para Historial</label>
            <input
              type="checkbox"
              {...register("permission_Historial", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso para Registro de Ventas
            </label>
            <input
              type="checkbox"
              {...register("permission_Register_Sell", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso para Gastos</label>
            <input
              type="checkbox"
              {...register("permission_Payouts", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">
              Permiso Estados de Cuenta
            </label>
            <input
              type="checkbox"
              {...register("permission_Account", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso Finanzas</label>
            <input
              type="checkbox"
              {...register("permission_Financial", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md mr-auto"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/roles"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default RolFormPage;
