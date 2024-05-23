import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Menu } from "lucide-react";
import "./Layout.css"; // Adicione estilos CSS para o Layout

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="background-layout">
      <Header>
        <button className="toggle-button" onClick={toggleSidebar}>
          <Menu />
        </button>
      </Header>
      <Sidebar isOpen={isOpen} />
      <div className={`content ${isOpen ? "sidebar-open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
