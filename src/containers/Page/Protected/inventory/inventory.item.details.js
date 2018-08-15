import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import { each } from 'lodash';
import { FormComponentProps } from 'antd/lib/form/Form';
import { addInventory, toggleDoneAction, fetchItem } from '../../../../redux/Inventory/actions';
import { Input, Select } from '../../../../components/ui-components';
import './style.less';

interface Props extends FormComponentProps {
  addInventory: addInventory;
  doneAction: string;
  loading: boolean;
  fetchItem: fetchItem;
  toggleDoneAction: toggleDoneAction;
}
class InventoryNew extends React.Component<Props> {
  state = {};

  componentWillMount() {
    const { match } = this.props;
    this.props.fetchItem(match.params.id);
  }

  onEdit = () => {
    const { match } = this.props;
    this.props.history.push(`/dashboard/inventory/edit/${match.params.id}`);
  };
  onCancel = () => {
    this.props.history.push('/dashboard/inventory');
  };
  render() {
    const { loading, selected } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (!selected) return null;
    const {
      name,
      item_code,
      item_manufacturer,
      item_stocking_unit,
      item_reorder_level,
      item_retail_price,
      item_type,
      drug,
    } = selected;

    return (
      <div className="inventory-page">
        <div className="inventory-page__header">
          <div className="left">
            <div className="heading">Add Item</div>
          </div>
          <div className="center" />
          <div className="right actions">
            <div className="action-item">
              <Button onClick={this.onEdit} loading={loading} icon="edit" type="primary">
                Edit Item
              </Button>
            </div>
            <div className="action-item">
              <Button onClick={this.onCancel} icon="close">
                Back
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
                <div className="name">Name</div>
                <div className="value">{name}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Item Code</div>
                <div className="value">{item_code}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Item Manufacturer</div>
                <div className="value">{item_manufacturer}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Stocking Units</div>
                <div className="value">{item_stocking_unit}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Retail Price</div>
                <div className="value">{item_retail_price ? `${item_retail_price} ₹` : '-'}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Re-Order Level</div>
                <div className="value">{item_reorder_level}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Item Type</div>
                <div className="value">{item_type}</div>
              </div>
            </div>
          </div>
          <div className="info-container--flex">
            <div className="item-info">
              <div className="secondary-header">
                <div className="title">Drug Details</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Drug Type</div>
                <div className="value">{drug.drug_type}</div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Strength</div>
                <div className="value">
                  {drug.default_dosage} {drug.default_dosage_unit}
                </div>
              </div>
              <div className="info-block info-block--editable">
                <div className="name">Instruction</div>
                <div className="value">{drug.instruction}</div>
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
    selected: Inventory.selected,
  };
};
const mapDispatchToProps = dispatch => ({
  addInventory: data => dispatch(addInventory(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchItem: id => dispatch(fetchItem(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(wrapped);
