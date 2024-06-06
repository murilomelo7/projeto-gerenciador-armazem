import React from 'react';
import { Dropdown, Nav, Navbar } from 'rsuite';
import ExitIcon from '@rsuite/icons/legacy/Exit';
import AuthController from '@/controller/AuthController';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');

    const response = await AuthController.cleanToken(token);
    if (response) {
      localStorage.setItem('authToken', '');

      navigate('/login');
    }
  };
  return (
    <Navbar appearance="inverse" style={{ height: '6vh' }}>
      <Navbar.Brand href="/dashboard">
        <label>
          <strong>NANDERELIS STOCKSYSTEM</strong>
        </label>
      </Navbar.Brand>
      <Nav pullRight>
        <Nav.Item onClick={handleLogout} icon={<ExitIcon />}></Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
