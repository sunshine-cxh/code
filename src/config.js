/*
 * @Descripttion : 全局配置文件
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 07:51:51
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-28 09:01:53
 */
import React from 'react'
import PageLoading from 'components/Loading/PageLoading'
import { normal } from 'components/Notification'
import store from 'cmn-utils/lib/store'
import app from '@/index.js'
import { routerRedux } from 'dva/router'

export function configApiPrefix() {
  let host = window.location.host,
    prefix = ''
  if (host === 'iomp.dev.ilng.cn' || host === 'admin.dev.ilng.cn' || host.includes('localhost')) {
    prefix = 'http://192.168.0.65:8060/api' //dev
  } else if (host === 'iomp.test.ilng.cn') {
    prefix = 'http://192.168.0.75:8060/api' //test
  } else if (host === 'iomp.test.ilng.cn:8888') {
    prefix = 'http://iomp.test.ilng.cn:8060/api' //test public
  } else if (host === 'admin.ilng.cn') {
    prefix = 'http://139.9.56.88:8060/api' //iow
  } else {
    prefix = 'changehere' //public
  }

  return prefix
}

// 系统通知, 定义使用什么风格的通知，normal或antdNotice
const notice = normal

/**
 * 应用配置 如请求格式，返回格式，异常处理方式，分页格式等
 */
export default {
  /**
   * HTML的title模板
   */
  htmlTitle: '{title}',

  /**
   * 系统通知
   */
  notice,

  // 异步请求配置
  request: {
    //api prefix
    prefix: configApiPrefix(),

    // 每次请求头部都会带着这些参数
    withHeaders: () => ({
      Authorization: `Bearer ${store.getStore('token')}`,
    }),

    /**
     * 因为modelEnhance需要知道服务器返回的数据，
     
     * 什么样的是成功，什么样的是失败，如
     * {status: true, data: ...} // 代表成功
     * {status: false, message: ...} // 代表失败
     * 实际中应该通过服务端返回的response中的
     * 成功失败标识来进行区分
     */
    afterResponse: (response) => {
      const { httpCode, code, message, data } = response
      if (code === 0) {
        return data
      } else if (code === 3001 || code === 3002 || code === 1003) {
        //重新登录
        app.dispatch(routerRedux.replace('/sign/login'))
      } else if (code === 1002) {
        //没有权限
        app.dispatch(routerRedux.replace('/403'))
      } else {
        //抛出后端错误
        throw new Error(message)
      }
    },
    errorHandle: (err) => {
      // 请求错误全局拦截
      if (err.name === 'RequestError') {
        notice.error(err.text || err.message)
      }
    },
  },

  // 全局异常
  exception: {
    global: (err, dispatch) => {
      const errName = err.name
      // RequestError为拦截请求异常
      if (errName === 'RequestError') {
        notice.error(err.message)
        console.error(err)
      } else {
        console.error(err)
      }
    },
  },

  // 分页助手
  pageHelper: {
    // 格式化要发送到后端的数据
    requestFormat: (pageInfo) => {
      const { pageNum, pageSize, sortField, sort, filters, sorts } = pageInfo
      return {
        pagination: {
          currentPage: pageNum,
          pageSize: pageSize,
          sortField,
          sort,
        },
      }
    },

    // 格式化从后端返回的数据
    responseFormat: (data) => {
      const { currentPage, total, totalPages, rows, ...otherParams } = data
      return {
        pageNum: currentPage,
        total: total,
        totalPages: totalPages,
        list: rows,
        ...otherParams,
      }
    },
  },

  // 路由加载效果
  router: {
    loading: <PageLoading loading />,
  },

  // 后端返回码
  responseCodeMessage: {
    0: '操作成功',
    // -1: '调用服务失败',
    2: '内部错误',
    1001: '登录失败',
    1002: '没有权限',
    1003: '要求重新登录',
    1004: '企业帐号已禁用',
    1005: '个人帐号已禁用',
    1006: '设备安全码错误',
    2001: ' 数据已经存在',
    2002: '无效的数据',
    2003: ' 数据不存在',
    2004: '数据不允许删除',
    2005: '数据为空',
    2006: ' 数据验证失败',
    3001: 'token校验失败',
    3002: 'token已过期',
  },

  /**
   * 模拟数据时包装返回数据
   * 因为，后端返回数据时一般都会在外边包装一层状态信息
   * 如成功时：
   * {
   *   status: true,
   *   data: responseData
   * }
   * 或出错时：
   * {
   *   status: false,
   *   code: 500,
   *   message: '用户名或密码错误'
   * }
   * 这里就是配置这两个函数，为了我们模拟数据时可以少写几行代码的 orz...
   */
  mock: {
    toSuccess: (response) => ({
      status: true,
      code: 0,
      data: response,
    }),

    toError: (message) => ({
      status: false,
      code: 500,
      message: message,
    }),
  },
}
