import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import Almacen from "./pages/Almacen";
import Agencias from "./pages/Agencias";
import Agencia from "./pages/Agencia";
import AgenciaFormPage from "./pages/AgenciaFormPage";
import Roles from "./pages/Roles";
import RolFormPage from "./pages/RolFormPage";
import Users from "./pages/Users";
import Resumen from "./pages/Resumen";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import CoordRoute from "./CoordRoute";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { AgenciaProvider } from "./context/AgenciaContext";
import { RolProvider } from "./context/RolContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AgenciaProvider>
          <ProductProvider>
            <RolProvider>
              <BrowserRouter>
                <main className="">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      



                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<RegisterPage />} />
                        <Route path="/agencias" element={<Agencias />} />
                        <Route
                          path="/add-agencia"
                          element={<AgenciaFormPage />}
                        />
                        <Route
                          path="/agencias/:id"
                          element={<AgenciaFormPage />}
                        />
                        <Route path="/roles" element={<Roles />} />
                        <Route path="/add-rol" element={<RolFormPage />} />
                        <Route path="/rols/:id" element={<RolFormPage />} />
                      





                      
                        <Route path="/almacen" element={<Almacen />} />
                      




                      <Route path="/home" element={<HomePage />} />
                      <Route path="/resumen" element={<Resumen />} />
                      <Route path="/agencia" element={<Agencia />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route
                        path="/add-product"
                        element={<ProductsFormPage />}
                      />
                      <Route
                        path="/products/:id"
                        element={<ProductsFormPage />}
                      />
                    </Route>
                  </Routes>
                </main>
              </BrowserRouter>
            </RolProvider>
          </ProductProvider>
        </AgenciaProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
