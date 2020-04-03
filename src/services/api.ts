import { ICategory } from "src/types";
import * as superagent from "superagent";

export interface IResponse<T> {
  body: T;
  error: string;
}

type countryParamType = "ru" | "en";

export interface IParams {
  category?: ICategory;
  country?: countryParamType;
  q?: string;
  pageSize?: number;
}

type IMethod = "get" | "post" | "put";

const superagentWithHeader = (method: IMethod, url: string) => {
  return superagent[method](url).set({
    "X-Api-Key": "4c0896c9234349aaa60d0a7ffba027c5"
  });
};

interface IApi {
  url: string;
  params?: IParams;
}

export async function getApi({ url, params }: IApi) {
  const response = await superagentWithHeader("get", url).query({ ...params });
  return response;
}
