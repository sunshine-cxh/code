/*
 * @Descripttion : 全局model
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 17:04:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-06 15:28:02
 */
import $$ from 'cmn-utils'
import { routerRedux } from 'dva/router'
import modelEnhance from 'utils/modelEnhance'
import Format from 'utils/format'
// import createMenu from '@/menu.js'

export default modelEnhance({
  namespace: 'global',

  state: {
    menu: [],
    flatMenu: [],
    functionAuthority: [], //路由功能权限
    checkNumber: {
      // 审批数量
      auditMyReceive: 0,
      auditMySend: 0,
      auditNot: 0,
    },
    user: $$.getStore('user', []), //用户信息
  },

  effects: {
    //获取菜单
    *getMenu({ payload }, { call, put }) {
      // const data = createMenu(payload.type)
      let data = yield call(getMenu, payload)

      const loopMenu = (menu, pitem = {}) => {
        if (menu && menu.length > 0) {
          menu.forEach((item) => {
            if (pitem.path) {
              item.parentPath = pitem.parentPath
                ? pitem.parentPath.concat(pitem.path)
                : [pitem.path]
            }
            if (item.children && item.children.length) {
              loopMenu(item.children, item)
            }
          })
        }
      }
      loopMenu(data)

      yield put({
        type: 'getMenuSuccess',
        payload: data,
      })
    },

    // 获取审批数量
    *getCheckNumber({ payload }, { call, put }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'checkNumber',
          url: `/iams/flowwork/getdatanum`,
        },
      })
    },

    //子系统入口
    *handleSystemRoute({ payload }, { put }) {
      let { currentClient } = payload
      $$.setStore('currentClient', currentClient)
      yield put(routerRedux.replace(currentClient.url))
    },

    //获取路由功能权限
    *getFunctionAuthority({ payload }, { put }) {
      let { clientId, moduleId } = payload

      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          response = response.map((item) => item.functionId)
          return response
        },
        payload: {
          valueField: 'functionAuthority',
          url: `/iams/system/getmodulefunctionlist?clientId=${clientId}&moduleId=${moduleId}`,
        },
      })
    },

    //跳转至登录页
    *handleTologin({ payload }, { put }) {
      yield put(routerRedux.replace('/sign/login'))
    },

    //获取数据字典,多页面调用
    *getMasterDataItem({ payload }, { call, put }) {
      let { namespace, valueField } = payload
      let data = yield call(getMasterDataItem, payload)

      if (!!data) {
        data = Format.selectDictFormat(data)
      }

      let newPayload = {}
      newPayload[`${valueField}`] = data

      yield put({
        type: `${namespace}/@change`,
        payload: newPayload,
      })
    },

    // 获取用户基本信息
    *getUserInfo({ payload }, { put }) {
      yield put.resolve({
        type: '@request',
        afterResponse: (res) => {
          $$.setStore('user', res)
        },
        payload: {
          valueField: 'user',
          url: `/iams/system/getuserinfo`,
        },
      })
    },
  },

  reducers: {
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
        flatMenu: getFlatMenu(payload),
      }
    },
  },
})

export function getFlatMenu(menus) {
  let menu = []
  if (menus && menus.length > 0) {
    menus.forEach((item) => {
      if (item.children && item.children.length > 0) {
        menu = menu.concat(getFlatMenu(item.children))
      }
      menu.push(item)
    })
  }
  return menu
}

//获取路由功能模块权限
export async function getFunctionAuthority(payload) {
  return $$.post(
    `/iams/system/getmodulefunctionlist?clientId=${payload.clientId}&moduleId=${payload.moduleId}`,
    payload
  )
}

//获取数据字典
export async function getMasterDataItem(payload) {
  return $$.post(`/iams/masterdataitem/getselectordata?category=${payload.category}`, payload)
}

//获取系统菜单
export async function getMenu(payload) {
  // return $$.post('/global/menu', payload)
  return $$.post(`/iams/system/getmodulelist?clientId=${payload.id}`, payload)
}
