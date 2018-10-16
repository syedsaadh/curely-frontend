import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Router from './profile.router';

class SettingsPage extends React.Component {
  state = {};
  render() {
    const { url } = this.props.match;

    return (
      <div className="grid-container grid-1-4">
        <div className="left-container content-sidebar-wrapper">
          <div className="page-heading">Account Settings</div>
          <Menu className="content-sidebar" mode="inline">
            <Menu.Item key="account.settings.main">
              <Link to={`${url}`}>My Profile</Link>
            </Menu.Item>
            <Menu.Item key="account.settings.password">
              <Link to={`${url}/password`}>Change Password</Link>
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
