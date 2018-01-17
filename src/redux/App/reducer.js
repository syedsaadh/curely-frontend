import { actions as types, getView } from './actions';
import moment from 'moment-timezone';

const initState = {
  collapsed: !(window.innerWidth > 1700),
  view: getView(window.innerWidth),
  height: window.innerHeight,
  openDrawer: false,
  openKeys: [],
  current: '',
  modal: null,
  modalEdited: false,
  timezone: moment.tz.guess(),
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case types.COLLPSE_CHANGE:
      return { ...state, collapsed: !state.collapsed };
    case types.COLLPSE_OPEN_DRAWER:
      return { ...state, openDrawer: !state.openDrawer };
    case types.TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height,
        };
      }
      break;
    case types.CHANGE_OPEN_KEYS:
      return { ...state, openKeys: action.openKeys };
    case types.CHANGE_CURRENT:
      return { ...state, current: action.current };
    case types.OPEN_MODAL: {
      return { ...state, modal: action.payload, modalEdited: false };
    }
    case types.CLOSE_MODAL: {
      return { ...state, modal: null, modalEdited: false };
    }
    case types.TOGGLE_MODAL_EDITED: {
      return { ...state, modalEdited: true };
    }
    default:
      return state;
  }
  return state;
}
