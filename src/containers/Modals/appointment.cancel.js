import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import moment from 'moment';

import { Modal, Select } from '../../components/ui-components';
import {
  cancel as cancelAppointment,
  toggleDoneAction,
  fetchAll,
} from '../../redux/Appointments/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  cancelAppointment: cancelAppointment;
  doneAction: string;
}

class AppointmentEditModal extends React.Component<Props> {
  state = {};
  componentWillReceiveProps(nextProps) {
    const { start } = this.props;
    if (nextProps.doneAction === 'cancel') {
      this.props.closeModal();
      this.props.fetchAll(
        moment(start)
          .startOf('isoWeek')
          .format('DD-MM-YYYY'),
        moment(start)
          .endOf('isoWeek')
          .format('DD-MM-YYYY'),
      );
      this.props.toggleDoneAction();
    }
  }
  onSave = () => {
    const Fields = ['reason', 'delete'];
    const { data } = this.props;
    this.props.form.validateFields(Fields, {}, (err, values) => {
      const vals = { ...values };
      if (!err) {
        vals.id = data.id;
        if (vals.delete === 'true') vals.delete = true;
        else vals.delete = false;
        this.props.cancelAppointment(vals);
      }
    });
  };

  render() {
    const { isFetching, error } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Cancel Appointment"
        onSave={this.onSave}
        okText="Cancel Appointment"
        cancelText="Exit"
        height="150px"
        width={500}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>Reason</Col>
          <Col md={12}>
            <Select
              defaultValue="Patient Not Shown"
              name="reason"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'Patient Not Shown', label: 'Patient Not Shown' },
                { value: 'Cancelled by Doctor', label: 'Cancelled by Doctor' },
                { value: 'Cancelled by Patient', label: 'Cancelled by Patient' },
              ]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={24}>
          <Col md={12}>Delete Permanent</Col>
          <Col md={12}>
            <Select
              defaultValue="false"
              optionLabelProp="label"
              name="delete"
              getFieldDecorator={getFieldDecorator}
              values={[{ value: 'false', label: 'No' }, { value: 'true', label: 'Yes' }]}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(AppointmentEditModal);

const mapStateToProps = state => ({
  ...state.Appointments,
});
const mapDispatchToProps = dispatch => ({
  cancelAppointment: data => dispatch(cancelAppointment(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: (start, end) => dispatch(fetchAll(start, end)),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
