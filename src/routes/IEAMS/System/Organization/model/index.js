/*
 * @Descripttion : 组织管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-13 11:19:47
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-15 17:08:21
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'organization',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    listData: [], //表格数据
    expandedRowKeys: [], //表格树展开keys
    enterpriseList: [], //企业列表
    toolbarSelectorValue: '',
    organizationType: [], //组织机构 for modal selectTree
    modalEnterpriseSelectorValue: '', //modal Enterprise seletor value
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.organization)
      yield put.resolve({
        type: 'getEnterprise',
        payload: {
          pageData: PageHelper.create().startPage(1, 10000), //一次性取完，所以取一页10000条。
        },
      })

      let { toolbarSelectorValue } = yield select((state) => state.organization)

      yield put.resolve({
        type: 'getOrganizationType',
        payload: {
          enterpriseId: toolbarSelectorValue,
        },
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: {
          values: {
            enterpriseId: toolbarSelectorValue,
          },
        },
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters } = yield select((state) => state.organization)
      let { values } = payload
      let data = {
        ...parameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'listData',
          url: `${apiPrefix}/organization/getlistdata?enterpriseId=${data.enterpriseId}`,
          data: data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })

      let { listData } = yield select((state) => state.organization)

      yield put({
        type: '@change',
        payload: {
          expandedRowKeys: Format.multiToKeysFormat(listData),
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData, modalEnterpriseSelectorValue } = yield select(
        (state) => state.organization
      )

      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/organization/submit`,
          data: values,
          success: (res) => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })

      yield put.resolve({
        type: 'getOrganizationType',
        payload: {
          enterpriseId: modalEnterpriseSelectorValue,
        },
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData, toolbarSelectorValue } = yield select(
        (state) => state.organization
      )
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/organization/delete?id=${id}`,
        },
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData },
      })

      yield put.resolve({
        type: 'getOrganizationType',
        payload: {
          enterpriseId: toolbarSelectorValue,
        },
      })

      success && success()
    },

    //获取企业列表
    *getEnterprise({ payload }, { put, select }) {
      let { pageData } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          return Format.selectDictFormat(response.list, 'id', 'enterpriseName')
        },
        payload: {
          valueField: 'enterpriseList',
          url: `${apiPrefix}/enterprise/getlistdata`,
          pageInfo: pageData,
        },
      })

      let { enterpriseList } = yield select((state) => state.organization)
      yield put({
        type: '@change',
        payload: {
          toolbarSelectorValue:
            enterpriseList.length > 0 ? enterpriseList[0].code : '',
        },
      })
    },

    //获取组织类型
    *getOrganizationType({ payload }, { call, put }) {
      let { enterpriseId, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'organizationType',
          url: `${apiPrefix}/organization/getselectordata?enterpriseId=${enterpriseId}`,
        },
      })

      yield put({
        type: '@change',
        payload: {
          modalEnterpriseSelectorValue: enterpriseId,
        },
      })

      success && success()
    },
  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload,
      }
    },
  },
})
