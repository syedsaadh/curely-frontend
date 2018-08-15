import React from 'react';
import moment from 'moment';
import { Row, Col, Form, DatePicker, TimePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each } from 'lodash';
import { Modal, Select } from '../../../components/ui-components';
import { editVisit, toggleDoneAction } from '../../../redux/IPD.Charting/actions';
import { fetchPatient } from '../../../redux/Patients/actions';
import { fetchDoctors } from '../../../redux/PracticeStaff/actions';
import { closeModal } from '../../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  editVisit: editVisit;
  fetchDoctors: fetchDoctors;
  toggleDoneAction: toggleDoneAction;
  doneAction: string;
}

class VisitEditModal extends React.Component<Props> {
  state = {};
  componentWillMount() {
    this.props.fetchDoctors();
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { doneAction, selectedPatient, fetchPatient } = nextProps;
    if (doneAction === 'editVisit') {
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
        vals.id = this.props.data.id;
        vals.visitedOn = dateTime.format('YYYY-MM-DD HH:mm:ss');
        this.props.editVisit(vals);
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
        title="Edit Visit"
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

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const { data } = props;
    if (!data) {
      return {};
    }
    data.visitType = data.visit_type;
    data.visitedBy = data.visited_by;
    data.visitedOnDate = moment(data.visited_on).isValid() ? moment(data.visited_on) : undefined;
    data.visitedOnTime = moment(data.visited_on).isValid() ? moment(data.visited_on) : undefined;

    const fields = {};
    each(data, (value, key) => {
      fields[key] = Form.createFormField({ value });
    });
    return fields;
  },
})(VisitEditModal);

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
  editVisit: data => dispatch(editVisit(data)),
  closeModal: () => dispatch(closeModal()),
  fetchDoctors: () => dispatch(fetchDoctors()),
  fetchPatient: id => dispatch(fetchPatient(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
