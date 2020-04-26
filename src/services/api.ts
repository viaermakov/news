import { API_KEY } from 'src/constants';
import * as superagent from 'superagent';

export interface IResponse<T> {
  body: T;
  error: string;
}

type IMethod = 'get' | 'post' | 'put';

const superagentWithHeader = (method: IMethod, url: string) =>
  superagent[method](url).set({
    'X-Api-Key': API_KEY,
  });

interface IApi<T> {
  url: string;
  params?: T;
}

export async function getApi<T extends object>({ url, params }: IApi<T>) {
  const response = await superagentWithHeader('get', url).query({ ...params });
  return response;
}
