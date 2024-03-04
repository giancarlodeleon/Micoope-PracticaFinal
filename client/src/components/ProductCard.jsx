import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (confirmDelete) {
      deleteProduct(product._id);
    }
  };

  return (
    <div className="bg-green-500 max-w-md w-full p-10 rounded-md relative">
      <header className="flex justify-between flex-wrap w-full">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </header>
      <p className="text-slate-300">Price: {product.price}</p>
      <p>{new Date(product.date).toLocaleDateString()}</p>
      <div className="absolute bottom-0 right-0 flex gap-x-2 items-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <Link to={`/products/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Edit
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;