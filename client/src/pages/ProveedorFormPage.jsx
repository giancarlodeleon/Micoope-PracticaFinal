import { useForm } from "react-hook-form";
import { useProveedors } from "../context/ProveedorContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

function ProveedorFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createProveedor, getProveedor, updateProveedor, proveedors } =
    useProveedors();
  const navigate = useNavigate();
  const params = useParams();
  const [proveedorCount, setProveedorCount] = useState(0);
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  useEffect(() => {
    const maxCode = proveedors.reduce((max, current) => {
      const currentCode = Number(current.code);
      return currentCode > max ? currentCode : max;
    }, 99); // Inicia en 99 para que el primer código sea 100
    setProveedorCount(maxCode + 1);
  }, [proveedors]);

  useEffect(() => {
    async function loadProveedor() {
      if (params.id) {
        const proveedor = await getProveedor(params.id);
        setValue("code", proveedor.code);
        setValue("nit", proveedor.nit);
        setValue("nombre", proveedor.nombre);
        setValue("empresa", proveedor.empresa);
        setValue("email", proveedor.email);
        setValue("direccion", proveedor.direccion);
        setValue("telefono", proveedor.telefono);
      }
    }
    loadProveedor();
  }, [params.id, getProveedor, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.nit = Number(data.nit);
      data.telefono = Number(data.telefono);
      data.code = String(proveedorCount - 1);
      await updateProveedor(params.id, data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Modificar",
        descripcion: `Se Modifico el proveedor ${data.nombre}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/proveedors");
    } else {
      data.nit = Number(data.nit);
      data.telefono = Number(data.telefono);
      data.code = String(proveedorCount);
      console.log(data)
      await createProveedor(data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Agregar",
        descripcion: `Se Agrego el proveedor ${data.nombre}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/proveedors");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Proveedor</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-white">Nit</label>
            <input
              type="number"
              placeholder="Nit"
              {...register("nit", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.nit && <p className="text-red-500">Nit Requerido</p>}
          </div>

          <div>
            <label className="text-white">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              {...register("nombre", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.nombre && <p className="text-red-500">Nombre Requerido</p>}
          </div>

          <div>
            <label className="text-white">Correo</label>
            <input
              type="text"
              placeholder="Correo"
              {...register("email", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.email && <p className="text-red-500">Correo Requerido</p>}
          </div>

          <div>
            <label className="text-white">Dirección</label>
            <input
              type="text"
              placeholder="Dirección"
              {...register("direccion", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.direccion && (
              <p className="text-red-500">Dirección Requerida</p>
            )}
          </div>

          <div>
            <label className="text-white">Empresa</label>
            <input
              type="text"
              placeholder="Empresa"
              {...register("empresa", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.empresa && (
              <p className="text-red-500">Empresa Requerida</p>
            )}
          </div>

          <div>
            <label className="text-white">Teléfono</label>
            <input
              type="number"
              placeholder="Teléfono"
              {...register("telefono", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.telefono && <p className="text-red-500">Teléfono Requerido</p>}
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/Proveedors"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default ProveedorFormPage;
