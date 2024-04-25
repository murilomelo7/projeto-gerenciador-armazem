// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './inicioNovo.css';

const InicioNovo = () => {
  useEffect(() => {
    const hamburger_menu = document.querySelector(".hamburger-menu");
    const container = document.querySelector(".container");

    const toggleMenu = () => {
      container.classList.toggle("active");
    };

    hamburger_menu.addEventListener("click", toggleMenu);

    return () => {
      hamburger_menu.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        <div className="menu">
          <h3 className="logo">NandeRellis <span>StockSolutions</span></h3>
          <div className="hamburger-menu">
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="main">
          <header>
            <div className="overlay">
              <div className="inner">
                <h2 className="title">O Futuro está conosco!</h2>
                <p>
                  Junte-se ao maior sistema de estoque online do momento. Esta preparado?
                </p>
                <button className="btn">Inscreva-se</button>
              </div>
            </div>
          </header>
        </div>

        <div className="shadow one"></div>
        <div className="shadow two"></div>
      </div>

      <div className="links">
        <ul>
          <li>
            <Link to="/login" style={{'--i': '0.1s'}}>Login</Link>
          </li>
          <li>
            <a href="servicos.html" style={{'--i': '0.15s'}}>Serviços</a>
          </li>
          <li>
            <a href="contato.html" style={{'--i': '0.2s'}}>Contato</a>
          </li>
          <li>
            <a href="sobre.html" style={{'--i': '0.25s'}}>Sobre</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InicioNovo;
