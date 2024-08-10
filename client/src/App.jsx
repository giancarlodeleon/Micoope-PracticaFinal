import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Almacen from "./pages/Almacen";
import BoletaFormPage from "./pages/BoletaFormPage";
import BoletaIngresoPage from "./pages/BoletaIngresoPage";
import BoletaEgresoPage from "./pages/BoletaEgresoPage";
import Agencias from "./pages/Agencias";
import MovimientoFormPage from "./pages/MovimientoFormPage";
import AgenciaFormPage from "./pages/AgenciaFormPage"
import AportacionesIngresadoPage from "./pages/AportacionesIngresadoPage";
import AportacionesEntregadoPage from "./pages/AportacionesEntregadoPage";
import AhorroDisponibleIngresado from "./pages/AhorroIngresadoPage";
import AhorroDisponibleEntregado from "./pages/AhorroEntregadoPage";
import InfantoJuvenilIngresado from "./pages/InfantoIngresadoPage";
import InfantoJuvenilEntregado from "./pages/InfantoEntregadoPage";
import MiPlazoIngresado from "./pages/PlazoIngresadoPage";
import MiPlazoEntregado from "./pages/PlazoEntregadoPage";
import ProgramadoIngresado from "./pages/ProgramadoIngresadoPage";
import ProgramadoEntregado from "./pages/ProgramadoEntregadoPage";
import BoletasTRXIngresado from "./pages/BoletasTRXIngresadoPage";
import BoletasTRXEntregado from "./pages/BoletasTRXEntregadoPage";
import ValesIngresado from "./pages/ValesIngresadoPage";
import ValesEntregado from "./pages/ValesEntregadoPage";
import Roles from "./pages/Roles";
import RolFormPage from "./pages/RolFormPage";
import Users from "./pages/Users";
import Resumen from "./pages/Resumen";
import ProtectedRoute from "./ProtectedRoute";
import ManejoInformacionRoute from "./ManejoInformacionRoute";
import ResumenRoute from "./ResumenRoute";
import AlmacenRoute from "./AlmacenRoute";
import AgenciaRoute from "./AgenciaRoute";
import Navbar from "./components/Navbar";
import EntregadoFormPage from "./pages/EntregadoFormPage";
import SalidaFormPage from "./pages/SalidaFormPage";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { AgenciaProvider } from "./context/AgenciaContext";
import { RolProvider } from "./context/RolContext";
import { BoletaProvider } from "./context/BoletaContext";
import { MovimientoProvider} from "./context/MovimientoContext"
import { SalidaProvider } from "./context/SalidaContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AgenciaProvider>
          <ProductProvider>
            <RolProvider>
            <BoletaProvider>
              <MovimientoProvider>
              <SalidaProvider>
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
                      </Route>
                      <Route element={<AlmacenRoute />}>
                      <Route path="/inventario" element={<Almacen />} />
                      <Route path="/inventario/:id" element={<BoletaFormPage />} />
                      <Route path="/inventario/ingreso/:id" element={<BoletaIngresoPage />} />
                      <Route path="/inventario/egreso/:id" element={<BoletaEgresoPage />} />
                      <Route path="/add-inventario" element={<BoletaFormPage />} />
                      </Route>
                      <Route element={<ResumenRoute />}>
                      <Route path="/resumen" element={<Resumen />} />
                      </Route>
                      <Route element={<AgenciaRoute />}>
                      <Route path="/entregar/:id" element={<EntregadoFormPage />} />
                      <Route path="/salida/:id" element={<SalidaFormPage />} />
                      <Route path="/movimientos/:id" element={<MovimientoFormPage />} />
                      <Route path="/aportacionesIngresado" element={<AportacionesIngresadoPage />} />
                      <Route path="/aportacionesEntregado" element={<AportacionesEntregadoPage />} />
                      <Route path="/ahorro-ingresado" element={<AhorroDisponibleIngresado />} />
                      <Route path="/ahorro-entregado" element={<AhorroDisponibleEntregado />} />
                      <Route path="/infanto-ingresado" element={<InfantoJuvenilIngresado />} />
                      <Route path="/infanto-entregado" element={<InfantoJuvenilEntregado />} />
                      <Route path="/plazo-ingresado" element={<MiPlazoIngresado />} />
                      <Route path="/plazo-entregado" element={<MiPlazoEntregado />} />
                      <Route path="/programado-ingresado" element={<ProgramadoIngresado />} />
                      <Route path="/programado-entregado" element={<ProgramadoEntregado />} />
                      <Route path="/TRX-ingresado" element={<BoletasTRXIngresado />} />
                      <Route path="/TRX-entregado" element={<BoletasTRXEntregado />} />
                      <Route path="/vales-ingresado" element={<ValesIngresado />} />
                      <Route path="/vales-entregado" element={<ValesEntregado />} />
                      </Route>
                      <Route path="/home" element={<HomePage />} />               
                    </Route>
                  </Routes>
                </main>
              </BrowserRouter>
              </SalidaProvider>
              </MovimientoProvider>
              </BoletaProvider>
            </RolProvider>
          </ProductProvider>
        </AgenciaProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
