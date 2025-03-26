import React, { useState, useEffect } from "react";
import meme from "../assets/milton.jpg";
import cinagro from "../assets/cinagro.jpg";
import bioorganicos from "../assets/bioorganicos.png";
import quimia from "../assets/quimia.png";
import banner1 from "../assets/Banner1.jpg";
import banner2 from "../assets/Banner2.jpg";
import banner3 from "../assets/Banner3.jpg";
import mitzan from "../assets/mitzan.jpg";
import { motion } from "framer-motion"; // Importa Framer Motion

function LandingPage() {
  const images = [
    banner1,
    banner2,
    banner3,
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

        <motion.div
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <img src={cinagro} style={{ maxWidth: "300px" }} alt="CINAGRO" />
        </motion.div>

        <p className="text-gray-600 text-2xl">
          CINAGRO S.A es una empresa con el objetivo de ser un proveedor de
          insumos para diversidad de cultivos con calidez, calidad y precio
          competitivos a través de surtir a los diferentes agro servicios del
          país, atención directa a exportadoras y fincas, siendo el medio para
          que los productores tengan acceso a productos innovadores con
          tecnología de la más alta calidad, tanto en producción agrícola como
          en la pecuaria, siempre en búsqueda de los mejores
          resultados y rendimientos.
        </p>
      </motion.div>
      <div className="w-full my-12 relative">
  {/* Imagen con animación */}
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
  {/* Título sobre la imagen */}
  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white text-xl px-6">
      {/* Columna de Misión */}
      <div>
        <h2 className="font-bold text-3xl mb-4">Misión</h2>
        <p>
          Ser una empresa en constante crecimiento en Guatemala, ofertando
          servicios, productos agrícolas y pecuarios, de la más alta calidad,
          en búsqueda de soluciones y tecnologías innovadoras que generen los
          mejores resultados.
        </p>
      </div>

      {/* Columna de Visión */}
      <div>
        <h2 className="font-bold text-3xl mb-4">Visión</h2>
        <p>
          Empresa líder, ágil y eficiente en la importación, distribución, de
          productos agrícolas y pecuarios, con tecnología innovadora, enfocada
          en la mejora constante de los rendimientos de producción de nuestros
          clientes.
        </p>
      </div>
    </div>
  </div>
</div>

{/* Sección de Misión y Visión */}
<div className="max-w-2xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-1 gap-12 text-gray-800">
  {/* Sección de Valores con animación */}
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl font-bold text-green-700 mb-4">Nuestros Valores</h2>
    <ul className="list-disc pl-6 text-2xl leading-relaxed">
      <li>Innovación</li>
      <li>Respeto</li>
      <li>Calidad</li>
      <li>Servicio</li>
    </ul>
  </motion.div>
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
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <a href="/lista-productos-quimia">
    <motion.div whileHover={{ scale: 1.05 }}>
      <img
        src={quimia}
        alt="quimia"
        className="object-contain rounded-lg"
        style={{ width: "100%", height: "300px" }}
      />
    </motion.div>
  </a>
  <a href="/lista-productos-nitzan">
    <motion.div whileHover={{ scale: 1.05 }}>
      <img
        src={mitzan}
        alt="mitzan"
        className="object-contain rounded-lg"
        style={{ width: "100%", height: "300px" }}
      />
    </motion.div>
  </a>
  <a href="/lista-productos-bioorganicos">
    <motion.div whileHover={{ scale: 1.05 }}>
      <img
        src={bioorganicos}
        alt="bioorganicos"
        className="object-contain rounded-lg"
        style={{ width: "100%", height: "300px" }}
      />
    </motion.div>
  </a>
  <a>
  <motion.div
  whileHover={{ scale: 1.05 }}
  className="flex items-center justify-center rounded-lg"
  style={{ width: "100%", height: "300px" }}
>
  <a href="/lista-productos-globalagra" className="text-6xl font-bold text-gray-700">
    Globalagra
  </a>
</motion.div>
  </a>
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
