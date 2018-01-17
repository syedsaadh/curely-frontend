// ApiUtils.js
import { each } from 'lodash';
import { store } from '../config/store/store.dev';
import { logOutUser } from '../redux/Authentication/actions';

export const checkStatus = (response) => {
  console.log('CheckStatus : ', response);
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status === 401) {
    store.dispatch(logOutUser());
    throw new Error('Unauthorized');
  }
  return response.json().then((err) => {
    throw new Error(err.Error);
  });
};
export const checkResponseCode = (response) => {
  console.log('checkResponseCode : ', response);
  const err = {};
  if (response.Code === 0) {
    return response;
  } else if (response.Code === 3) {
    const errors = [];
    each(response.Error.fields, value => errors.push(value));
    err.message = response.Message;
    err.errors = errors;
    throw err;
  }
  err.message = response.Message;
  err.errors = [response.Error];
  throw err;
};
