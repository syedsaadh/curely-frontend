// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;
type Props = {
  collapsed: boolean,
  onCollapse: Function,
};
function Sidebar(props: Props) {
  const { collapsed, onCollapse } = props;
  return (
    <Sider
      style={{ minWidth: 50 }}
      className="sidebar-container"
      collapsible
      collapsed={collapsed}
      onCollapse={() => props.onCollapse()}
    >
      <div className="sidebar-top">
        <Link to="/dashboard">
          {collapsed ? (
            <span className="title title--collapsed">Cu</span>
          ) : (
            <span className="title">Curely</span>
          )}
        </Link>
      </div>
      <Menu className="sidebar-menu" theme="dark" defaultSelectedKeys={[]} mode="inline">
        <Menu.Item key="1">
          <Link to="/dashboard">
            <Icon>
              <icon className="ion-home" />
            </Icon>
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="patients">
          <Link to="/dashboard/patients">
            <Icon>
              <icon className="ion-ios-list-outline" />
            </Icon>
            <span>Patients</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dashboard/profile">
            <Icon>
              <icon className="ion-person" />
            </Icon>
            <span>My Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/dashboard/settings">
            <Icon>
              <icon className="ion-gear-b" />
            </Icon>
            <span>Settings</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default Sidebar;
