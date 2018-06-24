import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Row, Col, Button, Radio } from 'antd';
import { startCase } from 'lodash';
import { Space, Spinner } from '../../../../components/ui-components';
import { fetchPatient } from '../../../../redux/Patients/actions';
import { openModal } from '../../../../redux/App/actions';
import { fetchAll as fetchAllVitalSigns } from '../../../../redux/VitalSigns/actions';
import patientPlaceholder from '../../../../image/patientPlaceholder.svg';
import ChartingIPD from '../../../../components/Charting.IPD';
import Charting from '../../../../components/Charting';
import './style.details.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class PatientDetails extends React.Component {
  state = {
    type: 'opd',
  };
  componentWillMount() {
    const { match } = this.props;
    this.props.fetchPatient(match.params.id);
    this.props.fetchAllVitalSigns();
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
  onTabChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  };
  render() {
    const { Patients } = this.props;
    const { selected } = Patients;
    const isIPD = this.state.type === 'ipd';
    if (!selected) return null;
    if (Patients.isFetching) return <Spinner spinning />;
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
        <div className="patient-content">
          <div className="charting-container">
            <div className="header">
              <RadioGroup onChange={this.onTabChange} defaultValue="opd" value={this.state.type}>
                <RadioButton value="opd">OPD</RadioButton>
                <RadioButton value="ipd">IPD</RadioButton>
              </RadioGroup>
            </div>
            <div className="charting-content">
              {!isIPD ? (
                <div className="appointments-timeline">
                  {selected.appointments
                    ? selected.appointments.map(item => (
                      <div key={item.id} className="timeline-item">
                        <Charting data={item} />
                      </div>
                      ))
                    : null}
                </div>
              ) : null}
              {isIPD ? (
                <div className="admissions-timeline">
                  {selected.admissions
                    ? selected.admissions.map((item) => {
                        const { visits } = item;
                        return (
                          <div key={item.id} className="admissions-timeline-item-container">
                            <div className="admissions-timeline-item">
                              <div className="header">
                                <div className="admit-date">
                                  <div className="date-day">
                                    {moment(item.admitted_on).format("DD MMM'YY")}
                                  </div>
                                  <div className="date-month">
                                    {moment(item.admitted_on)
                                      .format('hh:mm a')
                                      .toUpperCase()}
                                  </div>
                                </div>
                                <div className="discharge-date">
                                  <div className="date-day">
                                    {item.discharged_on
                                      ? moment(item.discharged_on).format("DD MMM'YY")
                                      : 'Not Discharged'}
                                  </div>
                                  <div className="date-month">
                                    {item.discharged_on
                                      ? moment(item.discharged_on)
                                          .format('hh:mm a')
                                          .toUpperCase()
                                      : ''}
                                  </div>
                                </div>
                                <div className="admit-basic-info">
                                  <div>
                                    Admitted in{' '}
                                    <span>
                                      <b>{item.department.name}</b>
                                    </span>
                                  </div>
                                  <div>
                                    Bed Number: <b>{item.bed_no}</b>
                                  </div>
                                </div>
                                <div className="actions">
                                  <Button.Group>
                                    <Button
                                      onClick={() =>
                                        this.props.openModal('VisitAdd', { admissionId: item.id })
                                      }
                                    >
                                      Add Visit
                                    </Button>
                                    <Button icon="edit" />
                                    <Button style={{ color: 'red' }} icon="delete" />
                                  </Button.Group>
                                </div>
                              </div>
                              <div className="body">
                                <div className="visit-timeline-container">
                                  {visits.map(visit => (
                                    <div key={visit.id} className="timeline-item">
                                      <ChartingIPD data={visit} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="footer" />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              ) : null}
            </div>
          </div>

          <Space h={80} />
        </div>
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
  fetchAllVitalSigns: () => dispatch(fetchAllVitalSigns()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
