import modalReducer from '../reducers/modal.reducer';

const { actions: modalActions } = modalReducer;

export const showModal = (name, options = {}) => (dispatch) => {
  dispatch(modalActions.showModal({ name, options }));
};

export const hideModal = (name) => (dispatch) => {
  dispatch(modalActions.hideModal({ name }));
};
