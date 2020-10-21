/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {function} delay 增加延迟时间 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成数据，例:

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'}

  更多用法参考 http://mockjs.com/examples.html
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/global/menu': options => {

      const system = JSON.parse(options.body);
      switch (system.type) {
        case 1:
          const PREFIX = '/equipment'
          return toSuccess([
            {
              name: '设备管理',
              icon: 'setting',
              path: `${PREFIX}`,
              children: [
                {
                  name: '品牌信息管理',
                  path: `${PREFIX}/brand`,
                },
                {
                  name: '设备类别管理',
                  path: `${PREFIX}/equipmentCategory`,
                },
                {
                  name: '实施人员管理',
                  path: `${PREFIX}/implementer`,
                },
                {
                  name: '存放位置管理',
                  path: `${PREFIX}/location`,
                },
                {
                  name: '供应商管理',
                  path: `${PREFIX}/supplier`,
                },
                {
                  name: '单位管理',
                  path: `${PREFIX}/unit`,
                },
                {
                  name: '仓库管理',
                  path: `${PREFIX}/warehouse`,
                },
                {
                  name: '采购计划',
                  path: `${PREFIX}/procurementPlan`
                }
              ]
            }
          ]);
        case 2:
          return toSuccess([
            {
              name: '仪表盘',
              icon: 'dashboard',
              path: '/demo/dashboard'
            },
            {
              name: '组件',
              icon: 'desktop',
              path: '/demo/component',
              children: [
                {
                  name: '工具条',
                  path: '/demo/toolbar'
                },
                {
                  name: 'BaseComponent',
                  path: '/demo/baseComponent'
                },
                {
                  name: 'Columns',
                  path: '/demo/column'
                },
                {
                  name: '搜索条',
                  path: '/demo/searchBar'
                },
                {
                  name: '数据表格',
                  path: '/demo/datatable'
                },
                {
                  name: '表单',
                  path: '/demo/form'
                },
                {
                  name: '穿梭树',
                  path: '/demo/transferTree'
                },
                {
                  name: '图表',
                  path: '/demo/charts',
                  children: [
                    {
                      name: 'ECharts',
                      path: '/demo/charts/ec'
                    },
                    {
                      name: 'G2',
                      path: '/demo/charts/g2'
                    }
                  ]
                },
                {
                  name: '打印',
                  path: '/demo/print'
                },
                {
                  name: 'Banner 管理',
                  path: '/demo/banner'
                }
              ]
            },
            {
              name: 'UI元素',
              icon: 'share-alt',
              path: '/demo/ui',
              children: [
                {
                  name: '按钮',
                  path: '/demo/button'
                },
                {
                  name: '消息',
                  path: '/demo/alerts'
                },
                {
                  name: '动画',
                  path: '/demo/animations'
                },
                {
                  name: '图标',
                  path: '/demo/icons'
                },
                {
                  name: '富文本',
                  path: '/demo/editor'
                },
                {
                  name: '模态窗',
                  path: '/demo/modal'
                },
                {
                  name: '遮罩',
                  path: '/demo/mask'
                }
              ]
            },
            {
              name: '通用场景',
              icon: 'bulb',
              path: '/demo/business',
              children: [
                {
                  name: 'CRUD',
                  path: '/demo/crud/:detail?'
                }
              ]
            },
            {
              name: '页面',
              icon: 'book',
              path: '/demo/page',
              children: [
                {
                  name: '登录页',
                  path: '/demo/sign/login'
                },
                {
                  name: '注册页',
                  path: '/demo/sign/register'
                },
                {
                  name: '锁屏',
                  path: '/demo/lock'
                },
                {
                  name: '画廊',
                  path: '/demo/gallery'
                },
                {
                  name: '空白页',
                  path: '/demo/blank'
                },
                {
                  name: '结果页',
                  path: '/demo/result'
                },
                {
                  name: 'Coming Soon',
                  path: '/demo/coming'
                },
                {
                  name: '403',
                  path: '/demo/403'
                },
                {
                  name: '404',
                  path: '/demo/404'
                },
                {
                  name: '500',
                  path: '/demo/500'
                },
                {
                  name: '多级路由',
                  path: '/demo/level-route/:sub?'
                }
              ]
            }
          ]);
        default:
          return toSuccess([
            {
              name: '预测管理',
              icon: 'forecast',
              path: '/forecast',
              children: [
                {
                  name: '负荷预测',
                  path: '/home'
                }
              ]
            },
            {
              name: '系统管理',
              icon: 'setting',
              path: '/',
              children: [
                {
                  name: '用户管理',
                  path: '/user'
                },
                {
                  name: '客户端管理',
                  path: '/client'
                },
                {
                  name: '系统角色管理',
                  path: '/role'
                },
                {
                  name: '数据字典',
                  path: '/masterDataItem'
                },
                {
                  name: '数据字典类别',
                  path: '/masterData'
                },
                {
                  name: '企业管理',
                  path: '/enterprise'
                },
                {
                  name: 'ApiResource管理',
                  path: '/apiResource'
                },
                {
                  name: '系统模块管理',
                  path: '/module'
                },
                {
                  name: '组织机构管理',
                  path: '/organization'
                }
              ]
            }
          ]);
      }
    }
  };
};
