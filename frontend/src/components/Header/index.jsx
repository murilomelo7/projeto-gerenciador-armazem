import React from "react";
import "./styles.css"; // Adicione estilos CSS para o Header

const Header = ({ children }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h3 className="logo">
          NandeRellis <span>StockSolutions</span>
        </h3>
        {children}
      </div>
    </header>
  );
};

export default Header;
