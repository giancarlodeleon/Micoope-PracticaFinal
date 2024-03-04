import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from '../components/ProductCard'

function ProductsPage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts();
  });

  if(products.length==0) return (<h1>No products</h1>)
  return (
    <div className="grid grid-cols-3 gap-2 ">
      {products.map((product) => (
        <ProductCard product={product} key={product._id}/>
      ))}
    </div>
  );
}

export default ProductsPage;
