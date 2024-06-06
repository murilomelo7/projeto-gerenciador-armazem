import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidenav from '../SidenavArmazem/SidenavArmazem';
import { Menu } from 'lucide-react';
import { Container } from 'rsuite';

const Layout = ({ children }) => {
  const [activeKey, setActiveKey] = React.useState('1');
  const [openKeys, setOpenKeys] = React.useState(['3', '4']);
  const [expanded, setExpand] = React.useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidenav
          activeKey={activeKey}
          openKeys={openKeys}
          onSelect={setActiveKey}
          onOpenChange={setOpenKeys}
          expanded={expanded}
          onExpand={setExpand}
        />
        <div
          style={{
            flex: 1,
            transition: 'margin-left 0.3s',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
