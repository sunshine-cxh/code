import $$ from 'cmn-utils';

export async function getData(payload) {
  return $$.post('/sgSolver/SGSolver/HeatingValueInit', payload);
}