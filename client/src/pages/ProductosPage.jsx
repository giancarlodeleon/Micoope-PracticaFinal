import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

function ProductosPage() {

  const { getProducts, products, deleteProduct } = useProducts();

  const [currentPage, setCurrentPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const rolsPerPage = 10; 


  useEffect(() => {
    getProducts();
  },[]);

  const handleDeleteClick = (productId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );
    if (confirmDelete) {
      deleteProduct(productId);
    }
  };

    // Filtrar roles según el término de búsqueda
    const filteredProducts = products.filter((place) =>
    place.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Calcular el total de páginas para los roles filtrados
    const totalPages = Math.ceil(filteredProducts.length / rolsPerPage);

    // Lógica para calcular los índices de inicio y fin de los roles en la página actual
    const indexOfLastProduct = currentPage * rolsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - rolsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div className="flex justify-center p-4 ">
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
          <h1
            className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
            style={{ fontSize: "30px" }}
          >
            Productos
            <Link
              to="/add-product"
              className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
              style={{ width: "36px", height: "36px" }}
            >
              +
            </Link>
          </h1>
          {/* Campo de búsqueda */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg"
            />
          </div>
          <div className="my-2 overflow-x-auto  rounded-lg">
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-2 text-center">Nombre de producto</th>
                  <th className="py-2 text-center">Precio de compra</th>
                  <th className="py-2 text-center">Precio de venta</th>
                  <th className="py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((place) => (
                  <tr key={place._id}>
                    <td className="text-center border border-blue-100">
                      {place.nombre}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.precio_compra}
                    </td>
                    <td className="text-center border border-blue-100">
                      {place.precio_venta}
                    </td>
                    <td className="flex justify-center items-center border border-blue-100">
                      <Link
                        to={`/products/${place._id}`}
                        className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                      >
                        Editar
                      </Link>
                      <button
                        className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                        onClick={() => handleDeleteClick(place._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Controles de paginación */}
            <div className="flex justify-center mt-4">
              {/* Botón para ir a la página anterior (solo se muestra si no está en la primera página) */}
              {currentPage !== 1 && (
                <button
                  className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg mr-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </button>
              )}
              {/* Botón para ir a la página siguiente (solo se muestra si no está en la última página) */}
              {indexOfLastProduct < filteredProducts.length && (
                <button
                  className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-2 px-4 rounded-lg"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Siguiente
                </button>
              )}
            </div>
            {/* Mostrar el total de páginas */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Página {currentPage} de {totalPages}
            </p>
          </div>
        </div>
      </div>
    );
  }
export default ProductosPage