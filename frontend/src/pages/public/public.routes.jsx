// Router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import Inicio from "./Inicio/Inicio";
// import Login from "./Login/Login";
import InicioNovo from "./Inicio/inicioNovo";
import LoginNovo from "./Login/Login";
import Contato from "./Contato/contatoTela";
import Sobre from "./Sobre/SobreTela";
import ContatoResp from "./Contato/contatoResp";

const PublicRoutes = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioNovo />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<LoginNovo />} />
        <Route path="/resposta" element={<ContatoResp />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
