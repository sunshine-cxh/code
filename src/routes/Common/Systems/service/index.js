import $$ from 'cmn-utils';

export async function getSystems(payload) {
  return $$.post(`/iams/system/getclientlist`,payload);
}
