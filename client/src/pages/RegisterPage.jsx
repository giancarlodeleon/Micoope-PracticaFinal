import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(()=>{
    if(isAuthenticated) navigate("/products")
  },[isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
    <div className=" bg-blue-900 max-w-md p-10 rounded-md">
      {RegisterErrors.map((error, i) => (
        <div className="bg-red-500 p-2 my-1 text-white rounded-md text-center" key={i}>
          {error}
        </div>
      ))}
      <h1 className="text-2xl font-bold">Register</h1>
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
      <p className="flex gap-x-2 justify-between">
            Already hace an account? <Link to="/login" className="text-blue-200">Sign In</Link>
          </p>
    </div>
    </div>
  );
}

export default RegisterPage;
