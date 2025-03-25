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
import RegistroVentaFormPage from "./pages/RegistroVentaFormPage";
import AccountsRoute from "./ProtectedRoutes/AccountsRoute";
import PayoutsRoute from "./ProtectedRoutes/PayoutsRoute";
import RegisterSellRoute from "./ProtectedRoutes/RegisterSellRoute";
import FinancialRoute from "./ProtectedRoutes/FinancialRoute";
import EstadoHistorialPage from "./pages/EstadoHistorialPage";
import EstadoFacturaPage from "./pages/EstadoFacturaPage";
import AbonoFormPage from "./pages/AbonoFormPage";
import RegistroVentaPagadaPage from "./pages/RegistroVentaPagadaPage";
import ProveedorPage from "./pages/ProveedorPage";
import ProveedorFormPage from "./pages/ProveedorFormPage";
import ProveedorRoute from "./ProtectedRoutes/ProveedorRoute";
import SolicitudCompraPage from "./pages/SolicitudCompraPage";
import SolicitudCompraFormPage from "./pages/SolicitudCompraFormPage";
import VerSolicitudCompraPage from "./pages/VerSolicitudCompraPage";
import ListaProductoGlocalAgra from "./pages/ListaProductoGlobalAgra";
import ListaProductoNitzan from "./pages/ListaProductoNitzan";
import ListaProductoQuimia from "./pages/ListaProductoQuimia";
import ListaProductoBioorganico from "./pages/ListaProductoBioorganico";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { RolProvider } from "./context/RolContext";
import { ClientProvider } from "./context/ClientContext";
import { HistorialProvider } from "./context/HistorialContext";
import { SolicitudProvider } from "./context/SolicitudContext";
import { PedidoProvider } from "./context/PedidoContext";
import { GastoProvider } from "./context/GastoContext";
import { VentaProvider } from "./context/VentaContext";
import { ProveedorProvider } from "./context/ProveedorContext";
import { SolicitudCompraProvider } from "./context/SolicitudCompraContext";
import { PedidoCompraProvider } from "./context/PedidoCompraContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <ClientProvider>
            <ProveedorProvider>
              <HistorialProvider>
                <RolProvider>
                  <SolicitudProvider>
                    <SolicitudCompraProvider>
                      <PedidoProvider>
                        <PedidoCompraProvider>
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
                                    <Route
                                      path="/lista-productos-globalagra"
                                      element={<ListaProductoGlocalAgra />}
                                    />
                                    <Route
                                      path="/lista-productos-nitzan"
                                      element={<ListaProductoNitzan />}
                                    />
                                    <Route
                                      path="/lista-productos-quimia"
                                      element={<ListaProductoQuimia />}
                                    />
                                     <Route
                                      path="/lista-productos-bioorganicos"
                                      element={<ListaProductoBioorganico />}
                                    />

                                    <Route element={<ProtectedRoute />}>
                                      <Route element={<ReportRoute />}>
                                        <Route
                                          path="/reporte"
                                          element={<ReportPage />}
                                        />
                                      </Route>
                                      <Route
                                        element={<ManejoInformacionRoute />}
                                      >
                                        <Route
                                          path="/register"
                                          element={<RegisterPage />}
                                        />
                                        <Route
                                          path="/users"
                                          element={<Users />}
                                        />
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
                                        <Route
                                          path="/roles"
                                          element={<Roles />}
                                        />
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
                                      <Route element={<ProveedorRoute />}>
                                        <Route
                                          path="/proveedors"
                                          element={<ProveedorPage />}
                                        />
                                        <Route
                                          path="/add-proveedor"
                                          element={<ProveedorFormPage />}
                                        />
                                        <Route
                                          path="/proveedors/:id"
                                          element={<ProveedorFormPage />}
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
                                          path="/solicitud-compra"
                                          element={<SolicitudCompraPage />}
                                        />
                                        <Route
                                          path="/add-request"
                                          element={<SolicitudFormPage />}
                                        />
                                        <Route
                                          path="/add-solicitud-compra"
                                          element={<SolicitudCompraFormPage />}
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
                                          <Route
                                            path="/solicitudes_compra/:id"
                                            element={<VerSolicitudCompraPage />}
                                          />
                                        </Route>
                                        <Route element={<FinancialRoute />}>
                                          <Route element={<AccountsRoute />}>
                                            <Route
                                              path="/estado-cuenta"
                                              element={<EstadoCuentaPage />}
                                            />
                                            <Route
                                              path="/estado-cuenta/:id"
                                              element={<EstadoFacturaPage />}
                                            />
                                            <Route
                                              path="/estado-cuenta/historial/:id"
                                              element={<EstadoHistorialPage />}
                                            />
                                            <Route
                                              path="/estado-cuenta/historial/:userid/:id"
                                              element={<AbonoFormPage />}
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
                                          <Route
                                            element={<RegisterSellRoute />}
                                          >
                                            <Route
                                              path="/registro-venta"
                                              element={<RegistroVentaPage />}
                                            />
                                            <Route
                                              path="/registro-venta-pagada"
                                              element={
                                                <RegistroVentaPagadaPage />
                                              }
                                            />
                                            <Route
                                              path="/add-venta"
                                              element={
                                                <RegistroVentaFormPage />
                                              }
                                            />
                                            <Route
                                              path="/ventas/:id"
                                              element={
                                                <RegistroVentaFormPage />
                                              }
                                            />
                                          </Route>
                                        </Route>
                                      </Route>
                                      <Route
                                        path="/home"
                                        element={<HomePage />}
                                      />
                                    </Route>
                                  </Routes>
                                </main>
                              </BrowserRouter>
                            </GastoProvider>
                          </VentaProvider>
                        </PedidoCompraProvider>
                      </PedidoProvider>
                    </SolicitudCompraProvider>
                  </SolicitudProvider>
                </RolProvider>
              </HistorialProvider>
            </ProveedorProvider>
          </ClientProvider>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
