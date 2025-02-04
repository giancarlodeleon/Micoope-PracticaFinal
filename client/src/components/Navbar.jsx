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
  const [dropdownOpenAdmin, setDropdownOpenAdmin] = useState(false);
  const [dropdownOpenSolicitud, setDropdownOpenSolicitud] = useState(false);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const [Setpermiso, setPermisoToShow] = useState(null);

  // Función para manejar el clic en el botón de desplegar
  const handleDropdownToggleManejo = () => {
    setDropdownOpenManejo(!dropdownOpenManejo);
  };
  const handleDropdownToggleAdmin = () => {
    setDropdownOpenAdmin(!dropdownOpenAdmin);
  };
  const handleDropdownToggleSolicitud = () => {
    setDropdownOpenSolicitud(!dropdownOpenSolicitud);
  };

  useEffect(() => {
    let timer;
    if (dropdownOpenAdmin) {
      timer = setTimeout(() => {
        setDropdownOpenAdmin(false);
      }, 2000); // Cerrar el menú después de 5 segundos
    }
    return () => clearTimeout(timer);
  }, [dropdownOpenAdmin]);

  useEffect(() => {
    getRols();
  }, []);

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
    let timer;
    if (dropdownOpenSolicitud) {
      timer = setTimeout(() => {
        setDropdownOpenSolicitud(false);
      }, 2000); // Cerrar el menú después de 5 segundos
    }
    return () => clearTimeout(timer);
  }, [dropdownOpenSolicitud]);

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

  const [subMenuVisible3, setSubMenuVisible3] = useState(false);

  const toggleSubMenu3 = () => {
    setSubMenuVisible3(!subMenuVisible3);
  };

  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-4 rounded-lg relative z-50">
        <Link to={isAuthenticated ? "/home" : "/cinagro"}>
          <img
            src={Logo}
            alt="Cinagro"
            className="rounded-lg"
            style={{ maxWidth: "160px" }}
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
                          Administrador
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
                      !place.permission_of_Proveedor ? null : (
                        <a
                          href="/proveedors"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Proveedores
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

                    {/* Elemento con submenú */}
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Request  ? null : (
                        <button
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={toggleSubMenu3}
                        >
                          Solicitudes
                        </button>
                      )
                    )}

                    {/* Submenú */}
                    {subMenuVisible3 && (
                      <div className="pl-4 bg-gray-200">
                        <a
                          href="/requests"
                          className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                          role="menuitem"
                        >
                          De Venta
                        </a>
                        <a
                          href="/solicitud-compra"
                          className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                          role="menuitem"
                        >
                          De Compra
                        </a>
                      </div>
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

                    {/* Elemento con submenú */}
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Financial ? null : (
                        <button
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left "
                          onClick={toggleSubMenu2}
                        >
                          Finanzas
                        </button>
                      )
                    )}

                    {/* Submenú */}
                    {subMenuVisible2 && (
                      <div className="pl-4 bg-gray-200">
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_Register_Sell ? null : (
                            <a
                              href="/registro-venta"
                              className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                              role="menuitem"
                            >
                              Registro de Ventas
                            </a>
                          )
                        )}

                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_Payouts ? null : (
                            <a
                              href="/gastos"
                              className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                              role="menuitem"
                            >
                              Gastos
                            </a>
                          )
                        )}
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_Account ? null : (
                            <a
                              href="/estado-cuenta"
                              className="block px-4 py-2 text-lg text-gray-700 bg-gray-200 hover:bg-gray-200"
                              role="menuitem"
                            >
                              Estado de cuenta
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Display desktop menu ------------------------------------------------------------------------------------------------------
          <ul className="flex gap-x-8 items-center">
            {isAuthenticated && (
              <>
                <li>
                  {/* Botón para desplegar el menú */}

                  <NavLink
                    style={{ fontSize: "15px" }}
                    onClick={handleDropdownToggleManejo}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_of_information ? null : (
                        <option
                          key={place.id} // Utiliza _id en lugar de id si así está definido en tu objeto place
                          style={{ fontSize: "15px" }}
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
                          Administrador
                        </option>
                      )
                    )}
                  </NavLink>

                  {/* Contenido del menú desplegable */}
                  {dropdownOpenManejo && (
                    <ul className="absolute bg-white shadow-md rounded-lg mt-1  w-32 flex flex-col justify-center items-center">
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
                                style={{ fontSize: "15px" }}
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
                                style={{ fontSize: "15px" }}
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
                          style={{ fontSize: "15px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/clientes" ||
                            location.pathname.startsWith("/clients") ||
                            location.pathname === "/add-client"
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
                    to="/proveedors"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_of_Proveedor ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "15px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/proveedors" ||
                            location.pathname.startsWith("/proveedors") ||
                            location.pathname === "/add-proveedor"
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-green-50"
                              : ""
                          }`}
                        >
                          Proveedores
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
                          style={{ fontSize: "15px" }}
                          className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                            location.pathname === "/inventario" ||
                            location.pathname.startsWith("/products") ||
                            location.pathname.startsWith("/sumar") ||
                            location.pathname.startsWith("/restar") ||
                            location.pathname === "/add-product"
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
                    style={{ fontSize: "15px" }}
                    onClick={handleDropdownToggleSolicitud}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Request ? null : (
                        <option
                          key={place.id} // Utiliza _id en lugar de id si así está definido en tu objeto place
                          style={{ fontSize: "15px" }}
                          className={`font-bold hover:text-green-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                            location.pathname === "/requests" ||
                            location.pathname.startsWith("/solicitudes") ||
                            location.pathname.startsWith("/solicitud") ||
                            location.pathname.startsWith("/requests") ||
                            location.pathname === "/add-request"
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-blue-50"
                              : ""
                          }`}
                        >
                          Solicitudes
                        </option>
                      )
                    )}
                  </NavLink>
                  {dropdownOpenSolicitud && (
                    <ul className="absolute bg-white shadow-md rounded-lg mt-1  w-32 flex flex-col justify-center items-center">
                      {/* Opciones del menú desplegable */}
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleSolicitud}
                          to="/requests"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_Request ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "15px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                De Venta
                              </option>
                            )
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleSolicitud}
                          to="/solicitud-compra"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_Request ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "15px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                De Compra
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
                    to="/historial"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Historial ? null : (
                        <option
                          key={place.id} // Asegúrate de incluir la clave única para cada elemento
                          style={{ fontSize: "15px" }}
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
                          style={{ fontSize: "15px" }}
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
                    style={{ fontSize: "20px" }}
                    onClick={handleDropdownToggleAdmin}
                  >
                    {rol.map((place) =>
                      place.name !== user.rol ||
                      !place.permission_Financial ? null : (
                        <option
                          key={place.id} // Utiliza _id en lugar de id si así está definido en tu objeto place
                          style={{ fontSize: "15px" }}
                          className={`font-bold hover:text-green-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                            location.pathname === "/gastos" ||
                            location.pathname.startsWith("/registro-venta") ||
                            location.pathname.startsWith("/add-venta") ||
                            location.pathname.startsWith("/add-gasto") ||
                            location.pathname.startsWith("/estado-cuenta")
                              ? "bg-green-900 text-blue-50 hover:bg-green-800 hover:text-blue-50"
                              : ""
                          }`}
                        >
                          Finanzas
                        </option>
                      )
                    )}
                  </NavLink>

                  {dropdownOpenAdmin && (
                    <ul className="absolute bg-white shadow-md rounded-lg mt-1  w-26 flex flex-col justify-center items-center">
                      {/* Opciones del menú desplegable */}
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleAdmin}
                          to="/registro-venta"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_Register_Sell ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "15px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                Registro de ventas
                              </option>
                            )
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleAdmin}
                          to="/gastos"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_Payouts ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "15px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                Gastos
                              </option>
                            )
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleDropdownToggleAdmin}
                          to="/estado-cuenta"
                          activeStyle={{ background: "green", color: "white" }}
                        >
                          {rol.map((place) =>
                            place.name !== user.rol ||
                            !place.permission_Account ? null : (
                              <option
                                key={place.id} // Asegúrate de incluir la clave única para cada elemento
                                style={{ fontSize: "15px" }}
                                className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg`}
                              >
                                Estado de cuenta
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
                    to="/"
                    style={{ fontSize: "15px", marginLeft: "30px" }}
                    className="font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg"
                    onClick={() => {
                      logout();
                    }}
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    <p className="justify-between">Salir</p>
                  </NavLink>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/"
                    activeStyle={{ background: "green", color: "white" }}
                  >
                    <option
                      style={{ fontSize: "18px" }}
                      className={`font-bold hover:text-green-600 text-black px-4 py-2 rounded-lg ${
                        location.pathname === "/" ||
                        location.pathname === "/cinagro"
                          ? "bg-green-900 text-green-50 hover:bg-green-800 hover:text-green-50"
                          : ""
                      }`}
                    >
                      Contribuyente
                    </option>
                  </NavLink>
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
