import globalReducer from '../reducers/global.reducer';
import { setUser } from './user.actions';
import { formFileSize } from '../helpers/functions.helper';
import { uploadFile } from '../services/static.service';

const { actions } = globalReducer;

export const init = (token = null) => async (dispatch) => {
  await dispatch(setUser(token));
  await dispatch(actions.setLogined(true));
};

export const loadFile = async (fileCandidate, type) => {
  const formData = new FormData();
  formData.append('file', fileCandidate);
  const { files } = await uploadFile(formData, type);
  return files.map((item) => ({ ...item, path: item.path, size: formFileSize(item.size) }));
};

export const setSidebarState = (newState = '') => async (dispatch, getState) => {
  const currentState = getState().global.get('isSidebarOpened');
  if (newState.toString()) {
    dispatch(actions.setSidebarState(newState));
    return;
  }
  dispatch(actions.setSidebarState(!currentState));
};
