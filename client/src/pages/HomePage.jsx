import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
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
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center my-2">
          <p className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg ">
            Already hace an account?{" "}
            <Link to="/login" className="text-white">
              Login
            </Link>
          </p>
        </div>
        <div>
        <p className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg ">
          Don't hace an account?{" "}
          <Link to="/register" className="text-white">
            Register
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
