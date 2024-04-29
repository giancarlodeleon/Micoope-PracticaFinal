import { useState } from "react";
import COPE from "../assets/COPE.jpg";
import mimarket from "../assets/minimarket.jpg";
import video from "../assets/video.mp4";

function HomePage() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className=" text-white flex flex-col justify-center items-center overflow-hidden">
      {/* Video de fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          disablePictureInPicture
          className="absolute opacity-60"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Contenido */}
      <div
        className="z-10 w-3/4  font-semibold text-borde text-blue-950"
        style={{ fontFamily: "Century Gothic", fontSize: "80px" }}
      >
        <h1 className="text-3xl  mb-6 font-semibold"></h1>
        <h1
          className="text-5xl mb-6 font-semibold text-center"
          style={{ textShadow: "0 0 8px white" }}
        >
          COOPERATIVA COBAN
        </h1>
        <p className="text-lg text-left mb-6">
          ofrecemos una plataforma segura y eficiente para el seguimiento de
          activos y productos. Los usuarios deben registrarse para acceder,
          garantizando la privacidad y seguridad de los datos. Permite gestionar
          inventarios, realizar seguimiento de entradas y salidas, así como
          generar informes detallados sobre el estado de los recursos. Facilita
          la navegación y el manejo de la información, optimizando la gestión de
          inventarios y promoviendo una administración transparente y efectiva.
          Con este sistema, la cooperativa puede mantener un control preciso de
          sus recursos y mejorar su eficiencia operativa.
        </p>

        {/* Contenido */}
        <div className="z-10 w-3/4 text-center font-semibold text-borde text-blue-950">
          <h1 className="text-3xl text-center mb-6 font-semibold"></h1>
          <p className="text-lg text-center mb-6"></p>
        </div>
      </div>

      {/* Nuevo contenido sin video de fondo */}
      <div
        className="z-10 text-center mt-8 bg-white w-full"
        style={{ fontFamily: "Century Gothic", fontSize: "80px" }}
      >
        <h2 className="text-2xl text-gray-800 mb-6">
          {/* Contenido del encabezado si lo hay */}
        </h2>

        <p className="text-lg text-gray-700  mb-6">
          ¡ CAMINAMOS JUNTOS PARA MEJORAR LA CALIDAD DE VIDA DE LOS ASOCIADOS !
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Contenedor para la primera imagen */}
          <div style={{ marginRight: "80px" }}>
            <img src={COPE} alt="Visión" style={{ width: "90%" }} />
          </div>
          {/* Contenedor para la segunda imagen */}
          <div>
            <img src={mimarket} alt="Segunda imagen" style={{ width: "90%" }} />
          </div>
        </div>

        {/* Contenido */}
        <div className="z-10 w-3/4 text-center font-semibold text-borde text-blue-950">
          <h1 className="text-3xl text-center mb-6 font-semibold"></h1>
          <p className="text-lg text-center mb-6"></p>
        </div>

        {/* Nuevo apartado centrado horizontal y verticalmente */}
    
      </div>
    </div>
  );
}

export default HomePage;
