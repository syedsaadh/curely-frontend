import React from 'react';
import moment from 'moment';
import { Row, Col, Form, DatePicker, TimePicker, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { startCase, each } from 'lodash';
import {
  Modal,
  Input,
  Select,
  RadioGroup,
  DOBInput,
  TextArea,
} from '../../../components/ui-components';
import { discharge, toggleDoneAction, fetchByDept } from '../../../redux/IPD.Admission/actions';
import { closeModal } from '../../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  discharge: discharge;
  doneAction: string;
}

class PatientDischargeModal extends React.Component<Props> {
  state = {};
  componentWillMount() {}
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { doneAction, selectedDept, toggleDoneAction, closeModal, fetchByDept } = nextProps;
    if (doneAction === 'discharged') {
      toggleDoneAction();
      fetchByDept(selectedDept.id);
      closeModal();
    }
  }
  onSave = () => {
    const Fields = ['id', 'scheduleOnDate', 'scheduleOnTime'];
    const { data } = this.props;
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        const vals = { ...values };
        const date: moment.Moment = vals.scheduleOnDate;
        const time: moment.Moment = vals.scheduleOnTime;
        const dateTime = moment(
          `${date.format('DD-MM-YYYY')} ${time.format('HH:mm')}`,
          'DD-MM-YYYY HH:mm',
        );
        vals.id = data.id;
        vals.dischargedOn = dateTime.format('YYYY-MM-DD HH:mm:ss');
        this.props.discharge(vals);
      }
    });
  };
  render() {
    const startDateTime = moment();
    const { loading, error } = this.props;
    const { getFieldDecorator, setFields, getFieldValue } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    console.log(this.props);
    return (
      <Modal
        title="Discharge Patient"
        errors={allErrors}
        onSave={this.onSave}
        height="250px"
        width={468}
        loading={loading}
      >
        <Row type="flex" gutter={12}>
          <Col md={24}>
            <h5>Discharge Date & Time</h5>
          </Col>
          <Col md={12}>
            <Form.Item>
              {getFieldDecorator('scheduleOnDate', { initialValue: moment(startDateTime) })(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
            </Form.Item>
          </Col>
          <Col md={2}>at</Col>
          <Col md={10}>
            {getFieldDecorator('scheduleOnTime', {
              initialValue: moment(startDateTime, 'HH:mm'),
            })(<TimePicker style={{ width: '100%' }} format="HH:mm" />)}
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(PatientDischargeModal);

const mapStateToProps = (state) => {
  const { IPDAdmission } = state;
  return {
    loading: IPDAdmission.isFetching,
    error: IPDAdmission.error,
    selectedDept: IPDAdmission.selectedDept,
    doneAction: IPDAdmission.doneAction,
  };
};
const mapDispatchToProps = dispatch => ({
  discharge: data => dispatch(discharge(data)),
  fetchByDept: data => dispatch(fetchByDept(data)),
  closeModal: () => dispatch(closeModal()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
