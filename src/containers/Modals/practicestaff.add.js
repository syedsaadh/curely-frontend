import React from 'react';
import { Row, Col, Form, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { startCase, toLower } from 'lodash';
import { Modal, Input } from '../../components/ui-components';
import { addStaff, toggleDoneAction, fetchAll } from '../../redux/PracticeStaff/actions';
import { closeModal } from '../../redux/App/actions';

const RadioGroup = Radio.Group;

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addStaff: addStaff;
  doneAction: string;
}

class PracticeStaffModal extends React.Component<Props> {
  state = {};

  componentDidMount() {
    this.props.form.setFieldsValue({ role: 'admin' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }
  onAccessControlChanged = () => {};
  onSave = () => {
    const Fields = ['name', 'email', 'password', 'mobile', 'role'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.addStaff(values);
      }
    });
  };
  renderAccessControls = (roles: Array) => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const getTitleCase = a => startCase(toLower(a));
    return (
      <RadioGroup>
        {roles.map(item => (
          <Radio style={radioStyle} key={item.id} value={toLower(item.name)}>
            {`${getTitleCase(item.name)} ( ${getTitleCase(item.description)} )`}
          </Radio>
        ))}
      </RadioGroup>
    );
  };

  render() {
    const { isFetching, roles, error } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        title="Add Staff"
        errors={allErrors}
        onSave={this.onSave}
        height="360px"
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input
              validatorMessage="Name is Required"
              label="Name"
              name="name"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              rules={{ type: 'email' }}
              validatorMessage="Email is Incorrect"
              label="Email"
              name="email"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              rules={{
                type: 'string',
                pattern: '[2-9]{2}[0-9]{8}',
              }}
              validatorMessage="Phone Number is Incorrect"
              label="Phone (+91)"
              name="mobile"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              label="Password"
              rules={{
                min: 6,
                message: 'Password should be 6 characters minimum',
              }}
              validatorMessage="Password should be 6 characters minimum"
              type="password"
              name="password"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={24}>
          <Col md={24}>
            <h3 className="sub-heading">Access Control</h3>
          </Col>
          <Col md={24}>{getFieldDecorator('role')(this.renderAccessControls(roles))}</Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(PracticeStaffModal);

const mapStateToProps = (state) => {
  const { PracticeStaff, Roles } = state;
  return {
    ...PracticeStaff,
    roles: Roles.lists,
  };
};
const mapDispatchToProps = dispatch => ({
  addStaff: data => dispatch(addStaff(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
