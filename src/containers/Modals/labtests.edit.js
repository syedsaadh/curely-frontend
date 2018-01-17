import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each } from 'lodash';
import { Modal, Input } from '../../components/ui-components';
import { editLabTest, toggleDoneAction, fetchAll } from '../../redux/LabTests/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  editLabTest: editLabTest;
  doneAction: string;
}

class LabTestModal extends React.Component<Props> {
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
    const Fields = ['name', 'description'];
    const id = getFieldValue('id');
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        values.id = id;
        this.props.editLabTest(values);
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
        title="Add Labs Test"
        onSave={this.onSave}
        height="150px"
        loading={isFetching}
        onSaveDisabled={this.state.disabled}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input label="Name" name="name" required getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Input label="Description" name="description" getFieldDecorator={getFieldDecorator} />
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
    return fields;
  },
})(LabTestModal);

const mapStateToProps = state => ({
  ...state.LabTests,
});
const mapDispatchToProps = dispatch => ({
  editLabTest: data => dispatch(editLabTest(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
