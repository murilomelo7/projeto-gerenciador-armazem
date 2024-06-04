import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/public/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/private/Dashboard/Dashboard'; // Importando Dashboard como componente

//? Telas públicas
import Login from './pages/public/Login/Login';
import Inicio from './pages/public/Inicio';

//? Telas privadas
import EmpresaList from './pages/private/Empresa/EmpresaList';
import UsuarioList from './pages/private/Usuario/UsuarioList';
import PerfilList from './pages/private/Perfil/PerfilList';
import CategoriaList from './pages/private/Categoria/CategoriaList';
import ProdutoList from './pages/private/Produto/ProdutoList';
import ControleProdutoList from './pages/private/EntradasSaidas/ControleProdutoList';
import FornecedorList from './pages/private/Fornecedor/FornecedorList';

//? auth-routes
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute acessos={['admin', 'cliente']}>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/empresa"
          element={
            <PrivateRoute acessos={['admin']}>
              <Layout>
                <EmpresaList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <PrivateRoute acessos={['admin']}>
              <Layout>
                <UsuarioList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute acessos={['admin']}>
              <Layout>
                <PerfilList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/categoria"
          element={
            <PrivateRoute acessos={['cliente']}>
              <Layout>
                <CategoriaList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/produto"
          element={
            <PrivateRoute acessos={['cliente']}>
              <Layout>
                <ProdutoList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/fornecedor"
          element={
            <PrivateRoute acessos={['cliente']}>
              <Layout>
                <FornecedorList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/controle-produto"
          element={
            <PrivateRoute acessos={['cliente']}>
              <Layout>
                <ControleProdutoList />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Rota not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
