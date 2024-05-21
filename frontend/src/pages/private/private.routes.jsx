// Router
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import UsuarioList from "./Usuario/UsuarioList";
import EmpresaList from "./Empresa/EmpresaList";
import EmpresaForm from "./Empresa/EmpresaForm";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empresa" element={<EmpresaList />} />
        <Route path="/empresa/form" element={<EmpresaForm />} />
        <Route path="/usuario" element={<UsuarioList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
