import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { each } from 'lodash';
import { SelectableList } from '../ui-components';
import { fetchAll, selectPatient } from '../../redux/Patients/actions';
import './style.less';

const TabPane = Tabs.TabPane;

class PatientsList extends React.Component {
  state = {};
  componentWillMount() {
    this.props.fetchAll();
  }
  onPatientSelect = (data) => {
    const { history, url } = this.props;
    this.props.selectPatient(data);
    history.push(`${url}/${data.id}`);
  };
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
      <Tabs defaultActiveKey="1" size="small">
        <TabPane tab="Today" key="1">
          <SelectableList
            list={todayPatient}
            onItemClick={this.onPatientSelect}
            active={selected ? selected.id : ''}
          />
        </TabPane>
        <TabPane tab="Recent" key="2">
          <SelectableList
            list={recentPatient}
            active={selected ? selected.id : ''}
            onItemClick={this.onPatientSelect}
          />
        </TabPane>
        <TabPane tab="All" key="3">
          <SelectableList
            list={allPatient}
            active={selected ? selected.id : ''}
            onItemClick={this.onPatientSelect}
          />
        </TabPane>
      </Tabs>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
