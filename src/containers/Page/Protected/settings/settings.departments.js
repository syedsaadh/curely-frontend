// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RouterProps, SwitchProps } from 'react-router';
import { Button, Table, Modal } from 'antd';
import { Divider } from '../../../../components/ui-components';
import { openModal } from '../../../../redux/App/actions';
import { fetchAll, deleteDepartment } from '../../../../redux/Departments/actions';

const { confirm } = Modal;

type Props = {
  ...RouterProps,
  ...SwitchProps,
  fetchAll: Function,
};

class Departments extends React.Component<Props> {
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
    this.props.openModal('DepartmentAdd');
  };
  onEdit = (row) => {
    this.props.openModal('DepartmentEdit', { data: row });
  };
  onDelete = (data) => {
    const { deleteDepartment } = this.props;
    confirm({
      title: 'Are you sure delete this department?',
      content: 'Appointments Related to this department will be Deleted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteDepartment(data.id);
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
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Beds',
      dataIndex: 'bed_count',
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
            <div className="title">Departments</div>
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
  const { Departments } = state;
  return {
    ...Departments,
  };
};
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchAll: () => dispatch(fetchAll()),
  deleteDepartment: id => dispatch(deleteDepartment(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Departments);
