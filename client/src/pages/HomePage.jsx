import { useState } from 'react';

function HomePage() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative text-black flex flex-col justify-center items-center overflow-hidden">

      {/* Video de fondo */}
      <div className="absolute inset-0  z-0 overflow-hidden">
        <video autoPlay muted loop disablePictureInPicture className="absolute w-full h-full object-cover top-0 left-0">
          <source src="https://cdn.pixabay.com/video/2016/09/13/5192-183786490_tiny.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Contenido */}
      <div className="z-10 w-3/4 text-center">
        <h1 className="text-5xl text-center mb-6 font-semibold text-white underline">
         BIENVENIDO 
        </h1>
        <p className="text-lg text-justify mb-6 text-white italic ">  
        Este simulador nos permite ver a detalle el comportamiento de los diferentes presupuestos en la cafetería LA CHABELA.
        Por lo que se deben ingresar los gastos varios, gastos fijos y los productos que se encuentran en la cafetería.
        
        </p>
        
      </div>

      
      {/* Nuevo contenido sin video de fondo */}
      <div className="z-10 text-center mt-8 bg-white w-full">
        <h2 className="text-2xl text-gray-800 mb-6">
          CREDENCIALES
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          ESTUDIANTE: Melysa Noilia Grandados Mijangos   CARNET: 201943157
        </p>
        <p className="text-lg text-gray-700 mb-6">
          ESTUDIANTE: Vivi Celeste Morales Caal   CARNET: 201546169
        </p>
        <p className="text-lg text-gray-700 mb-6">
          ESTUDIANTE: Giancarlo de León Pérez   CARNET: 201843018
        </p>
      </div>

      

    </div>
  );
}

export default HomePage;
