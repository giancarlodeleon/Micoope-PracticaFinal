import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { GastoProvider } from "./context/GastoContext";
import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/ProductosPage";
import ProductosFormPage from "./pages/ProductosFormPage";
import GastosPage from "./pages/GastosPage";
import GastosFormPage from "./pages/GastosFormPage";
import SimuladorPage from "./pages/SimuladorPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <ProductProvider>
      <GastoProvider>
      <BrowserRouter>
        <main className="">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductosPage />} />
            <Route path="/products/:id" element={<ProductosFormPage />}/>
            <Route path="/add-product" element={<ProductosFormPage />}/>
            <Route path="/gastos" element={<GastosPage />} />
            <Route path="/add-gasto" element={<GastosFormPage />}/>
            <Route path="/gastos/:id" element={<GastosFormPage />}/>
            <Route path="/simulador" element={<SimuladorPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      </GastoProvider>
    </ProductProvider>
  );
}

export default App;
