import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AgregarProductForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { getProduct, updateProduct, products } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const loadedProduct = await getProduct(params.id);
        setProduct(loadedProduct);
        setValue("code", loadedProduct.code);
        setValue("name", loadedProduct.name);
        setValue("presentation", loadedProduct.presentation);
        setValue("cost_price", loadedProduct.cost_price);
        setValue("selling_price_1", loadedProduct.selling_price_1);
        setValue("selling_price_2", loadedProduct.selling_price_2);
        setValue("selling_price_3", loadedProduct.selling_price_3);
        setValue("gravamen", loadedProduct.gravamen);
        setValue("stock", loadedProduct.stock);
        setValue("minimum_stock", loadedProduct.minimum_stock);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id && product) {
      const amountToAdd = Number(data.amountToAdd);
      const newStock = product.stock + amountToAdd;
      const newSellingPrice = Number(data.selling_price_1);

      // Validación si el precio de venta es válido
      if (newSellingPrice <= 0) {
        alert("El precio de venta debe ser mayor a 0.");
        return;
      }

      // Actualizar el stock y el precio de venta
      const updatedProduct = {
        ...product,
        stock: newStock,
        selling_price_1: newSellingPrice,
      };

      await updateProduct(params.id, updatedProduct);
      navigate("/inventario");
    }
  });

  return (
    <div className="items-center justify-center py-20">
      <div className="bg-green-900 max-w-lg p-10 rounded-md mx-auto relative">
        <h1 className="text-2xl text-white font-bold mb-4">Agregar Producto/Servicio</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-white">Cantidad a Agregar</label>
            <input
              type="number"
              placeholder="Cantidad a agregar"
              {...register("amountToAdd", { required: true, min: 1 })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.amountToAdd && (
              <p className="text-red-500">Ingrese una cantidad válida</p>
            )}
          </div>
  
          <div>
            <label className="text-white">Precio de Venta 1</label>
            <input
              type="number"
              step="0.01"
              placeholder="Precio de venta 1"
              {...register("selling_price_1", { required: true, min: 0.01 })}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-md"
            />
            {errors.selling_price_1 && (
              <p className="text-red-500">Ingrese un precio válido</p>
            )}
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
  
};

export default AgregarProductForm;
