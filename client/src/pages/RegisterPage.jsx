import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
      setRedirectOnSuccess(true);
      setTimeout(() => {
        setRedirectOnSuccess(false);
      }, 4000);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });

  useEffect(() => {
    if (redirectOnSuccess && RegisterErrors.length === 0) {
      navigate("/users");
    }
  }, [redirectOnSuccess, RegisterErrors, navigate]);

  return (
    <div className="items-center justify-center py-20 ">
      <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto">
        {RegisterErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
            key={i}
          >
            {error}
          </div>
        ))}
        <h1 className="text-2xl text-white font-bold">Agregar Usuario</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2 "
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <select
            type="text"
            {...register("rol", { required: true })}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione una opción</option>
            <option value="R1">Administrador</option>
            <option value="R2">Coordinador</option>
            <option value="R3">Agencia</option>
          </select>
          {errors.options && (
            <p className="text-red-500">Debe seleccionar una opción</p>
          )}

          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
