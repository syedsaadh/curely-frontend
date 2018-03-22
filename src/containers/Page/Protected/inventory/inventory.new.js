import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import { each } from 'lodash';
import { FormComponentProps } from 'antd/lib/form/Form';
import { addInventory, toggleDoneAction, fetchAll } from '../../../../redux/Inventory/actions';
import { Input, Select } from '../../../../components/ui-components';
import './style.less';

interface Props extends FormComponentProps {
  addInventory: addInventory;
  doneAction: string;
  loading: boolean;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
}
class InventoryNew extends React.Component<Props> {
  state = {};
  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.onCancel();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }
  onSave = () => {
    const Fields = [
      'name',
      'code',
      'manufacturer',
      'stockingUnit',
      'reorderLevel',
      'price',
      'itemType',
      'itemTypePrefix',
      'strength',
      'strengthUnit',
      'instruction',
    ];
    this.props.form.validateFieldsAndScroll(Fields, {}, (err, values) => {
      if (!err) {
        each(values, (value, key) => (values[key] = !value ? null : value));
        this.props.addInventory(values);
      }
    });
  };
  onCancel = () => {
    this.props.history.push('/dashboard/inventory');
  };
  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="inventory-page">
        <div className="inventory-page__header">
          <div className="left">
            <div className="heading">Add Item</div>
          </div>
          <div className="center" />
          <div className="right actions">
            <div className="action-item">
              <Button onClick={this.onSave} loading={loading} icon="check" type="primary">
                Save Item
              </Button>
            </div>
            <div className="action-item">
              <Button onClick={this.onCancel} icon="close">
                Cancel Item
              </Button>
            </div>
          </div>
        </div>
        <div className="inventory-page__body">
          <div className="info-container--flex">
            <div className="item-info">
              <div className="secondary-header">
                <div className="title">Inventory Details</div>
              </div>
              <div className="info-block info-block--editable">
                <Input
                  name="name"
                  label="Item Name"
                  required
                  getFieldDecorator={getFieldDecorator}
                />
              </div>
              <div className="info-block info-block--editable">
                <Input name="code" label="Item Code" getFieldDecorator={getFieldDecorator} />
              </div>
              <div className="info-block info-block--editable">
                <Input
                  name="manufacturer"
                  label="Manufacturer"
                  getFieldDecorator={getFieldDecorator}
                />
              </div>
              <div className="info-block info-block--editable">
                <Input
                  required
                  placeholder="Example : Bottles, strips, etc"
                  name="stockingUnit"
                  label="Stocking Unit"
                  getFieldDecorator={getFieldDecorator}
                />
                <div className="extra-info">
                  (Make sure this is the same as the unit in which you dispense this item.)
                </div>
              </div>
              <div className="info-block info-block--editable">
                <Input
                  name="reorderLevel"
                  label="Re-Order Level"
                  getFieldDecorator={getFieldDecorator}
                />
                <div className="extra-info">
                  (We'll send you e-mail alerts when stock level reaches or goes below the Reorder
                  Level.)
                </div>
              </div>
              <div className="info-block info-block--editable">
                <Input
                  name="price"
                  label="Retail Price (₹)"
                  getFieldDecorator={getFieldDecorator}
                />
              </div>
              <div className="info-block info-block--editable">
                <Select
                  required
                  name="itemType"
                  label="Item Type"
                  defaultValue="drug"
                  getFieldDecorator={getFieldDecorator}
                  values={[{ value: 'drug', label: 'Drug' }]}
                />
              </div>
            </div>
          </div>
          <div className="info-container--flex">
            <div className="item-info">
              <div className="secondary-header">
                <div className="title">Drug Details</div>
              </div>
              <div className="info-block info-block--editable">
                <Select
                  required
                  name="itemTypePrefix"
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
              </div>
              <div className="info-block info-block--editable">
                <Input
                  name="strength"
                  label="Drug Strength"
                  getFieldDecorator={getFieldDecorator}
                />
              </div>
              <div className="info-block info-block--editable">
                <Select
                  name="strengthUnit"
                  label="Strength Unit"
                  getFieldDecorator={getFieldDecorator}
                  values={[
                    { value: 'gm', label: 'gm' },
                    { value: 'units', label: 'units' },
                    { value: 'ml', label: 'ml' },
                    { value: 'na', label: 'NA' },
                  ]}
                />
              </div>
              <div className="info-block info-block--editable">
                <Input
                  name="instruction"
                  label="Instruction"
                  getFieldDecorator={getFieldDecorator}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const wrapped = Form.create()(InventoryNew);
const mapStateToProps = (state) => {
  const { Inventory } = state;
  return {
    loading: Inventory.isFetching,
    doneAction: Inventory.doneAction,
  };
};
const mapDispatchToProps = dispatch => ({
  addInventory: data => dispatch(addInventory(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(wrapped);
