// Router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
// import Teste from "./SideBar/SideBar";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/berimbola" element={<Teste/>}/> */}
        </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
