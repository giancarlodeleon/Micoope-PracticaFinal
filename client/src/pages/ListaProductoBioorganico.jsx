import React from 'react'
import bioorganicos from "../assets/bioorganicos.png";

function ListaProductoBioorganico() {

    const productosQuimia = [
        { nombre: "REGA FIX", ai: "Algas marinas al 30% Ascosphillum Nodosum" },
        { nombre: "Adyugreen", ai: "Adyuvante espesante, Biorracional" },
        { nombre: "Adyugreen A", ai: "Extracto de Ajo al 20%" },
        { nombre: "Adyugreen C", ai: "Extracto de Canela al 20%" },
        { nombre: "Adyugreen N", ai: "Extracto de Neem al 20%" },
        { nombre: "Adyugreen M", ai: "Extracto de Mostaza al 20%" },
        { nombre: "Adyugreen Cu", ai: "Hidróxido de Cobre al 20%" },
        { nombre: "Adyugreen S", ai: "Ácido Oleico 84% + Azufre 21%" },
        { nombre: "Microsul", ai: "Azufre Coloidal al 32% + M E" },
        { nombre: "Biosoil", ai: "Extracto de Yucca Schidigera al 97%" },
        { nombre: "Mustar", ai: "Extracto de Mostaza al 85%" },
        { nombre: "Aller-Green", ai: "Extracto de Ajo al 85%" },
        { nombre: "Pam-Plex", ai: "Extracto de Ajo, Mostaza, Neem, Liomnela 85%" },
      ];
    
  return (
     <div className="m-16 p-0">
       <div className="mb-20">
         <a>
           <img
             src={bioorganicos} // Coloca la ruta correcta de la imagen
             alt="mitzan"
             className="object-contain rounded-lg w-full h-[300px] mt-0"
           />
         </a>
       </div>
       {/* Tabla de Productos Quimia */}
       <div className="overflow-x-auto mb-12">
         <h2 className="text-2xl font-bold text-center mb-4">
           LISTA DE PRODUCTOS BIOORGANICOS
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

export default ListaProductoBioorganico