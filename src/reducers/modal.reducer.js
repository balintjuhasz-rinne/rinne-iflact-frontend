import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

import {
  INVITE_COSIGNATORY_MODAL,
  REMOVE_USER_MODAL,
  CREATE_COMPANY_MODAL,
  EDIT_COMPANY_MODAL,
  DELETE_COMPANY_MODAL,
  ERROR_MODAL,
  VOTING_MODAL,
  CREATE_RESOLUTION_MODAL,
  DELETE_RESOLUTION_MODAL,
  EDIT_RESOLUTION_MODAL,
  VOTED_COSIGNATORIES_MODAL,
  CANCEL_RESOLUTION_MODAL,
  DELETE_USER_MODAL,
  EDIT_USER_PASSWORD_MODAL,
  SUCCESS_MODAL,
  INVITE_COWORKER_MODAL,
  UPLOAD_TEMPLATE_MODAL,
  INACTIVATE_USER_MODAL,
} from '../constants/modal.constants';

const DEFAULT_FIELDS = Map({
  [INVITE_COSIGNATORY_MODAL]: {
    isShown: false,
    options: {},
  },
  [REMOVE_USER_MODAL]: {
    isShown: false,
    options: {},
  },
  [CREATE_COMPANY_MODAL]: {
    isShown: false,
    options: {},
  },
  [EDIT_COMPANY_MODAL]: {
    isShown: false,
    options: {},
  },
  [EDIT_COMPANY_MODAL]: {
    isShown: false,
    options: {},
  },
  [DELETE_COMPANY_MODAL]: {
    isShown: false,
    options: {},
  },
  [ERROR_MODAL]: {
    isShown: false,
    options: {},
  },
  [VOTING_MODAL]: {
    isShown: false,
    options: {},
  },
  [CREATE_RESOLUTION_MODAL]: {
    isShown: false,
    options: {},
  },
  [DELETE_RESOLUTION_MODAL]: {
    isShown: false,
    options: {},
  },
  [VOTED_COSIGNATORIES_MODAL]: {
    isShown: false,
    options: {},
  },
  [CANCEL_RESOLUTION_MODAL]: {
    isShown: false,
    options: {},
  },
  [DELETE_USER_MODAL]: {
    isShown: false,
    options: {},
  },
  [EDIT_USER_PASSWORD_MODAL]: {
    isShown: false,
    options: {},
  },
  [SUCCESS_MODAL]: {
    isShown: false,
    options: {},
  },
  [INVITE_COWORKER_MODAL]: {
    isShown: false,
    options: {},
  },
  [EDIT_RESOLUTION_MODAL]: {
    isShown: false,
    options: {},
  },
  [UPLOAD_TEMPLATE_MODAL]: {
    isShown: false,
    options: {},
  },
  [INACTIVATE_USER_MODAL]: {
    isShown: false,
    options: {},
  },
});

export default createModule({
  name: 'modal',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    showModal: {
      reducer: (state, { payload }) => {
        state = state.set(payload.name, {
          isShown: true,
          options: payload.options,
        });

        return state;
      },
    },
    hideModal: {
      reducer: (state, { payload }) => {
        state = state.set(payload.name, {
          isShown: false,
          options: null,
        });
        return state;
      },
    },
  },
});
