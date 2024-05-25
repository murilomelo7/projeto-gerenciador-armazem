import { Nav, Sidenav } from 'rsuite';
import BuildingIcon from '@rsuite/icons/legacy/Building';
import { Package, Building2, SquareUser, Grid2X2 } from 'lucide-react';

import { Dashboard, Plus, ArrowRight } from '@rsuite/icons';
import { useNavigate } from 'react-router-dom';

const SidenavArmazem = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
  const navigate = useNavigate();

  const perfil = 'admin';

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
            {/* {perfil === 'admin' && (
      
            )} */}
            <Nav.Item eventKey="dashboard" active icon={<Dashboard />}>
              Dashboard
            </Nav.Item>

            <Nav.Menu eventKey="cadastro" active title="Cadastros" icon={<Plus />}>
              <Nav.Item eventKey="cadastro-empresa" active>
                <Building2 size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                Empresa
              </Nav.Item>
              <Nav.Item eventKey="cadastro-perfil" active>
                <SquareUser size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                Perfil
              </Nav.Item>
              <Nav.Item eventKey="cadastro-categoria" active>
                <Grid2X2 size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                Categoria
              </Nav.Item>
              <Nav.Item eventKey="cadastro-produto" active>
                <Package size={'18'} style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'middle' }} />
                Produto
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="controle" active title="Controle"></Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SidenavArmazem;
