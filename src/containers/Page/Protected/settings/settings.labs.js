// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RouterProps, SwitchProps } from 'react-router';
import { Button, Table, Modal } from 'antd';
import { Divider } from '../../../../components/ui-components';
import { openModal } from '../../../../redux/App/actions';
import { fetchAll, deleteLabTest } from '../../../../redux/LabTests/actions';

const { confirm } = Modal;

type Props = {
  ...RouterProps,
  ...SwitchProps,
  fetchAll: Function,
};

class LabTests extends React.Component<Props> {
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
    this.props.openModal('LabTestAdd');
  };
  onEdit = (row) => {
    this.props.openModal('LabTestEdit', { data: row });
  };
  onDelete = (data) => {
    const { deleteLabTest } = this.props;
    confirm({
      title: 'Are you sure delete this Lab Test?',
      content: 'Appointments Related to this Lab Test will be Deleted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteLabTest(data.id);
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
      dataIndex: 'description',
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
            <div className="title">Lab Tests</div>
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
  const { LabTests } = state;
  return {
    ...LabTests,
  };
};
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchAll: () => dispatch(fetchAll()),
  deleteLabTest: id => dispatch(deleteLabTest(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LabTests);
