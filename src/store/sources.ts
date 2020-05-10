import { IDataForm } from '../components/organisms/form/source-form';
import { StatusModel, DATA_STATE } from './types';
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

export const FormModel = types.model({
  fields: types.model({
    category: types.string,
    language: types.string,
    country: types.string,
  }),
  step: types.number,
});

export const SourcesPage = types
  .model({
    sources: types.array(SourceModel),
    status: StatusModel,
    form: FormModel,
  })
  .views(self => ({
    get statuses() {
      return {
        isLoading: self.status.state === DATA_STATE.loading,
        isLoaded: self.status.state === DATA_STATE.loaded,
        error: self.status.error,
      };
    },
  }))
  .actions(self => {
    const getSources = flow(function*() {
      self.status.state = DATA_STATE.loading;

      try {
        const { body }: IResponse<IData> = yield getApi({
          url: 'https://newsapi.org/v2/sources',
          params: {
            language: 'en',
          },
        });

        self.sources = cast(body.sources);
        self.status.state = DATA_STATE.loaded;
      } catch (e) {
        self.status.state = DATA_STATE.failed;
        self.status.error = e.message;
      }
    });

    const saveForm = (data: IDataForm) => {
      self.form.fields = { ...self.form.fields, ...data };
    };

    const nextStep = (data: IDataForm) => {
      if (self.form.step === 1) {
        self.form.step = 0;
        return;
      }
      self.form.step = self.form.step + 1;
    };

    return {
      getSources,
      saveForm,
      nextStep,
    };
  });
