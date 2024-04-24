import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { HiMenu } from "react-icons/hi";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-gray-800 py-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-start items-center">
        <button
          className="text-white flex items-center ml-4"
          onClick={toggleSidebar}
        >
          <HiMenu className="w-6 h-6 mr-1" />
        </button>
        <h1 className="text-white text-2xl">Armazém</h1>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div
        className={`ml-64 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "transform translate-x-64" : ""
        }`}
      >
        {/* Conteúdo da página aqui */}
      </div>
    </header>
  );
}

export default Header;
