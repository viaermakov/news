import { types } from 'mobx-state-tree';

export enum DATA_STATE {
  initial = 'initial',
  loading = 'loading',
  loaded = 'loaded',
  failed = 'failed',
}

const DataStateModel = types.union(
  types.literal('initial'),
  types.literal('loading'),
  types.literal('loaded'),
  types.literal('failed'),
);

export const StatusModel = types.model({
  state: DataStateModel,
  error: types.string,
});
