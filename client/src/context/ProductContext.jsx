import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  getProductsRequest,
  deleteProductRequest,
  getProductRequest,
  updateProductRequest,
} from "../api/product";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be usted within a ProductoProvider");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async (product) => {
    const res = await createProductRequest(product);
    console.log(res);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status == 204)
        setProducts(products.filter((products) => products._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getProducts,
        deleteProduct,
        getProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
