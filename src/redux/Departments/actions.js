import service from '../../services/department';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  DEPARTMENT_FETCH_ALL_REQUEST: 'DEPARTMENT_FETCH_ALL_REQUEST',
  DEPARTMENT_FETCH_ALL_SUCCESS: 'DEPARTMENT_FETCH_ALL_SUCCESS',
  DEPARTMENT_FETCH_ALL_FAILED: 'DEPARTMENT_FETCH_ALL_FAILED',

  DEPARTMENT_ADD_REQUEST: 'DEPARTMENT_ADD_REQUEST',
  DEPARTMENT_ADD_SUCCESS: 'DEPARTMENT_ADD_SUCCESS',
  DEPARTMENT_ADD_FAILED: 'DEPARTMENT_ADD_FAILED',

  DEPARTMENT_EDIT_REQUEST: 'DEPARTMENT_EDIT_REQUEST',
  DEPARTMENT_EDIT_SUCCESS: 'DEPARTMENT_EDIT_SUCCESS',
  DEPARTMENT_EDIT_FAILED: 'DEPARTMENT_EDIT_FAILED',

  DEPARTMENT_DELETE_REQUEST: 'DEPARTMENT_DELETE_REQUEST',
  DEPARTMENT_DELETE_SUCCESS: 'DEPARTMENT_DELETE_SUCCESS',
  DEPARTMENT_DELETE_FAILED: 'DEPARTMENT_DELETE_FAILED',

  SELECT_DEPARTMENT: 'SELECT_DEPARTMENT',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.DEPARTMENT_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.DEPARTMENT_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.DEPARTMENT_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.DEPARTMENT_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.DEPARTMENT_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.DEPARTMENT_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.DEPARTMENT_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.DEPARTMENT_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.DEPARTMENT_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.DEPARTMENT_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.DEPARTMENT_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.DEPARTMENT_DELETE_FAILED,
  payload: error,
});

export const selectDepartment = data => ({
  type: actions.SELECT_DEPARTMENT,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllDepartment()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addDepartment = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addDepartment(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editDepartment = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editDepartment(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteDepartment = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteDepartment(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
