import React from 'react'
import mitzan from "../assets/mitzan.jpg";
function ListaProductoNitzan() {
    
  const productosNitzan = [
    { nombre: "NATURCOMPLET G", ai: "ÁCIDOS HÚMICOS GRANULADOS DE LIBERACIÓN LENTA" },
    { nombre: "NATURVITAL PLUS", ai: "ÁCIDOS HÚMICOS Y FÚLVICOS LÍQUIDOS" },
    { nombre: "RAIZA", ai: "ENRAIZADOR" },
    { nombre: "NATURFRUIT", ai: "POTASIO" },
    { nombre: "CYTOPLANT 400", ai: "CITOQUININAS" },
    { nombre: "NATURFOS L", ai: "FOSFITO DE POTASIO" },
    { nombre: "NATURMIX FE 7", ai: "MICROELEMENTOS QUELATADOS + HIERRO" },
    { nombre: "NATURAMIN WSP", ai: "AMINOÁCIDOS AL 80%" },
    { nombre: "NATURSAL EXPRESS", ai: "DESALINIZADOR Y FUENTE DE CALCIO" },
    { nombre: "NATURAMIN ZINC", ai: "AMINOÁCIDOS + ZINC" },
    { nombre: "PROMOSTART", ai: "NITROGENO DE LIBERACION LENTA" },
    { nombre: "COPSTAR", ai: "COBRE" },
    { nombre: "NEMATON", ai: "NEMATICIDA" },
  ];

  return (
     <div className="m-0 p-8">
     
         {/* Imagen y Texto Mitzan */}
         <div  className="mt-0">
           <a>
             <img
               src={mitzan} // Coloca la ruta correcta de la imagen
               alt="mitzan"
             className="object-contain rounded-lg w-full h-[400px] mt-0"
             />
           </a>
         </div>
   
         {/* Tabla de Productos Nitzan */}
         <div className="overflow-x-auto mb-12">
  <h2 className="text-2xl font-bold text-center mb-4">
    LISTA DE PRODUCTOS CON NITZAN
  </h2>
  <table className="w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-400 px-4 py-2 text-left">
          PRODUCTO
        </th>
        <th className="border border-gray-400 px-4 py-2 text-left">
          PRESENTACIÓN KG/LT
        </th>
      </tr>
    </thead>
    <tbody>
      {productosNitzan.map((producto, index) => (
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
  )
}

export default ListaProductoNitzan