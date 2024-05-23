import Layout from "@/components/Layout/Layout";
import BarChart from "@/components/Chart/BarChart";
import PieChart from "@/components/Chart/PieChart";

import "./Dashboard.css";

const Dashboard = () => {
  const dataPie = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const empresas = [
    { id: 1, name: "Empresa 1", description: "Descrição da Empresa 1" },
    { id: 2, name: "Empresa 2", description: "Descrição da Empresa 2" },
    { id: 3, name: "Empresa 3", description: "Descrição da Empresa 3" },
    { id: 4, name: "Empresa 4", description: "Descrição da Empresa 4" },
    { id: 5, name: "Empresa 4", description: "Descrição da Empresa 5" },
  ];

  return (
    <div className="dashboard">
      <div className="title-dashboard">
        <h1>Dashboard</h1>
      </div>
      <div className="content">
        <div className="chart-container">
          <div className="chart">
            <h3>Clientes</h3>
            <BarChart />
          </div>
        </div>
        <div className="empresas-container">
          <div className="table-dashboard-empresa">
            <h3 className="title-ultima-empresa">Últimas empresas cadastradas</h3>
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
      </div>
    </div>
  );
};

export default Dashboard;
