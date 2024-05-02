// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import '/src/pages/public/Inicio/inicioNovo.css';
import './contatoRespStyle.css'




const ContatoResp = () => {

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
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
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
                <div className="subinner">
                  <div className="subcontainer">
                      <div className="obrigado">
                          <h3 className="title">Muito Obrigado!</h3>
                          <Link to="/">
                              <button className="btn">HOME</button>
                          </Link>
                    </div>
                  </div>
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
              <Link to="/" style={{'--i': '0.1s'}}>Home</Link>
            </li>
            <li>
              <Link to="/login" style={{'--i': '0.1s'}}>Login</Link>
            </li>
            <li>
              <a href="" style={{'--i': '0.15s'}}>Serviços</a>
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

export default ContatoResp;