/*
 * @Descripttion : 用户管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-07 10:22:44
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'user',

  state: {
    parameters: { keyword: '' }, //分页接口传参
    pageData: PageHelper.create(), //分页信息
    role: [], //角色列表
    accountType: [], //账户类型
    organizationTree: [], //组织机构
    enterpriseList: [], //企业列表
    toolbarSelectorValue: '', //toolbar select选中
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select((state) => state.user)
      
      yield put.resolve({
        type: 'getEnterprise',
        payload: {
          pageData: PageHelper.create().startPage(1, 10000), //一次性取完，所以取一页10000条。
        },
      })

      yield put.resolve({
        type: 'getAccountType',
        payload: {},
      })

      let { toolbarSelectorValue } = yield select((state) => state.user)

      yield put.resolve({
        type: 'getAllRole',
        payload: {
          enterpriseId: toolbarSelectorValue,
        },
      })

      yield put.resolve({
        type: 'getAllOrganization',
        payload: {
          enterpriseId: toolbarSelectorValue,
        },
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: {
          pageData,
        },
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters, toolbarSelectorValue } = yield select(
        (state) => state.user
      )
      let { pageData, values } = payload
      let data = {
        enterpriseId: toolbarSelectorValue,
        ...parameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/user/getlistdata?enterpriseId=${data.enterpriseId}`,
          pageInfo: pageData,
          ...data,
        },
      })

      yield put.resolve({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.user)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/user/submit`,
          data: values,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
    },

    //修改密码
    *updatePassword({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.user)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/user/submitnewpassword?id=${values.id}&newPassword=${values.password}`,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select((state) => state.user)
      // put是非阻塞的 put.resolve是阻塞型的
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/user/delete?id=${id}`,
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
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

      let { enterpriseList } = yield select((state) => state.user)
      yield put({
        type: '@change',
        payload: {
          toolbarSelectorValue:
            enterpriseList.length > 0 ? enterpriseList[0].code : '',
        },
      })
    },

    //获取部门
    *getAllOrganization({ payload }, { call, put }) {
      let { enterpriseId } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'organizationTree',
          url: `${apiPrefix}/organization/getselectordata?enterpriseId=${enterpriseId}`,
        },
      })
    },

    // 获取角色
    *getAllRole({ payload }, { call, put }) {
      let { enterpriseId } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          let newsResponse = response.map((item) => {
            let newsItem = {}
            newsItem.code = item.id
            newsItem.codeName = item.roleName
            return newsItem
          })
          return newsResponse
        },
        payload: {
          valueField: 'role',
          url: `${apiPrefix}/role/getselectordata?enterpriseId=${enterpriseId}`,
        },
      })
    },

    //获取用户类型
    *getAccountType({ payload }, { call, put }) {
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          return Format.selectDictFormat(response)
        },
        payload: {
          valueField: 'accountType',
          url: `${apiPrefix}/masterdataitem/getselectordata?category=accountType`,
        },
      })
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
