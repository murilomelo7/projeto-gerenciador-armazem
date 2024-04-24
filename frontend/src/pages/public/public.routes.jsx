// Router
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Inicio from "./Login/Inicio";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
