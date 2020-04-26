import { StatusModel } from './types';
import { getApi, IResponse } from 'src/services/api';
import { types, flow, cast } from 'mobx-state-tree';
import { ISource } from 'src/types';

interface IData {
  status: string;
  sources: ISource[];
}
export const SourceModel = types.model({
  id: types.string,
  name: types.string,
  description: types.string,
  url: types.string,
  category: types.string,
  language: types.string,
  country: types.string,
});

export const SourcesPage = types
  .model({
    sources: types.array(SourceModel),
    status: StatusModel,
  })
  .actions(self => {
    const getSources = flow(function*() {
      try {
        const { body }: IResponse<IData> = yield getApi({
          url: 'https://newsapi.org/v2/sources',
          params: {
            language: 'en',
          },
        });

        self.sources = cast(body.sources);
      } catch (e) {
        self.status.error = e.message;
      }
    });

    return {
      getSources,
    };
  });
