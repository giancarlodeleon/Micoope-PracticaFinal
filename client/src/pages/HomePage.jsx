import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (

      <div className=" bg-white rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-3xl text-center text-gray-800 mb-6">
          Bienvenido a nuestra cooperativa
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Somos una cooperativa comprometida con el bienestar de nuestros
          miembros y la comunidad. Trabajamos juntos para alcanzar objetivos
          comunes y promover el desarrollo sostenible.
        </p>
        <div className="mb-6">
          <img
            src={logo1}
            alt="Imagen Cooperativa"
            className="rounded-lg "
          />
        </div>
        <div className="flex justify-center my-2">
         
        </div>

   
    </div>
  );
}

export default HomePage;
