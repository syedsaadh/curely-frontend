import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Router from './settings.router';

class SettingsPage extends React.Component {
  state = {};
  render() {
    const { url } = this.props.match;

    return (
      <div className="grid-container grid-1-4">
        <div className="left-container content-sidebar-wrapper">
          <div className="page-heading">Settings</div>
          <Menu className="content-sidebar" mode="inline">
            <Menu.Item key="settings.departments">
              <Link to={`${url}/departments`}>Departments</Link>
            </Menu.Item>
            <Menu.Item key="settings.labs">
              <Link to={`${url}/labs`}>Labs & Tests</Link>
            </Menu.Item>
            <Menu.Item key="settings.procedures">
              <Link to={`${url}/procedures`}>Procedures</Link>
            </Menu.Item>
            <Menu.Item key="settings.practicestaff">
              <Link to={`${url}/practicestaff`}>Practice Staff</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="right-container fixed-height">
          <Router url={url} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
