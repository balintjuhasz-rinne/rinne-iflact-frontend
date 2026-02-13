import flactService from '../services/flact';
import templatesReducer from '../reducers/templates.reducer';

const { actions: templateActions } = templatesReducer;

export const setTemplates = () => async (dispatch) => {
  const { templates } = await flactService.templates.getTemplates();
  await dispatch(templateActions.setTemplates(templates));
};

export const setSortConfig = (field, direction) => async (dispatch) => {
  dispatch(templateActions.setSortConfig({ field, direction }));
};

export const uploadTemplate = (fileId) => async (dispatch) => {
  const template = await flactService.templates.uploadTemplate(fileId);
  await dispatch(templateActions.updateTemplates(template));
};

export const removeTemplate = (id) => async (dispatch) => {
  await flactService.templates.removeTemplate(id);
  dispatch(templateActions.removeTemplate(id));
};
