import React from 'react';
import { connect } from 'react-redux';
import TreatmentPlansDetail from './charting.treatmentplans.details';
import TreatmentPlansEdit from './charting.treatmentplans.edit';
import { Procedure } from '../_types';
import './style.treatmentplans.less';

type Props = {
  data: Array<Procedure>,
};
class TreatmentPlansSection extends React.Component<Props> {
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
      <div className="charting__item charting__item--treatment-plans-container">
        {edit ? (
          <TreatmentPlansEdit
            appointmentId={data[0].appointment_id} // To Revisit this code **
            data={data}
            onCancel={this.onCancel}
          />
        ) : (
          <TreatmentPlansDetail data={data} onEditClicked={this.onEditClicked} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TreatmentPlansSection);
