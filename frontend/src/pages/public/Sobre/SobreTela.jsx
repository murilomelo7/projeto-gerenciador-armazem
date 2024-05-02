// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sobreTelaStyle.css';
import '/src/pages/public/Inicio/inicioNovo.css';


const Sobre = () => {

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
        <div className="containersobre">
            {/* <div className="header">
                <h1>Nosso time</h1>
            </div> */}
            <div className="subcontaineir">
                <div className="time">
                    <img src="/src/assets/fernando.jpeg" />
                    <div className="nome">Fernando</div>
                    <div className="area">Developer</div>
                    <div className="infosobre">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur soluta corporis aliquid in obcaecati sunt ratione, quia doloremque ullam! Mollitia voluptatum, recusandae ipsam quisquam autem consequatur atque consequuntur quo odio.</div>
                    <div className="redessociais">
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                        <a href="#"><i className='bx bxl-instagram'></i></a>
                        <a href="#"><i className='bx bxl-github'></i></a>
                    </div>
                </div>
                <div className="time">
                    <img src="/src/assets/murilo.jpg" />
                    <div className="nome">Murilo</div>
                    <div className="area">Developer</div>
                    <div className="infosobre">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur soluta corporis aliquid in obcaecati sunt ratione, quia doloremque ullam! Mollitia voluptatum, recusandae ipsam quisquam autem consequatur atque consequuntur quo odio.</div>
                    <div className="redessociais">
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                        <a href="#"><i className='bx bxl-instagram'></i></a>
                        <a href="#"><i className='bx bxl-github'></i></a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </header>
        </div>
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
              <a href="servicos.html" style={{'--i': '0.15s'}}>Serviços</a>
            </li>
            <li>
            <Link to="/contato" style={{'--i': '0.1s'}}>Contato</Link>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default Sobre;
