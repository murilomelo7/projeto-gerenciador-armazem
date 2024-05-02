// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './inicioNovo.css';

const InicioNovo = () => {
  function desactive(){
    var mainElement = document.querySelector('.container');
  mainElement.classList.remove('active');
  }

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
        <div className="main" onClick={desactive}>
          <header>
            <div className="overlay">
              <div className="inner" >
                <h2 className="title">O Futuro está conosco!</h2>
                <p>
                  Junte-se ao maior sistema de estoque online do momento. Esta preparado?
                </p>
                <Link to="/registrar">
                   <button className="btn">Inscreva-se</button>
                </Link>
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
            <Link to="/contato" style={{'--i': '0.1s'}}>Contato</Link>
          </li>
          <li>
            <Link to="/sobre" style={{'--i': '0.1s'}}>Sobre</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InicioNovo;
