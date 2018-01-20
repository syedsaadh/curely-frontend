import service from '../../services/appointment';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  APPOINTMENT_FETCH_ALL_REQUEST: 'APPOINTMENT_FETCH_ALL_REQUEST',
  APPOINTMENT_FETCH_ALL_SUCCESS: 'APPOINTMENT_FETCH_ALL_SUCCESS',
  APPOINTMENT_FETCH_ALL_FAILED: 'APPOINTMENT_FETCH_ALL_FAILED',

  APPOINTMENT_ADD_REQUEST: 'APPOINTMENT_ADD_REQUEST',
  APPOINTMENT_ADD_SUCCESS: 'APPOINTMENT_ADD_SUCCESS',
  APPOINTMENT_ADD_FAILED: 'APPOINTMENT_ADD_FAILED',

  APPOINTMENT_EDIT_REQUEST: 'APPOINTMENT_EDIT_REQUEST',
  APPOINTMENT_EDIT_SUCCESS: 'APPOINTMENT_EDIT_SUCCESS',
  APPOINTMENT_EDIT_FAILED: 'APPOINTMENT_EDIT_FAILED',

  APPOINTMENT_CANCEL_REQUEST: 'APPOINTMENT_CANCEL_REQUEST',
  APPOINTMENT_CANCEL_SUCCESS: 'APPOINTMENT_CANCEL_SUCCESS',
  APPOINTMENT_CANCEL_FAILED: 'APPOINTMENT_CANCEL_FAILED',

  SELECT_APPOINTMENT: 'SELECT_APPOINTMENT',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.APPOINTMENT_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.APPOINTMENT_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.APPOINTMENT_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.APPOINTMENT_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.APPOINTMENT_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.APPOINTMENT_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.APPOINTMENT_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.APPOINTMENT_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.APPOINTMENT_EDIT_FAILED,
  payload: error,
});

export const cancelRequest = () => ({
  type: actions.APPOINTMENT_CANCEL_REQUEST,
});
export const cancelSuccess = data => ({
  type: actions.APPOINTMENT_CANCEL_SUCCESS,
  payload: data,
});
export const cancelFailed = error => ({
  type: actions.APPOINTMENT_CANCEL_FAILED,
  payload: error,
});

export const selectAppointment = data => ({
  type: actions.SELECT_APPOINTMENT,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllAppointments()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addAppointment = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addAppointment(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editAppointment = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editAppointment(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const cancel = id => (dispatch) => {
  dispatch(cancelRequest());
  service
    .cancelAppointment(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(cancelSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(cancelFailed(error));
    });
};
