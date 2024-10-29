import { useForm } from "react-hook-form";
import { useSolicituds } from "../context/SolicitudContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useClients } from "../context/ClientContext";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { usePedidos } from "../context/PedidoContext";

function SolicitudFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const { createSolicitud, getSolicitud, updateSolicitud } = useSolicituds();
  const { createPedido, getPedidos, pedido, deletePedido} = usePedidos();
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
  const [selectedClient, setSelectedClient] = useState(null);
  const [factura, setFactura] = useState("");
  const [isNombreEditable, setIsNombreEditable] = useState(true);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorCliente, setErrorCliente] = useState(false);

  useEffect(() => {
    getClients();
    getProducts();
    async function loadSolicitud() {
      if (params.id) {
        const solicitud = await getSolicitud(params.id);
        setValue("nombre", solicitud.code);
        setValue("cliente", solicitud.name);
        setValue("descripcion", solicitud.presentation);
      }
    }
    loadSolicitud();
  }, [params.id, getSolicitud, setValue]);
 
  useEffect(() => {
    getPedidos();
  },);

  const handleRemoveMatchingPedidos = async () => {
    const nombreValue = getValues("nombre"); // Obtiene el nombre actual del formulario.
    for (const item of orderItems) {
      
      // Busca el pedido en la base de datos que coincida con el nombre y los detalles del item.
      const itemToRemove = pedido.find(p =>
        p.nombre === nombreValue &&
        p.producto === item.product &&
        p.cantidad === Number(item.quantity) &&
        p.total === Number(item.total)
      );

      if (itemToRemove) {
        await deletePedido(itemToRemove._id); // Elimina el pedido.
      }
      
    }
  };

  const handleClientChange = (e) => {
    const selected = client.find((place) => place.name === e.target.value);
    setSelectedClient(selected);
    setFactura(selected ? selected.factura : "");
    setValue("cliente", e.target.value);
    setErrorCliente(false);  // Resetea el error si hay selección
  };

  const handleAddProduct = () => {
    const nombreValue = getValues("nombre");
    const clienteValue = getValues("cliente");

    if (!nombreValue) {
      setErrorNombre(true);
      return;
    }
    if (!clienteValue) {
      setErrorCliente(true);
      return;
    }

    setErrorNombre(false);
    setErrorCliente(false);

    if (selectedProduct && selectedQuantity > 0) {
      const productData = products.find(
        (product) => product.name === selectedProduct
      );

      let price;
      if (factura === "Nivel 1") {
        price = productData.selling_price_1;
      } else if (factura === "Nivel 2") {
        price =
          productData.selling_price_1 +
          productData.selling_price_1 * (productData.selling_price_2 / 100);
      } else if (factura === "Nivel 3") {
        price =
          productData.selling_price_1 +
          productData.selling_price_1 * (productData.selling_price_3 / 100);
      } else {
        price = productData.selling_price_1;
      }

      const date = new Date();
      const PedidoData = {
        nombre: nombreValue,
        producto: selectedProduct,
        cantidad: Number(selectedQuantity),
        total: Number(price * selectedQuantity),
        date,
        user,
      };
      createPedido(PedidoData);

       // Log de todos los pedidos en la base de datos
     // Muestra todos los pedidos en la consola

      const newItem = {
        product: selectedProduct,
        price: price,
        quantity: selectedQuantity,
        total: price * selectedQuantity,
      };

      setOrderItems([...orderItems, newItem]);
      setSelectedProduct("");
      setSelectedQuantity(0);
      setIsNombreEditable(false);
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  const handleRemoveSelectedProduct = () => {
    if (selectedRowIndex !== null) {

      const nombreValue = getValues("nombre");
      const item = orderItems[selectedRowIndex];
      const selectedProducto = item.product;
      const selectedCantidad = item.quantity;
      const selectedTotal = item.total;

      const itemToRemove = pedido.find(item => 
        item.nombre === nombreValue &&
        item.producto === selectedProducto &&
        item.cantidad === Number(selectedCantidad) &&
        item.total === Number(selectedTotal)
      );

      deletePedido(itemToRemove._id);
      const updatedItems = orderItems.filter((_, i) => i !== selectedRowIndex);
      setOrderItems(updatedItems);
      setSelectedRowIndex(null);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateSolicitud(params.id, data);
      const date = new Date();
      const historialData = {
        tipo: "Modificar",
        descripcion: `Se Modificó una solicitud con nombre ${data.nombre} y factura ${factura}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/requests");
    } else {
      const confirmDelete = window.confirm(
        "¿Estás seguro de crear la Solicitud (No se podra modificar)?"
      );
      if (confirmDelete) {
      data.estado = false;
      await createSolicitud(data);
      const date = new Date();
      const historialData = {
        tipo: "Agregar",
        descripcion: `Se Creó una solicitud con nombre ${data.nombre}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/requests");
    }}
  });

  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

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
              disabled={!isNombreEditable}
            />
            {errors.nombre && <p className="text-red-500">Nombre Requerido</p>}
            {errorNombre && (
              <p className="text-red-500">Debe llenar el campo de Nombre antes de crear un pedido.</p>
            )}
          </div>

          <div>
            <label className="text-white">Cliente</label>
            <select
              onChange={handleClientChange}
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
            {errorCliente && (
              <p className="text-red-500">Debe seleccionar un cliente antes de crear un pedido.</p>
            )}
          </div>

          <div>
            <label className="text-white">Descripción</label>
            <input
              type="text"
              placeholder="Descripción"
              {...register("descripcion", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.descripcion && (
              <p className="text-red-500">Descripción Requerida</p>
            )}
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
                    {product.name}
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
            >
              Quitar
            </button>
          </div>

          <table className="min-w-full mt-4 bg-white rounded-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Producto</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Precio</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Cantidad</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleSelectRow(index)}
                  className={
                    selectedRowIndex === index ? "bg-gray-300" : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.product}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.price}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">Q.{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-white text-xl font-bold">Total: Q.{totalAmount.toFixed(2)}</div>

          <button
            type="submit"
            className="w-full text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md mt-4"
          >
            Guardar Solicitud
          </button>
        </form>
        <Link
        onClick={handleRemoveMatchingPedidos}
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
