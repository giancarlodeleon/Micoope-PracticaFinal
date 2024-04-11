import logo1 from "../assets/Usac_logo.png";


function HomePage() {
  return (
    <div className="bg-cover bg-center   ">
      
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-start w-1/2">
            <h1 className="text-3xl text-center text-gray-800 mb-6 font-semibold" style={{ marginLeft: '150px', marginTop:'150px' }} >
              Bienvenido a nuestro Simulador
            </h1>
            <p className="text-lg text-gray-700 mb-6"style={{ marginLeft: '80px', marginTop:'20px' }}>
              Simula
            </p>
          </div>
          <div className="mb-6 ml-6 w-1/2">
            <img
              src={logo1}
              alt="Imagen Cooperativa"
              className="rounded-lg py-4"
              style={{ width: "500px", height: "auto" }}
            />
          </div>
        </div>
        
        {/* Nuevo apartado centrado horizontal y verticalmente */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl text-center text-gray-800 mb-6">
            Sobre mí
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Aquí puedes agregar información sobre ti, tus roles en la cooperativa,
            tu experiencia, tus objetivos, etc.
          </p>
        </div>
      
    </div>
  );
}

export default HomePage;
