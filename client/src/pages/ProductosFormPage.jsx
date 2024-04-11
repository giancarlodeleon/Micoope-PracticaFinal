import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";

function ProductosFormPage() {

  const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        console.log(product);
        setValue("nombre", product.nombre);
        setValue("precio_compra", product.precio_compra);
        setValue("precio_venta", product.precio_venta);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      data.precio_compra = parseFloat(data.precio_compra);
      data.precio_venta = parseFloat(data.precio_venta);
      updateProduct(params.id, data);
    } else {
      data.precio_compra = parseFloat(data.precio_compra);
      data.precio_venta = parseFloat(data.precio_venta);
      createProduct(data);
    }
    navigate("/products");
  });


  return (
    <div className="items-center justify-center py-20">
      <div className="bg-blue-900 max-w-md p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold">Producto</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.nombre && <p className="text-red-500">Nombre Requerido</p>}

          <input
            type="number"
            placeholder="Precio Compra"
            {...register("precio_compra", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.precio_compra && <p className="text-red-500">Precio Compra Requerido</p>}

          <input
            type="number"
            placeholder="Precio Venta"
            {...register("precio_venta", { required: true })}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.precio_venta && <p className="text-red-500">Precio Venta Requerido</p>}
          
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-auto"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/products"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  )
}
export default ProductosFormPage