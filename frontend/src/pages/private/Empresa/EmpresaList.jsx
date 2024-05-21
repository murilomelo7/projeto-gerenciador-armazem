import Layout from "@/components/Layout";
import { Label } from "@/components/ui/label";
import React from "react";
import { Input } from "@/components/ui/input";
import "./EmpresaList.css";
import { Select } from "@/components/ui/select";
import { Link } from "react-router-dom";

const Empresa = () => {
  const empresas = [
    { id: 1, name: "Empresa 1", description: "Descrição da Empresa 1" },
    { id: 2, name: "Empresa 2", description: "Descrição da Empresa 2" },
    { id: 3, name: "Empresa 3", description: "Descrição da Empresa 3" },
  ];

  return (
    <Layout>
      <div className="container-empresa">
        <div className="panel-heading">
          <div className="title">
            <h1>Empresas</h1>
          </div>
          <div>
            <Link to="/empresa/form" className="btn-novo">
              Novo
            </Link>
          </div>
        </div>

        <div className="filters">
          <div className="">
            <label>Pesquisar</label>
            <Input type="text" placeholder="Nome da empresa"></Input>
          </div>
        </div>
        <div className="line"></div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Empresa;
