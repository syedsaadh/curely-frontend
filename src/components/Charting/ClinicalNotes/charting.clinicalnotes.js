import React from 'react';
import { connect } from 'react-redux';
import ClinicalNotesDetail from './charting.clinicalnotes.details';
import ClinicalNotesEdit from './charting.clinicalnotes.details.edit';
import { ClinicalNotes } from '../_types';
import './style.clinicalnotes.less';

type Props = {
  data: ClinicalNotes,
};
class ClinicalNotesSection extends React.Component<Props> {
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
      <div className="charting__item charting__item--clinical-notes-container">
        {edit ? (
          <ClinicalNotesEdit
            clinicalNotesId={data.id}
            appointmentId={data.appointment_id}
            data={data}
            onCancel={this.onCancel}
          />
        ) : (
          <ClinicalNotesDetail data={data} onEditClicked={this.onEditClicked} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ClinicalNotesSection);
