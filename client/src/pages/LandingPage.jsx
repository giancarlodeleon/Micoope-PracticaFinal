import React, { useState, useEffect } from "react";
import meme from "../assets/milton.jpg";

function LandingPage() {
  const images = [
    "https://mexico.infoagro.com/wp-content/uploads/2018/04/Agricultores.png",
    meme,
    "https://advancingecoag.com/wp-content/uploads/2024/02/top-Investor-Banner-1695x1010.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Temporary Banner */}
      <div className="bg-yellow-400 text-center py-3 text-black font-bold">
        ¡Oferta especial por tiempo limitado en nuestra Agroventa!
      </div>
      {/* Hero Section with Smooth Slideshow */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <button onClick={prevSlide} className="absolute left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full z-10">&#10094;</button>
        <div className="relative w-full h-full flex transition-transform ease-in-out duration-1000"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}>
            </div>
          ))}
        </div>
        <button onClick={nextSlide} className="absolute right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full z-10">&#10095;</button>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">Nuestros Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={`https://source.unsplash.com/300x200/?agriculture,product${item}`}
                alt="Producto"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-4">Producto {item}</h3>
              <p className="text-gray-600 mt-2">Descripción breve del producto.</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-4 mt-12">
        &copy; 2025 CINAGRO - Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default LandingPage;
