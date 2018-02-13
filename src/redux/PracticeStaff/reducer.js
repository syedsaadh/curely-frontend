import { actions as types } from './actions';

type State = {
  lists: Array,
  doneAction: string | null,
  isFetching: boolean,
  error: string | null,
};

type Action = {
  type: string,
  payload: any,
};

const initState = {
  lists: [],
  doneAction: null,
  isFetching: false,
  error: null,
};

export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case types.PRACTICE_STAFF_ADD_REQUEST:
    case types.PRACTICE_STAFF_EDIT_REQUEST:
    case types.PRACTICE_STAFF_FETCH_ALL_REQUEST:
    case types.PRACTICE_STAFF_DELETE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.PRACTICE_STAFF_ADD_FAILED:
    case types.PRACTICE_STAFF_EDIT_FAILED:
    case types.PRACTICE_STAFF_FETCH_ALL_FAILED:
    case types.PRACTICE_STAFF_DELETE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.PRACTICE_STAFF_FETCH_ALL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lists: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.PRACTICE_STAFF_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'add',
      };
    }
    case types.PRACTICE_STAFF_EDIT_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'edit' };
    }
    case types.PRACTICE_STAFF_DELETE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'delete' };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
