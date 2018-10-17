import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form/Form';

import { Button, Table, Popconfirm } from 'antd';
import { each } from 'lodash';
import { SelectableList, Space } from '../../../../components/ui-components';
import { openModal } from '../../../../redux/App/actions';
import { fetchWithDoctor as fetchAllDepartments } from '../../../../redux/Departments/actions';
import {
  fetchByDept,
  selectDepartment,
  discharge,
  toggleDoneAction,
} from '../../../../redux/IPD.Admission/actions';
import './style.less';

interface Props extends FormComponentProps {
  fetchByDept: fetchByDept;
  fetchAllDepartments: fetchAllDepartments;
  toggleDoneAction: toggleDoneAction;
}

class IPDManagePage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchAllDepartments();
  }
  componentWillReceiveProps = (nextProps) => {
    const { doneAction, selectedDept } = nextProps;
    if (doneAction === 'discharged') {
      this.props.fetchByDept(selectedDept.id);
      this.props.toggleDoneAction();
    }
  };

  onClearFilters = () => {};
  onAddPatient = () => {
    this.props.openModal('PatientAdmit');
  };
  onDepartmentSelected = (obj) => {
    this.props.selectDepartment(obj);
    this.props.fetchByDept(obj.id);
  };
  onDischarge = (record) => {
    this.props.openModal('PatientDischarge', { data: record });
  };
  columns = [
    {
      title: 'Patient Id',
      dataIndex: 'patient.id',
    },
    {
      title: 'Name',
      dataIndex: 'patient.name',
    },
    {
      title: 'Admitted On',
      dataIndex: 'admitted_on',
      render: val => moment(val).format('DD/MM/YYYY hh:mm A'),
    },
    {
      title: 'Bed No',
      dataIndex: 'bed_no',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="table-actions">
          <Button.Group>
            <Popconfirm
              title="Are you sure discharge the patient?"
              onConfirm={() => this.onDischarge(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small">Discharge</Button>
            </Popconfirm>
            <Button size="small" onClick={() => this.onDelete(record)}>
              Delete
            </Button>
          </Button.Group>
        </div>
      ),
    },
  ];
  render() {
    const { selectedDept } = this.props;
    const { Departments, loading, admitted } = this.props;
    const depts = [];
    each(Departments, item => depts.push({ id: item.id, label: item.name, value: item }));
    const { url } = this.props.match;
    return (
      <div className="grid-container grid-1-4 grid-container--ipdmanage">
        <div className="left-container content-sidebar-wrapper">
          <div className="page-heading">
            Departments
            <Button
              size="small"
              style={{ float: 'right' }}
              type="primary"
              onClick={this.onAddPatient}
            >
              + Admit
            </Button>
          </div>
          <div className="department-list-wrapper">
            <SelectableList
              list={depts}
              onItemClick={this.onDepartmentSelected}
              active={selectedDept ? selectedDept.id : ''}
            />
          </div>
        </div>
        <div className="right-container fixed-height">
          <div className="ipdmanage_header">
            <div>
              <div className="page-heading">
                Admitted Patients {selectedDept ? `- ${selectedDept.name}` : null}
              </div>
            </div>
            <div />
            <div>
              <Button type="primary" style={{ marginRight: 8 }} onClick={this.onClearFilters}>
                Clear
              </Button>
              <Button style={{ marginRight: 8 }}>Filter</Button>
            </div>
          </div>
          <div className="ipdmanage_content">
            <Table
              className="jalebi-table jalebi-table--small"
              loading={loading}
              pagination={{ pageSize: 6 }}
              columns={this.columns}
              dataSource={admitted}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Departments, IPDAdmission } = state;
  return {
    loading: IPDAdmission.isFetching,
    Departments: Departments.lists,
    admitted: IPDAdmission.lists,
    selectedDept: IPDAdmission.selectedDept,
    doneAction: IPDAdmission.doneAction,
  };
};
const mapDispatchToProps = dispatch => ({
  openModal: (modalName, modalProps) => dispatch(openModal(modalName, modalProps)),
  fetchAllDepartments: () => dispatch(fetchAllDepartments()),
  fetchByDept: dept => dispatch(fetchByDept(dept)),
  selectDepartment: dept => dispatch(selectDepartment(dept)),
  discharge: data => dispatch(discharge(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(IPDManagePage);
