import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/descarga.png";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-10 rounded-lg">
        <Link to="/">
          <img
            src={Logo}
            alt="Imagen Cooperativa"
            className="rounded-lg"
            style={{ maxWidth: "200px" }}
          />
        </Link>

        <ul className="flex gap-x-8 items-center">
          {" "}
          {/* Añadido items-center para centrar verticalmente */}
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="add-product"
                  style={{ fontSize: "20px" }}
                  className="font-bold hover:text-blue-500"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{ fontSize: "20px" }}
                  className=" font-bold hover:text-blue-500"
                  onClick={() => {
                    logout();
                  }}
                >
                  Cerrar Sesion
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  style={{ fontSize: "20px" }}
                  className="font-bold hover:text-blue-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  style={{ fontSize: "20x" }}
                  className="font-bold hover:text-blue-500"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
