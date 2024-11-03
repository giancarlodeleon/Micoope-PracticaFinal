import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRols } from "../context/RolContext";
import Logo from "../assets/cinagro.jpg";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { getRols, rol } = useRols();
  const location = useLocation();

  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownOpenManejo, setDropdownOpenManejo] = useState(false);
  const [dropdownOpenAgencia, setDropdownOpenAgencia] = useState(false);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const [Setpermiso, setPermisoToShow] = useState(null);

  // Función para manejar el clic en el botón de desplegar
  const handleDropdownToggleManejo = () => {
    setDropdownOpenManejo(!dropdownOpenManejo);
  };

  const handleDropdownToggleAgencia = () => {
    setDropdownOpenAgencia(!dropdownOpenAgencia);
  };

  useEffect(() => {
    let timer;
    if (dropdownOpenAgencia) {
      timer = setTimeout(() => {
        setDropdownOpenAgencia(false);
      }, 2000); // Cerrar el menú después de 5 segundos
    }
    return () => clearTimeout(timer);
  }, [dropdownOpenAgencia]);

  useEffect(() => {
    let timer;
    if (dropdownOpenManejo) {
      timer = setTimeout(() => {
        setDropdownOpenManejo(false);
      }, 2000); // Cerrar el menú después de 5 segundos
    }
    return () => clearTimeout(timer);
  }, [dropdownOpenManejo]);

  useEffect(() => {
    getRols();
  }, );

  useEffect(() => {
    const permiso = rol.find((permiso) => permiso.name === user.rol);
    setPermisoToShow(permiso);
  }, []);

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [subMenuVisible1, setSubMenuVisible1] = useState(false);

  const toggleSubMenu1 = () => {
    setSubMenuVisible1(!subMenuVisible1);
  };

  const [subMenuVisible2, setSubMenuVisible2] = useState(false);

  const toggleSubMenu2 = () => {
    setSubMenuVisible2(!subMenuVisible2);
  };
  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-4 rounded-lg relative z-50">
        <Link to="/home">
          <img
            src={Logo}
            alt="Cinagro"
            className="rounded-lg"
            style={{ maxWidth: "180px" }}
          />
        </Link>

        {isMobile && isAuthenticated ? (
          // Display mobile menu button
          <>
            <div className="relative">
              <button
                className="block md:hidden text-3xl focus:outline-none"
                onClick={toggleMenu}
              >
                ☰
              </button>

              {/* Menú desplegable */}
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 font-bold"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {/* Elemento con submenú */}
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_of_information ? null : (
                        <button
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={toggleSubMenu1}
                        >
                          Manejo de Informacion
                        </button>
                      )
                    )}

                    {/* Submenú */}
                    {subMenuVisible1 && (
                      <div className="pl-4 bg-gray-200">
                        <a
                          href="/users"
                          className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                          role="menuitem"
                        >
                          Usuario
                        </a>
                        <a
                          href="/roles"
                          className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                          role="menuitem"
                        >
                          Roles
                        </a>
                      </div>
                    )}

                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_of_Client ? null : (
                        <a
                          href="/clientes"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Clientes
                        </a>
                      )
                    )}

                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Warehouse ? null : (
                        <a
                          href="/inventario"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Inventario
                        </a>
                      )
                    )}

                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Summary ? null : (
                        <a
                          href="/reporte"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Reporte
                        </a>
                      )
                    )}

                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Request ? null : (
                        <a
                          href="/requests"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Solicitudes
                        </a>
                      )
                    )}
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Historial ? null : (
                        <a
                          href="/historial"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Historial
                        </a>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Display desktop menu
          <ul className="flex gap-x-10 items-center">
            {isAuthenticated && (
              <>
                <li>
                  {/* Botón para desplegar el menú */}

                  <NavLink
                    style={{ fontSize: "20px" }}
                    onClick={handleDropdownToggleManejo}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_of_information ? null : (
                        <option
                          key={place.id} // Utiliza _id en lugar de id si así está definido en tu objeto place
                          style={{ fontSize: "20px" }}
                          className={`font-bold hover:text-green-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                            location.pathname.startsWith("/users") ||
                            location.pathname.startsWith("/rols") ||
                            location.pathname === "/register" ||
                            location.pathname === "/add-rol" ||
                            location.pathname === "/roles"
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-blue-50"
                              : ""
                          }`}
                        >
                          Manejo de informacion
                        </option>
                      )
                    )}
                  </NavLink>

                  {/* Contenido del menú desplegable */}
                  {dropdownOpenManejo && (
                    <ul className="absolute bg-white shadow-md rounded-lg mt-1 z-50 w-64 flex flex-col justify-center items-center">
                      {/* Opciones del menú desplegable */}
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleManejo}
                          to="/users"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_of_information ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "20px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                Usuarios
                              </option>
                            )
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleManejo}
                          to="/roles"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_of_information ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "20px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                Roles
                              </option>
                            )
                          )}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <NavLink
                    to="/clientes"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_of_Client ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "20px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/clientes" ||
                            location.pathname.startsWith("/clientes") ||
                            location.pathname === "/add-boleta"
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-green-50"
                              : ""
                          }`}
                        >
                          Clientes
                        </option>
                      )
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/inventario"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Warehouse ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "20px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/inventario" ||
                            location.pathname.startsWith("/inventario") ||
                            location.pathname === "/add-boleta"
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-green-50"
                              : ""
                          }`}
                        >
                          Inventario
                        </option>
                      )
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/requests"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Request ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "20px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/requests" ||
                            location.pathname.startsWith("/solicitudes") ||
                            location.pathname.startsWith("/requests") ||
                            location.pathname === "/add-request"
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-green-50"
                              : ""
                          }`}
                        >
                          Solicitudes
                        </option>
                      )
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/historial"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Historial ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "20px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/historial" ||
                            location.pathname.startsWith("/historial") 
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-green-50"
                              : ""
                          }`}
                        >
                          Historial
                        </option>
                      )
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reporte"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Summary ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "20px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/reporte"
                              ? "bg-green-900 text-green-50 hover:bg-green-800 hover:text-green-50"
                              : ""
                          }`}
                        >
                          Reporte
                        </option>
                      )
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    style={{ fontSize: "20px", marginLeft: "30px" }}
                    className="font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg"
                    onClick={() => {
                      logout();
                    }}
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    <p className="justify-between">Salir</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{ fontSize: "20px" }}
                    onClick={handleDropdownToggleAgencia}
                  ></NavLink>
                  {/* Contenido del menú desplegable */}
                </li>
               
              </>
            )}
          </ul>
        )}
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
