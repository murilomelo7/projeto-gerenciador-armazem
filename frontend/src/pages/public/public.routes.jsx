// Router
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "./Auth/Login";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
