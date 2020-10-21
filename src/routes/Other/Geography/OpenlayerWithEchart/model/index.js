/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-08 16:54:33
 * @FilePath     : \ilng.iomp.web\src\routes\IGIS\Home\model\index.js
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'

export default modelEnhance({
  namespace: 'geographyHome',

  state: {
    dataSource: [
      {
        title: 'Libraries',
      },
      {
        title: 'Solutions',
      },
      {
        title: 'Articles',
      },
    ],
    treeData: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              { title: '0-0-1-0', key: '0-0-1-0' },
              { title: '0-0-1-1', key: '0-0-1-1' },
              { title: '0-0-1-2', key: '0-0-1-2' },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0' },
          { title: '0-1-0-1', key: '0-1-0-1' },
          { title: '0-1-0-2', key: '0-1-0-2' },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ],
    checkedKeys: [],
    expandedKeys: [],
    pageData:PageHelper.create(),
    parameters: {
      keyword:''
    },
    tableState:false
  },

  subscriptions: {},

  effects: {},

  reducers: {},
})
