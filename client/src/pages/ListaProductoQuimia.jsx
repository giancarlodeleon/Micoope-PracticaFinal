import React from "react";
import quimia from "../assets/quimia.png";

function ListaProductoQuimia() {
  const productosQuimia = [
    { nombre: "TERRAGEL", ai: "Hidrogel" },
    {
      nombre: "Surfacid (Surfa)",
      ai: "Adh, Surf, Disp, Hum, Anti Es, Pen, Reg Ph",
    },
    { nombre: "Agrosuelo", ai: "Mejorador de Suelo" },
    { nombre: "Hormovit Hortaliza", ai: "Activador de desarrollo Vegetativo" },
    { nombre: "Hormovit Enraizador", ai: "Activador de Sistema Radicular" },
    {
      nombre: "Hormovit frio",
      ai: "Regulador de metabolismo y activador vegetativo",
    },
    {
      nombre: "Hormovit Calor",
      ai: "Regulador de metabolismo y activador vegetativo",
    },
    {
      nombre: "Hormovit Semilla",
      ai: "Regulador de metabolismo y activador vegetativo",
    },
    { nombre: "Tribiosoil", ai: "Trichoderma Viride y Bacillus Subtillis" },
    { nombre: "BIOSUB", ai: "BIOLOGICO" },
    { nombre: "Agrosuelo Plus", ai: "Mejorador de Suelos+Enraizador" },
    {
      nombre: "Creciplant Desarrollo",
      ai: "Formula Nutric Crecimiento y Desarrollo",
    },
    {
      nombre: "Creciplant Llenado",
      ai: "Formula Nutric Fructificación y Madurez",
    },
  ];

  return (
    <div className="m-16 p-0">
      <div className="mb-20">
        <a>
          <img
            src={quimia} // Coloca la ruta correcta de la imagen
            alt="mitzan"
            className="object-contain rounded-lg w-full h-[300px] mt-0"
          />
        </a>
      </div>
      {/* Tabla de Productos Quimia */}
      <div className="overflow-x-auto mb-12">
        <h2 className="text-2xl font-bold text-center mb-4">
          LISTA DE PRODUCTOS QUIMIA
        </h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2 text-left">
                PRODUCTO
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                INGREDIENTE ACTIVO
              </th>
            </tr>
          </thead>
          <tbody>
            {productosQuimia.map((producto, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {producto.nombre}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {producto.ai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaProductoQuimia;
