import React from "react";
import { Dropdown, Nav, Navbar } from "rsuite";
import ExitIcon from "@rsuite/icons/legacy/Exit";

const Header = () => {
  return (
    <Navbar appearance="inverse">
      <Navbar.Brand href="/dashboard">
        <label>
          <strong>NANDERELIS STOCKSYSTEM</strong>
        </label>
      </Navbar.Brand>
      <Nav pullRight>
        <Nav.Item icon={<ExitIcon />}></Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
