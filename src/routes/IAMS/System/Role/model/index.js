/*
 * @Descripttion : 角色管理-model
 * @Author       : wuhaidong
 * @Date         : 2020-03-08 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-02 16:13:34
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'
import lodash from 'utils/lodash'

export default modelEnhance({
  namespace: 'role',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    toolbarSelectorValue: '', //toolbar select选中
    enterpriseList: [], //企业列表
    roleType: [], //角色类型
    clientPageInfo: PageHelper.create(),
    clientListSelectedKeys: [], //客户端表格列表已选择的keys
    clientListSelected: [], //权限管理-确认选择保存列表
    clientListSelector: [], //模块权限-selector列表
    clientListSelectorDefaultValue: '', //模块权限-客户端默认选项
    functionTreeData: [], //功能模块权限树
    functionCheckedKeys: [], //功能模块默认选中，交互中
    functionExpandedKeys: [], //功能模块权限树形展开keys
    submitFunctionCheckedKeys: [], //要传给后端选中的功能模块
    moduleTree: [], //组织机构权限管理-模块树
    moduleTreeSelectedKey: [], //组织机构权限管理-模块树 选中
    organizationPermissionTree: [], //组织机构权限
    organizationPermissionTreeExpandedKeys: [], //组织机构权限tree展开keys
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.role)

      yield put.resolve({
        type: 'getEnterprise',
        payload: {
          pageData: PageHelper.create().startPage(1, 10000), //一次性取完，所以取一页10000条。
        },
      })

      //获取角色类型数据字典
      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'role',
          valueField: 'roleType',
          category: 'roleType',
        },
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData: pageData.startPage(1, 10) },
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters, toolbarSelectorValue } = yield select((state) => state.role)
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
          url: `${apiPrefix}/role/getlistdata?enterpriseId=${data.enterpriseId}`,
          pageInfo: pageData,
          ...data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })
    },

    // 新增/修改 保存之后查询分页
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.role)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/role/submit`,
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

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select((state) => state.role)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/role/delete?id=${id}`,
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

      let { enterpriseList } = yield select((state) => state.role)
      yield put({
        type: '@change',
        payload: {
          toolbarSelectorValue: enterpriseList.length > 0 ? enterpriseList[0].code : '',
        },
      })
    },

    //获取客户端列表
    *getClient({ payload }, { call, put, select }) {
      let { clientPageInfo } = yield select((state) => state.role)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'clientPageInfo',
          url: `${apiPrefix}/client/getlistdata`,
          pageInfo: clientPageInfo.startPage(1, 10000), // 获取客户端列表，一次性取完，所以取一页10000条。
        },
      })

      let { role } = yield select((state) => state)

      let clientListSelector = Format.selectDictFormat(role.clientPageInfo.list, 'id', 'clientName')

      yield put({
        type: '@change',
        payload: {
          clientListSelector,
        },
      })
    },

    //获取客户端权限
    *getClientPermission({ payload }, { put, select }) {
      let { roleId, success } = payload
      let { clientPageInfo } = yield select((state) => state.role)
      if (!clientPageInfo.list.length) {
        yield put.resolve({
          type: 'getClient',
        })
      }

      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          return response.map((item) => item.clientId)
        },
        payload: {
          valueField: 'clientListSelectedKeys',
          url: `${apiPrefix}/role/getclientpermission?roleId=${roleId}`,
          success: () => {
            success && success()
          },
        },
      })

      let { clientListSelectedKeys } = yield select((state) => state.role)

      yield put({
        type: '@change',
        payload: {
          clientListSelected: clientListSelectedKeys,
        },
      })
    },

    //保存客户端权限
    *submitClientPermission({ payload }, { put, select }) {
      let { roleId, clientListSelectedKeys } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/role/submitclientpermission?roleId=${roleId}`,
          data: clientListSelectedKeys,
        },
      })

      yield put({
        type: 'getClientPermission',
        payload: {
          roleId,
        },
      })
    },

    //获取模块权限
    *getFunctionPermission({ payload }, { put, select }) {
      let { clientId, roleId, success } = payload

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'functionTreeData',
          url: `${apiPrefix}/role/getfunctionpermission?clientId=${clientId}&roleId=${roleId}`,
        },
      })

      let { functionTreeData } = yield select((state) => state.role)

      Format.deepestKey = []
      Format.deepestKey = Format.multiToDeepestKey(functionTreeData)
      let array = Format.multiToOneFormat(functionTreeData)

      let functionExpandedKeys = lodash.difference(
        array.map((item) => item.key),
        Format.deepestKey
      )

      let allCheckedKeys = array
        .filter((item) => {
          if (item.checkState == 1) {
            return item
          }
        })
        .map((item) => item.key)

      let functionCheckedKeys = Format.uniqueArray(allCheckedKeys, Format.deepestKey)
      yield put.resolve({
        type: '@change',
        payload: {
          functionCheckedKeys,
          functionExpandedKeys,
          submitFunctionCheckedKeys: allCheckedKeys,
        },
      })

      success && success()
    },

    //获取系统模块树-组织机构权限
    *getModuleTree({ payload }, { put, select }) {
      let { init, clientId, roleId, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'moduleTree',
          url: `${apiPrefix}/module/gettreedata?clientId=${clientId}`,
          success: () => {
            success && success()
          },
        },
      })

      let { moduleTree } = yield select((state) => state.role)

      Format.deepestKey = []
      Format.deepestKey = Format.multiToDeepestKey(moduleTree)
      let array = Format.multiToOneFormat(moduleTree)

      let functionExpandedKeys = lodash.difference(
        array.map((item) => item.key),
        Format.deepestKey
      )

      yield put.resolve({
        type: '@change',
        payload: {
          functionExpandedKeys,
        },
      })

      if (init) {
        let { moduleTree, toolbarSelectorValue } = yield select((state) => state.role)
        if (moduleTree.length > 0) {
          yield put.resolve({
            type: 'getOrganizationPermission',
            payload: {
              enterpriseId: toolbarSelectorValue,
              clientId,
              roleId,
              moduleId: moduleTree[0].id,
            },
          })

          yield put({
            type: '@change',
            payload: {
              moduleTreeSelectedKey: [`${moduleTree[0].id}`],
            },
          })
        }
      }
    },

    //获取组织机构权限数据
    *getOrganizationPermission({ payload }, { put, select }) {
      let { enterpriseId, roleId, clientId, moduleId } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'organizationPermissionTree',
          url: `${apiPrefix}/role/getorganizationpermission?enterpriseId=${enterpriseId}&roleId=${roleId}&clientId=${clientId}&moduleId=${moduleId}`,
        },
      })

      let { organizationPermissionTree } = yield select((state) => state.role)

      Format.deepestKey = []
      Format.deepestKey = Format.multiToDeepestKey(organizationPermissionTree)
      let array = Format.multiToOneFormat(organizationPermissionTree)

      let organizationPermissionTreeExpandedKeys = lodash.difference(
        array.map((item) => item.key),
        Format.deepestKey
      )

      let allCheckedKeys = array
        .filter((item) => {
          if (item.checkState == 1) {
            return item
          }
        })
        .map((item) => item.key)

      let organizationCheckedKeys = Format.uniqueArray(allCheckedKeys, Format.deepestKey)
      yield put.resolve({
        type: '@change',
        payload: {
          organizationCheckedKeys,
          organizationPermissionTreeExpandedKeys,
        },
      })
    },

    //保存模块权限
    *submitFunctionPermission({ payload }, { put, select }) {
      let { roleId, clientId, submitFunctionCheckedKeys } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/role/submitfunctionpermission?roleId=${roleId}&clientId=${clientId}`,
          data: submitFunctionCheckedKeys,
        },
      })

      yield put({
        type: 'getFunctionPermission',
        payload: {
          roleId,
          clientId,
        },
      })
    },

    //保存组织机构权限
    *submitOrganizationPermission({ payload }, { put, select }) {
      let { toolbarSelectorValue } = yield select((state) => state.role)
      let { roleId, clientId, moduleId, organizationCheckedKeys, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/role/submitorganizationpermission?roleId=${roleId}&clientId=${clientId}&moduleId=${moduleId}`,
          data: organizationCheckedKeys,
          success: () => {
            success && success()
          },
        },
      })

      yield put.resolve({
        type: 'getOrganizationPermission',
        payload: {
          enterpriseId: toolbarSelectorValue,
          roleId,
          clientId,
          moduleId,
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
