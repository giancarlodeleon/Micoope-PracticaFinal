import { BrowserRouter, Routes, Route } from "react-router-dom";



import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/ProductosPage";
import GastosPage from "./pages/GastosPage";
import SimuladorPage from "./pages/SimuladorPage";

import Navbar from "./components/Navbar";


function App() {
  return (

              <BrowserRouter>
                <main className="">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/productos" element={<ProductosPage />} />
                    <Route path="/gastos" element={<GastosPage />} />
                    <Route path="/simulador" element={<SimuladorPage />} /> 
                  </Routes>
                </main>
              </BrowserRouter>       
    
  );
}

export default App;
