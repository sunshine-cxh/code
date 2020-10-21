/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-03 14:53:29
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routePrefix } from '../../../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'MessageEdit',

  state: {
    flowworkList: [],
    brandList: [],
    unitList: [],
    supplyList: [],
    basicInfos: {},
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname ===  `${routePrefix}message/subMessageEdit`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
            },
          })
        }
      })
    },
  },
  effects: {
    // 获取留言详情
    *getMessageDetail({ payload }, { put }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/webmessage/getdetail?id=${id}`,
        },
      })
    },
    // 内容编辑
    *submit({ payload }, { call, put, select }) {
      const { basicInfos } = yield select((state) => state.MessageEdit)
      let remark=''
      if(basicInfos.remark){
        remark = basicInfos.remark
      }
      let postData = {
        name:  basicInfos.name,
        email:  basicInfos.email,
        phone:  basicInfos.phone,
        message:  basicInfos.message, 
        id: basicInfos.id,
        remark: remark
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/webmessage/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    // 保存内容
    *save({ payload }, { call, put, select }) {
      const { basicInfos } = yield select((state) => state.MessageEdit)
      let postData = {
        ...basicInfos,
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/webmessage/edit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    // 删除文件
    *deleteFile({ payload }, { put }) {
      let postData = {
        id: payload.record.fileId,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/file/delete`,
          data: postData,
        },
      })
    },
  },
  reducers: {
    basicInfosChange(state, { payload }) {
      return {
        ...state,
        basicInfos: {
          ...state.basicInfos,
          [payload.key]: payload.val,
        },
      }
    },
  },
})
