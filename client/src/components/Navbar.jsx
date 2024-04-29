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
  const [dropdownOpenManejo, setDropdownOpenManejo] = useState(false);
  const [dropdownOpenAgencia, setDropdownOpenAgencia] = useState(false);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

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
  });

 
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

    
      <nav className="bg-white my-1 flex justify-between items-center px-10 rounded-lg relative z-50">
        <Link to="/home">
          <img
            src={Logo}
            alt="Imagen Cooperativa"
            className="rounded-lg"
            style={{ maxWidth: "200px" }}
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
              <div className="py-1 font-bold" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                   {/* Elemento con submenú */}
                   <button
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={toggleSubMenu1}
                >
                  Manejo de Informacion
                </button>
                {/* Submenú */}
                {subMenuVisible1 && (
                  <div className="pl-4">
                    <a href="/users" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Usuario</a>
                    <a href="/roles" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Roles</a>
                    <a href="/agencias" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Agencias</a>
                  </div>
                )}
              
                <a href="/boletas" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Almacen</a>
                <a href="/resumen" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Resumen</a>
                <button
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={toggleSubMenu2}
                >
                  Manejo de Agencia
                </button>
                {/* Submenú */}
                {subMenuVisible2 && (
                  <div className="pl-4">
                    <a href="/aportacionesIngresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Aportaciones</a>
                    <a href="/ahorro-ingresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Ahorro Disponible</a>
                    <a href="/infanto-ingresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Infanto Juvenil</a>
                    <a href="/plazo-ingresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Plazo Fijo</a>
                    <a href="/programado-ingresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Programado</a>
                    <a href="/TRX-ingresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Boletas TRX</a>
                    <a href="/vales-ingresado" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Vales de Efectivo</a>
                  </div>
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
                        className={`font-bold hover:text-blue-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                          location.pathname.startsWith("/users") ||
                          location.pathname.startsWith("/agencias") ||
                          location.pathname.startsWith("/rols") ||
                          location.pathname === "/register" ||
                          location.pathname === "/add-agencia" ||
                          location.pathname === "/add-rol" ||
                          location.pathname === "/agencias" ||
                          location.pathname === "/roles"
                            ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
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
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_information ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
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
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_information ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Roles
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleManejo}
                        to="/agencias"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_information ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Agencias
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
                  to="/boletas"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ||
                    !place.permission_Warehouse ? null : (
                      <option
                        key={place.id} // Asegúrate de incluir la clave única para cada elemento
                        style={{ fontSize: "20px" }}
                        className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                          location.pathname === "/boletas" ||
                          location.pathname.startsWith("/boletas") ||
                          location.pathname === "/add-boleta"
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
                  style={{ fontSize: "20px" }}
                  onClick={handleDropdownToggleAgencia}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ||
                    !place.permission_of_Office ? null : (
                      <option
                        key={place.id} // Asegúrate de incluir la clave única para cada elemento
                        style={{ fontSize: "20px" }}
                        className={`font-bold hover:text-blue-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                          location.pathname.startsWith("/salida") ||
                          location.pathname.startsWith("/entregar") ||
                          location.pathname.startsWith("/movimientos") ||
                          location.pathname === "/aportacionesIngresado" ||
                          location.pathname === "/aportacionesEntregado" ||
                          location.pathname === "/ahorro-ingresado" ||
                          location.pathname === "/ahorro-entregado" ||
                          location.pathname === "/infanto-ingresado" ||
                          location.pathname === "/infanto-entregado" ||
                          location.pathname === "/plazo-ingresado" ||
                          location.pathname === "/plazo-entregado" ||
                          location.pathname === "/programado-ingresado" ||
                          location.pathname === "/programado-entregado" ||
                          location.pathname === "/TRX-ingresado" ||
                          location.pathname === "/TRX-entregado" ||
                          location.pathname === "/vales-ingresado" ||
                          location.pathname === "/vales-entregado"
                            ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                            : ""
                        }`}
                      >
                        Manejo de Agencia
                      </option>
                    )
                  )}
                </NavLink>
                {/* Contenido del menú desplegable */}
                {dropdownOpenAgencia && (
                  <ul className="absolute bg-white shadow-md rounded-lg mt-1 z-50 flex flex-col justify-center items-center">
                    {/* Opciones del menú desplegable */}
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/aportacionesIngresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Aportaciones
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/ahorro-ingresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Ahorro Disponible
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/infanto-ingresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Infanto Juvenil
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/plazo-ingresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Plazo Fijo
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/programado-ingresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Programado
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/TRX-ingresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Boletas TRX
                            </option>
                          )
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleDropdownToggleAgencia}
                        to="/vales-ingresado"
                        activeStyle={{ background: "blue", color: "white" }}
                      >
                        {rol.map((place) =>
                          place.name !== user.rol ||
                          !place.permission_of_Office ? null : (
                            <option
                              key={place.id} // Asegúrate de incluir la clave única para cada elemento
                              style={{ fontSize: "20px" }}
                              className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg`}
                            >
                              Vales de Efectivo
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
        )}
    








       
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
