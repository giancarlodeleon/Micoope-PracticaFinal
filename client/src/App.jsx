import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Roles from "./pages/Roles";
import RolFormPage from "./pages/RolFormPage";
import ClientPage from "./pages/ClientPage";
import ClientFormPage from "./pages/ClientFormPage";
import Inventory from "./pages/InventoryPage";
import ProductFormPage from "./pages/ProductFormPage";
import QuitarProductForm from "./pages/QuitarProductForm";
import AgregarProductForm from "./pages/AgregarProductForm";
import Users from "./pages/Users";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import Navbar from "./components/Navbar";
import ManejoInformacionRoute from "./ProtectedRoutes/ManejoInformacionRoute";
import ClientRoute from "./ProtectedRoutes/ClientRoute";
import AddClientRoute from "./ProtectedRoutes/AddClientRoute";
import InventarioRoute from "./ProtectedRoutes/InventarioRoute";
import AddInventarioRoute from "./ProtectedRoutes/AddInventarioRoute";
import AddStockRoute from "./ProtectedRoutes/AddStockRoute";
import TakeoutStockRoute from "./ProtectedRoutes/TakeoutStockRoute";
import RequestPagePendiente from "./pages/RequestPagePendientes";
import RequestPageAprobado from "./pages/RequestPageAprobado";
import SolicitudFormPage from "./pages/SolicitudFormPage";
import HistorialPage from "./pages/HistorialPage";
import HistorialRoute from "./ProtectedRoutes/HistorialRoute";
import RequestRoute from "./ProtectedRoutes/RequestRoute";
import AddSolicitudRoute from "./ProtectedRoutes/AddSolicitudRoute";
import VerSolicitudPage from "./pages/VerSolicitudPage";
import ReportRoute from "./ProtectedRoutes/ReportRoute";
import ReportPage from "./pages/ReportPage";
import LandingPage from "./pages/LandingPage";
import EstadoCuentaPage from "./pages/EstadoCuentaPage";
import GastosPage from "./pages/GastosPage";
import GastoFormPage from "./pages/GastoFormPage";
import RegistroVentaPage from "./pages/RegistroVentaPage";
import AccountsRoute from "./ProtectedRoutes/AccountsRoute";
import PayoutsRoute from "./ProtectedRoutes/PayoutsRoute";
import RegisterSellRoute from "./ProtectedRoutes/RegisterSellRoute";
import FinancialRoute from "./ProtectedRoutes/FinancialRoute";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { RolProvider } from "./context/RolContext";
import { ClientProvider } from "./context/ClientContext";
import { HistorialProvider } from "./context/HistorialContext";
import { SolicitudProvider } from "./context/SolicitudContext";
import { PedidoProvider } from "./context/PedidoContext";
import { GastoProvider } from "./context/GastoContext";
import { VentaProvider } from "./context/VentaContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <ClientProvider>
            <HistorialProvider>
              <RolProvider>
                <SolicitudProvider>
                  <PedidoProvider>
                    <VentaProvider>
                      <GastoProvider>
                        <BrowserRouter>
                          <main className="">
                            <Navbar />
                            <Routes>
                              <Route path="/" element={<LoginPage />} />
                              <Route
                                path="/cinagro"
                                element={<LandingPage />}
                              />

                              <Route element={<ProtectedRoute />}>
                                <Route element={<ReportRoute />}>
                                  <Route
                                    path="/reporte"
                                    element={<ReportPage />}
                                  />
                                </Route>
                                <Route element={<ManejoInformacionRoute />}>
                                  <Route
                                    path="/register"
                                    element={<RegisterPage />}
                                  />
                                  <Route path="/users" element={<Users />} />
                                  <Route
                                    path="/users/:id"
                                    element={<RegisterPage />}
                                  />
                                  <Route
                                    path="/add-rol"
                                    element={<RolFormPage />}
                                  />
                                  <Route
                                    path="/rols/:id"
                                    element={<RolFormPage />}
                                  />
                                  <Route path="/roles" element={<Roles />} />
                                </Route>
                                <Route element={<ClientRoute />}>
                                  <Route
                                    path="/clientes"
                                    element={<ClientPage />}
                                  />
                                  <Route element={<AddClientRoute />}>
                                    <Route
                                      path="/add-client"
                                      element={<ClientFormPage />}
                                    />
                                  </Route>
                                  <Route
                                    path="/clients/:id"
                                    element={<ClientFormPage />}
                                  />
                                </Route>
                                <Route element={<InventarioRoute />}>
                                  <Route
                                    path="/inventario"
                                    element={<Inventory />}
                                  />
                                  <Route element={<AddInventarioRoute />}>
                                    <Route
                                      path="/add-product"
                                      element={<ProductFormPage />}
                                    />
                                  </Route>
                                  <Route
                                    path="/products/:id"
                                    element={<ProductFormPage />}
                                  />
                                  <Route element={<TakeoutStockRoute />}>
                                    <Route
                                      path="/restar-products/:id"
                                      element={<QuitarProductForm />}
                                    />
                                  </Route>
                                  <Route element={<AddStockRoute />}>
                                    <Route
                                      path="/sumar-products/:id"
                                      element={<AgregarProductForm />}
                                    />
                                  </Route>
                                </Route>
                                <Route element={<HistorialRoute />}>
                                  <Route
                                    path="/historial"
                                    element={<HistorialPage />}
                                  />
                                </Route>
                                <Route element={<RequestRoute />}>
                                  <Route
                                    path="/requests"
                                    element={<RequestPagePendiente />}
                                  />
                                  <Route
                                    path="/add-request"
                                    element={<SolicitudFormPage />}
                                  />
                                  <Route
                                    path="/requestsaprobadas"
                                    element={<RequestPageAprobado />}
                                  />
                                  <Route element={<AddSolicitudRoute />}>
                                    <Route
                                      path="/solicitudes/:id"
                                      element={<VerSolicitudPage />}
                                    />
                                  </Route>
                                  <Route element={<FinancialRoute />}>
                                    <Route element={<AccountsRoute />}>
                                      <Route
                                        path="/estado-cuenta"
                                        element={<EstadoCuentaPage />}
                                      />
                                    </Route>
                                    <Route element={<PayoutsRoute />}>
                                      <Route
                                        path="/gastos"
                                        element={<GastosPage />}
                                      />
                                      <Route
                                        path="/add-gasto"
                                        element={<GastoFormPage />}
                                      />
                                      <Route
                                        path="/gastos/:id"
                                        element={<GastoFormPage />}
                                      />
                                    </Route>
                                    <Route element={<RegisterSellRoute />}>
                                      <Route
                                        path="/registro-venta"
                                        element={<RegistroVentaPage />}
                                      />
                                    </Route>
                                  </Route>
                                </Route>
                                <Route path="/home" element={<HomePage />} />
                              </Route>
                            </Routes>
                          </main>
                        </BrowserRouter>
                      </GastoProvider>
                    </VentaProvider>
                  </PedidoProvider>
                </SolicitudProvider>
              </RolProvider>
            </HistorialProvider>
          </ClientProvider>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
