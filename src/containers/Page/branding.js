import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import './styles/branding.less';

class BrandingPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="branding-page">
        <Logo height="100px" />
        <span className="branding-text">Simple and easy Clinic Management</span>
        <Link className="pad-16" to="/signin">
          Go to Curex
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(BrandingPage);
