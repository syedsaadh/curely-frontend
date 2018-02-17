import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Dropdown } from 'antd';
import moment from 'moment';
import { Appointment } from './_types';
import VitalSign from './Vital Signs/charting.vitalsigns';
import VitalSignAdd from './Vital Signs/charting.vitalsigns.details.new';
import ClinicalNotes from './ClinicalNotes/charting.clinicalnotes';
import ClinicalNotesAdd from './ClinicalNotes/charting.clinicalnotes.details.new';
import TreatmentPlans from './TreatmentPlans/charting.treatmentplans';

import './style.less';

type Props = {
  data: Appointment,
};

class Charting extends React.Component<Props> {
  state = {
    isAdding: false,
    isAddingComponent: null,
  };
  onCancelAdd = () => {
    this.setState({ isAdding: false, isAddingComponent: null });
  };
  handleMenuClick = (e) => {
    let addComponent;
    switch (e.key) {
      case 'vitalSign': {
        addComponent = 'VitalSignAdd';
        break;
      }
      case 'clinicalNotes': {
        addComponent = 'ClinicalNotesAdd';
        break;
      }
      default:
        addComponent = null;
    }
    this.setState({ isAdding: true, isAddingComponent: addComponent });
  };
  renderMenu = () => {
    const { data } = this.props;
    const vitalSignsDisabled = !!data.vital_signs;
    const clinicalNotesDisabled = !!data.clinical_notes;
    const labOrdersDisabled = !(data.lab_orders.length < 1);
    const prescriptionsDisabled = !(data.prescriptions.length < 1);
    const treatmentPlansDisabled = !(data.treatment_plans.length < 1);
    const completedProceduresDisabled = !(data.completed_procedures.length < 1);
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item disabled={vitalSignsDisabled} key="vitalSign">
          Vital Signs
        </Menu.Item>
        <Menu.Item key="clinicalNotes" disabled={clinicalNotesDisabled}>
          Clinical Notes
        </Menu.Item>
        <Menu.Item key="prescriptions" disabled={prescriptionsDisabled}>
          Prescriptions
        </Menu.Item>
        <Menu.Item key="labOrders" disabled={labOrdersDisabled}>
          Lab Orders
        </Menu.Item>
        <Menu.Item key="treatmentPlans" disabled={treatmentPlansDisabled}>
          Treatment Plan
        </Menu.Item>
        <Menu.Item key="completedProcedures" disabled={completedProceduresDisabled}>
          Completed Procedures
        </Menu.Item>
      </Menu>
    );
  };
  renderBody = () => {
    const { isAdding, isAddingComponent } = this.state;
    const { data } = this.props;
    if (!isAdding) {
      return (
        <div>
          {data.vital_signs ? <VitalSign data={data.vital_signs} /> : null}
          {data.clinical_notes ? <ClinicalNotes data={data.clinical_notes} /> : null}
          {data.completed_procedures.length > 0 ? (
            <TreatmentPlans data={data.completed_procedures} />
          ) : null}
        </div>
      );
    }
    if (isAddingComponent === 'VitalSignAdd') {
      return <VitalSignAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
    if (isAddingComponent === 'ClinicalNotesAdd') {
      return <ClinicalNotesAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
  };
  render() {
    const { data } = this.props;
    const { isAdding } = this.state;
    return (
      <div className="charting-card">
        <div className="header">
          <div className="charting-date">
            <div className="date-day">{moment(data.scheduled_from).format('DD')}</div>
            <div className="date-month">
              {moment(data.scheduled_from)
                .format("MMM'YY")
                .toUpperCase()}
            </div>
          </div>
          <div className="charting-basic-info">
            <div>
              Appointment with <span>Saad Hassan</span>
            </div>
            <div>
              {moment(data.scheduled_from).format('hh:mm a')} for{' '}
              {moment(data.scheduled_to).diff(moment(data.scheduled_from), 'minutes')} minutes
            </div>
          </div>
          <div className="charting-actions">
            {!isAdding ? (
              <Dropdown overlay={this.renderMenu()} placement="bottomRight">
                <Button>
                  Add Records &nbsp;&nbsp;<i className="ion-ios-arrow-down" />
                </Button>
              </Dropdown>
            ) : null}
          </div>
        </div>
        <div className="body">{this.renderBody()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Charting);
