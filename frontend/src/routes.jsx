import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/public/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/private/Dashboard/Dashboard'; // Importando Dashboard como componente

//? Telas públicas
import Login from './pages/public/Login';
import Inicio from './pages/public/Inicio';

//? Telas privadas
import EmpresaList from './pages/private/Empresa/EmpresaList';
import UsuarioList from './pages/private/Usuario/UsuarioList';
import PerfilList from './pages/private/Perfil/PerfilList';
import CategoriaList from './pages/private/Categoria/CategoriaList';
import ProdutoList from './pages/private/Produto/ProdutoList';

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

        {/* Rota not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
