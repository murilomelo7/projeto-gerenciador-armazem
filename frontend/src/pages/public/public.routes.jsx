// Router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import Inicio from "./Inicio/Inicio";
// import Login from "./Login/Login";
import InicioNovo from "./Inicio/inicioNovo";
import LoginNovo from "./Login/LoginNovo";
import Registrar from "./Registrar/RegistrarTela";
import Sobre from "./Sobre/SobreTela";

const PublicRoutes = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioNovo />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<LoginNovo />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
