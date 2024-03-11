import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/descarga.png";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-10 rounded-lg">
        <Link to="/home">
          <img
            src={Logo}
            alt="Imagen Cooperativa"
            className="rounded-lg"
            style={{ maxWidth: "200px" }}
          />
        </Link>

        <ul className="flex gap-x-14 items-center">
          {isAuthenticated ? (
            <>
              {user.rol === "R1" ? (
                <li>
                  <NavLink
                    to="/users"
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === "/users"
                        ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                        : ""
                    }`}
                    activeStyle={{ background: "blue", color: "white" }}
                  >
                    Usuario
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {user.rol === "R1" || user.rol === "R2" ? (
                <li>
                  <NavLink
                    to="/almacen"
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === "/almacen"
                        ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                        : ""
                    }`}
                    activeStyle={{ background: "blue", color: "white" }}
                  >
                    Almacen
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              <li>
                <NavLink
                  to="/resumen"
                  style={{ fontSize: "20px" }}
                  className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                    location.pathname === "/resumen"
                      ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                      : ""
                  }`}
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  Resumen
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/agencias"
                  style={{ fontSize: "20px" }}
                  className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                    location.pathname === "/agencias"
                      ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                      : ""
                  }`}
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  Agencias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reportes"
                  style={{ fontSize: "20px" }}
                  className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                    location.pathname === "/reportes"
                      ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                      : ""
                  }`}
                >
                  Reportes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  style={{ fontSize: "20px" }}
                  className="font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg"
                  onClick={() => {
                    logout();
                  }}
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  Cerrar Sesión
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
