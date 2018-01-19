// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { toggleAll, toggleCollapsed } from '../../redux/App/actions';

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
        className="sidebar-container"
        collapsed={collapsed}
        onCollapse={() => this.props.toggleCollapsed()}
      >
        <div className="sidebar-top">
          <a href="/dashboard">
            {collapsed ? (
              <span className="title title--collapsed">Cu</span>
            ) : (
              <span className="title">Curely</span>
            )}
          </a>
        </div>
        <Menu className="sidebar-menu" theme="dark" defaultSelectedKeys={[]} mode="inline">
          <Menu.Item key="1">
            <a href="/dashboard">
              <Icon>
                <icon className="ion-home" />
              </Icon>
              <span>Home</span>
            </a>
          </Menu.Item>
          <Menu.Item key="patients">
            <a href="/dashboard/patients">
              <Icon>
                <icon className="ion-ios-list-outline" />
              </Icon>
              <span>Patients</span>
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/dashboard/profile">
              <Icon>
                <icon className="ion-person" />
              </Icon>
              <span>My Profile</span>
            </a>
          </Menu.Item>
          <Menu.Item key="3">
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
