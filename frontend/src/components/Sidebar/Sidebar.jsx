import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`bg-gray-800 h-full w-64 fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="py-4">
        <ul>
          <li>
            <a
              href="/categorias"
              className="text-white block px-4 py-2 hover:bg-gray-700"
            >
              
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-white block px-4 py-2 hover:bg-gray-700"
            >
              Item 2
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-white block px-4 py-2 hover:bg-gray-700"
            >
              Item 3
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
