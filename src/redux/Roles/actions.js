import service from '../../services/roles';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  ROLE_FETCH_ALL_REQUEST: 'ROLE_FETCH_ALL_REQUEST',
  ROLE_FETCH_ALL_SUCCESS: 'ROLE_FETCH_ALL_SUCCESS',
  ROLE_FETCH_ALL_FAILED: 'ROLE_FETCH_ALL_FAILED',

  ROLE_ADD_REQUEST: 'ROLE_ADD_REQUEST',
  ROLE_ADD_SUCCESS: 'ROLE_ADD_SUCCESS',
  ROLE_ADD_FAILED: 'ROLE_ADD_FAILED',

  ROLE_EDIT_REQUEST: 'ROLE_EDIT_REQUEST',
  ROLE_EDIT_SUCCESS: 'ROLE_EDIT_SUCCESS',
  ROLE_EDIT_FAILED: 'ROLE_EDIT_FAILED',

  ROLE_DELETE_REQUEST: 'ROLE_DELETE_REQUEST',
  ROLE_DELETE_SUCCESS: 'ROLE_DELETE_SUCCESS',
  ROLE_DELETE_FAILED: 'ROLE_DELETE_FAILED',

  SELECT_ROLE: 'SELECT_ROLE',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.ROLE_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.ROLE_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.ROLE_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.ROLE_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.ROLE_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.ROLE_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.ROLE_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.ROLE_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.ROLE_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.ROLE_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.ROLE_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.ROLE_DELETE_FAILED,
  payload: error,
});

export const selectRole = data => ({
  type: actions.SELECT_ROLE,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllRoles()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};
