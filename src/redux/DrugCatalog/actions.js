import service from '../../services/drugcatalog';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  DRUG_CATALOG_FETCH_ALL_REQUEST: 'DRUG_CATALOG_FETCH_ALL_REQUEST',
  DRUG_CATALOG_FETCH_ALL_SUCCESS: 'DRUG_CATALOG_FETCH_ALL_SUCCESS',
  DRUG_CATALOG_FETCH_ALL_FAILED: 'DRUG_CATALOG_FETCH_ALL_FAILED',

  DRUG_CATALOG_ADD_REQUEST: 'DRUG_CATALOG_ADD_REQUEST',
  DRUG_CATALOG_ADD_SUCCESS: 'DRUG_CATALOG_ADD_SUCCESS',
  DRUG_CATALOG_ADD_FAILED: 'DRUG_CATALOG_ADD_FAILED',

  DRUG_CATALOG_EDIT_REQUEST: 'DRUG_CATALOG_EDIT_REQUEST',
  DRUG_CATALOG_EDIT_SUCCESS: 'DRUG_CATALOG_EDIT_SUCCESS',
  DRUG_CATALOG_EDIT_FAILED: 'DRUG_CATALOG_EDIT_FAILED',

  DRUG_CATALOG_DELETE_REQUEST: 'DRUG_CATALOG_DELETE_REQUEST',
  DRUG_CATALOG_DELETE_SUCCESS: 'DRUG_CATALOG_DELETE_SUCCESS',
  DRUG_CATALOG_DELETE_FAILED: 'DRUG_CATALOG_DELETE_FAILED',

  SELECT_PROCEDURE: 'SELECT_PROCEDURE',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.DRUG_CATALOG_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.DRUG_CATALOG_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.DRUG_CATALOG_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.DRUG_CATALOG_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.DRUG_CATALOG_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.DRUG_CATALOG_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.DRUG_CATALOG_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.DRUG_CATALOG_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.DRUG_CATALOG_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.DRUG_CATALOG_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.DRUG_CATALOG_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.DRUG_CATALOG_DELETE_FAILED,
  payload: error,
});

export const selectDrug = data => ({
  type: actions.SELECT_PROCEDURE,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllDrugs()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addDrug = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addDrug(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editDrug = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editDrug(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteDrug = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteDrug(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
