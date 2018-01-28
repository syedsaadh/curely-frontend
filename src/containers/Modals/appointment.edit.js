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
  state = {
    disabled: true,
  };
  componentWillReceiveProps(nextProps) {
    const { isFieldsTouched, getFieldValue } = this.props.form;
    if (nextProps.doneAction === 'edit') {
      this.props.closeModal();
      this.props.fetchAll();
      this.props.toggleDoneAction();
    }
    if (isFieldsTouched() && this.state.disabled) {
      this.setState({ disabled: false });
    }
  }
  onSave = () => {
    const { validateFields, getFieldValue } = this.props.form;
    const Fields = [
      'department',
      'doctor',
      'scheduleOnDate',
      'scheduleOnTime',
      'scheduleOnFor',
      'notes',
    ];
    const id = getFieldValue('id');
    validateFields(Fields, {}, (err, values) => {
      console.log(values)
      if (!err) {
        const vals = { ...values };
        each(vals, (value, key) => {
          vals[key] = !value ? null : value;
        });
        const date: moment.Moment = vals.scheduleOnDate;
        const time: moment.Moment = vals.scheduleOnTime;
        const dateTime = moment(
          `${date.format('DD-MM-YYYY')} ${time.format('HH:mm')}`,
          'DD-MM-YYYY HH:mm',
        );
        vals.scheduledFrom = dateTime.format('YYYY-MM-DD HH:mm:ss');
        vals.scheduledTo = dateTime.add(vals.scheduleOnFor, 'm').format('YYYY-MM-DD HH:mm:ss');
        vals.id = id;
        this.props.editAppointment(vals);
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
        value: item.id,
        label: startCase(item.name),
      });
    });
    if (getFieldValue('department') >= 1) {
      const tem = filter(departments, { id: getFieldValue('department') });
      if (tem.length > 0) {
        each(tem[0].users, (item) => {
          doctors.push({
            value: item.id,
            label: startCase(item.name),
          });
        });
      }
    }
    console.log(getFieldValue('department'))
    return (
      <Row type="flex" gutter={12}>
        <Col md={8}>
          <Select
            defaultValue={departments[0].id}
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
    const { isFetching, error } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Edit Patient"
        onSave={this.onSave}
        height="360px"
        width={768}
        loading={isFetching}
        onSaveDisabled={this.state.disabled}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <PatientSearch
              name="name"
              disabled
              getFieldDecorator={getFieldDecorator}
              required
              label="Name"
              onSelect={this.onSelectPatient}
              onSearch={this.onSearchPatient}
              placeholder="Name is Required"
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
              disabled
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
              disabled
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
            <Input
              disabled
              label="Occupation"
              name="occupation"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={4}>
            <Select
              disabled
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
            <RadioGroup
              disabled
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
              {getFieldDecorator('scheduleOnDate')(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
            </Form.Item>
          </Col>
          <Col md={1}>at</Col>
          <Col md={6}>
            {getFieldDecorator('scheduleOnTime')(<TimePicker style={{ width: '100%' }} format="HH:mm" />)}
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
                { value: '75', label: '1 hr 15 mins' },
                { value: '90', label: '1 hr 30 mins' },
                { value: '105', label: '1 hr 45 mins' },
                { value: '120', label: '2 hr' },
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

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const data = { ...props.data };
    if (!data) {
      return {};
    }
    data.patientId = data.patient.id;
    data.name = data.patient.name;
    data.email = data.patient.email;
    data.occupation = data.patient.occupation;
    data.gender = data.patient.gender;
    data.mobile = data.patient.mobile;
    data.bloodGroup = data.patient.blood_group;
    data.streetAddress = data.patient.street_address;
    data.department = data.for_department;
    data.doctor = data.for_doctor;    
    data.scheduleOnDate = moment(data.scheduled_from);
    data.scheduleOnTime = moment(data.scheduled_from);
    data.scheduleOnFor = moment(data.scheduled_to).diff(data.scheduled_from, 'm');

    data.patient = null;
    const fields = {};
    each(data, (value, key) => {
      fields[key] = Form.createFormField({ value });
    });
    return fields;
  },
})(AppointmentEditModal);

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
