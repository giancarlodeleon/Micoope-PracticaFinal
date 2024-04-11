import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

import HomePage from "./pages/HomePage";

import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { AgenciaProvider } from "./context/AgenciaContext";
import { RolProvider } from "./context/RolContext";
import { BoletaProvider } from "./context/BoletaContext";
import { MovimientoProvider} from "./context/MovimientoContext"

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AgenciaProvider>

            <RolProvider>
            <BoletaProvider>
              <MovimientoProvider>
              <BrowserRouter>
                <main className="">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<RegisterPage />} />
                  </Routes>
                </main>
              </BrowserRouter>
              </MovimientoProvider>
              </BoletaProvider>
            </RolProvider>

        </AgenciaProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
