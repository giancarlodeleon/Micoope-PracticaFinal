import { useForm } from "react-hook-form";
import { useAgencias } from "../context/AgenciaContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AgenciaFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    createAgencia,
    getAgencia,
    updateAgencia,
    errors: AgenciaErrors,
  } = useAgencias();
  
  const navigate = useNavigate();
  const params = useParams();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);

  useEffect(() => {
    async function loadAgencia() {
      if (params.id) {
        const agencia = await getAgencia(params.id);
        console.log(agencia);
        setValue("code", agencia.code);
        setValue("name", agencia.name);
      }
    }
    loadAgencia();
  }, []);

  const onSubmit = handleSubmit(async(data) => {
    if (params.id) {
      await updateAgencia(params.id, data);
    } else {
      await createAgencia(data);
    }
    setRedirectOnSuccess(true);
    setTimeout(() => {
      setRedirectOnSuccess(false);
    }, 4000);
  });

  useEffect(() => {
    if (redirectOnSuccess && AgenciaErrors.length === 0) {
      navigate("/agencias");
    }
  }, [redirectOnSuccess, AgenciaErrors, navigate]);

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
      {AgenciaErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 my-1 text-white rounded-md text-center"
            key={i}
          >
            {error}
          </div>
        ))}
        <h1 className="text-2xl text-white font-bold">Agencia</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Codigo"
            {...register("code", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.code && <p className="text-red-500">Codigo Requerido</p>}
          <input
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.name && <p className="text-red-500">Nombre Requerido</p>}
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/agencias"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default AgenciaFormPage;
