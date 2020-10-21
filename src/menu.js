/*
 * @Descripttion : 菜单栏 / 模拟后台返回数据用
 * @Author       : wuhaidong
 * @Date         : 2020-03-25 14:37:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-15 17:19:11
 */
export default (type) => {
  let PREFIX = type
  switch (type) {
    //后台管理
    case '/':
      return [
        // {
        //   name: '预测管理',
        //   icon: 'forecast',
        //   path: '/forecast',
        //   children: [
        //     {
        //       name: '负荷预测',
        //       path: '/home'
        //     }
        //   ]
        // },
        {
          name: '系统管理',
          icon: 'system-setting',
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
      ];
    //设备管理
    case '/equipment':
      return [
        {
          name: '基本数据管理',
          icon: 'equipment',
          path: `setting`,
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
        },
        {
          name: '购置管理',
          icon: 'purchase',
          path: `setting2`,
          children: [
            {
              name: '采购计划',
              path: `${PREFIX}/procurementPlan`
            },
            {
              name: '采购申请',
              path: `log/home`,
            },
            {
              name: '设备验收',
              path: `log/home`,
            }   
          ]
        },
        {
          name: '设备管理',
          icon: 'equipment',
          path: `setting3`,
          children: [
            {
              name: '设备台账',
              path: `log/home`
            },
            {
              name: '设备结构树',
              path: `log/home`,
            },
            {
              name: '设备折旧',
              path: `log/home`,
            },
            {
              name: '标签打印',
              path: `log/home`
            },
            {
              name: '设备盘点',
              path: `log/home`,
            },
            {
              name: '运行记录',
              path: `log/home`,
            }
          ]
        },
        {
          name: '设备处置',
          icon: 'forecast',
          path: `setting4`,
          children: [
            {
              name: '调拨转移',
              path: `log/home`
            },
            {
              name: '设备报废',
              path: `log/home`,
            },
            {
              name: '设备变卖',
              path: `log/home`,
            }
          ]
        },
        {
          name: '计量核查',
          icon: 'role',
          path: `setting5`,
          children: [
            {
              name: '计量核查计划',
              path: `log/home`
            },
            {
              name: '计量核查任务',
              path: `log/home`,
            }
          ]
        },
        {
          name: '维修管理',
          icon: 'gassource',
          path: `setting6`,
          children: [
            {
              name: '保修工单',
              path: `log/home`
            },
            {
              name: '外委维修',
              path: `log/home`,
            }
          ]
        },
        {
          name: '养护管理',
          icon: 'model',
          path: `setting7`,
          children: [
            {
              name: '养护计划',
              path: `log/home`
            },
            {
              name: '养护任务',
              path: `log/home`,
            },
            {
              name: '养护记录',
              path: `log/home`,
            }

          ]
        },
        {
          name: '巡检管理',
          icon: 'patrol',
          path: `setting8`,
          children: [
            {
              name: '巡检标准',
              path: `log/home`
            },
            {
              name: '巡检计划',
              path: `log/home`,
            },
            {
              name: '巡检任务',
              path: `log/home`,
            }

          ]
        },
        {
          name: '人员管理',
          icon: 'user',
          path: `setting9`,
          children: [
            {
              name: '实施人员管理',
              path: `log/home`
            },
            {
              name: '排班管理',
              path: `log/home`,
            }

          ]
        },
        {
          name: '备份耗材',
          icon: 'forecast',
          path: `setting10`,
          children: [
            {
              name: '仓库管理',
              path: `log/home`
            },
            {
              name: '领材申请',
              path: `log/home`,
            }

          ]
        },
        {
          name: '资料库',
          icon: 'kpi',
          path: `setting11`,
          children: [
            {
              name: '设备资料',
              path: `log/home`
            },
            {
              name: '维保经验',
              path: `log/home`,
            },
            {
              name: '规章制度',
              path: `log/home`
            },
            {
              name: '设备知识',
              path: `log/home`,
            }

          ]
        },
      ];

    //燃气输配
    case '/transportation':
      return [
        {
          name: '预测管理',
          icon: 'forecast',
          path: `${PREFIX}`,
          children: [
            {
              name: '负荷预测',
              path: `${PREFIX}/home`,
            }
          ]
        }
      ];

    //供应链管理系统
    case '/supply':
      return [
        {
          name: '供应链管理',
          icon: 'supply',
          path: `${PREFIX}`,
          children: [
            {
              name: '主页',
              path: `${PREFIX}/home`,
            }
          ]
        }
      ];

    //地理信息系统
    case '/geography':
      return [
        {
          name: '地理信息',
          icon: 'geography',
          path: `${PREFIX}`,
          children: [
            {
              name: '地理信息主页',
              path: `${PREFIX}/home`,
            }
          ]
        }
      ];

    //日志分析系统
    case '/log':
      return [
        {
          name: '日志分析',
          icon: 'function',
          path: `${PREFIX}`,
          children: [
            {
              name: '日志分析主页',
              path: `${PREFIX}/home`,
            }
          ]
        }
      ];

    default:
      return [
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
          icon: 'system-setting',
          path: '/',
          children: [
            {
              name: '用户管理',
              path: '/user',
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
      ];
  }
};
