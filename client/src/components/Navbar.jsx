import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import Logo from "../assets/descarga.png";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { getRols, rol } = useRols();
  const location = useLocation();

  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para manejar el clic en el botón de desplegar
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    let timer;
    if (dropdownOpen) {
      timer = setTimeout(() => {
        setDropdownOpen(false);
      }, 2000); // Cerrar el menú después de 5 segundos
    }
    return () => clearTimeout(timer);
  }, [dropdownOpen]);

  useEffect(() => {
    getRols();
  }, []);

  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-10 rounded-lg relative z-50">
        <Link to="/home">
          <img
            src={Logo}
            alt="Imagen Cooperativa"
            className="rounded-lg"
            style={{ maxWidth: "200px" }}
          />
        </Link>

        <ul className="flex gap-x-10 items-center">
          {isAuthenticated && (
            <>
              <li>
                {/* Botón para desplegar el menú */}
                <button
                  style={{ fontSize: "20px" }}
                  onClick={handleDropdownToggle}
                  className={`font-bold hover:text-blue-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                    location.pathname === "/users" ||
                    location.pathname === "/agencias" ||
                    location.pathname === "/roles"
                      ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                      : ""
                  }`}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ? null : (
                      <option className="font-bold">
                        {place.permission_of_information
                          ? "Manejo de información"
                          : ""}
                      </option>
                    )
                  )}
                </button>
                {/* Contenido del menú desplegable */}
                {dropdownOpen && (
                  <ul className="absolute bg-white shadow-md rounded-lg mt-1 z-50 w-64 flex flex-col justify-center items-center">
                    {/* Opciones del menú desplegable */}
                    <li>
                      <NavLink
                        onClick={handleDropdownToggle}
                        to="/users"
                        style={{ fontSize: "20px" }}
                        className="font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        Usuarios
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggle}
                        to="/roles"
                        style={{ fontSize: "20px" }}
                        className="font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        Roles
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggle}
                        to="/agencias"
                        style={{ fontSize: "20px" }}
                        className="font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        Agencias
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
              <NavLink
                  to="/almacen"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ||
                    !place.permission_Warehouse ? null : (
                      <option
                        key={place.id} // Asegúrate de incluir la clave única para cada elemento
                        style={{ fontSize: "20px" }}
                        className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                          location.pathname === "/almacen"
                            ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                            : ""
                        }`}
                      >
                        Almacen
                      </option>
                    )
                  )}
                </NavLink>
              </li>
              <li>
              <NavLink
                  to="/resumen"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ||
                    !place.permission_Summary ? null : (
                      <option
                        key={place.id} // Asegúrate de incluir la clave única para cada elemento
                        style={{ fontSize: "20px" }}
                        className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                          location.pathname === "/resumen"
                            ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                            : ""
                        }`}
                      >
                        Resumen
                      </option>
                    )
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/agencia"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ||
                    !place.permission_of_Office ? null : (
                      <option
                        key={place.id} // Asegúrate de incluir la clave única para cada elemento
                        style={{ fontSize: "20px" }}
                        className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                          location.pathname === "/agencia"
                            ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                            : ""
                        }`}
                      >
                        Agencia
                      </option>
                    )
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  style={{ fontSize: "20px", marginLeft: "30px" }}
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
          )}
        </ul>
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
