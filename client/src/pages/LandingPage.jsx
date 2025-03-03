import React, { useState, useEffect } from "react";
import meme from "../assets/milton.jpg";
import cinagro from "../assets/cinagro.jpg";
import bioorganicos from "../assets/bioorganicos.png";
import quimia from "../assets/quimia.png";
import mitzan from "../assets/mitzan.jpg";
import { motion } from "framer-motion"; // Importa Framer Motion

function LandingPage() {
  const images = [
    "https://mexico.infoagro.com/wp-content/uploads/2018/04/Agricultores.png",
    meme,
    "https://advancingecoag.com/wp-content/uploads/2024/02/top-Investor-Banner-1695x1010.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center">
      <div className="bg-yellow-400 text-center py-3 text-black font-bold">
        Contactanos: Whatsapp +502 5466 4857 Facebook: Cinagro Guatemala
      </div>

      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full z-10"
        >
          &#10094;
        </button>

        <motion.div
          className="relative w-full h-full flex transition-transform ease-in-out duration-1000"
          animate={{ x: `-${currentImage * 100}%` }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
          ))}
        </motion.div>

        <button
          onClick={nextSlide}
          className="absolute right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full z-10"
        >
          &#10095;
        </button>

        {/* Wavy Bottom */}
        <div className="absolute bottom-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-60"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L80,272C160,256,320,224,480,224C640,224,800,256,960,261.3C1120,267,1280,245,1360,234.7L1440,224V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Sección Conócenos con animación al hacer scroll */}
      <motion.div
        className="max-w-6xl mx-auto py-12 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-12">Conócenos</h2>

        <motion.div className="flex justify-center mb-6" whileHover={{ scale: 1.05 }}>
          <img src={cinagro} style={{ maxWidth: "300px" }} alt="CINAGRO" />
        </motion.div>

        <p className="text-gray-600 text-2xl">
        CINAGRO S.A Nace el 15 de marzo del 2023, después de varios intentos y
          experiencias vividas en la región, se hace urgente la necesidad de
          realizarla y es así como es fundada por tres socios cofundadores: Rene
          Patzán Reyes, Milton Josué Patzán León, Denis René Patzán León. Con el
          objetivo de ser proveedores de insumos a los agricultores de la región
          con productos básicos, para una diversidad de cultivos con calidez,
          calidad y precio competitivo a través de surtir los diferentes Agro
          servicios de la región Nororiental del país. Teniendo con sede el
          municipio de Salamá, del departamento de Baja Verapaz.
        </p>
      </motion.div>
      <div className="w-full my-12 relative">
      <motion.img
        src="https://cdn.pixabay.com/photo/2018/01/19/09/26/field-3092043_1280.jpg"
        alt="Banner publicitario"
        className="w-full object-cover"
        style={{ height: "600px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          Trabajando para un mejor futuro agrícola
        </h1>
      </div>
    </div>

      {/* Sección de Socios con animación al hacer scroll */}
      <motion.div
        className="max-w-6xl mx-auto py-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
          Nuestros Socios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <img
              src={quimia}
              alt="quimia"
              className="object-contain rounded-lg"
              style={{ width: "100%", height: "300px" }}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <img
              src={mitzan}
              alt="mitzan"
              className="object-contain rounded-lg"
              style={{ width: "100%", height: "300px" }}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <img
              src={bioorganicos}
              alt="bioorganicos"
              className="object-contain rounded-lg"
              style={{ width: "100%", height: "300px" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Botón "Regresar al inicio" */}
      <motion.div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#1E40AF" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Regresar al inicio
        </motion.button>
      </motion.div>

      <motion.footer
        className="bg-blue-900 text-white text-center py-4 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        &copy; 2025 CINAGRO - Todos los derechos reservados.
      </motion.footer>
    </div>
  );
}

export default LandingPage;
