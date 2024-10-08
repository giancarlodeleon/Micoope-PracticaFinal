import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";
import { useRols } from "../context/RolContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { getUser, updateUser, errors: UpdateErrors } = useUsers();
  const { signup, errors: RegisterErrors } = useAuth();
  const { getRols, rol } = useRols();
  const params = useParams();
  const navigate = useNavigate();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const [updateRedirect, setUpdateRedirect] = useState(false);

  const password = watch("password", ""); // Observa el campo de contraseña

  useEffect(() => {
    getRols();
  }, []);

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        console.log(user);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("rol", user.rol);
        setValue("telefono", user.telefono);
        setValue("placa", user.placa);
        setValue("nit", user.nit);
        setValue("aplicable_comision", user.aplicable_comision);
        setValue("sueldo_base", user.sueldo_base);
        setValue("bono", user.bono);
        setValue("kilometraje", user.kilometraje);
        setValue("estado", user.estado);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (redirectOnSuccess && RegisterErrors.length === 0) {
      navigate("/users");
    }
  }, [redirectOnSuccess, RegisterErrors, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    if (params.id) {
      try {
        values.sueldo_base = parseFloat(values.sueldo_base);
        values.kilometraje = parseFloat(values.kilometraje);
        await updateUser(params.id, values);
        setUpdateRedirect(true);
        setTimeout(() => {
          setUpdateRedirect(false);
        }, 4000);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      try {
        values.sueldo_base = parseFloat(values.sueldo_base);
        values.kilometraje = parseFloat(values.kilometraje);
        await signup(values);
        setRedirectOnSuccess(true);
        setTimeout(() => {
          setRedirectOnSuccess(false);
        }, 4000);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  });

  useEffect(() => {
    if (UpdateErrors.length === 0 && updateRedirect) {
      navigate("/users");
    }
  }, [UpdateErrors, updateRedirect, navigate]);

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-md p-10 rounded-md mx-auto relative">
        {UpdateErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
            key={i}
          >
            {error}
          </div>
        ))}
        {RegisterErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
            key={i}
          >
            {error}
          </div>
        ))}
  
        <h1 className="text-2xl text-white font-bold">Usuario</h1>
        <form onSubmit={onSubmit}>
          <label className="text-white">Nombre de usuario</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <p className="text-red-500">Nombre de usuario requerido</p>
          )}
  
          <label className="text-white">Correo electronico</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electronico"
          />
          {errors.email && (
            <p className="text-red-500">Correo electronico requerido</p>
          )}
  
          <label className="text-white">Contrasena</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contrasena"
          />
          {errors.password && (
            <p className="text-red-500">Contrasena requerida</p>
          )}
  
          <label className="text-white">Confirmar Contrasena</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Confirmar Contrasena"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
  
          <label className="text-white">Seleccione un rol</label>
          <select
            {...register("rol", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione un rol</option>
            {rol.map((place, i) => (
              <option key={i} value={place.name}>{place.name}</option>
            ))}
          </select>
          {errors.rol && (
            <p className="text-red-500">Debe seleccionar un rol</p>
          )}
  
          <label className="text-white">Telefono</label>
          <input
            type="text"
            {...register("telefono", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Telefono"
          />
          {errors.telefono && (
            <p className="text-red-500">Telefono de usuario requerido</p>
          )}
  
          <label className="text-white">Placa</label>
          <input
            type="text"
            {...register("placa", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Placa"
          />
          {errors.placa && (
            <p className="text-red-500">Placa de usuario requerido</p>
          )}
  
          <label className="text-white">Nit</label>
          <input
            type="text"
            {...register("nit", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nit"
          />
          {errors.nit && (
            <p className="text-red-500">Nit de usuario requerido</p>
          )}
  
          <label className="text-white">Sueldo Base</label>
          <input
            type="number"
            {...register("sueldo_base", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Sueldo Base"
          />
          {errors.sueldo_base && (
            <p className="text-red-500">Sueldo base de usuario requerido</p>
          )}
  
          <label className="text-white">Kilometraje</label>
          <input
            type="number"
            {...register("kilometraje", { required: true })}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Kilometraje"
          />
          {errors.kilometraje && (
            <p className="text-red-500">Kilometraje de usuario requerido</p>
          )}
  
          <div className="flex items-center py-2">
            <label className="text-white">Aplicable Comision</label>
            <input
              type="checkbox"
              {...register("aplicable_comision", { value: true })}
              className="ml-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white">Bono</label>
            <input
              type="checkbox"
              {...register("bono", { value: true })}
              className="ml-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label className="text-white">Estado</label>
            <input
              type="checkbox"
              {...register("estado", { value: true })}
              className="ml-2"
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
          to="/users"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
  
}

export default RegisterPage;
