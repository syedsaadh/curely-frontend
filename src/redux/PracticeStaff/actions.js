import service from '../../services/practicestaff';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  PRACTICE_STAFF_FETCH_ALL_REQUEST: 'PRACTICE_STAFF_FETCH_ALL_REQUEST',
  PRACTICE_STAFF_FETCH_ALL_SUCCESS: 'PRACTICE_STAFF_FETCH_ALL_SUCCESS',
  PRACTICE_STAFF_FETCH_ALL_FAILED: 'PRACTICE_STAFF_FETCH_ALL_FAILED',

  PRACTICE_STAFF_FETCH_DOCTORS_REQUEST: 'PRACTICE_STAFF_FETCH_DOCTORS_REQUEST',
  PRACTICE_STAFF_FETCH_DOCTORS_SUCCESS: 'PRACTICE_STAFF_FETCH_DOCTORS_SUCCESS',
  PRACTICE_STAFF_FETCH_DOCTORS_FAILED: 'PRACTICE_STAFF_FETCH_DOCTORS_FAILED',

  PRACTICE_STAFF_ADD_REQUEST: 'PRACTICE_STAFF_ADD_REQUEST',
  PRACTICE_STAFF_ADD_SUCCESS: 'PRACTICE_STAFF_ADD_SUCCESS',
  PRACTICE_STAFF_ADD_FAILED: 'PRACTICE_STAFF_ADD_FAILED',

  PRACTICE_STAFF_EDIT_REQUEST: 'PRACTICE_STAFF_EDIT_REQUEST',
  PRACTICE_STAFF_EDIT_SUCCESS: 'PRACTICE_STAFF_EDIT_SUCCESS',
  PRACTICE_STAFF_EDIT_FAILED: 'PRACTICE_STAFF_EDIT_FAILED',

  PRACTICE_STAFF_DELETE_REQUEST: 'PRACTICE_STAFF_DELETE_REQUEST',
  PRACTICE_STAFF_DELETE_SUCCESS: 'PRACTICE_STAFF_DELETE_SUCCESS',
  PRACTICE_STAFF_DELETE_FAILED: 'PRACTICE_STAFF_DELETE_FAILED',

  SELECT_PRACTICE_STAFF: 'SELECT_PRACTICE_STAFF',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.PRACTICE_STAFF_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.PRACTICE_STAFF_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.PRACTICE_STAFF_FETCH_ALL_FAILED,
  payload: error,
});

export const fetchDoctorsRequest = () => ({
  type: actions.PRACTICE_STAFF_FETCH_DOCTORS_REQUEST,
});
export const fetchDoctorsSuccess = data => ({
  type: actions.PRACTICE_STAFF_FETCH_DOCTORS_SUCCESS,
  payload: data,
});
export const fetchDoctorsFailed = error => ({
  type: actions.PRACTICE_STAFF_FETCH_DOCTORS_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.PRACTICE_STAFF_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.PRACTICE_STAFF_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.PRACTICE_STAFF_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.PRACTICE_STAFF_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.PRACTICE_STAFF_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.PRACTICE_STAFF_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.PRACTICE_STAFF_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.PRACTICE_STAFF_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.PRACTICE_STAFF_DELETE_FAILED,
  payload: error,
});

export const selectStaff = data => ({
  type: actions.SELECT_PRACTICE_STAFF,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllStaffs()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};
export const fetchDoctors = () => (dispatch) => {
  dispatch(fetchDoctorsRequest());
  service
    .getAllDoctors()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchDoctorsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchDoctorsFailed(error));
    });
};
export const addStaff = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addStaff(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editStaff = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editStaff(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteStaff = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteStaff(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
