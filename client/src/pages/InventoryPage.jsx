import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import { useHistorials } from "../context/HistorialContext";

function Inventory() {
  const { user } = useAuth();
  const { getProducts, products, deleteProduct } = useProducts();
  const { getRols, rol } = useRols();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 10;
  const [Setpermiso, setPermisoToShow] = useState(null);
  const [Setpermiso2, setPermisoToShow2] = useState(null);
  const [Setpermiso3, setPermisoToShow3] = useState(null);
  const { createHistorial } = useHistorials();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getRols();
  }, []);

  const handleDeleteClick = (productId, Nombre) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este Producto?"
    );
    if (confirmDelete) {
      const date = new Date();
      const historialData = {
        num_doc: "n/a",
        recibo: "n/a",
        banco: "n/a",
        tipo_pago: "n/a",
        cliente: "n/a",
        tipo: "Eliminar",
        descripcion: `Se elimino el producto/servicio ${Nombre}`,
        cantidad: 0,
        date,
        user,
      };
      createHistorial(historialData);
      deleteProduct(productId);
    }
  };

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso.permission_of_add_Product);
    setPermisoToShow2(permiso.permission_add_stock);
    setPermisoToShow3(permiso.permission_takeout_stock);
  }, []);

  // Filtrar roles según el término de búsqueda
  const filteredProducts = products.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el total de páginas para los roles filtrados
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Lógica para calcular los índices de inicio y fin de los roles en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-green-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Productos/Servicios
          {Setpermiso && (
            <Link
              to="/add-product"
              className="bg-green-400 text-white hover:bg-green-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
              style={{ width: "36px", height: "36px" }}
            >
              +
            </Link>
          )}
        </h1>
        {/* Campo de búsqueda */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-green-500 rounded-lg"
          />
        </div>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-green-900 text-white">
                <th className="py-2 text-center">Codigo</th>
                <th className="py-2 text-center">Nombre</th>
                <th className="py-2 text-center">Presentacion</th>
                <th className="py-2 text-center">Costo</th>
                <th className="py-2 text-center">Venta 1</th>
                <th className="py-2 text-center">Venta 2</th>
                <th className="py-2 text-center">Venta 3</th>
                <th className="py-2 text-center">Stock</th>
                <th className="py-2 text-center">Comision</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((place) => (
                <tr key={place._id}>
                  <td className="text-center border border-green-100">
                    {place.code}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.name}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.presentation}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{place.cost_price}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.{place.selling_price_1}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.
                    {place.selling_price_1 +
                      place.selling_price_1 * (place.selling_price_2 / 100)}
                  </td>
                  <td className="text-center border border-green-100">
                    Q.
                    {place.selling_price_1 +
                      place.selling_price_1 * (place.selling_price_3 / 100)}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.stock}
                    {place.minimum_stock >= place.stock && (
                      <span className="ml-2" title="Stock bajo">
                        ⚠️
                      </span>
                    )}
                  </td>
                  <td className="text-center border border-green-100">
                    {place.comision ? "Activo" : "Desactivo"}
                  </td>

                  <td className="flex justify-center items-center border border-green-100">
                    {Setpermiso2 && (
                      <Link
                        to={`/sumar-products/${place._id}`}
                        className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                      >
                        Agregar
                      </Link>
                    )}
                    {Setpermiso3 && (
                      <Link
                        to={`/restar-products/${place._id}`}
                        className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                      >
                        Quitar
                      </Link>
                    )}

                    <Link
                      to={`/products/${place._id}`}
                      className="bg-green-500 font-bold hover:bg-green-400 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDeleteClick(place._id, place.name)}
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
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {/* Botón para ir a la página siguiente (solo se muestra si no está en la última página) */}
            {indexOfLastProduct < filteredProducts.length && (
              <button
                className="bg-green-500 font-bold hover:bg-green-400 text-white py-2 px-4 rounded-lg"
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

export default Inventory;
