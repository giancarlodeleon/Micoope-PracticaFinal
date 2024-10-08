import { useForm } from "react-hook-form";
import { useClients } from "../context/ClientContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ClientFormPage() {
  const departamentosMunicipios = {
    "Alta Verapaz": ["Cobán", "San Pedro Carchá", "Tactic"],
    "Baja Verapaz": ["Salamá", "San Miguel Chicaj", "San Jeronimo", "Purulha"],
    Chimaltenango: ["Chimaltenango", "San Juan Comalapa"],
    Chiquimula: ["Chiquimula", "Jocotán"],
    "El Progreso": ["Guastatoya", "Sanarate"],
    Escuintla: ["Escuintla", "Palín"],
    Guatemala: ["Guatemala City", "Mixco"],
    Huehuetenango: ["Huehuetenango", "La Democracia"],
    Izabal: ["Puerto Barrios", "Livingston"],
    Jalapa: ["Jalapa", "San Pedro Pinula"],
    Jutiapa: ["Jutiapa", "Jalpatagua"],
    Petén: ["Flores", "San Benito"],
    Quetzaltenango: ["Quetzaltenango", "Almolonga"],
    Quiché: ["Santa Cruz del Quiché", "Chichicastenango"],
    Retalhuleu: ["Retalhuleu", "San Sebastián"],
    Sacatepéquez: ["Antigua Guatemala", "Ciudad Vieja"],
    "San Marcos": ["San Marcos", "Malacatán"],
    "Santa Rosa": ["Cuilapa", "Barberena"],
    Sololá: ["Sololá", "Panajachel"],
    Suchitepéquez: ["Mazatenango", "San Antonio Suchitepéquez"],
    Totonicapán: ["Totonicapán", "Momostenango"],
    Zacapa: ["Zacapa", "Estanzuela"],
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createClient, getClient, updateClient, client } = useClients();
  const navigate = useNavigate();
  const params = useParams();
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    setClientCount(client.length);
  }, [client.length]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    async function loadClient() {
      if (params.id) {
        const client = await getClient(params.id);
        setValue("code", client.code);
        setValue("nit", client.nit);
        setValue("name", client.name);
        setValue("type", client.type);
        setValue("email", client.email);
        setValue("social", client.social);
        setValue("department", client.department);
        setValue("municipio", client.municipio);
        setValue("direction", client.direction);
        setValue("reference", client.reference);
        setValue("phone", client.phone);
        setValue("plazo_credito", client.plazo_credito);
        setValue("factura", client.factura);
        setValue("nota", client.nota);

        if (client.department) {
          setSelectedDepartment(client.department);
          setMunicipios(departamentosMunicipios[client.department] || []);
        }
      }
    }
    loadClient();
  }, [params.id, getClient, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.nit = Number(data.nit);
      data.phone = Number(data.phone);
      data.code = String(clientCount + 99);
      await updateClient(params.id, data);
      navigate("/clientes");
    } else {
      data.nit = Number(data.nit);
      data.phone = Number(data.phone);
      data.code = String(clientCount + 100);
      await createClient(data);
      navigate("/clientes");
    }
  });

  const handleDepartmentChange = (e) => {
    const selectedDep = e.target.value;
    setSelectedDepartment(selectedDep);
    setMunicipios(departamentosMunicipios[selectedDep] || []);
  };

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Cliente</h1>
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
              {...register("name", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.name && <p className="text-red-500">Nombre Requerido</p>}
          </div>

          <div>
            <label className="text-white">Tipo de Cliente</label>
            <select
              {...register("type", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Selecciona tipo</option>
              <option value="Empresa">Empresa</option>
              <option value="Individual">Individual</option>
            </select>
            {errors.type && <p className="text-red-500">Tipo de cliente requerido</p>}
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
            <label className="text-white">Razón Social</label>
            <input
              type="text"
              placeholder="Razón Social"
              {...register("social", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.social && <p className="text-red-500">Razón Social Requerido</p>}
          </div>

          <div>
            <label className="text-white">Departamento</label>
            <select
              {...register("department", { required: true })}
              onChange={handleDepartmentChange}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Selecciona un departamento</option>
              {Object.keys(departamentosMunicipios).map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-500">Departamento Requerido</p>}
          </div>

          <div>
            <label className="text-white">Municipio</label>
            <select
              {...register("municipio", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Selecciona un municipio</option>
              {municipios.map((municipio) => (
                <option key={municipio} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
            {errors.municipio && <p className="text-red-500">Municipio Requerido</p>}
          </div>

          <div>
            <label className="text-white">Dirección</label>
            <input
              type="text"
              placeholder="Dirección"
              {...register("direction", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.direction && <p className="text-red-500">Dirección Requerida</p>}
          </div>

          <div>
            <label className="text-white">Referencia</label>
            <input
              type="text"
              placeholder="Referencia"
              {...register("reference", { required: false })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.reference && <p className="text-red-500">Referencia Requerida</p>}
          </div>

          <div>
            <label className="text-white">Teléfono</label>
            <input
              type="number"
              placeholder="Teléfono"
              {...register("phone", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.phone && <p className="text-red-500">Teléfono Requerido</p>}
          </div>

          <div>
            <label className="text-white">Plazo de Crédito</label>
            <input
              type="text"
              placeholder="Plazo Crédito"
              {...register("plazo_credito", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.plazo_credito && <p className="text-red-500">Plazo Crédito Requerido</p>}
          </div>

          <div>
            <label className="text-white">Nivel de Factura</label>
            <select
              {...register("factura", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Selecciona un nivel</option>
              <option value="Nivel 1">Nivel 1</option>
              <option value="Nivel 2">Nivel 2</option>
              <option value="Nivel 3">Nivel 3</option>
            </select>
            {errors.factura && <p className="text-red-500">Nivel requerido</p>}
          </div>

          <div>
            <label className="text-white">Nota</label>
            <input
              type="text"
              placeholder="Nota"
              {...register("nota", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.nota && <p className="text-red-500">Nota Requerida</p>}
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/clientes"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default ClientFormPage;
