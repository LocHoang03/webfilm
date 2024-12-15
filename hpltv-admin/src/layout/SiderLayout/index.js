import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

// render ra menu chức năng
function SiderAdmin(props) {
  const navigate = useNavigate();
  const handleChangeValue = async (selectedKey) => {
    if (selectedKey.key === 'logout') {
      await localStorage.removeItem('tokenManager');
      navigate('/login');
    } else {
      props.setSelect(selectedKey.key);
      props.handleSelect(selectedKey.key);
    }
  };

  return (
    <Sider
      className="menu-sider-web"
      collapsible
      collapsed={props.collapsed}
      onCollapse={(value) => props.setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        // defaultSelectedKeys={['series']}
        mode="inline"
        items={props.items}
        selectedKeys={props.select !== undefined && [`${props.select}`]}
        onSelect={handleChangeValue}
        className="menu-sider-web"
      />
    </Sider>
  );
}
export default SiderAdmin;
