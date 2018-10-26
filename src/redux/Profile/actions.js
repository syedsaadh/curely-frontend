import service from '../../services/profile';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILED: 'GET_PROFILE_FAILED',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILED: 'UPDATE_PROFILE_FAILED',

  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED',

  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const getProfileRequest = data => ({
  type: actions.GET_PROFILE_REQUEST,
  payload: data,
});

export const getProfileSucess = data => ({
  type: actions.GET_PROFILE_SUCCESS,
  payload: data,
});

export const getProfileFailed = error => ({
  type: actions.GET_PROFILE_FAILED,
  payload: error,
});

export const updateProfileRequest = data => ({
  type: actions.UPDATE_PROFILE_REQUEST,
  payload: data,
});

export const updateProfileSucess = data => ({
  type: actions.UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileFailed = error => ({
  type: actions.UPDATE_PROFILE_FAILED,
  payload: error,
});

export const changePasswordRequest = data => ({
  type: actions.CHANGE_PASSWORD_REQUEST,
  payload: data,
});

export const changePasswordSucess = data => ({
  type: actions.CHANGE_PASSWORD_SUCCESS,
  payload: data,
});

export const changePasswordFailed = error => ({
  type: actions.CHANGE_PASSWORD_FAILED,
  payload: error,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const getProfile = () => (dispatch) => {
  dispatch(getProfileRequest());
  service
    .getProfle()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(getProfileSucess(response.Payload));
    })
    .catch((error) => {
      dispatch(getProfileFailed(error));
    });
};
export const updateProfile = data => (dispatch) => {
  dispatch(updateProfileRequest());
  service
    .updateProfile(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateProfileSucess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateProfileFailed(error));
    });
};

export const changePassword = data => (dispatch) => {
  dispatch(changePasswordRequest());
  service
    .changePassword(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(changePasswordSucess(response.Payload));
    })
    .catch((error) => {
      dispatch(changePasswordFailed(error));
    });
};
