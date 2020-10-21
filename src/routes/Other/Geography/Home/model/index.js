import modelEnhance from 'utils/modelEnhance'

export default modelEnhance({
  namespace: 'geographyHome',

  state: {
    isCurrentRoute: false
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == '/geography/home' ? true : false,
          }
        })
      });
    }
  },

  effects: {
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload
        }
      })
    }
  },

})