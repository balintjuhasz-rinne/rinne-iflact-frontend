import { fromJS } from 'immutable';

export const fromImmutableToPlainJS = (data) => (data ? fromJS(data).toJS() : data);
