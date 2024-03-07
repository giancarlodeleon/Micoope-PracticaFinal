import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import ProfilePage from "./pages/ProfilePage";
import Almacen from "./pages/Almacen";
import Agencias from "./pages/Agencias";
import Reportes from "./pages/Reportes";
import Users from "./pages/Users";
import Resumen from "./pages/Resumen";

import ProtectedRoute from "./ProtectedRoute";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <main className="">
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/resumen" element={<Resumen />} />
                <Route path="/users" element={<Users />} />
                <Route path="/almacen" element={<Almacen />} />
                <Route path="/agencias" element={<Agencias />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/add-product" element={<ProductsFormPage />} />
                <Route path="/products/:id" element={<ProductsFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
