import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each } from 'lodash';
import { Modal, Input } from '../../components/ui-components';
import { editDepartment, toggleDoneAction, fetchAll } from '../../redux/Departments/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  editDepartment: editDepartment;
  doneAction: string;
}

class DepartmentModal extends React.Component<Props> {
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
    const Fields = ['name', 'desc', 'bedCount'];
    const id = getFieldValue('id');
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        values.id = id;
        this.props.editDepartment(values);
      }
    });
  };
  render() {
    const { isFetching, error } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Add Department"
        onSave={this.onSave}
        height="240px"
        loading={isFetching}
        onSaveDisabled={this.state.disabled}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input label="Name" name="name" required getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Input label="Description" name="desc" required getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input
              label="Beds"
              type="number"
              name="bedCount"
              required
              getFieldDecorator={getFieldDecorator}
            />
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
    const fields = {};
    each(data, (value, key) => {
      fields[key] = Form.createFormField({ value });
    });
    fields.bedCount = fields.bed_count;
    return fields;
  },
})(DepartmentModal);

const mapStateToProps = state => ({
  ...state.Departments,
});
const mapDispatchToProps = dispatch => ({
  editDepartment: data => dispatch(editDepartment(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
