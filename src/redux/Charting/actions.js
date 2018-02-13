import service from '../../services/charts';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST: 'APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST',
  APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS: 'APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS',
  APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED: 'APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED',

  APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST: 'APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST',
  APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS: 'APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS',
  APPOINTMENT_VITAL_SIGNS_DELETE_FAILED: 'APPOINTMENT_VITAL_SIGNS_DELETE_FAILED',

  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const updateVitalSignsRequest = () => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST,
});
export const updateVitalSignsSuccess = data => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS,
  payload: data,
});
export const updateVitalSignsFailed = error => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED,
  payload: error,
});

export const deleteVitalSignsRequest = () => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST,
});
export const deleteVitalSignsSuccess = data => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS,
  payload: data,
});
export const deleteVitalSignsFailed = error => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_DELETE_FAILED,
  payload: error,
});
export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});
export const updateVitalSigns = data => (dispatch) => {
  dispatch(updateVitalSignsRequest());
  service
    .updateVitalSigns(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateVitalSignsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateVitalSignsFailed(error));
    });
};
export const deleteVitalSigns = appointmentId => (dispatch) => {
  dispatch(deleteVitalSignsRequest());
  service
    .deleteVitalSigns(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteVitalSignsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteVitalSignsFailed(error));
    });
};
