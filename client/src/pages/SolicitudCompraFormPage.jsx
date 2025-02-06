import { useForm } from "react-hook-form";
import { useSolicitudsCompra } from "../context/SolicitudCompraContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useProveedors } from "../context/ProveedorContext";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { usePedidosCompra } from "../context/PedidoCompraContext";

function SolicitudCompraFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const {
    createSolicitudCompra,
    getSolicitudCompra,
    updateSolicitudCompra,
    solicituds_compra,
  } = useSolicitudsCompra();
  const {
    createPedidoCompra,
    getPedidosCompra,
    pedido_compra,
    deletePedidoCompra,
  } = usePedidosCompra();
  const { getProveedors, proveedors } = useProveedors();
  const { getProducts, products } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [factura, setFactura] = useState("");
  const [isNombreEditable, setIsNombreEditable] = useState(true);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorProveedor, setErrorProveedor] = useState(false);
  const [solicitudCount, setSolicitudCount] = useState(0);
  const [nit, setNit] = useState("");

  useEffect(() => {
    getProveedors();
    getProducts();
    async function loadSolicitud() {
      if (params.id) {
        const solicitud = await getSolicitudCompra(params.id);
        setValue("codigo", solicitud.codigo);
        setValue("tipo", solicitud.tipo);
        setValue("nombre", solicitud.code);
        setValue("proveedor", solicitud.proveedor);
        setValue("nit", solicitud.nit);
        setValue("descripcion", solicitud.presentation);
      }
    }
    loadSolicitud();
  }, [params.id, getSolicitudCompra, setValue]);

  useEffect(() => {
    getPedidosCompra();
  });

  useEffect(() => {
    const maxCode = solicituds_compra.reduce((max, current) => {
      const currentCode = Number(current.codigo);
      return currentCode > max ? currentCode : max;
    }, 499); // Inicia en 500 para que el primer código sea 100
    setSolicitudCount(maxCode + 1);
  }, [solicituds_compra]);

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setValue("tipo", selectedTipo);
  };

  const handleRemoveMatchingPedidos = async () => {
    const nombreValue = getValues("nombre"); // Obtiene el nombre actual del formulario.
    for (const item of orderItems) {
      // Busca el pedido en la base de datos que coincida con el nombre y los detalles del item.
      const itemToRemove = pedido_compra.find(
        (p) =>
          p.solicitud === nombreValue &&
          p.producto === item.product &&
          p.cantidad === Number(item.quantity) &&
          p.presentacion === item.presentacion
      );

      if (itemToRemove) {
        await deletePedidoCompra(itemToRemove._id); // Elimina el pedido.
      }
    }
  };

  const handleProveedorChange = (e) => {
    const selected = proveedors.find(
      (place) => place.nombre === e.target.value
    ); // Busca el cliente seleccionado
    console.log(selected);
    setSelectedProveedor(selected);
    setFactura(selected ? selected.factura : "");
    setNit(selected ? selected.nit : ""); // Actualiza el NIT del proveedor seleccionado
    setValue("proveedor", e.target.value);
    setErrorProveedor(false); // Resetea el error si hay selección
  };

  const handleAddProduct = () => {
    const nombreValue = getValues("nombre");
    const proveedorValue = getValues("proveedor");

    if (!nombreValue) {
      setErrorNombre(true);
      return;
    }
    if (!proveedorValue) {
      setErrorProveedor(true);
      return;
    }

    setErrorNombre(false);
    setErrorProveedor(false);

    if (selectedProduct && selectedQuantity > 0) {
      const productData = products.find(
        (product) => product.name === selectedProduct
      );

      const presentacion = productData.presentation;
      const date = new Date();
      const PedidoData = {
        solicitud: nombreValue,
        producto: selectedProduct,
        presentacion: presentacion,
        cantidad: Number(selectedQuantity),
        date,
        user,
      };
      createPedidoCompra(PedidoData);

      // Log de todos los pedidos en la base de datos
      // Muestra todos los pedidos en la consola

      const newItem = {
        product: selectedProduct,
        presentacion: presentacion,
        quantity: selectedQuantity,
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
      console.log(nombreValue);
      const item = orderItems[selectedRowIndex];
      const selectedProducto = item.product;
      const selectedCantidad = item.quantity;
      const selectedPresentacion = item.presentacion;

      const itemToRemove = pedido_compra.find(
        (item) =>
          item.solicitud === nombreValue &&
          item.producto === selectedProducto &&
          item.presentacion === selectedPresentacion &&
          item.cantidad === Number(selectedCantidad)
      );
      console.log(itemToRemove);

      deletePedidoCompra(itemToRemove._id);
      const updatedItems = orderItems.filter((_, i) => i !== selectedRowIndex);
      setOrderItems(updatedItems);
      setSelectedRowIndex(null);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.codigo = String(solicitudCount - 1);
      data.nit = Number(nit);
      await updateSolicitudCompra(params.id, data);
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Modificar",
        descripcion: `Se Modificó una solicitud de compra con nombre ${data.nombre} y factura ${factura}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/solicitud-compra");
    } else {
      const confirmDelete = window.confirm(
        "¿Estás seguro de crear la Solicitud (No se podra modificar)?"
      );
      if (confirmDelete) {
        data.codigo = String(solicitudCount);
        data.nit = Number(nit);
        console.log(data);
        await createSolicitudCompra(data);
        const date = new Date();
        const historialData = {
          num_doc: "n/a",
          recibo: "n/a",
          banco: "n/a",
          tipo_pago: "n/a",
          cliente: "n/a",
          tipo: "Agregar",
          descripcion: `Se Creó una solicitud de compra con nombre ${data.nombre}`,
          cantidad: 0,
          date,
          user,
        };
        await createHistorial(historialData);
        navigate("/solicitud-compra");
      }
    }
  });

  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">
          Solicitud de Compra
        </h1>

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
              <p className="text-red-500">
                Debe llenar el campo de Nombre antes de crear un pedido.
              </p>
            )}
          </div>

          <div>
            <label className="text-white">Tipo de Solicitud</label>
            <select
              {...register("tipo", {
                required: "Seleccione un tipo.",
              })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Seleccione una opción</option>
              <option value="Solicitud de Compra">Solicitud de Compra</option>
              <option value="Solicitud de Consignacion">
                Solicitud de Consignacion
              </option>
            </select>
            {errors.tipo && (
              <p className="text-red-500">{errors.tipo.message}</p>
            )}
          </div>

          <div>
            <label className="text-white">Proveedor</label>
            <select
              {...register("proveedor", {
                required: "Debe seleccionar un proveedor",
              })}
              onChange={handleProveedorChange}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md my-2"
            >
              <option value="">Seleccione un proveedor</option>
              {proveedors.map((place, i) => (
                <option key={i} value={place.nombre}>
                  {place.nombre}
                </option>
              ))}
            </select>

            {errors.proveedor && (
              <p className="text-red-500">{errors.proveedor.message}</p>
            )}
            {errorProveedor && (
              <p className="text-red-500">
                Debe seleccionar un Proveedor antes de crear un pedido.
              </p>
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
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Presentacion
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleSelectRow(index)}
                  className={selectedRowIndex === index ? "bg-gray-300" : ""}
                >
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {item.presentacion}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="submit"
            className="w-full text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md mt-4"
          >
            Guardar Solicitud
          </button>
        </form>
        <Link
          onClick={handleRemoveMatchingPedidos}
          to="/solicitud-compra"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default SolicitudCompraFormPage;
