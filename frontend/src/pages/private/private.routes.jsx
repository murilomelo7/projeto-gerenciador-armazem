// Router
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "@/components/Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import UsuarioList from "./Usuario/UsuarioList";
import EmpresaList from "./Empresa/EmpresaList";
import EmpresaForm from "./Empresa/EmpresaForm";
import UsuarioForm from "./Usuario/UsuarioForm";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/empresa"
          element={
            <Layout>
              <EmpresaList />
            </Layout>
          }
        />
        <Route
          path="/empresa/form"
          element={
            <Layout>
              <EmpresaForm />
            </Layout>
          }
        />
        <Route
          path="/usuario"
          element={
            <Layout>
              <UsuarioList />
            </Layout>
          }
        />
        <Route
          path="/usuario/form"
          element={
            <Layout>
              <UsuarioForm />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
