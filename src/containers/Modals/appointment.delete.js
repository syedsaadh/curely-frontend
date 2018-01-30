import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import moment from 'moment';

import { Modal } from '../../components/ui-components';
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
    const { data } = this.props;
    if (data) {
      const vals = {};
      vals.id = data.id;
      vals.reason = '';
      vals.delete = true;
      this.props.cancelAppointment(vals);
    }
  };

  render() {
    const { isFetching, error } = this.props;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Delete Appointment"
        onSave={this.onSave}
        okText="Yes, Delete"
        height="150px"
        width={500}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={24}>
            <h3 style={{ fontWeight: 400, fontSize: 16 }}>
              Are you sure you want to delete appointment permanently?
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
});
const mapDispatchToProps = dispatch => ({
  cancelAppointment: data => dispatch(cancelAppointment(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: (start, end) => dispatch(fetchAll(start, end)),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
