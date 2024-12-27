import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistorials } from "../context/HistorialContext";
import { useAuth } from "../context/AuthContext";

function ProductFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createProduct, getProduct, updateProduct, products } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [productCount, setProductCount] = useState(0);
  const { createHistorial } = useHistorials();
  const { user } = useAuth();

  useEffect(() => {
    setProductCount(products.length);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        console.log(product);
        setValue("code", product.code);
        setValue("name", product.name);
        setValue("presentation", product.presentation);
        setValue("cost_price", product.cost_price);
        setValue("selling_price_1", product.selling_price_1);
        setValue("selling_price_2", product.selling_price_2);
        setValue("selling_price_3", product.selling_price_3);
        setValue("gravamen", product.gravamen);
        setValue("stock", product.stock);
        setValue("minimum_stock", product.minimum_stock);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      data.cost_price = Number(data.cost_price);
      data.selling_price_1 = Number(data.selling_price_1);
      data.selling_price_2 = Number(data.selling_price_2);
      data.selling_price_3 = Number(data.selling_price_3);
      data.stock = Number(data.stock);
      data.minimum_stock = Number(data.minimum_stock);
      const nameCode = data.name.substring(0, 3).toUpperCase(); // Primeras 3 letras del nombre
      const presentationCode = data.presentation
        ? `-${data.presentation.substring(0, 3).toUpperCase()}`
        : ""; // Si hay presentación, agrega las primeras 3 letras
      data.code = `${nameCode}${productCount + 0}${presentationCode}`;
      await updateProduct(params.id, data);
      const date = new Date();
      const historialData = {
        cliente:"n/a",
        tipo: "Modificar",
        descripcion: `Se Modifico el usuario ${data.name}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/inventario");
    } else {
      data.cost_price = Number(data.cost_price);
      data.selling_price_1 = Number(data.selling_price_1);
      data.selling_price_2 = Number(data.selling_price_2);
      data.selling_price_3 = Number(data.selling_price_3);
      data.stock = Number(data.stock);
      data.minimum_stock = Number(data.minimum_stock);
      const nameCode = data.name.substring(0, 3).toUpperCase(); // Primeras 3 letras del nombre
      const presentationCode = data.presentation
        ? `-${data.presentation.substring(0, 3).toUpperCase()}`
        : ""; // Si hay presentación, agrega las primeras 3 letras
      data.code = `${nameCode}${productCount + 1}${presentationCode}`;
      await createProduct(data);
      const date = new Date();
      const historialData = {
        cliente:"n/a",
        tipo: "Agregar",
        descripcion: `Se Agrego el usuario ${data.name}`,
        cantidad: 0,
        date,
        user,
      };
      await createHistorial(historialData);
      navigate("/inventario");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">
          Producto/Servicio
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
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
            <label className="text-white">Presentación</label>
            <input
              type="text"
              placeholder="Presentacion"
              {...register("presentation", { required: false })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-white">Precio Costo</label>
            <input
              type="number"
              placeholder="Precio Costo"
              {...register("cost_price", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.cost_price && (
              <p className="text-red-500">Precio Costo Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">Precio Base</label>
            <input
              type="number"
              placeholder="Precio Base"
              {...register("selling_price_1", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.selling_price_1 && (
              <p className="text-red-500">Precio Base Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">Porcentaje Segundo Precio</label>
            <input
              type="number"
              placeholder="Porcentaje segundo precio"
              {...register("selling_price_2", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.selling_price_2 && (
              <p className="text-red-500">Porcentaje Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">Porcentaje Tercer Precio</label>
            <input
              type="number"
              placeholder="Porcentaje tercer precio"
              {...register("selling_price_3", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.selling_price_3 && (
              <p className="text-red-500">Porcentaje Requerido</p>
            )}
          </div>

          <div>
            <label className="text-white">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              {...register("stock", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.stock && <p className="text-red-500">Stock Requerido</p>}
          </div>

          <div>
            <label className="text-white">Stock Mínimo</label>
            <input
              type="number"
              placeholder="Stock Minimo"
              {...register("minimum_stock", { required: true })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.minimum_stock && (
              <p className="text-red-500">Stock Mínimo Requerido</p>
            )}
          </div>

          <div className="flex items-center py-2">
            <label className="text-white">Válido a Comisión</label>
            <input
              type="checkbox"
              {...register("comision", { value: true })}
              className="ml-2"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </form>
        <Link
          to="/inventario"
          className="absolute top-0 right-0 hover:text-gray-200 text-white mt-2 mr-2"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default ProductFormPage;
