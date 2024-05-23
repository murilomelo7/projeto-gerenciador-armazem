import { Input } from "@/components/ui/input";
import "./EmpresaList.css";
import { Link } from "react-router-dom";

const Empresa = () => {

  const empresas = [
    { id: 1, name: "Empresa 1", description: "Descrição da Empresa 1" },
    { id: 2, name: "Empresa 2", description: "Descrição da Empresa 2" },
    { id: 3, name: "Empresa 3", description: "Descrição da Empresa 3" },
    { id: 4, name: "Empresa 4", description: "Descrição da Empresa 4" },
    { id: 5, name: "Empresa 5", description: "Descrição da Empresa 5" },
  ];

  return (
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
        <div className="search">
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
  );
};

export default Empresa;
