import { Nav, Sidenav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import BuildingIcon from '@rsuite/icons/legacy/Building';
import { useNavigate } from 'react-router-dom';

const SidenavArmazem = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
  const navigate = useNavigate();

  const perfil = 'admin';

  const handleSelect = eventKey => {
    switch (eventKey) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/empresa');
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
            <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" active icon={<BuildingIcon />}>
              Empresa
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SidenavArmazem;
