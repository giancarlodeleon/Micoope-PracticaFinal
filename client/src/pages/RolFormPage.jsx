import { useForm } from "react-hook-form";
import { useRols } from "../context/RolContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect} from "react";

function RolFormPage() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    createRol,
    getRol,
    updateRol,
  } = useRols();

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
      }
    }
    loadRol();
  }, []);

  const onSubmit = handleSubmit(async(data) => {
    if (params.id) {
      await updateRol(params.id, data);
      navigate("/roles");
    } else {
      await createRol(data);
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
            <label className="text-white font ">Permiso al Manejo de informacion</label>
            <input
              type="checkbox"
              {...register("permission_of_information", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso al Almacen</label>
            <input
              type="checkbox"
              {...register("permission_Warehouse", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso al Resumen</label>
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
            <label className="text-white font ">Permiso para agregar Clientes</label>
            <input
              type="checkbox"
              {...register("permission_of_add_Client", { value: true })}
              className="bg-green-700 text-white px-4 py-2 rounded-md mr-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white font ">Permiso para agregar Productos</label>
            <input
              type="checkbox"
              {...register("permission_of_add_Product", { value: true })}
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
  )
}

export default RolFormPage