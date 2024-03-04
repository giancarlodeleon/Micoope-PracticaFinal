import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ProductsFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        console.log(product);
        setValue("name", product.name);
        setValue("price", product.price);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      data.price = parseFloat(data.price);
      updateProduct(params.id, data);
    } else {
      data.price = parseFloat(data.price);
      createProduct(data);
    }
    navigate("/products");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <input
          type="number"
          placeholder="Price"
          {...register("price")}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default ProductsFormPage;
