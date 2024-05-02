// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import '/src/pages/public/Inicio/inicioNovo.css';
import './loginNovo.css';

const LoginNovo = () => {

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

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    // const dados = { usuario, senha };
    // const request = await api.post("/login", dados);
    // let token = null;
    // if (request.statusCode === "200") {
    //   token = request.token;
    // }
    // console.log(token);
  };

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
              <div className="inner">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input type="text" placeholder="Insira seu usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                                <i className='bx bxs-user'></i>
                            </div>

                            <div className="input-box">
                                <input type="password" placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                <i className='bx bxs-lock-alt' ></i>
                            </div>

                            <button type="submit" className="btn">Login</button>
                        </div>
                    </form>
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

export default LoginNovo;
