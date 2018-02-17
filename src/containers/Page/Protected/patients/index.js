import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import Router from './patients.router';
import { PatientsList } from '../../../../components';
import { openModal } from '../../../../redux/App/actions';
import './style.less';

class PatientsPage extends React.Component {
  state = {};
  onAddPatient = () => {
    this.props.openModal('PatientAdd');
  };
  render() {
    const { url } = this.props.match;
    return (
      <div className="grid-container grid-1-4 grid-container--patient">
        <div className="left-container content-sidebar-wrapper">
          <div className="page-heading">
            Patients
            <Button style={{ float: 'right' }} type="primary" onClick={this.onAddPatient}>
              + Add
            </Button>
          </div>
          <div className="patients-list-wrapper">
            <PatientsList url={url} history={this.props.history} />
          </div>
        </div>
        <div className="right-container fixed-height">
          <Router url={url} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openModal: modalName => dispatch(openModal(modalName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
