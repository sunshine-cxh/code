/*
 * @Descripttion : 入口文件
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-21 11:26:16
 */
import React from 'react'
import dva from 'dva'
import dynamic from 'dva/dynamic'
import createLoading from 'dva-loading'
import { Router } from 'dva/router'
import { createHashHistory, createBrowserHistory } from 'history'
import request from 'cmn-utils/lib/request'
import createRoutes from '@/routes'
import config from './config'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import { homepage } from '../package.json'
import * as serviceWorker from './serviceWorker'
import $$ from 'cmn-utils'
import { routerRedux } from 'dva/router'
import lodash from 'utils/lodash'

import 'assets/styles/index.less'
// 初始化
const app = dva({
  history: createHashHistory({
    basename: '', // homepage.startsWith('/') ? homepage : ''
  }),
})

// 插件
app.use(createLoading())
app.use({ onError: config.exception.global })

// 请求
request.config(config.request)

// 使用mock数据、本地开发时使用
if (process.env.NODE_ENV === 'development') {
  require('./__mocks__')
}

// loading
dynamic.setDefaultLoadingComponent(() => config.router.loading)

// 注册全局模型
app.model(require('./models/global').default)

// 初始化路由
app.router(({ history, app }) => (
  <ConfigProvider locale={zh_CN}>
    <Router history={history}>{createRoutes(app)}</Router>
  </ConfigProvider>
))

// Start
app.start('#root')

// 判断token是否为null，为空则跳转到登录页
if (lodash.isNull($$.getStore('token'))) {
  app._store.dispatch(routerRedux.replace('/sign/login'))
}

// export global
export default {
  app,
  store: app._store,
  dispatch: app._store.dispatch,
}

// 如果想可以离线使用，请使用register()代替unregister()。可能会带来一些问题，如缓存等
// 相关资料，可以从 https://bit.ly/CRA-PWA 了解
serviceWorker.unregister()
