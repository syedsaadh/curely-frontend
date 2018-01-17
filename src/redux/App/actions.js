export const actions = {
  COLLPSE_CHANGE: 'COLLPSE_CHANGE',
  COLLPSE_OPEN_DRAWER: 'COLLPSE_OPEN_DRAWER',
  CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
  TOGGLE_ALL: 'TOGGLE_ALL',
  CHANGE_CURRENT: 'CHANGE_CURRENT',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  TOGGLE_MODAL_EDITED: 'TOGGLE_MODAL_EDITED',
};

export function getView(width) {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}

export function toggleCollapsed() {
  return {
    type: actions.COLLPSE_CHANGE,
  };
}
export function toggleAll(width, height) {
  const view = getView(width);
  const collapsed = view !== 'DesktopView';
  return {
    type: actions.TOGGLE_ALL,
    collapsed,
    view,
    height,
  };
}
export function toggleOpenDrawer() {
  return {
    type: actions.COLLPSE_OPEN_DRAWER,
  };
}
export function changeOpenKeys(openKeys) {
  return {
    type: actions.CHANGE_OPEN_KEYS,
    openKeys,
  };
}
export function changeCurrent(current) {
  return {
    type: actions.CHANGE_CURRENT,
    current,
  };
}
export function openModal(name, props) {
  return {
    type: actions.OPEN_MODAL,
    payload: {
      modalName: name,
      modalProps: props,
    },
  };
}
export function toggleModalEdited() {
  return {
    type: actions.TOGGLE_MODAL_EDITED,
  };
}
export function closeModal() {
  return {
    type: actions.CLOSE_MODAL,
  };
}
