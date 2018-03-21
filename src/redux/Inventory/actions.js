import service from '../../services/inventory';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  INVENTORY_FETCH_ALL_REQUEST: 'INVENTORY_FETCH_ALL_REQUEST',
  INVENTORY_FETCH_ALL_SUCCESS: 'INVENTORY_FETCH_ALL_SUCCESS',
  INVENTORY_FETCH_ALL_FAILED: 'INVENTORY_FETCH_ALL_FAILED',

  INVENTORY_FETCH_ITEM_REQUEST: 'INVENTORY_FETCH_ITEM_REQUEST',
  INVENTORY_FETCH_ITEM_SUCCESS: 'INVENTORY_FETCH_ITEM_SUCCESS',
  INVENTORY_FETCH_ITEM_FAILED: 'INVENTORY_FETCH_ITEM_FAILED',

  INVENTORY_ADD_REQUEST: 'INVENTORY_ADD_REQUEST',
  INVENTORY_ADD_SUCCESS: 'INVENTORY_ADD_SUCCESS',
  INVENTORY_ADD_FAILED: 'INVENTORY_ADD_FAILED',

  INVENTORY_EDIT_REQUEST: 'INVENTORY_EDIT_REQUEST',
  INVENTORY_EDIT_SUCCESS: 'INVENTORY_EDIT_SUCCESS',
  INVENTORY_EDIT_FAILED: 'INVENTORY_EDIT_FAILED',

  INVENTORY_DELETE_REQUEST: 'INVENTORY_DELETE_REQUEST',
  INVENTORY_DELETE_SUCCESS: 'INVENTORY_DELETE_SUCCESS',
  INVENTORY_DELETE_FAILED: 'INVENTORY_DELETE_FAILED',

  SELECT_PROCEDURE: 'SELECT_PROCEDURE',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.INVENTORY_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.INVENTORY_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.INVENTORY_FETCH_ALL_FAILED,
  payload: error,
});
export const fetchItemRequest = () => ({
  type: actions.INVENTORY_FETCH_ITEM_REQUEST,
});
export const fetchItemSuccess = data => ({
  type: actions.INVENTORY_FETCH_ITEM_SUCCESS,
  payload: data,
});
export const fetchItemFailed = error => ({
  type: actions.INVENTORY_FETCH_ITEM_FAILED,
  payload: error,
});
export const addRequest = () => ({
  type: actions.INVENTORY_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.INVENTORY_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.INVENTORY_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.INVENTORY_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.INVENTORY_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.INVENTORY_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.INVENTORY_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.INVENTORY_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.INVENTORY_DELETE_FAILED,
  payload: error,
});

export const selectInventory = data => ({
  type: actions.SELECT_PROCEDURE,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllInventory()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const fetchItem = id => (dispatch) => {
  dispatch(fetchItemRequest());
  service
    .getInventory(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchItemSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchItemFailed(error));
    });
};

export const addInventory = data => (dispatch) => {
  dispatch(addRequest());
  service
    .newItem(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editInventory = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editItem(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deleteInventory = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deleteItem(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
