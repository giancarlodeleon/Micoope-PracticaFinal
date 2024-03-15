import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import Almacen from "./pages/Almacen";
import Agencias from "./pages/Agencias";
import Users from "./pages/Users";
import Resumen from "./pages/Resumen";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import CoordRoute from "./CoordRoute";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <BrowserRouter>
            <main className="">
              <Navbar />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminRoute />}>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<RegisterPage />} />
                  </Route>
                  <Route element={<CoordRoute />}>
                    <Route path="/almacen" element={<Almacen />} />
                  </Route>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/resumen" element={<Resumen />} />
                  <Route path="/agencias" element={<Agencias />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/add-product" element={<ProductsFormPage />} />
                  <Route path="/products/:id" element={<ProductsFormPage />} />
                  
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
