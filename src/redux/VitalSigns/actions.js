import service from '../../services/vitalsigns';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  VITAL_SIGNS_FETCH_ALL_REQUEST: 'VITAL_SIGNS_FETCH_ALL_REQUEST',
  VITAL_SIGNS_FETCH_ALL_SUCCESS: 'VITAL_SIGNS_FETCH_ALL_SUCCESS',
  VITAL_SIGNS_FETCH_ALL_FAILED: 'VITAL_SIGNS_FETCH_ALL_FAILED',

  VITAL_SIGNS_ADD_REQUEST: 'VITAL_SIGNS_ADD_REQUEST',
  VITAL_SIGNS_ADD_SUCCESS: 'VITAL_SIGNS_ADD_SUCCESS',
  VITAL_SIGNS_ADD_FAILED: 'VITAL_SIGNS_ADD_FAILED',

  VITAL_SIGNS_EDIT_REQUEST: 'VITAL_SIGNS_EDIT_REQUEST',
  VITAL_SIGNS_EDIT_SUCCESS: 'VITAL_SIGNS_EDIT_SUCCESS',
  VITAL_SIGNS_EDIT_FAILED: 'VITAL_SIGNS_EDIT_FAILED',

  VITAL_SIGNS_DELETE_REQUEST: 'VITAL_SIGNS_DELETE_REQUEST',
  VITAL_SIGNS_DELETE_SUCCESS: 'VITAL_SIGNS_DELETE_SUCCESS',
  VITAL_SIGNS_DELETE_FAILED: 'VITAL_SIGNS_DELETE_FAILED',

  SELECT_PROCEDURE: 'SELECT_PROCEDURE',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.VITAL_SIGNS_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.VITAL_SIGNS_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.VITAL_SIGNS_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.VITAL_SIGNS_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.VITAL_SIGNS_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.VITAL_SIGNS_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.VITAL_SIGNS_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.VITAL_SIGNS_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.VITAL_SIGNS_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.VITAL_SIGNS_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.VITAL_SIGNS_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.VITAL_SIGNS_DELETE_FAILED,
  payload: error,
});

export const selectVitalSign = data => ({
  type: actions.SELECT_PROCEDURE,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllVitalSigns()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addVitalSign = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addVitalSign(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editVitalSign = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editVitalSign(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteVitalSign = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteVitalSign(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
