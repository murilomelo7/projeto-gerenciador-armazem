// Router
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
