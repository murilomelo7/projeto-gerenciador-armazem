// Router
import { BrowserRouter, Routes, Route, RouterProvider, Navigate } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import Dashboard from './Dashboard/Dashboard';
import UsuarioList from './Usuario/UsuarioList';
import EmpresaList from './Empresa/EmpresaList';
import CategoriaList from './Categoria/CategoriaList';
import ProdutoList from './Produto/ProdutoList';
import PerfilList from './Perfil/PerfilList';

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
          path="/usuario"
          element={
            <Layout>
              <UsuarioList />
            </Layout>
          }
        />
        <Route
          path="/perfil"
          element={
            <Layout>
              <PerfilList />
            </Layout>
          }
        />
        <Route
          path="/categoria"
          element={
            <Layout>
              <CategoriaList />
            </Layout>
          }
        />
        <Route
          path="/produto"
          element={
            <Layout>
              <ProdutoList />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
