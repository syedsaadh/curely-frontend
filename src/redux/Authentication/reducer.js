import { omit as _omit } from 'lodash';
import auth from '../../utils/authenticator';
import { actions as types } from './actions';

const initState = {
  isAuthenticated: auth.isLoggedIn(),
  isFetching: false,
  error: null,
};

export default function sessionReducer(state = initState, action) {
  switch (action.type) {
    case types.REQUEST_AUTHENTICATION: {
      return { ...state, isFetching: true };
    }
    case types.REQUEST_SIGNUP: {
      return { ...state, isFetching: true };
    }
    case types.LOG_IN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: !!sessionStorage.jwt,
        isFetching: false,
        error: false,
      };
    }
    case types.LOG_OUT: {
      return { ...state, isAuthenticated: false };
    }
    case types.LOG_IN_FAILED: {
      return { ...state, error: action.payload, isFetching: false };
    }
    case types.SIGN_UP_SUCCESS: {
      return {
        ...state,
        successFullSignup: true,
        error: false,
        isFetching: false,
      };
    }
    case types.SIGN_UP_FAILED: {
      return { ...state, error: action.payload, isFetching: false };
    }
    case types.RESET_ERROR: {
      return { ...state, error: false };
    }
    case types.RESET_SUCCESSFULSIGNUP: {
      return _omit(state, ['successFullSignup']);
    }

    default:
      return state;
  }
}
