/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-01 11:09:51
 * @FilePath     : \ilng.iomp.web\src\routes\IGIS\Home\model\index.js
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'

export default modelEnhance({
  namespace: 'geographyHome',

  state: {
    zoom: 14, //缩放比列
    lineLength: 0, //线段长度
    area: 0, //面积大小
    point:[0,0],//坐标，x,y
    centralCoordinates:[113.28236014172502, 22.16642221099955],//中心点坐标
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
    ],//搜索历史记录
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
    pageData: PageHelper.create(),
    parameters: {
      keyword: '',
    },
    tableState: false,
  },

  subscriptions: {},

  effects: {},

  reducers: {},
})
