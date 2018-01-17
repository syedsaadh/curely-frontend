import React from 'react';
import { connect } from 'react-redux';
import logo from '../../image/logo.svg';
import './styles/signin.less';

class BrandingPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in-content">
          <div className="logo-wrapper">
            <img className="logo" src={logo} alt="logo" />
            <span className="branding">jalebi</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(BrandingPage);
