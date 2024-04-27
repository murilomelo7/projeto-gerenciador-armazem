import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <Navbar />
    </div>
  );
};

export default Layout;
