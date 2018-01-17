import service from '../../services/procedures';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  PROCEDURES_FETCH_ALL_REQUEST: 'PROCEDURES_FETCH_ALL_REQUEST',
  PROCEDURES_FETCH_ALL_SUCCESS: 'PROCEDURES_FETCH_ALL_SUCCESS',
  PROCEDURES_FETCH_ALL_FAILED: 'PROCEDURES_FETCH_ALL_FAILED',

  PROCEDURES_ADD_REQUEST: 'PROCEDURES_ADD_REQUEST',
  PROCEDURES_ADD_SUCCESS: 'PROCEDURES_ADD_SUCCESS',
  PROCEDURES_ADD_FAILED: 'PROCEDURES_ADD_FAILED',

  PROCEDURES_EDIT_REQUEST: 'PROCEDURES_EDIT_REQUEST',
  PROCEDURES_EDIT_SUCCESS: 'PROCEDURES_EDIT_SUCCESS',
  PROCEDURES_EDIT_FAILED: 'PROCEDURES_EDIT_FAILED',

  PROCEDURES_DELETE_REQUEST: 'PROCEDURES_DELETE_REQUEST',
  PROCEDURES_DELETE_SUCCESS: 'PROCEDURES_DELETE_SUCCESS',
  PROCEDURES_DELETE_FAILED: 'PROCEDURES_DELETE_FAILED',

  SELECT_PROCEDURE: 'SELECT_PROCEDURE',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.PROCEDURES_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.PROCEDURES_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.PROCEDURES_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.PROCEDURES_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.PROCEDURES_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.PROCEDURES_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.PROCEDURES_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.PROCEDURES_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.PROCEDURES_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.PROCEDURES_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.PROCEDURES_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.PROCEDURES_DELETE_FAILED,
  payload: error,
});

export const selectProcedure = data => ({
  type: actions.SELECT_PROCEDURE,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllProcedures()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addProcedure = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addProcedure(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editProcedure = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editProcedure(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteProcedure = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteProcedure(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
