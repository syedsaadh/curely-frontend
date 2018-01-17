// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RouterProps, SwitchProps } from 'react-router';
import { Button, Table, Modal } from 'antd';
import { Divider } from '../../../../components/ui-components';
import { openModal } from '../../../../redux/App/actions';
import { fetchAll, deleteProcedure } from '../../../../redux/Procedures/actions';

const { confirm } = Modal;

type Props = {
  ...RouterProps,
  ...SwitchProps,
  fetchAll: Function,
};

class Procedures extends React.Component<Props> {
  state = {};
  componentWillMount() {
    this.props.fetchAll();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'delete') {
      this.props.fetchAll();
    }
  }
  onAddClick = () => {
    this.props.openModal('ProcedureAdd');
  };
  onEdit = (row) => {
    this.props.openModal('ProcedureEdit', { data: row });
  };
  onDelete = (data) => {
    const { deleteProcedure } = this.props;
    confirm({
      title: 'Are you sure delete this Procedure?',
      content: 'Appointments Related to this procedure will be Deleted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteProcedure(data.id);
      },
      onCancel() {},
    });
  };
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Cost (₹)',
      dataIndex: 'cost',
    },
    {
      title: 'Notes',
      dataIndex: 'instruction',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="table-actions">
          <Button.Group>
            <Button size="small" onClick={() => this.onEdit(record)}>
              Edit
            </Button>
            <Button size="small" onClick={() => this.onDelete(record)}>
              Delete
            </Button>
          </Button.Group>
        </div>
      ),
    },
  ];
  render() {
    const { lists, isFetching } = this.props;
    return (
      <div className="departments-container">
        <div className="main-header">
          <div className="left">
            <div className="title">Procedures Catalog</div>
          </div>
          <div className="middle" />
          <div className="right">
            <Button type="primary" onClick={this.onAddClick}>
              Add
            </Button>
          </div>
        </div>
        <Divider />
        <div className="pad-16">
          <Table
            className="jalebi-table jalebi-table--small"
            loading={isFetching}
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
  const { Procedures } = state;
  return {
    ...Procedures,
  };
};
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchAll: () => dispatch(fetchAll()),
  deleteProcedure: id => dispatch(deleteProcedure(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Procedures);
