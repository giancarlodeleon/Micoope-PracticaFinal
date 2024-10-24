import { useForm } from "react-hook-form";
import { useSolicituds } from "../context/SolicitudContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useClients } from "../context/ClientContext";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

function SolicitudFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createSolicitud, getSolicitud, updateSolicitud } = useSolicituds();
  const { getClients, client } = useClients();
  const { getProducts, products } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null); // Nuevo estado para almacenar el cliente seleccionado
  const [factura, setFactura] = useState(""); // Nuevo estado para almacenar el atributo "factura"

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    async function loadSolicitud() {
      if (params.id) {
        const solicitud = await getSolicitud(params.id);
        setValue("nombre", solicitud.code);
        setValue("cliente", solicitud.name);
        setValue("descripcion", solicitud.presentation);
      }
    }
    loadSolicitud();
  }, []);

  // Manejar la selección de cliente
  const handleClientChange = (e) => {
    const selected = client.find((place) => place.name === e.target.value);
    setSelectedClient(selected); // Almacenar el cliente seleccionado
    setFactura(selected ? selected.factura : ""); // Extraer y almacenar el atributo "factura"
    setValue("cliente", e.target.value); // Actualizar el formulario
  };

  // Manejar la adición de productos
  const handleAddProduct = () => {
    if (selectedProduct && selectedQuantity > 0) {
      const productData = products.find((product) => product.name === selectedProduct); // Obtener el producto seleccionado
      const newItem = {
        product: selectedProduct,
        price: productData.selling_price_1,  // Añadir el precio del producto
        quantity: selectedQuantity,
        total: productData.selling_price_1 * selectedQuantity, // Calcular el total
      };
      setOrderItems([...orderItems, newItem]);
      setSelectedProduct("");
      setSelectedQuantity(0);
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index); // Si se vuelve a seleccionar, se desmarca
  };

  const handleRemoveSelectedProduct = () => {
    if (selectedRowIndex !== null) {
      const updatedItems = orderItems.filter((_, i) => i !== selectedRowIndex);
      setOrderItems(updatedItems);
      setSelectedRowIndex(null); // Desmarcar después de eliminar
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateSolicitud(params.id, data);
      const date = new Date();
      const historialData = {
        tipo: "Modificar",
        descripcion: `Se Modificó una solicitud con nombre ${data.nombre} y factura ${factura}`, // Incluye factura
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/requests");
    } else {
      await createSolicitud(data);
      const date = new Date();
      const historialData = {
        tipo: "Agregar",
        descripcion: `Se Creó una solicitud con nombre ${data.nombre} y factura ${factura}`, // Incluye factura
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/requests");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Solicitud</h1>

        <form onSubmit={onSubmit} className="space-y-4">
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
            <label className="text-white">Cliente</label>
            <select
              onChange={handleClientChange} // Cambiar a la función de manejo de cambio de cliente
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            >
              <option value="">Seleccione un cliente</option>
              {client.map((place, i) => (
                <option key={i} value={place.name}>
                  {place.name}
                </option>
              ))}
            </select>
            {errors.cliente && <p className="text-red-500">Cliente Requerido</p>}
          </div>

          <div>
            <label className="text-white">Descripción</label>
            <input
              type="text"
              placeholder="Descripción"
              {...register("descripcion", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.descripcion && <p className="text-red-500">Descripción Requerida</p>}
          </div>

          <h1 className="text-2xl text-white font-bold mb-4">Pedidos</h1>
          <div className="flex space-x-4">
            <div className="w-2/3">
              <label className="text-white">Producto</label>
              <select
                className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Seleccione un producto</option>
                {products.map((product, i) => (
                  <option key={i} value={product.name}>
                    {product.name} {/* Mostrar precio en el menú */}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label className="text-white">Cantidad</label>
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
                placeholder="Cantidad"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleAddProduct}
              className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={handleRemoveSelectedProduct}
              className="text-white bg-red-500 hover:bg-red-400 px-4 py-2 rounded-md"
              disabled={selectedRowIndex === null} // Deshabilitar si no hay producto seleccionado
            >
              Eliminar
            </button>
          </div>

          <table className="table-auto w-full mt-4 bg-white text-black rounded-md">
            <thead>
              <tr className="text-black">
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Total</th> {/* Nueva columna para el total */}
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleSelectRow(index)} // Manejar selección de fila
                  className={`hover:bg-gray-200 cursor-pointer ${selectedRowIndex === index ? "bg-blue-200" : ""}`} // Cambiar color si está seleccionado
                >
                  <td className="border px-4 py-2">{item.product}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">${item.price}</td>
                  <td className="border px-4 py-2">${item.total}</td> {/* Mostrar total */}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          >
            {params.id ? "Actualizar Solicitud" : "Crear Solicitud"}
          </button>
        </form>
        <Link
          to="/requests"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default SolicitudFormPage;
