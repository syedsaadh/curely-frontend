import React from 'react';
import { connect } from 'react-redux';
import TopbarActionBtn from './topbarAction';
import { Input } from 'antd';
import { logOutUser } from '../../redux/Authentication/actions';
import { PatientSearchInput } from '../SearchBar';

class Header extends React.Component {
  onLogout = () => {
    this.props.logOutUser();
  };
  onPatienSelect = (obj) => {
    this.props.history.push(`/dashboard/patients/${obj.id}`);
  };
  render() {
    return (
      <div className="topbar">
        <div className="left-container">
          <div className="top-bar__item">
            <PatientSearchInput placeholder="Search Patient" onSelect={this.onPatienSelect} />
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
