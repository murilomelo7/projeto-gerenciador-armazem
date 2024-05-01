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

const PublicRoutes = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioNovo />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<LoginNovo />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
