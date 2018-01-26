import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each } from 'lodash';
import moment from 'moment';

import { Modal, Input, DOBInput, RadioGroup, Select } from '../../components/ui-components';
import { addPatient, toggleDoneAction, fetchAll } from '../../redux/Patients/actions';
import { closeModal } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addPatient: addPatient;
  doneAction: string;
}

class PatientModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }

  onSave = () => {
    const Fields = [
      'name',
      'dob',
      'age',
      'mobile',
      'email',
      'occupation',
      'streetAddress',
      'pincode',
      'city',
      'bloodGroup',
      'gender',
    ];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        each(values, (value, key) => (values[key] = !value ? null : value));
        if (values.dob) {
          values.dob = moment(values.dob, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
          values.age = null;
        }
        this.props.addPatient(values);
      }
    });
  };

  render() {
    const { isFetching, error } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="New Patient"
        onSave={this.onSave}
        height="360px"
        width={768}
        loading={isFetching}
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
                pattern: '^[789][0-9]{9}$',
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

const WrappedForm = Form.create()(PatientModal);

const mapStateToProps = (state) => {
  const { Patients } = state;
  return {
    ...Patients,
  };
};
const mapDispatchToProps = dispatch => ({
  addPatient: data => dispatch(addPatient(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
