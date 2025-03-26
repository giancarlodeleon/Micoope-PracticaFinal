import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quimia from "../assets/quimia.png";
import quimia1 from "../assets/quimia1.png";
import quimia2 from "../assets/quimia2.png";
import quimia3 from "../assets/quimia3.png";
import quimia4 from "../assets/quimia4.png";
import quimia5 from "../assets/quimia5.png";

function ListaProductoQuimia() {
  const productosQuimia = [
    { nombre: "TERRAGEL", ai: "Hidrogel" },
    { nombre: "Surfacid (Surfa)", ai: "Adh, Surf, Disp, Hum, Anti Es, Pen, Reg Ph" },
    { nombre: "Agrosuelo", ai: "Mejorador de Suelo" },
    { nombre: "Hormovit Hortaliza", ai: "Activador de desarrollo Vegetativo" },
    { nombre: "Hormovit Enraizador", ai: "Activador de Sistema Radicular" },
    { nombre: "Hormovit frio", ai: "Regulador de metabolismo y activador vegetativo" },
    { nombre: "Hormovit Calor", ai: "Regulador de metabolismo y activador vegetativo" },
    { nombre: "Hormovit Semilla", ai: "Regulador de metabolismo y activador vegetativo" },
    { nombre: "Tribiosoil", ai: "Trichoderma Viride y Bacillus Subtillis" },
    { nombre: "BIOSUB", ai: "BIOLOGICO" },
    { nombre: "Agrosuelo Plus", ai: "Mejorador de Suelos+Enraizador" },
    { nombre: "Creciplant Desarrollo", ai: "Formula Nutric Crecimiento y Desarrollo" },
    { nombre: "Creciplant Llenado", ai: "Formula Nutric Fructificación y Madurez" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="m-16 p-0">
     
      <div className="mb-20">
        <img src={quimia} alt="mitzan" className="object-contain  w-full h-[300px] mt-0" />
      </div>
      <div className="mb-10">
        <Slider {...settings}>
          {[quimia1,quimia2,quimia3,quimia4,quimia5].map((image, index) => (
            <div key={index}>
              <img src={image} alt={`slide-${index}`} className="w-full h-64 object-cover " />
            </div>
          ))}
        </Slider>
      </div>
      <div className="overflow-x-auto mb-12">
        <h2 className="text-2xl font-bold text-center mb-4">LISTA DE PRODUCTOS QUIMIA</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2 text-left">PRODUCTO</th>
              <th className="border border-gray-400 px-4 py-2 text-left">INGREDIENTE ACTIVO</th>
            </tr>
          </thead>
          <tbody>
            {productosQuimia.map((producto, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{producto.ai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaProductoQuimia;
