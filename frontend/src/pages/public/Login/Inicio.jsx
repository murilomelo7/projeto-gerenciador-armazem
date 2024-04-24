import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-6 flex justify-between items-center shadow-md z-10 transition-all duration-300">
        <div className="ml-4">
          <h1 className="text-5xl font-extrabold font-serif text-gray-100 tracking-wide leading-tight shadow-md">
            Armazem
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-12 pr-4 mr-4">
            <li>
              <Link to="/login" className="hover:text-gray-300 transition-colors duration-300 hover:underline">
                <b className="text-lg">Login</b>
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:underline">
                <b className="text-lg">Contato</b>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300 hover:underline">
                <b className="text-lg">Registre-se</b>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container mx-auto p-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Gestão de Estoque</h2>
            <p className="text-lg text-gray-800 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget felis vel ante tempor fermentum. Donec auctor, nisl ut efficitur accumsan, nisi sem gravida nulla, non convallis sapien mi a lacus. Nullam in mauris id eros consectetur semper.
            </p>
          </div>
          <div>
            <img src="src\assets\5376a440-a1f5-4345-ba3e-e107116b8e22.png" alt="Imagem de estoque" className="w-full h-auto rounded-md shadow-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <img src="src\assets\5376a440-a1f5-4345-ba3e-e107116b8e22.png" alt="Imagem de estoque" className="w-full h-auto rounded-md shadow-md" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Diferenciais</h2>
            <p className="text-lg text-gray-800 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget felis vel ante tempor fermentum. Donec auctor, nisl ut efficitur accumsan, nisi sem gravida nulla, non convallis sapien mi a lacus. Nullam in mauris id eros consectetur semper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
