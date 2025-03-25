import { useState } from "react";
import video from "../assets/video.mp4";
import cinagro from "../assets/cinagroPNG.png";

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
        <img
          src={cinagro}
          alt="CINAGRO"
          className="w-66 mx-auto mb-6 drop-shadow-[0_0_10px_white]"
        />
      </div>

      {/* Nuevo contenido sin video de fondo */}
      <div
        className="relative z-10 mt-8 bg-white text-center p-4"
        style={{
          fontFamily: "Century Gothic",
          width: "100vw",
          fontSize: "80px",
          overflowX: "hidden", // Oculta el desbordamiento horizontal
          margin: "0 auto", // Centra el contenido
        }}
      >
        <h2 className="text-2xl text-gray-800 mb-6">
          ¡SISTEMA DE INVENTARIO Y GESTION DE SOLICITUDES!
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
