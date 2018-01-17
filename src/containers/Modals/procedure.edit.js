import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { each } from 'lodash';
import { Modal, Input } from '../../components/ui-components';
import { editProcedure, toggleDoneAction, fetchAll } from '../../redux/Procedures/actions';
import { closeModal, toggleModalEdited } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  editProcedure: editProcedure;
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
    const Fields = ['name', 'cost', 'instruction'];
    const id = getFieldValue('id');
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        values.id = id;
        this.props.editProcedure(values);
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
        title="Add Procedure"
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
            <Input
              label="Cost (₹)"
              required
              type="number"
              name="cost"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input label="Instruction" name="instruction" getFieldDecorator={getFieldDecorator} />
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
})(ProcedureModal);

const mapStateToProps = state => ({
  ...state.Procedures,
});
const mapDispatchToProps = dispatch => ({
  editProcedure: data => dispatch(editProcedure(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
  closeModal: () => dispatch(closeModal()),
  toggleModalEdited: () => dispatch(toggleModalEdited()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
