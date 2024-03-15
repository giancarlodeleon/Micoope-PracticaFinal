import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../context/UserContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { getUser, updateUser, errors: UpdateErrors } = useUsers();
  const params = useParams();

  const { signup, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const [updateRedirect, setUpdateRedirect] = useState(false);

  const password = watch("password", ""); // Observa el campo de contraseña

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        console.log(user);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("rol", user.rol);
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
      <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
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
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <p className="text-red-500">Nombre de usuario requerido</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electronico"
          />
          {errors.email && (
            <p className="text-red-500">Correo electronico requerido</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contrasena"
          />
          {errors.password && (
            <p className="text-red-500">Contrasena requerida</p>
          )}

          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Confirmar Contrasena"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <select
            {...register("rol", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione un rol</option>
            <option value="R1">Administrador</option>
            <option value="R2">Coordinador</option>
            <option value="R3">Agencia</option>
          </select>
          {errors.rol && (
            <p className="text-red-500">Debe seleccionar un rol</p>
          )}

          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
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
