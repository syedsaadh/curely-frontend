import React from 'react';
import { Row, Col, Form, TimePicker, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each, startCase, filter } from 'lodash';
import moment from 'moment';
import PatientSearch from '../../components/SearchBar/PatientSearch';

import { Modal, Input, RadioGroup, Select, TextArea } from '../../components/ui-components';
import { editAppointment, toggleDoneAction, fetchAll } from '../../redux/Appointments/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  editAppointment: editAppointment;
  doneAction: string;
}

class AppointmentEditModal extends React.Component<Props> {
  state = {};
  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'edit') {
      this.props.closeModal();
      this.props.fetchAll();
      this.props.toggleDoneAction();
    }
  }
  onSave = () => {
    const { start, end } = this.props;
    const { data } = this.props;
    const vals = {};
    if (data) {
      vals.doctor = data.for_doctor;
      vals.id = data.id;
      vals.notes = data.notes;
      vals.department = data.for_department;
      vals.scheduledFrom = moment(start).format('YYYY-MM-DD HH:mm:ss');
      vals.scheduledTo = moment(end).format('YYYY-MM-DD HH:mm:ss');
      this.props.editAppointment(vals);
    }
  };

  render() {
    const { isFetching, error, start } = this.props;
    const { scheduled_from } = this.props.data;
    const oldDate = moment(scheduled_from).format('dddd, MMM DD, hh:mm a');
    const newDate = moment(start).format('dddd, MMM DD, hh:mm a');
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Reschedule Appointment"
        onSave={this.onSave}
        height="150px"
        width={500}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={24}>
            <h3 style={{ fontWeight: 400, fontSize: 16 }}>
              From <b>{oldDate}</b> to <b>{newDate}</b> ?
            </h3>
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(AppointmentEditModal);

const mapStateToProps = state => ({
  ...state.Appointments,
  departments: state.Departments.lists,
});
const mapDispatchToProps = dispatch => ({
  editAppointment: data => dispatch(editAppointment(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
