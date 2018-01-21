import React from 'react';
import moment from 'moment';
import { Row, Col, Form, DatePicker, TimePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { startCase, each, filter } from 'lodash';
import {
  Modal,
  Input,
  Select,
  RadioGroup,
  DOBInput,
  TextArea,
} from '../../components/ui-components';
import { addAppointment, toggleDoneAction, fetchAll } from '../../redux/Appointments/actions';
import { closeModal } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addAppointment: addAppointment;
  doneAction: string;
}

class AppointmentModal extends React.Component<Props> {
  state = {};
  componentWillMount() {}
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }
  onAccessControlChanged = () => {};
  onSave = () => {
    const Fields = [
      'name',
      'mobile',
      'email',
      'bloodGroup',
      'dob',
      'age',
      'gender',
      'scheduleOnDate',
      'scheduleOnTime',
      'scheduleOnFor',
    ];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.addAppointment(values);
      }
    });
  };
  onSelectDepartment = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ doctor: undefined });
  };
  renderDepartmentAndDoctors = () => {
    const { departments } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const depts = [];
    const doctors = [];
    each(departments, (item) => {
      depts.push({
        value: item.name,
        label: startCase(item.name),
      });
    });
    if (getFieldValue('department')) {
      const tem = filter(departments, { name: getFieldValue('department') });
      if (tem) {
        each(tem[0].users, (item) => {
          doctors.push({
            value: item.name,
            label: startCase(item.name),
          });
        });
      }
    }
    return (
      <Row type="flex" gutter={12}>
        <Col md={8}>
          <Select
            defaultValue={departments[0].name}
            name="department"
            label="Department"
            getFieldDecorator={getFieldDecorator}
            values={depts}
            onSelect={this.onSelectDepartment}
          />
        </Col>
        <Col md={8}>
          <Select
            name="doctor"
            label="Doctor"
            getFieldDecorator={getFieldDecorator}
            values={doctors}
          />
        </Col>
      </Row>
    );
  };
  render() {
    const { startDateTime, endDateTime } = this.props;
    const { isFetching, departments, error } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        title="Add Appointment"
        errors={allErrors}
        onSave={this.onSave}
        height="400px"
        width={768}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input
              validatorMessage="Name is Required"
              label="Patient Name"
              name="name"
              placeholder="Enter Patient Name"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              disabled
              validatorMessage="Patient ID"
              label="Patient ID"
              name="patientId"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              rules={{
                pattern: '^[2-9]{2}[0-9]{8}$',
                message: 'Phone Number is Incorrect',
              }}
              validatorMessage="Phone Number is Incorrect"
              label="Phone (+91)"
              name="mobile"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              rules={{ type: 'email' }}
              validatorMessage="Email is Incorrect"
              label="Email"
              name="email"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={12}>
          <Col md={8}>
            <Input label="Occupation" name="occupation" getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={4}>
            <Select
              name="bloodGroup"
              label="Blood Group"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'o+', label: 'O+' },
                { value: 'o-', label: 'O-' },
                { value: 'a+', label: 'A+' },
                { value: 'a-', label: 'A-' },
                { value: 'b+', label: 'B+' },
                { value: 'b-', label: 'B-' },
                { value: 'ab+', label: 'AB+' },
                { value: 'ab-', label: 'AB-' },
              ]}
            />
          </Col>
          <Col md={6}>
            <DOBInput setFields={setFields} getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={6}>
            <RadioGroup
              name="gender"
              label="Gender"
              getFieldDecorator={getFieldDecorator}
              values={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
            />
          </Col>
        </Row>
        {this.renderDepartmentAndDoctors()}
        <Row type="flex" gutter={12}>
          <Col md={24}>
            <h5>Schedule For Appointment</h5>
          </Col>
          <Col md={8}>
            <Form.Item>
              {getFieldDecorator('scheduleOnDate', { initialValue: moment(startDateTime) })(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
            </Form.Item>
          </Col>
          <Col md={1}>at</Col>
          <Col md={6}>
            {getFieldDecorator('scheduleOnTime', {
              initialValue: moment(startDateTime, 'HH:mm'),
            })(<TimePicker style={{ width: '100%' }} format="HH:mm" />)}
          </Col>
          <Col md={1}>for</Col>
          <Col md={8}>
            <Select
              defaultValue="15"
              name="scheduleOnFor"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: '15', label: '15 mins' },
                { value: '30', label: '30 mins' },
                { value: '45', label: '45 mins' },
                { value: '60', label: '1 hr' },
              ]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={12}>
          <Col md={8}>
            <TextArea label="Notes" name="notes" getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(AppointmentModal);

const mapStateToProps = (state) => {
  const { Appointments, Departments } = state;
  return {
    ...Appointments,
    departments: Departments.lists,
  };
};
const mapDispatchToProps = dispatch => ({
  addAppointment: data => dispatch(addAppointment(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
