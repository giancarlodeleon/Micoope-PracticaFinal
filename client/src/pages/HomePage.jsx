import { useState } from "react";
import video from "../assets/video.mp4";

function HomePage() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="text-white flex flex-col justify-center items-center overflow-hidden w-screen h-screen relative">
      {/* Video de fondo */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          disablePictureInPicture
          className="w-full h-full object-cover opacity-60"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Contenido principal */}
      <div
        className="relative z-10 max-w-4xl mx-auto font-semibold text-borde text-blue-950 text-center px-4"
        style={{ fontFamily: "Century Gothic", fontSize: "80px" }}
      >
        <h1
          className="text-5xl mb-6 font-semibold text-center"
          style={{ textShadow: "0 0 8px white" }}
        >
          CINAGRO
        </h1>
        <p className="text-lg text-left mb-6">
          CINAGRO S.A Nace el 15 de marzo del 2023, después de varios intentos y experiencias vividas en la región, se hace urgente la necesidad de realizarla y es así como es fundada por tres socios cofundadores: Rene Patzán Reyes, Milton Josué Patzán León, Denis René Patzán León. Con el objetivo de ser proveedores de insumos a los agricultores de la región con productos básicos, para una diversidad de cultivos con calidez, calidad y precio competitivo a través de surtir los diferentes Agro servicios de la región Nororiental del país. Teniendo con sede el municipio de Salamá, del departamento de Baja Verapaz.
          <br /><br />
          El objetivo principal de la sociedad lo constituye compra venta, almacenamiento, importación, exportación fabricación, transporte y comercialización de productos agroquímicos agropecuarios y veterinarios. Gestionar y llevar acabo cualquier tipo de negocio comercial industrial, agropecuario tales como: agricultura, avícola, pecuaria apicultura, porcinocultura, veterinarios. Así como Promover o realizar cualquier actividad agrícola, ganadera, industrial, agrícola, comercial y sus derivados. Así también importación de toda clase de vehículos maquinaria para uso agrícola, avícola e industrial y propiedad intelectual. Con mucha claridad en convertirse en ser unos de los mejores servicios a los agricultores de la región nor-oriental.
        </p>
      </div>

      {/* Nuevo contenido sin video de fondo */}
      <div
        className="relative z-10 mt-8 bg-white text-center p-4"
        style={{
          fontFamily: "Century Gothic",
          width: "100vw",
          fontSize: "80px",
          overflowX: "hidden",  // Oculta el desbordamiento horizontal
          margin: "0 auto",     // Centra el contenido
        }}
      >
     
        
        <h2 className="text-2xl text-gray-800 mb-6">
          ¡TRABAJANDO POR UN MEJOR FUTURO AGRÍCOLA!
        </h2>
      </div>
    </div>
  );
}

export default HomePage;

