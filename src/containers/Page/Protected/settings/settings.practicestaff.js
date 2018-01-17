// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RouterProps, SwitchProps } from 'react-router';
import { Button, Table, Modal, Radio } from 'antd';
import { filter as _filter } from 'lodash';
import { Divider } from '../../../../components/ui-components';
import { openModal } from '../../../../redux/App/actions';
import { fetchAll, deleteStaff } from '../../../../redux/PracticeStaff/actions';
import { fetchAll as fetchAllRoles } from '../../../../redux/Roles/actions';

const { confirm } = Modal;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

type Props = {
  ...RouterProps,
  ...SwitchProps,
  fetchAll: Function,
  fetchAllRoles: Function,
};
type State = {
  staffType: string,
};
class PracticeStaff extends React.Component<Props, State> {
  state = {
    staffType: 'admin',
  };
  componentWillMount() {
    this.props.fetchAll();
    this.props.fetchAllRoles();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'delete') {
      this.props.fetchAll();
    }
  }
  onAddClick = () => {
    this.props.openModal('PracticeStaffAdd');
  };
  onEdit = (row) => {
    this.props.openModal('PracticeStaffEdit', { data: row });
  };
  onDelete = (data) => {
    const { deleteStaff } = this.props;
    confirm({
      title: 'Are you sure delete this Procedure?',
      content: 'Appointments Related to this procedure will be Deleted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteStaff(data.id);
      },
      onCancel() {},
    });
  };
  onTabChange = (e) => {
    this.setState({
      staffType: e.target.value,
    });
  };
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'ACCESS TYPE',
      dataIndex: 'role',
      render: text => <span>{text.toUpperCase()}</span>,
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
    const { staffType } = this.state;
    let tableData;
    if (staffType === 'other') {
      tableData = _filter(lists, data => !['admin', 'doctor'].includes(data.role));
    } else {
      tableData = _filter(lists, data => data.role === staffType);
    }

    return (
      <div className="departments-container">
        <div className="main-header">
          <div className="left">
            <div className="title">Practice Staff</div>
          </div>
          <div className="middle">
            <RadioGroup
              className="tab-radio-group"
              defaultValue="admin"
              size="middle"
              onChange={this.onTabChange}
            >
              <RadioButton value="admin">Admins</RadioButton>
              <RadioButton value="doctor">Doctors</RadioButton>
              <RadioButton value="other">Other Staff</RadioButton>
            </RadioGroup>
          </div>
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
            dataSource={tableData}
            rowKey="id"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state.PracticeStaff,
});
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchAll: () => dispatch(fetchAll()),
  deleteStaff: id => dispatch(deleteStaff(id)),
  fetchAllRoles: () => dispatch(fetchAllRoles()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PracticeStaff);
