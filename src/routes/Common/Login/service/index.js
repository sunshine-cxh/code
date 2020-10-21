import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.post('/iams/system/gettoken', payload);
}