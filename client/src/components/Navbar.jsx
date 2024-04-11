import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import Logo from "../assets/Usac_logo.png";
import Calavera from "../assets/Calavera.jpg";

function Navbar() {

  const location = useLocation();

  return (
    <>
      <nav className="bg-white my-1 flex justify-between items-center px-10 rounded-lg relative z-50">
        <Link to="/">
          <img
            src={Logo}
            alt="USAC"
            className="rounded-lg"
            style={{ maxWidth: "80px" }}
          />
        </Link>

        <ul className="flex gap-x-10 items-center">

            <>
            <li style={{ fontSize: "50px", WebkitTextStroke: "2px black",color:"red" }} className="font-bold">Simulador de La Chabela</li>
            <h1>
          <img
            src={Calavera}
            alt="Calavera"
            className="rounded-lg"
            style={{ maxWidth: "60px" }}
          />
        </h1>

              <li>
                <NavLink
                  to="/products"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  <option
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === "/products" ||
                      location.pathname === "/add-product" ||
                      location.pathname.startsWith("/products") 
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
                  to="/gastos"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  <option
                    // Asegúrate de incluir la clave única para cada elemento
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === "/gastos" ||
                      location.pathname === "/add-gasto" ||
                      location.pathname.startsWith("/gastos") 
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
                  to="/simulador"
                  activeStyle={{ background: "blue", color: "white" }}
                >
                  <option
                    // Asegúrate de incluir la clave única para cada elemento
                    style={{ fontSize: "20px" }}
                    className={`font-bold hover:text-blue-600 text-black px-4 py-2 rounded-lg ${
                      location.pathname === "/simulador"
                        ? "bg-blue-900 text-blue-50 hover:bg-blue-800 hover:text-blue-50"
                        : ""
                    }`}
                  >
                    Simulador
                  </option>
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
