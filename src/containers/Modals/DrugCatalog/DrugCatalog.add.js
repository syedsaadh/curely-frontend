import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Modal, Input, Select } from '../../../components/ui-components';
import { addDrug, toggleDoneAction, fetchAll } from '../../../redux/DrugCatalog/actions';
import { closeModal } from '../../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addDrug: addDrug;
  doneAction: string;
}

class DrugCatalogAddModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }

  onSave = () => {
    const Fields = ['name', 'type', 'strength', 'unit', 'instruction'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.addDrug(values);
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
        title="Add Drug"
        onSave={this.onSave}
        height="240px"
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input label="Name" name="name" required getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Select
              required
              name="type"
              label="Drug Type"
              defaultValue="capsule"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'capsule', label: 'Capsule' },
                { value: 'cream', label: 'Cream' },
                { value: 'drops', label: 'Drops' },
                { value: 'foam', label: 'Foam' },
                { value: 'gel', label: 'Gel' },
                { value: 'inhaler', label: 'Inhaler' },
                { value: 'injection', label: 'Injection' },
                { value: 'lotion', label: 'Lotion' },
                { value: 'mouthwash', label: 'Mouth Wash' },
                { value: 'ointment', label: 'Ointment' },
                { value: 'powder', label: 'Powder' },
                { value: 'shampoo', label: 'Shampoo' },
                { value: 'spray', label: 'Spray' },
                { value: 'syringe', label: 'Syringe' },
                { value: 'syrup', label: 'Syrup' },
                { value: 'tablet', label: 'Tablet' },
                { value: 'toothpaste', label: 'Toothpaste' },
                { value: 'gargle', label: 'Garlgle' },
                { value: 'custom', label: 'Custom' },
              ]}
            />
          </Col>
          <Col md={12}>
            <Input label="Strength" name="strength" getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Select
              name="unit"
              label="Strength Unit"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'gm', label: 'gm' },
                { value: 'units', label: 'units' },
                { value: 'ml', label: 'ml' },
                { value: 'na', label: 'NA' },
              ]}
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

const WrappedForm = Form.create()(DrugCatalogAddModal);

const mapStateToProps = (state) => {
  const { DrugCatalog } = state;
  return {
    ...DrugCatalog,
  };
};
const mapDispatchToProps = dispatch => ({
  addDrug: data => dispatch(addDrug(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
