import React from 'react';
import { connect } from 'react-redux';
import TopbarActionBtn from './topbarAction';
import { Input } from 'antd';
import { logOutUser } from '../../redux/Authentication/actions';

class Header extends React.Component {
  onLogout = () => {
    this.props.logOutUser();
  };
  render() {
    return (
      <div className="topbar">
        <div className="left-container">
          <div className="top-bar__item">
            <Input placeholder="Search Patients" />
          </div>
        </div>
        <div className="right-container">
          <TopbarActionBtn icon="ion-person">
            <TopbarActionBtn.Item onClick={this.onLogout}>Logout</TopbarActionBtn.Item>
          </TopbarActionBtn>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logOutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
