// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import '/src/pages/public/Inicio/inicioNovo.css';
import './contatoStyle.css'




const Contato = () => {

function desactive(){
  var mainElement = document.querySelector('.container');
mainElement.classList.remove('active');
}

useEffect(() => {
  const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

})

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
                        <h3 className="title">Está com problemas?</h3>
                        <p className="text">
                          Não oferecemos suporte! Se der bigode o problema é seu.
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
                          <h3 className="title">Digite aqui sua dúvida</h3>
                          <div className="input-container textarea">
                            <textarea name="message" className="input"></textarea>
                            <label >Dúvida</label>
                            <span>Dúvida</span>
                          </div>
                          <Link to="/resposta">
                              <button className="btn">Enviar</button>
                          </Link>
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
              <a href="" style={{'--i': '0.15s'}}>Serviços</a>
            </li>
            <li>
              <Link to="/sobre" style={{'--i': '0.1s'}}>Sobre</Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Contato;
