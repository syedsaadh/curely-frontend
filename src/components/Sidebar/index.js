// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { toggleAll, toggleCollapsed } from '../../redux/App/actions';
import Logo from '../Logo';

const { Sider } = Layout;
const { SubMenu } = Menu;
type Props = {
  collapsed: boolean,
  onCollapse: Function,
};
class Sidebar extends React.Component {
  state = {};
  render() {
    const { collapsed } = this.props.app;
    return (
      <Sider
        collapsedWidth={60}
        className="sidebar-container"
        collapsed={collapsed}
        collapsible
        onCollapse={() => this.props.toggleCollapsed()}
      >
        <div className="sidebar-top">
          <a href="/dashboard">
            {collapsed ? <Logo height="36px" text={false} /> : <Logo height="36px" type="light" />}
          </a>
        </div>
        <Menu className="sidebar-menu" theme="dark" defaultSelectedKeys={[]} mode="inline">
          <Menu.Item key="dashboard.home">
            <a href="/dashboard">
              <Icon>
                <icon className="ion-home" />
              </Icon>
              <span>Home</span>
            </a>
          </Menu.Item>
          <Menu.Item key="dashboard.patients">
            <a href="/dashboard/patients">
              <Icon>
                <icon className="ion-ios-list-outline" />
              </Icon>
              <span>Patients</span>
            </a>
          </Menu.Item>
          <Menu.Item key="dashboard.inventory">
            <a href="/dashboard/inventory">
              <Icon>
                <icon className="ion-clipboard" />
              </Icon>
              <span>Inventory</span>
            </a>
          </Menu.Item>
          <Menu.Item key="dashboard.ipdmanage">
            <a href="/dashboard/ipd">
              <Icon>
                <icon className="ion-clipboard" />
              </Icon>
              <span>IPD Manage</span>
            </a>
          </Menu.Item>
          <Menu.Item key="dashboard.profile">
            <a href="/dashboard/profile">
              <Icon>
                <icon className="ion-person" />
              </Icon>
              <span>My Profile</span>
            </a>
          </Menu.Item>
          <Menu.Item key="dashboard.settings">
            <a href="/dashboard/settings">
              <Icon>
                <icon className="ion-gear-b" />
              </Icon>
              <span>Settings</span>
            </a>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
const mapStateToProps = (state) => {
  const { App } = state;
  return {
    app: App,
  };
};
const mapDispatchToProps = dispatch => ({
  toggleCollapsed: () => dispatch(toggleCollapsed()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
