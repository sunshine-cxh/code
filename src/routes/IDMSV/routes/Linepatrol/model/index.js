/*
 * @Descripttion : 安检巡线
 * @Author       : caojiarong
 * @Date         : 2020-07-20 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-21 17:46:54
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'linepatrol',

  state: {
    zoom:9,
    constructionState:[],
    hiddenState:{
      todayReceipt: {
        "currentConstructionCount": "0",
        "currentHiddenAttributes": "0",
        "hiddenAndConstructionCount": "0",
        "todayConstruction": "0",
        "todayHandledConstruction": "0",
        "todayHandledHidden": "0",
        "todayHiddenAttributes": "0",
        "todayUnHandledConstruction": "0",
        "todayUnHandledHidden": "0"
      },
      usersCount: {
        "offLineCount": 0,
        "onLineCount": 0,
        "totalCount": 0
      }
    },
    usersPosition:[],
    carsPosition:[],
    userList:[],
    staffTrackData:{}
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'getconstructionstate',
      })

      yield put({
        type:'gethiddenstate'
      })

      yield put({
        type:'getusersposition'
      })

      yield put({
        type:'getcarposition'
      })

      yield put({
        type:'getUserList'
      })


    },

    // 大屏展示施工/隐患状态统计
    *getconstructionstate({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'constructionState',
          url: `${apiPrefix}/inspection/getconstructionstate`
        },
      })
    },

    // 今日隐患/施工接口
    *gethiddenstate({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'hiddenState',
          url: `${apiPrefix}/inspection/gethiddenstate`
        },
      })
    },

    // 获取人员位置接口
    *getusersposition({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'usersPosition',
          url: `${apiPrefix}/inspection/getusersposition`
        },
      })
    },

    // 获取车辆位置接口
    *getcarposition({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'carsPosition',
          url: `${apiPrefix}/inspection/getcarposition`
        },
      })
    },

    // 获取在线员工列表
    *getUserList({payload}, {call, put, select}){
      yield put.resolve({
        type: '@request',
        afterResponse: res =>{
          return Format.selectDictFormat(res,'userId','userName')
        },
        payload:{
          valueField: 'userList',
          url: `${apiPrefix}/inspection/getonlineusers`
        }
      })
    },

    //获取单个人员的轨迹查询接口
    *getusertrack({payload}, {call,put, select}){
      yield put.resolve({
        type: 'request',
        payload:{
          valueField: 'staffTrackData',
          url:`${apiPrefix}/inspection/getusertrack`,
          data:{
            userId,
            date
          }
        }
      })
    }

  },

  reducers: {},
})
