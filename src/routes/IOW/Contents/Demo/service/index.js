import $$ from 'cmn-utils';

export async function demo(payload) {
  return $$.post('/demo', payload);
}