import { types } from 'mobx-state-tree';

export const StatusModel = types.model({
  isLoading: types.boolean,
  error: types.string,
});
