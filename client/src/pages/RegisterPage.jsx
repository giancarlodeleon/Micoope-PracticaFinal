import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
      navigate("/users");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className=" bg-blue-900 max-w-md p-10 rounded-md">
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

          <button type="submit" className="text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
