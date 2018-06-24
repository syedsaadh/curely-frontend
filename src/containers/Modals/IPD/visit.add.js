import React from 'react';
import moment from 'moment';
import { Row, Col, Form, DatePicker, TimePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Modal, Select } from '../../../components/ui-components';
import { addVisit, toggleDoneAction } from '../../../redux/IPD.Charting/actions';
import { fetchPatient } from '../../../redux/Patients/actions';
import { fetchDoctors } from '../../../redux/PracticeStaff/actions';
import { closeModal } from '../../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  addVisit: addVisit;
  fetchDoctors: fetchDoctors;
  toggleDoneAction: toggleDoneAction;
  doneAction: string;
}

class VisitAddModal extends React.Component<Props> {
  state = {};
  componentWillMount() {
    this.props.fetchDoctors();
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { doneAction, selectedPatient, fetchPatient } = nextProps;
    if (doneAction === 'addVisit') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      fetchPatient(selectedPatient.id);
    }
  }
  onSave = () => {
    const Fields = ['visitType', 'visitedBy', 'visitedOnDate', 'visitedOnTime'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      const vals = { ...values };
      if (!err) {
        const date: moment.Moment = vals.visitedOnDate;
        const time: moment.Moment = vals.visitedOnTime;
        const dateTime = moment(
          `${date.format('DD-MM-YYYY')} ${time.format('HH:mm')}`,
          'DD-MM-YYYY HH:mm',
        );
        vals.admissionId = this.props.admissionId;
        vals.visitedOn = dateTime.format('YYYY-MM-DD HH:mm:ss');
        this.props.addVisit(vals);
      }
    });
  };

  render() {
    const { loading, error } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        title="Add Visit"
        errors={allErrors}
        onSave={this.onSave}
        height="300px"
        width={400}
        loading={loading}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Select
              required
              name="visitType"
              label="Visit Type"
              defaultValue="Doctor Follow-Up"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'Doctor Follow-Up', label: 'Doctor Follow-Up' },
                { value: 'Nurse Follow-Up', label: 'Nurse Follow-Up' },
              ]}
            />
          </Col>
          <Col md={12}>
            <Select
              required
              name="visitedBy"
              label="Visited By"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'Doctor 1', label: 'Doctor 1' },
                { value: 'Nurse 1', label: 'Nurse 1' },
              ]}
            />
          </Col>
        </Row>

        <Row type="flex" gutter={12}>
          <Col md={24}>
            <h5>Visit Date & Time</h5>
          </Col>
          <Col md={10}>
            <Form.Item>
              {getFieldDecorator('visitedOnDate', { initialValue: moment() })(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
            </Form.Item>
          </Col>
          <Col md={2}>at </Col>
          <Col md={12}>
            {getFieldDecorator('visitedOnTime', {
              initialValue: moment(),
            })(<TimePicker style={{ width: '100%' }} format="HH:mm" />)}
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(VisitAddModal);

const mapStateToProps = (state) => {
  const { IPDCharting, Patients } = state;
  return {
    loading: IPDCharting.isFetching,
    doneAction: IPDCharting.doneAction,
    error: IPDCharting.error,
    selectedPatient: Patients.selected,
  };
};
const mapDispatchToProps = dispatch => ({
  addVisit: data => dispatch(addVisit(data)),
  closeModal: () => dispatch(closeModal()),
  fetchDoctors: () => dispatch(fetchDoctors()),
  fetchPatient: id => dispatch(fetchPatient(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
