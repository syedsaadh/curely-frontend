import auth from '../../utils/authenticator';
import sessionServices from '../../services/session';
import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  REQUEST_AUTHENTICATION: 'REQUEST_AUTHENTICATION',
  REQUEST_SIGNUP: 'REQUEST_SIGNUP',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILED: 'LOG_IN_FAILED',
  LOG_OUT: 'LOG_OUT',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILED: 'SIGN_UP_FAILED',
  RESET_ERROR: 'RESET_ERROR',
  RESET_SUCCESSFULSIGNUP: 'RESET_SUCCESSFULSIGNUP',

  VERIFY_ACCOUNT_REQUEST: 'VERIFY_ACCOUNT_REQUEST',
  VERIFY_ACCOUNT_SUCCESS: 'VERIFY_ACCOUNT_SUCCESS',
  VERIFY_ACCOUNT_FAILED: 'VERIFY_ACCOUNT_FAILED',

  SET_PASSWORD_REQUEST: 'SET_PASSWORD_REQUEST',
  SET_PASSWORD_SUCCESS: 'SET_PASSWORD_SUCCESS',
  SET_PASSWORD_FAILED: 'SET_PASSWORD_FAILED',
};

export const verifyAccountRequest = () => ({
  type: actions.VERIFY_ACCOUNT_REQUEST,
});
export const verifyAccountSuccess = data => ({
  type: actions.VERIFY_ACCOUNT_SUCCESS,
  payload: data,
});
export const verifyAccountFailed = error => ({
  type: actions.VERIFY_ACCOUNT_FAILED,
  payload: error,
});

export const verifyEmailToken = token => (dispatch) => {
  dispatch(verifyAccountRequest());
  return sessionServices
    .verifyEmail(token)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(verifyAccountSuccess(response.PayLoad));
    })
    .catch((error) => {
      console.log('Error: ', error);
      dispatch(verifyAccountFailed(error));
    });
};

export const setPasswordRequest = () => ({
  type: actions.SET_PASSWORD_REQUEST,
});
export const setPasswordSuccess = data => ({
  type: actions.SET_PASSWORD_SUCCESS,
  payload: data,
});
export const setPasswordFailed = error => ({
  type: actions.SET_PASSWORD_FAILED,
  payload: error,
});

export const setPassword = passwordWithToken => (dispatch) => {
  dispatch(setPasswordRequest());
  return sessionServices
    .setPassword(passwordWithToken)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(setPasswordSuccess(response.PayLoad));
    })
    .catch((error) => {
      console.log('Error: ', error);
      dispatch(setPasswordFailed(error));
    });
};

export const authenticationRequest = () => ({
  type: actions.REQUEST_AUTHENTICATION,
});
export const signupRequest = () => ({
  type: actions.REQUEST_SIGNUP,
});
export const loginSuccess = () => ({
  type: actions.LOG_IN_SUCCESS,
});
export const loginFailed = error => ({
  type: actions.LOG_IN_FAILED,
  payload: error,
});
export const signUpSuccess = () => ({
  type: actions.SIGN_UP_SUCCESS,
});
export const signUpFailed = error => ({
  type: actions.SIGN_UP_FAILED,
  payload: error,
});

export const resetError = () => ({
  type: actions.RESET_ERROR,
});
export const resetSuccessFulSignUp = () => ({
  type: actions.RESET_SUCCESSFULSIGNUP,
});

export const logOutUser = () => (dispatch) => {
  auth.logOut();
  dispatch({
    type: actions.LOG_OUT,
  });
};

export const authenticate = credentials => (dispatch) => {
  dispatch(authenticationRequest());
  return sessionServices
    .login(credentials)
    .then(checkStatus)
    .then(checkResponseCode)
    .then(response => response.Payload.token)
    .then((jwt) => {
      if (!jwt) return;
      auth.login(jwt);
      dispatch(loginSuccess());
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

export const signup = credentials => (dispatch) => {
  dispatch(signupRequest());
  return sessionServices
    .signup(credentials)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(signUpSuccess(response));
    })
    .catch((error) => {
      dispatch(signUpFailed(error));
    });
};
