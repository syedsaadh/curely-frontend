import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { addInventory, toggleDoneAction, fetchAll } from '../../../../redux/Inventory/actions';

import './style.less';

interface Props extends FormComponentProps {
  addInventory: addInventory;
  doneAction: string;
  loading: boolean;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
}
class InventoryDetails extends React.Component<Props> {
  state = {};

  componentWillMount() {
    this.props.fetchAll();
  }
  onDetails = (id) => {
    this.props.history.push(`/dashboard/inventory/details/${id}`);
  };
  onNewItem = () => {
    this.props.history.push('/dashboard/inventory/new');
  };
  onAddStock = () => {
    this.props.history.push('/dashboard/inventory/stock/add');
  };
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Item Code',
      dataIndex: 'item_code',
    },
    {
      title: 'Manufacturer',
      dataIndex: 'item_manufacturer',
    },
    {
      title: 'Type',
      dataIndex: 'item_type',
    },
    {
      title: 'Retail Price',
      dataIndex: 'item_retail_price',
    },
    {
      title: 'Total Stocks',
      dataIndex: 'item_type2',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="table-actions">
          <Button icon="right" onClick={() => this.onDetails(record.id)}>
            Details
          </Button>
        </div>
      ),
    },
  ];
  render() {
    const { loading, lists } = this.props;
    return (
      <div className="inventory-page">
        <div className="inventory-page__header">
          <div className="left">
            <div className="heading">Inventory</div>
          </div>
          <div className="center" />
          <div className="right actions">
            <div className="action-item">
              <Button onClick={this.onNewItem} icon="plus">
                New Item
              </Button>
            </div>
            <div className="action-item">
              <Button.Group>
                <Button onClick={this.onAddStock}>Add Stock</Button>
                <Button>Consume Stock</Button>
              </Button.Group>
            </div>
          </div>
        </div>
        <div className="inventory-page__body">
          <Table
            className="jalebi-table jalebi-table--small"
            loading={loading}
            pagination={{ pageSize: 6 }}
            columns={this.columns}
            dataSource={lists}
            rowKey="id"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Inventory } = state;
  return {
    lists: Inventory.lists,
    loading: Inventory.isFetching,
    doneAction: Inventory.doneAction,
  };
};
const mapDispatchToProps = dispatch => ({
  addInventory: data => dispatch(addInventory(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetails);
