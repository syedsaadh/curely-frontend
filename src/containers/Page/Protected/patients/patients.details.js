import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import { startCase } from 'lodash';
import { fetchPatient } from '../../../../redux/Patients/actions';
import { openModal } from '../../../../redux/App/actions';

import patientPlaceholder from '../../../../image/patientPlaceholder.svg';

class PatientDetails extends React.Component {
  componentWillMount() {
    console.log('Mounted');
    const { match } = this.props;
    this.props.fetchPatient(match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    if (match.params.id !== nextProps.match.params.id) {
      this.props.fetchPatient(nextProps.match.params.id);
    }
  }
  onEdit = () => {
    this.props.openModal('PatientEdit', { data: this.props.Patients.selected });
  };
  render() {
    const { Patients } = this.props;
    const { selected } = Patients;
    if (!selected) return null;
    return (
      <div className="patients-details-container">
        <Row type="flex" className="patient-header" align="center">
          <Col md={2}>
            <img width="50" height="50" className="patient-info-pic" src={patientPlaceholder} />
          </Col>
          <Col md={8} className="flex-container align-center">
            <Row type="flex">
              <Col md={24}>
                <span className="body-2">{selected.name}</span>
                <span className="body-1 left-pad-8">{`(P${selected.id})`}</span>
              </Col>
              <Col md={24}>
                <span className="body-1">
                  {selected.gender ? startCase(selected.gender) : 'sex'}
                </span>
                <span className="body-1 left-pad-16">
                  {selected.age
                    ? `${parseInt(selected.age)} years`
                    : selected.dob
                      ? `${moment().diff(moment(selected.dob, 'YYYY-MM-DD'), 'year')} years`
                      : 'age'}
                  {}
                </span>
                <span className="body-1 left-pad-16">
                  {selected.blood_group ? selected.blood_group.toUpperCase() : 'blood group'}
                </span>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="flex-container align-center">
            <Row type="flex">
              <Col md={24}>
                <span className="body-1">
                  <i className="ion-ios-telephone right-pad-8" />
                  {selected.mobile || 'phone number'}
                </span>
              </Col>
              <Col md={24}>
                <span className="body-1">
                  <i className="ion-ios-email right-pad-8" />
                  {selected.email || ' email id'}
                </span>
              </Col>
            </Row>
          </Col>
          <Col md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button size="small" onClick={this.onEdit}>
              {' '}
              Edit Profile
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Patients } = state;
  return {
    Patients,
  };
};
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchPatient: id => dispatch(fetchPatient(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
