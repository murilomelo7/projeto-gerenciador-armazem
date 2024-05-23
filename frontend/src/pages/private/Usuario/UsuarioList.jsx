import Layout from "@/components/Layout/Layout";
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import './UsuarioList.css';

const Usuario = () => {
  const usuarios = [
    {
      id: 1,
      nome: "Murilo teste 1",
      cpf: "12345678910",
      usuario: "murilo.melo1",
    },
    {
      id: 2,
      nome: "Murilo teste 2",
      cpf: "12345678910",
      usuario: "murilo.melo2",
    },
    {
      id: 3,
      nome: "Murilo teste 3",
      cpf: "12345678910",
      usuario: "murilo.melo3",
    },
    {
      id: 4,
      nome: "Murilo teste 4",
      cpf: "12345678910",
      usuario: "murilo.melo4",
    },
  ];

  return (
    <div className="container-usuario">
    <div className="panel-heading">
      <div className="title">
        <h1>Usuários</h1>
      </div>
      <div>
        <Link to="/usuario/form" className="btn-novo">
          Novo
        </Link>
      </div>
    </div>

    <div className="filters">
      <div className="search">
        <label>Pesquisar</label>
        <Input type="text" placeholder="Nome do usuário"></Input>
      </div>
    </div>
    <div className="line"></div>
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.cpf}</td>
              <td>{item.usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Usuario;
