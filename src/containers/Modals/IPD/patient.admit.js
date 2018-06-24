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
import PatientSearch from '../../../components/SearchBar/PatientSearch';
import {
  addAdmission,
  toggleDoneAction,
  fetchByDept,
  fetchAvailableBeds,
} from '../../../redux/IPD.Admission/actions';
import { fetchDoctors } from '../../../redux/PracticeStaff/actions';
import { closeModal } from '../../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchByDept: fetchByDept;
  fetchDoctors: fetchDoctors;
  fetchAvailableBeds: fetchAvailableBeds;
  toggleDoneAction: toggleDoneAction;
  addAdmission: addAdmission;
  doneAction: string;
}

class PatientAdmitModal extends React.Component<Props> {
  state = {};
  componentWillMount() {
    this.props.fetchDoctors();
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { doneAction, selectedDept } = nextProps;
    if (doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchByDept(selectedDept.id);
    }
  }
  onSave = () => {
    const Fields = [
      'patientId',
      'name',
      'mobile',
      'bedNo',
      'occupation',
      'email',
      'bloodGroup',
      'dob',
      'age',
      'department',
      'doctor',
      'gender',
      'scheduleOnDate',
      'scheduleOnTime',
      'notes',
    ];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      const vals = { ...values };
      if (!err) {
        each(vals, (value, key) => {
          vals[key] = !value ? null : value;
        });
        if (!vals.age) vals.age = null;
        if (vals.dob) {
          vals.dob = moment(values.dob, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
          vals.age = null;
        }
        const date: moment.Moment = vals.scheduleOnDate;
        const time: moment.Moment = vals.scheduleOnTime;
        const dateTime = moment(
          `${date.format('DD-MM-YYYY')} ${time.format('HH:mm')}`,
          'DD-MM-YYYY HH:mm',
        );
        vals.admittedOn = dateTime.format('YYYY-MM-DD HH:mm:ss');
        this.props.addAdmission(vals);
      }
    });
  };
  onSelectDepartment = (val) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ doctor: undefined });
    this.props.fetchAvailableBeds(val);
  };
  onSearchPatient = () => {
    this.props.form.resetFields(['patientId']);
  };
  onSelectPatient = (val) => {
    this.props.form.setFieldsValue({
      name: val.name,
      patientId: val.id,
      email: val.email,
      occupation: val.occupation,
      mobile: val.mobile,
      bloodGroup: val.blood_group,
      dob: val.dob ? moment(val.dob) : null,
      gender: val.gender,
    });
  };

  renderDepartmentAndDoctors = () => {
    const { departments, doctors } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const depts = [];
    const doctrs = [];
    each(departments, (item) => {
      depts.push({
        value: item.id,
        label: startCase(item.name),
      });
    });
    each(doctors, (item) => {
      doctrs.push({
        value: item.id,
        label: startCase(item.name),
      });
    });

    return (
      <Row type="flex" gutter={12}>
        <Col md={8}>
          <Select
            required
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
            label="Referred By Doctor"
            getFieldDecorator={getFieldDecorator}
            values={doctrs}
          />
        </Col>
      </Row>
    );
  };
  renderBeds = () => {
    const { beds, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const availableBeds = [];
    each(beds, (item) => {
      availableBeds.push({
        value: item,
        label: `${item}`,
      });
    });

    return (
      <Row type="flex" gutter={12}>
        <Col md={8}>
          {loading ? (
            <Spin spinning />
          ) : (
            <Select
              name="bedNo"
              label="Bed Number"
              getFieldDecorator={getFieldDecorator}
              values={availableBeds}
            />
          )}
        </Col>
      </Row>
    );
  };
  render() {
    const startDateTime = moment();
    const { loading, error } = this.props;
    const { getFieldDecorator, setFields, getFieldValue } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        title="Admit Patient"
        errors={allErrors}
        onSave={this.onSave}
        height="400px"
        width={768}
        loading={loading}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <PatientSearch
              name="name"
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
              rules={{
                pattern: '^[2-9]{1}[0-9]{9}$',
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
            <DOBInput
              dobValue={getFieldValue('dob')}
              setFields={setFields}
              getFieldDecorator={getFieldDecorator}
            />
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
        {this.renderBeds()}
        <Row type="flex" gutter={12}>
          <Col md={24}>
            <h5>Admission Date & Time</h5>
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

const WrappedForm = Form.create()(PatientAdmitModal);

const mapStateToProps = (state) => {
  const {
    Appointments, Departments, PracticeStaff, IPDAdmission,
  } = state;
  return {
    ...Appointments,
    departments: Departments.lists,
    doctors: PracticeStaff.doctors,
    beds: IPDAdmission.availableBeds,
    loading: IPDAdmission.isFetching,
    selectedDept: IPDAdmission.selectedDept,
    doneAction: IPDAdmission.doneAction,
  };
};
const mapDispatchToProps = dispatch => ({
  addAdmission: data => dispatch(addAdmission(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAvailableBeds: deptId => dispatch(fetchAvailableBeds(deptId)),
  fetchByDept: deptId => dispatch(fetchByDept(deptId)),
  fetchDoctors: () => dispatch(fetchDoctors()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
