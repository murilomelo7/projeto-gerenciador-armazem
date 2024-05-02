// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import '/src/pages/public/Inicio/inicioNovo.css';
import './registrarStyle.css'
import './registrarApp'


const Registrar = () => {

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
                    {/* <span className="big-circle"></span>
                    <img src="/src/assets/extra.png" className="square" alt="" /> */}
                    <div className="form">
                      <div className="contact-info">
                        <h3 className="title">Como nos encontrar?</h3>
                        <p className="text">
                          Não perca tempo, junte-se a nós e ganhe mais tempo e rendimento!
                        </p>

                        <div className="info">
                          <div className="information">
                            <img src="/src/assets/localizacao.png" className="icon" alt="" />
                            <p>Av. Tito Muffato, 2021</p>
                          </div>
                          <div className="information">
                            <img src="/src/assets/email.png" className="icon" alt="" />
                            <p>nandesrelli@comercial.com</p>
                          </div>
                          <div className="information">
                            <img src="/src/assets/telefone.png" className="icon" alt="" />
                            <p>+55 (45) 99938-0200</p>
                          </div>
                        </div>

                        <div className="social-media">
                          <p>Meios de contato :</p>
                          <div className="social-icons">
                            <a href="#">
                              <i className='bx bxl-facebook-circle'></i>
                            </a>
                            <a href="#">
                              <i className='bx bxl-twitter' ></i>
                            </a>
                            <a href="#">
                              <i className='bx bxl-instagram-alt' ></i>
                            </a>
                            <a href="#">
                              <i className='bx bxl-linkedin-square' ></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>

                        <form action="index.html" autoComplete="off">
                          <h3 className="title">Registre-se</h3>
                          <div className="input-container">
                            <input type="text" name="name" className="input" />
                            <label >Nome</label>
                            <span>Nome</span>
                          </div>
                          <div className="input-container">
                            <input type="email" name="email" className="input" />
                            <label >Email</label>
                            <span>Email</span>
                          </div>
                          <div className="input-container">
                            <input type="tel" name="phone" className="input" />
                            <label >Telefone</label>
                            <span>Telefone</span>
                          </div>
                          <div className="input-container textarea">
                            <textarea name="message" className="input"></textarea>
                            <label >Empresa</label>
                            <span>Empresa</span>
                          </div>
                          <input type="submit" value="Enviar" className="btn" />
                        </form>
                      </div>
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
              <a href="servicos.html" style={{'--i': '0.15s'}}>Serviços</a>
            </li>
            <li>
              <a href="contato.html" style={{'--i': '0.2s'}}>Contato</a>
            </li>
            <li>
              <Link to="/sobre" style={{'--i': '0.1s'}}>Sobre</Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Registrar;
