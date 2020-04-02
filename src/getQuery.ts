import qs from 'qs';

export function getQuery({ search }: any) {
  const query = qs.parse(`${search.slice(1)}`, {
    ignoreQueryPrefix: true,
  });
  return query;
}
