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

                <NavLink
                  style={{ fontSize: "20px" }}
                  onClick={handleDropdownToggleManejo}
                >
                  {rol.map((place) =>
                    place.name !== user.rol ||
                    !place.permission_of_information ? null : (
                      <option
                        key={place.id} // Asegúrate de incluir la clave única para cada elemento
                        style={{ fontSize: "20px" }}
                        className={`font-bold hover:text-blue-600 text-black gap-x-10 px-4 py-2 rounded-lg ${
                          location.pathname === "/users" ||
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
                          location.pathname === "/boletas"
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
                          location.pathname === "/boletastrx-ingresado" ||
                          location.pathname === "/boletastrx-entregado" ||
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
                        to="/boletastrx-ingresado"
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
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
