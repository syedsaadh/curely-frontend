import service from '../../services/labtests';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  LAB_TESTS_FETCH_ALL_REQUEST: 'LAB_TESTS_FETCH_ALL_REQUEST',
  LAB_TESTS_FETCH_ALL_SUCCESS: 'LAB_TESTS_FETCH_ALL_SUCCESS',
  LAB_TESTS_FETCH_ALL_FAILED: 'LAB_TESTS_FETCH_ALL_FAILED',

  LAB_TESTS_ADD_REQUEST: 'LAB_TESTS_ADD_REQUEST',
  LAB_TESTS_ADD_SUCCESS: 'LAB_TESTS_ADD_SUCCESS',
  LAB_TESTS_ADD_FAILED: 'LAB_TESTS_ADD_FAILED',

  LAB_TESTS_EDIT_REQUEST: 'LAB_TESTS_EDIT_REQUEST',
  LAB_TESTS_EDIT_SUCCESS: 'LAB_TESTS_EDIT_SUCCESS',
  LAB_TESTS_EDIT_FAILED: 'LAB_TESTS_EDIT_FAILED',

  LAB_TESTS_DELETE_REQUEST: 'LAB_TESTS_DELETE_REQUEST',
  LAB_TESTS_DELETE_SUCCESS: 'LAB_TESTS_DELETE_SUCCESS',
  LAB_TESTS_DELETE_FAILED: 'LAB_TESTS_DELETE_FAILED',

  SELECT_LAB_TESTS: 'SELECT_LAB_TESTS',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.LAB_TESTS_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.LAB_TESTS_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.LAB_TESTS_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.LAB_TESTS_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.LAB_TESTS_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.LAB_TESTS_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.LAB_TESTS_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.LAB_TESTS_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.LAB_TESTS_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.LAB_TESTS_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.LAB_TESTS_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.LAB_TESTS_DELETE_FAILED,
  payload: error,
});

export const selectLabTests = data => ({
  type: actions.SELECT_LAB_TESTS,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllLabTests()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addLabTest = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addLabTest(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editLabTest = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editLabTest(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteLabTest = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteLabTest(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
