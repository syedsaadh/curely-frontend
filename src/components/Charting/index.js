import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Dropdown, Popconfirm, Alert } from 'antd';
import moment from 'moment';
import { Appointment } from './_types';
import VitalSign from './Vital Signs/charting.vitalsigns';
import VitalSignAdd from './Vital Signs/charting.vitalsigns.details.new';
import ClinicalNotes from './ClinicalNotes/charting.clinicalnotes';
import ClinicalNotesAdd from './ClinicalNotes/charting.clinicalnotes.details.new';
import TreatmentPlans from './TreatmentPlans/charting.treatmentplans';
import TreatmentPlansAdd from './TreatmentPlans/charting.treatmentplans.new';
import CompletedProcedures from './CompletedProcedures/charting.completedprocedures';
import CompletedProceduresAdd from './CompletedProcedures/charting.completedprocedures.new';
import LabOrders from './LabTests/charting.labtests';
import LabOrdersAdd from './LabTests/charting.labtests.new';
import Prescription from './Prescriptions/charting.prescription';
import PrescriptionAdd from './Prescriptions/charting.prescription.new';
import { openModal } from '../../redux/App/actions';
import './style.less';

type Props = {
  data: Appointment,
  openModal: openModal,
};

class Charting extends React.Component<Props> {
  state = {
    isAdding: false,
    isAddingComponent: null,
  };
  onCancelAdd = () => {
    this.setState({ isAdding: false, isAddingComponent: null });
  };
  onAppointmentEdit = () => {
    const { data } = this.props;
    console.log(data);
    this.props.openModal('ChartingAppointmentEdit', { data });
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
      case 'treatmentPlans': {
        addComponent = 'TreatmentPlansAdd';
        break;
      }
      case 'completedProcedures': {
        addComponent = 'CompletedProceduresAdd';
        break;
      }
      case 'labOrders': {
        addComponent = 'LabOrdersAdd';
        break;
      }
      case 'prescriptions': {
        addComponent = 'PrescriptionAdd';
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
          {data.prescriptions.length > 0 ? <Prescription data={data.prescriptions} /> : null}
          {data.treatment_plans.length > 0 ? <TreatmentPlans data={data.treatment_plans} /> : null}
          {data.completed_procedures.length > 0 ? (
            <CompletedProcedures data={data.completed_procedures} />
          ) : null}
          {data.lab_orders.length > 0 ? <LabOrders data={data.lab_orders} /> : null}
        </div>
      );
    }
    if (isAddingComponent === 'VitalSignAdd') {
      return <VitalSignAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
    if (isAddingComponent === 'ClinicalNotesAdd') {
      return <ClinicalNotesAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
    if (isAddingComponent === 'TreatmentPlansAdd') {
      return <TreatmentPlansAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
    if (isAddingComponent === 'CompletedProceduresAdd') {
      return <CompletedProceduresAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
    if (isAddingComponent === 'LabOrdersAdd') {
      return <LabOrdersAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
    if (isAddingComponent === 'PrescriptionAdd') {
      return <PrescriptionAdd onCancel={this.onCancelAdd} appointmentId={data.id} />;
    }
  };
  render() {
    const { data } = this.props;
    const isCancelled = data.cancelled;

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
            <div>Appointment</div>
            <div>
              {moment(data.scheduled_from).format('hh:mm a')} for{' '}
              {moment(data.scheduled_to).diff(moment(data.scheduled_from), 'minutes')} minutes
            </div>
          </div>
          <div className="charting-feedbacks">
            {isCancelled ? (
              <Alert
                type="error"
                banner
                message={
                  <span>
                    Appointment Cancelled due to <b>{data.cancel_reason}</b>
                  </span>
                }
              />
            ) : null}
          </div>
          <div className="charting-actions">
            <Button.Group>
              {!isAdding ? (
                <Dropdown
                  disabled={isCancelled}
                  overlay={this.renderMenu()}
                  placement="bottomRight"
                >
                  <Button>
                    Add Records &nbsp;&nbsp;<i className="ion-ios-arrow-down" />
                  </Button>
                </Dropdown>
              ) : null}
              <Button icon="edit" onClick={this.onAppointmentEdit} />
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete the appointment?"
                onConfirm={() => this.onAppointmentEdit(data)}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ color: 'red' }} icon="delete" />
              </Popconfirm>
            </Button.Group>
          </div>
        </div>
        <div className="body">{this.renderBody()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openModal: (name, props) => dispatch(openModal(name, props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Charting);
