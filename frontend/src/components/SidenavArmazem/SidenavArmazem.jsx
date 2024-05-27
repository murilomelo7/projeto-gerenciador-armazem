import { Nav, Sidenav } from 'rsuite';
import BuildingIcon from '@rsuite/icons/legacy/Building';
import { Package, Building2, SquareUser, Grid2X2, User } from 'lucide-react';

import { Dashboard, Plus, Gear } from '@rsuite/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthController from '@/controller/AuthController';

const SidenavArmazem = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
  const navigate = useNavigate();
  const [acessos, setAcessos] = useState('');

  useEffect(() => {
    const testPerfil = async () => {
      const token = localStorage.getItem('authToken');
      const isValidToken = await AuthController.testToken(token);

      if (isValidToken) {
        console.log('isValidToken', isValidToken);

        setAcessos(isValidToken.acessos);
      }
    };

    testPerfil();
  }, []);
  const handleSelect = eventKey => {
    switch (eventKey) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'cadastro-empresa':
        navigate('/empresa');
        break;
      case 'cadastro-categoria':
        navigate('/categoria');
        break;
      case 'cadastro-produto':
        navigate('/produto');
        break;
      case 'cadastro-perfil':
        navigate('/perfil');
        break;
      case 'cadastro-usuario':
        navigate('/usuario');
        break;
      case 'controle-entradas-saidas':
        navigate('/entradas-saidas');
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ width: expanded ? 260 : 0, display: 'inline-table' }}>
      <Sidenav appearance={appearance} expanded={expanded} openKeys={openKeys} onOpenChange={onOpenChange}>
        <Sidenav.Toggle onToggle={onExpand} />
        <Sidenav.Body style={{ height: '90vh' }}>
          <Nav {...navProps} onSelect={handleSelect}>
            <Nav.Item eventKey="dashboard" active icon={<Dashboard />}>
              Dashboard
            </Nav.Item>
            <Nav.Menu eventKey="cadastro" active title="Cadastros" icon={<Plus />}>
              {acessos === 'admin' && (
                <>
                  <Nav.Item eventKey="cadastro-empresa" active>
                    <Building2 size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                    Empresa
                  </Nav.Item>
                  <Nav.Item eventKey="cadastro-usuario" active>
                    <User size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                    Usuário
                  </Nav.Item>
                  <Nav.Item eventKey="cadastro-perfil" active>
                    <SquareUser size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                    Perfil
                  </Nav.Item>
                </>
              )}

              {acessos === 'cliente' && (
                <>
                  <Nav.Item eventKey="cadastro-categoria" active>
                    <Grid2X2 size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                    Categoria
                  </Nav.Item>
                  <Nav.Item eventKey="cadastro-produto" active>
                    <Package size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                    Produto
                  </Nav.Item>
                </>
              )}
            </Nav.Menu>
            {acessos === 'cliente' && (
              <Nav.Menu eventKey="controle" active title="Controle" icon={<Gear />}>
                <Nav.Item eventKey="controle-entradas-saidas" active>
                  <Package size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                  Entradas e saídas
                </Nav.Item>
              </Nav.Menu>
            )}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SidenavArmazem;
