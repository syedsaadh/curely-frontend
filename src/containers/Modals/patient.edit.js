import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each, keysIn, includes } from 'lodash';
import moment from 'moment';
import { Modal, Input, DOBInput, RadioGroup, Select } from '../../components/ui-components';
import { editPatient, toggleDoneAction, fetchPatient } from '../../redux/Patients/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchPatient: fetchPatient;
  toggleDoneAction: toggleDoneAction;
  editPatient: editPatient;
  doneAction: string;
}

class PatientModal extends React.Component<Props> {
  state = {
    disabled: true,
  };
  componentWillReceiveProps(nextProps) {
    const { isFieldsTouched, getFieldValue } = this.props.form;
    if (nextProps.doneAction === 'edit') {
      this.props.closeModal();
      this.props.fetchPatient(getFieldValue('id'));
      this.props.toggleDoneAction();
    }
    if (isFieldsTouched() && this.state.disabled) {
      this.setState({ disabled: false });
    }
  }
  onSave = () => {
    const { validateFields, getFieldValue } = this.props.form;
    const Fields = [
      'name',
      'dob',
      'age',
      'mobile',
      'email',
      'occupation',
      'pincode',
      'city',
      'bloodGroup',
      'streetAddress',
      'gender',
    ];
    const id = getFieldValue('id');
    validateFields(Fields, {}, (err, values) => {
      each(values, (value, key) => (values[key] = !value ? null : value));
      if (!err) {
        if (values.dob) {
          values.dob = moment(values.dob, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
          values.age = null;
        }
        values.id = id;
        this.props.editPatient(values);
      }
    });
  };
  render() {
    const { isFetching, error } = this.props;
    const { getFieldDecorator, setFields, getFieldValue } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    const activeDOBType = getFieldValue('dob') ? 'dob' : 'age';
    return (
      <Modal
        errors={allErrors}
        title="Add Department"
        onSave={this.onSave}
        height="360px"
        width={768}
        loading={isFetching}
        onSaveDisabled={this.state.disabled}
      >
        <Row type="flex" gutter={12}>
          <Col md={8}>
            <Input
              label="Patients Name"
              name="name"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={8}>
            <Input
              rules={{
                type: 'string',
                pattern: '[2-9]{2}[0-9]{8}',
              }}
              validatorMessage="Phone Number is Incorrect"
              label="Phone (+91)"
              name="mobile"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={8}>
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
              defaultDOB={getFieldValue('dob')}
              active={activeDOBType}
              getFieldValue={getFieldValue}
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
        <Row type="flex" gutter={12}>
          <Col md={16}>
            <Input
              label="Street Address"
              name="streetAddress"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={4}>
            <Input
              label="Pincode"
              rules={{ min: 6, max: 6 }}
              name="pincode"
              validatorMessage="Pincode is Incorrect"
              type="number"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={4}>
            <Input label="City" name="city" getFieldDecorator={getFieldDecorator} />
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
    data.dob = data.dob ? moment(data.dob) : null;
    data.bloodGroup = data.blood_group;
    data.age = data.age ? parseInt(data.age) : null;
    data.streetAddress = data.street_address;
    const fields = {};
    each(data, (value, key) => {
      fields[key] = Form.createFormField({ value });
    });
    return fields;
  },
})(PatientModal);

const mapStateToProps = state => ({
  ...state.Patients,
});
const mapDispatchToProps = dispatch => ({
  editPatient: data => dispatch(editPatient(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchPatient: id => dispatch(fetchPatient(id)),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
