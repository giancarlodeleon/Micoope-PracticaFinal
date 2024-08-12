import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Roles from "./pages/Roles";
import RolFormPage from "./pages/RolFormPage";
import Users from "./pages/Users";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import ManejoInformacionRoute from "./ManejoInformacionRoute";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { RolProvider } from "./context/RolContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>

          <ProductProvider>
            <RolProvider>

              <BrowserRouter>
                <main className="">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route element={<ManejoInformacionRoute />}>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<RegisterPage />} />
                        <Route path="/roles" element={<Roles />} />
                        <Route path="/add-rol" element={<RolFormPage />} />
                        <Route path="/rols/:id" element={<RolFormPage />} />
                      </Route>

                      <Route path="/home" element={<HomePage />} />               
                    </Route>
                  </Routes>
                </main>
              </BrowserRouter>
            </RolProvider>
          </ProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
