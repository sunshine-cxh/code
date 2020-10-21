export default {
  //当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
  namespace: 'demo',

  //该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  state: {
    demo: []
  },

  //订阅数据
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/demo') !== -1) {
          //do something
        }
      });
    }
  },

  //effects是Action 处理器，处理异步动作
  effects: {},

  //reducers是Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {}
};
