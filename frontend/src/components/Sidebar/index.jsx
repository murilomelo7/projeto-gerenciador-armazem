import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, Building } from "lucide-react";
import "./styles.css"; // Adicione estilos CSS para o Sidebar

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav className="sidebar-menu">
        <ul>
          <li>
            <Link to="/dashboard">
              <Home />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/usuario">
              <User />
              <span>Usuário</span>
            </Link>
          </li>
          <li>
            <Link to="/empresa">
              <Building />
              <span>Empresa</span>
            </Link>
          </li>
          {/* Adicione mais itens conforme necessário */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
