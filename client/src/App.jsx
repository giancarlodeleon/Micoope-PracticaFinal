import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/ProductosPage";
import GastosPage from "./pages/GastosPage";
import SimuladorPage from "./pages/SimuladorPage";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
              <BrowserRouter>
                <main className="">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/productos" element={<ProductosPage />} />
                    <Route path="/gastos" element={<GastosPage />} />
                    <Route path="/simulador" element={<SimuladorPage />} />




                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<RegisterPage />} />
                  </Routes>
                </main>
              </BrowserRouter>       
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
