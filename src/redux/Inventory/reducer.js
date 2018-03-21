import { actions as types } from './actions';

type State = {
  lists: Array,
  doneAction: string | null,
  isFetching: boolean,
  error: string | null,
  selected: null,
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
    case types.INVENTORY_ADD_REQUEST:
    case types.INVENTORY_EDIT_REQUEST:
    case types.INVENTORY_FETCH_ALL_REQUEST:
    case types.INVENTORY_FETCH_ITEM_REQUEST:
    case types.INVENTORY_DELETE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.INVENTORY_ADD_FAILED:
    case types.INVENTORY_EDIT_FAILED:
    case types.INVENTORY_FETCH_ALL_FAILED:
    case types.INVENTORY_FETCH_ITEM_FAILED:
    case types.INVENTORY_DELETE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.INVENTORY_FETCH_ALL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lists: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.INVENTORY_FETCH_ITEM_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selected: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.INVENTORY_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'add',
      };
    }
    case types.INVENTORY_EDIT_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'edit' };
    }
    case types.INVENTORY_DELETE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'delete' };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
