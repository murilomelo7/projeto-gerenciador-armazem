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

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioNovo />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<LoginNovo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
