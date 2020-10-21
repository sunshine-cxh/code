/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2020-05-20 22:10:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-31 10:36:46
 */

import React from 'react'
import DataTable, { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const columns1 = (self, expand) => {
  return [
    {
      title: '模型A',
      name: 'programme',
      tableItem: {},
    },
    {
      title: '压力(kpa)',
      name: 'pressure',
      formItem: {},
      tableItem: {},
    },
    {
      title: '流量(万Nm³)',
      name: 'flow',
      formItem: {},
      tableItem: {},
    },
    {
      title: '热值(MJ/Nm3)',
      name: 'calorific',
      tableItem: {},
    },
    {
      title: '气源占比',
      name: 'gasProportion',
      tableItem: {
        width: 146,
        render: (text, record) => (
          <div>
            {record.gasProportion.map((item, index) => {
              return <div key={index}>{item}</div>
            })}
          </div>
        ),
      },
    },
  ]
}

export const columns2 = (self, expand) => {
  return [
    {
      title: '模型B',
      name: 'programme',
      tableItem: {},
    },
    {
      title: '压力(kpa)',
      name: 'pressure',
      formItem: {},
      tableItem: {},
    },
    {
      title: '流量(万Nm³)',
      name: 'flow',
      formItem: {},
      tableItem: {},
    },
    {
      title: '热值(MJ/Nm3)',
      name: 'calorific',
      tableItem: {},
    },
    {
      title: '气源占比',
      name: 'gasProportion',
      tableItem: {
        width: 146,
        render: (text, record) => (
          <div>
            {record.gasProportion.map((item, index) => {
              return <div key={index}>{item}</div>
            })}
          </div>
        ),
      },
    },
  ]
}

export const columns3 = (self, expand) => {
  return [
    {
      title: '模型C',
      name: 'programme',
      tableItem: {},
    },
    {
      title: '压力(kpa)',
      name: 'pressure',
      formItem: {},
      tableItem: {},
    },
    {
      title: '流量(万Nm³)',
      name: 'flow',
      formItem: {},
      tableItem: {},
    },
    {
      title: '热值(MJ/Nm3)',
      name: 'calorific',
      tableItem: {},
    },
    {
      title: '气源占比',
      name: 'gasProportion',
      tableItem: {
        width: 146,
        render: (text, record) => (
          <div>
            {record.gasProportion.map((item, index) => {
              return <div key={index}>{item}</div>
            })}
          </div>
        ),
      },
    },
  ]
}

export const columns4 = (self, expand) => {
  return [
    {
      title: '方案',
      name: 'programme',
      tableItem: {},
    },
    {
      title: '成本(万元)',
      name: 'cost',
      formItem: {},
      tableItem: {},
    },
    {
      title: '利润(万元)',
      name: 'profit',
      formItem: {},
      tableItem: {},
    },
    {
      title: '大鹏气量(万Nm³)',
      name: 'dapengGas',
      tableItem: {},
    },
    {
      title: '西二线气量(万Nm³)',
      name: 'xierxianGas',
      formItem: {},
      tableItem: {},
    },
    {
      title: '华安气量(万Nm³)',
      name: 'huaanGas',
      formItem: {},
      tableItem: {},
    },
    {
      title: '迭福气量(万Nm³)',
      name: 'diefuGas',
      tableItem: {},
    },
    {
      title: '求雨岭压力KPa',
      name: 'qiuyulingPressure',
      formItem: {},
      tableItem: {},
    },
    {
      title: '安托山压力Kpa',
      name: 'antuoshanPressure',
      formItem: {},
      tableItem: {},
    },
    {
      title: '坪山压力Kpa',
      name: 'pingshanPressure',
      tableItem: {},
    },
    {
      title: '迭福压力Kpa',
      name: 'diefuPressure',
      formItem: {},
      tableItem: {},
    },
    {
      title: '次高压管网最低压力Kpa',
      name: 'cigaoyaLowest',
      tableItem: {},
    },
    {
      title: '高压管网最低压力Kpa',
      name: 'cigaoyaHighest',
      tableItem: {},
    },
  ]
}
