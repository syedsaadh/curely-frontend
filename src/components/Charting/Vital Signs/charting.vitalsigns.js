import React from 'react';
import { connect } from 'react-redux';
import VitalSignsDetail from './charting.vitalsigns.details';
import VitalSignsEdit from './charting.vitalsigns.details.edit';
import { VitalSignType } from '../_types';
import './style.vitalsigns.less';

type Props = {
  data: VitalSignType,
};
class VitalSignsSection extends React.Component<Props> {
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
      <div className="charting__item charting__item--vital-signs-container">
        {edit ? (
          <VitalSignsEdit
            vitalSignId={data.id}
            appointmentId={data.appointment_id}
            data={data.fields}
            onCancel={this.onCancel}
          />
        ) : (
          <VitalSignsDetail data={data.fields} onEditClicked={this.onEditClicked} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(VitalSignsSection);
