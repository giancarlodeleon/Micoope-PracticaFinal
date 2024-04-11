import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Usac_logo.png";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const location = useLocation();

  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-10 rounded-lg relative z-50">
        <Link to="/home">
          <img
            src={Logo}
            alt="Imagen Cooperativa"
            className="rounded-lg"
            style={{ maxWidth: "80px" }}
          />
        </Link>

        <ul className="flex gap-x-10 items-center">

            <>
              <li>
                <NavLink
                  to=""
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  <option
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === ""
                        ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                        : ""
                    }`}
                  >
                    Productos
                  </option>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  <option
                    // Asegúrate de incluir la clave única para cada elemento
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === ""
                        ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                        : ""
                    }`}
                  >
                    Gastos Varios
                  </option>
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
      
        </ul>
      </nav>
      <hr className="border-gray-300 w-full" />
    </>
  );
}

export default Navbar;
