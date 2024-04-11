import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";

import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/ProductosPage";
import ProductosFormPage from "./pages/ProductosFormPage";
import GastosPage from "./pages/GastosPage";
import SimuladorPage from "./pages/SimuladorPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <main className="">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductosPage />} />
            <Route path="/products/:id" element={<ProductosFormPage />}/>
            <Route path="/add-product" element={<ProductosFormPage />}/>
            <Route path="/gastos" element={<GastosPage />} />
            <Route path="/simulador" element={<SimuladorPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
