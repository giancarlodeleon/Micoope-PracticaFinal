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
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import ManejoInformacionRoute from "./ManejoInformacionRoute";
import ClientRoute from "./ClientRoute";
import AddClientRoute from "./AddClientRoute";
import InventarioRoute from "./InventarioRoute";
import AddInventarioRoute from "./AddInventarioRoute";
import AddStockRoute from "./AddStockRoute";
import TakeoutStockRoute from "./TakeoutStockRoute";
import RequestPagePendiente from "./pages/RequestPagePendientes";
import RequestPageAprobado from "./pages/RequestPageAprobado";
import SolicitudFormPage from "./pages/SolicitudFormPage";
import HistorialPage from "./pages/HistorialPage";
import HistorialRoute from "./HistorialRoute";
import RequestRoute from "./RequestRoute";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { RolProvider } from "./context/RolContext";
import { ClientProvider } from "./context/ClientContext";
import { HistorialProvider } from "./context/HistorialContext";
import { SolicitudProvider } from "./context/SolicitudContext";
import { PedidoProvider} from "./context/PedidoContext";

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
                        <Route path="/add-rol" element={<RolFormPage />} />
                        <Route path="/rols/:id" element={<RolFormPage />} />
                        <Route path="/roles" element={<Roles />} />
                      </Route>
                      <Route element={<ClientRoute />}>
                      <Route path="/clientes" element={<ClientPage />} />
                      <Route element={<AddClientRoute />}>
                      <Route path="/add-client" element={<ClientFormPage />} />
                      </Route>
                      <Route path="/clients/:id" element={<ClientFormPage />} />
                      </Route>
                      <Route element={<InventarioRoute />}>
                      <Route path="/inventario" element={<Inventory />} />
                      <Route element={<AddInventarioRoute />}>
                      <Route path="/add-product" element={<ProductFormPage />} />
                      </Route>
                      <Route path="/products/:id" element={<ProductFormPage />} />
                      <Route element={<TakeoutStockRoute />}>
                      <Route path="/restar-products/:id" element={<QuitarProductForm />} />
                      </Route>
                      <Route element={<AddStockRoute />}>
                      <Route path="/sumar-products/:id" element={<AgregarProductForm />} />
                      </Route>
                      </Route>
                      <Route element={<HistorialRoute />}>
                      <Route path="/historial" element={<HistorialPage />} />
                      </Route>
                      <Route element={<RequestRoute />}>
                      <Route path="/requests" element={<RequestPagePendiente />} />
                      <Route path="/add-request" element={<SolicitudFormPage />} />
                      <Route path="/requestsaprobadas" element={<RequestPageAprobado/>} />
                      </Route>
                      <Route path="/home" element={<HomePage />} />
                    </Route>
                  </Routes>
                </main>
              </BrowserRouter>
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
