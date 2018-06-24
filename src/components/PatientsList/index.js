import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Dropdown, Menu, Icon } from 'antd';
import { each } from 'lodash';
import { SelectableList, Select } from '../ui-components';
import {
  fetchAll,
  selectPatient,
  toggleDoneAction,
  sortById,
  sortByName,
} from '../../redux/Patients/actions';
import './style.less';

const TabPane = Tabs.TabPane;

class PatientsList extends React.Component {
  state = {};
  componentWillMount() {
    this.props.fetchAll();
  }
  componentDidUpdate() {
    const { Patients } = this.props;
    if (Patients.doneAction === 'fetch') {
      this.listAllPatients.scrollToSelected();
      this.props.toggleDoneAction();
    }
  }
  onPatientSelect = (data) => {
    const { history, url } = this.props;
    this.props.selectPatient(data);
    history.push(`${url}/${data.id}`);
  };
  onFilterSelected = (val) => {
    console.log(val);
    if (val.key === 'sort.name') {
      this.props.sortByName();
    }
    if (val.key === 'sort.date') {
      this.props.sortById();
    }
  };
  renderSortMenu = () => (
    <Menu onClick={this.onFilterSelected}>
      <Menu.Item key="sort.name">Name</Menu.Item>
      <Menu.Item key="sort.date">Date Created</Menu.Item>
    </Menu>
  );
  render() {
    const {
      all, recent, today, selected,
    } = this.props.Patients;
    const allPatient = [];
    const recentPatient = [];
    const todayPatient = [];
    each(all, item => allPatient.push({ id: item.id, label: item.name, value: item }));
    each(recent, item => recentPatient.push({ id: item.id, label: item.name, value: item }));
    each(today, item => todayPatient.push({ id: item.id, label: item.name, value: item }));

    return (
      <div className="patients-list-container">
        <div className="filter-row">
          <Dropdown className="" overlay={this.renderSortMenu()} trigger={['click']}>
            <div className="filter-row__label">
              Sort By <Icon type="down" />
            </div>
          </Dropdown>
        </div>
        <Tabs defaultActiveKey="3" type="card">
          <TabPane tab="Today" key="1">
            <SelectableList
              list={todayPatient}
              onRef={(ref) => {
                this.listAllPatients = ref;
              }}
              onItemClick={this.onPatientSelect}
              active={selected ? selected.id : ''}
            />
          </TabPane>
          <TabPane tab="Recent" key="2">
            <SelectableList
              list={recentPatient}
              onRef={(ref) => {
                this.listAllPatients = ref;
              }}
              active={selected ? selected.id : ''}
              onItemClick={this.onPatientSelect}
            />
          </TabPane>
          <TabPane tab="All" key="3">
            <SelectableList
              list={allPatient}
              onRef={(ref) => {
                this.listAllPatients = ref;
              }}
              active={selected ? selected.id : ''}
              onItemClick={this.onPatientSelect}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Patients } = state;
  return {
    Patients,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchAll: () => dispatch(fetchAll()),
  selectPatient: data => dispatch(selectPatient(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  sortById: () => dispatch(sortById()),
  sortByName: () => dispatch(sortByName()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
