import React from 'react';
import { connect } from 'react-redux';
import LabTestsDetail from './charting.labtests.details';
import LabTestsEdit from './charting.labtests.edit';
import { Procedure } from '../_types';
import './style.labtests.less';

type Props = {
  data: Array<Procedure>,
};
class LabTestsSection extends React.Component<Props> {
  state = {
    edit: false,
  };
  onEditClicked = () => {
    this.setState({
      edit: true,
    });
  };
  onCancel = () => {
    this.setState({
      edit: false,
    });
  };
  render() {
    const { edit } = this.state;
    const { data } = this.props;
    return (
      <div className="charting__item charting__item--lab-tests-container">
        {edit ? (
          <LabTestsEdit
            appointmentId={data[0].appointment_id} // To Revisit this code **
            data={data}
            onCancel={this.onCancel}
          />
        ) : (
          <LabTestsDetail data={data} onEditClicked={this.onEditClicked} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(LabTestsSection);
