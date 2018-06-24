import React from 'react';
import { connect } from 'react-redux';
import PrescriptionDetail from './charting.prescription.details';
import PrescriptionEdit from './charting.prescription.edit';
import { Prescription } from '../_types';
import './style.prescription.less';

type Props = {
  data: Array<Prescription>,
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
      <div className="charting__item charting__item--prescription-container">
        {edit ? (
          <PrescriptionEdit
            visitId={data[0].ipd_admission_visit_id} // To Revisit this code **
            data={data}
            onCancel={this.onCancel}
          />
        ) : (
          <PrescriptionDetail data={data} onEditClicked={this.onEditClicked} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(LabTestsSection);
