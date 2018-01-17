import React from 'react';
import { Row, Col, Form, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each, startCase, toLower } from 'lodash';
import { Modal, Input } from '../../components/ui-components';
import { editStaff, toggleDoneAction, fetchAll } from '../../redux/PracticeStaff/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

const RadioGroup = Radio.Group;

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  editStaff: editStaff;
  doneAction: string;
}

class ProcedureModal extends React.Component<Props> {
  state = {
    disabled: true,
  };
  componentWillReceiveProps(nextProps) {
    const { isFieldsTouched } = this.props.form;
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
    const Fields = ['name', 'email', 'mobile', 'role'];
    const id = getFieldValue('id');
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        values.id = id;
        this.props.editStaff(values);
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
    const { isFetching, error, roles } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Edit Staff"
        onSave={this.onSave}
        height="360px"
        loading={isFetching}
        onSaveDisabled={this.state.disabled}
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

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const { data } = props;
    if (!data) {
      return {};
    }
    const fields = {};
    each(data, (value, key) => {
      fields[key] = Form.createFormField({ value });
    });
    return fields;
  },
})(ProcedureModal);

const mapStateToProps = state => ({
  ...state.PracticeStaff,
  roles: state.Roles.lists,
});
const mapDispatchToProps = dispatch => ({
  editStaff: data => dispatch(editStaff(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
