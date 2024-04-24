// Router
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Inicio from "./Inicio/Inicio";
import Login from "./Login/Login";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
