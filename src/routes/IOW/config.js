/*
 * @Descripttion : 官网后台管理系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-05-14 10:45:26
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-30 14:53:39
 */
const PAI_PREFIX = '/iow'
const TOUTE_PREFIX = '/iow'

const ROUTES = {
  content: {
    title: '内容管理',
    path: `${TOUTE_PREFIX}/content`,
  },
  contentEdit: {
    title: '内容编辑',
    path: `${TOUTE_PREFIX}/content/subContentEdit`,
  },
  contentDetail: {
    title: '内容详情',
    path: `${TOUTE_PREFIX}/content/subContentDetail`,
  },

  resume: {
    title: '简历管理',
    path: `${TOUTE_PREFIX}/resume`,
  },
  message: {
    title: '留言管理',
    path: `${TOUTE_PREFIX}/message`,
  },
  messageEdit: {
    title: '留言详情',
    path: `${TOUTE_PREFIX}/message/subMessageEdit`,
  },
  demo: {
    title: 'demo',
    path: `${TOUTE_PREFIX}/demo`,
  },
}

export {
  PAI_PREFIX as apiPrefix,
  TOUTE_PREFIX as routePrefix,
  ROUTES as routes,
}
