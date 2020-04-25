import { API_KEY } from 'src/constants';
import { ICategory } from 'src/types';
import * as superagent from 'superagent';

export interface IResponse<T> {
  body: T;
  error: string;
}

type countryParamType = 'ru' | 'en';

export interface IParams {
  category?: ICategory;
  country?: countryParamType;
  q?: string;
  pageSize?: number;
  page?: number;
}

type IMethod = 'get' | 'post' | 'put';

const superagentWithHeader = (method: IMethod, url: string) =>
  superagent[method](url).set({
    'X-Api-Key': API_KEY,
  });

interface IApi {
  url: string;
  params?: IParams;
}

export async function getApi({ url, params }: IApi) {
  const response = await superagentWithHeader('get', url).query({ ...params });
  return response;
}
