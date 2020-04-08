import qs from 'qs';
import * as H from 'history';

export function getQuery({ search }: H.Location) {
  const query = qs.parse(`${search.slice(1)}`, {
    ignoreQueryPrefix: true,
  });
  return query;
}
