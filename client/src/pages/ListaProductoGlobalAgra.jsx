import React from "react";

function ListaProducto() {
  const productosGlobalagra  = [
    { nombre: "Bio 20", ai: "NPK+EM+ALGAS" },
    { nombre: "Biomex Plus", ai: "Basillus amiloquefaciens" },
    { nombre: "Calmax Super", ai: "Calcio 24% + amino" },
    { nombre: "DP98", ai: "Fosfito de Potasio" },
    { nombre: "HUMI ROOT", ai: "Ácidos Húmicos" },
    { nombre: "K41", ai: "Potasio 41%" },
    { nombre: "Kingfol Zinc", ai: "Zinc 70%" },
    { nombre: "Micromax", ai: "Elementos menores" },
    { nombre: "Organomex 6-2-4", ai: "NPK Orgánico" },
    { nombre: "Anttrak 70 WP", ai: "Propineb" },
    { nombre: "Azoxystar 50 WG", ai: "Azoxistrobina" },
    { nombre: "Azoxystar Xtra 28 SC", ai: "Azoxistrobina+ Ciproconazole" },
    { nombre: "AZTEB 25 EW", ai: "Tebuconazole" },
    { nombre: "Carbendazim 50 SC", ai: "Carbendazim" },
    { nombre: "Difecor 25 EC", ai: "Difenoconazole" },
    { nombre: "FLUTRIAZELL 12.5 SC", ai: "FLUTRIAFOL" },
    { nombre: "FOSETIL ALUMINIO 80 WP", ai: "Fosetyl Aluminium" },
    { nombre: "Globaxil 72 WP", ai: "Mancozeb + Metalaxil" },
    { nombre: "MANCOZEB 80 WP", ai: "Mancozeb" },
    { nombre: "Pilarich 72 SC", ai: "Clorotalonil" },
    { nombre: "TIZOSTOP 72 WP", ai: "Mancozeb + Cymoxanil" },
    { nombre: "Vondozeb 80 WP", ai: "Mancozeb" },
    { nombre: "2,4-D 72  SL", ai: "2,4-D 72 SL" },
    { nombre: "Combate 60 WP", ai: "Metsulfuron Metil 60 WP" },
    { nombre: "Desmonte 4 SC", ai: "NICOSULFURON" },
    { nombre: "Glifosato 36% SL", ai: "Glifosato 35.6% SL" },
    { nombre: "Macana 20 EC", ai: "Fluroxipir 20 EC" },
    { nombre: "NERON 20 SL", ai: "Glufosinato 20 SL" },
    { nombre: "Paraquat 20 SL", ai: "Paraquat 20 SL" },
    { nombre: "Parcero 16.5 SL", ai: "2,4-D+ Picloram" },
    { nombre: "RAPID 25 SL", ai: "FOMESAFEN" },
    { nombre: "Señal 48 SC", ai: "METRIBUZIM" },
    { nombre: "TRABUCO 12,5 EC", ai: "FLUAZIFOP-P-BUTIL" },
    { nombre: "Abamectina 1.8 EC", ai: "Abamectina" },
    { nombre: "CARACOZELL 6 GB", ai: "METALDEHYDE" },
    { nombre: "CYPERMETHRIN 25 EC", ai: "Cypermethrin" },
    { nombre: "EMUFON 50 WG", ai: "Emamectin Bensoato + Lufenuron" },
    { nombre: "Kempo 5 EC", ai: "Lambda Cihalotrina" },
    { nombre: "Malathion 57 EC", ai: "Malation" },
    { nombre: "RHINO 35 SC", ai: "Imidacloprid" },
    { nombre: "TAPIR 20 SP", ai: "Acetamiprid" },
    { nombre: "VERDUGO 5 SG", ai: "EMAMECTINA" },
    { nombre: "DOBRO 38.5", ai: "FOMESAFEN + FLUAZIFOP" },
    
  ];

  return (
    <div className="mb-0 p-8">
      {/* Imagen y Texto Globalagra */}
      <div className="mb-6">
        <a className="flex flex-col items-center justify-center rounded-lg w-full h-[100px]">
          <span className="text-6xl font-bold text-gray-700">Globalagra</span>
        </a>
      
      </div>

      {/* Tabla de Productos Globalagra */}
      <div className="overflow-x-auto mb-10">
        <h2 className="text-2xl font-bold text-center mb-4">
          LÍNEA CINAGRO-GLOBAL AGRA
        </h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2 text-left">
                PRODUCTO
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">A.I.</th>
            </tr>
          </thead>
          <tbody>
            {productosGlobalagra.map((producto, index) => (
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
export default ListaProducto;
