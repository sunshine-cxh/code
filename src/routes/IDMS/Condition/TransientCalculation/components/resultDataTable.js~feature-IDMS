/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 14:48:30
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-31 14:56:06
 */

import React from 'react'
import { connect } from 'dva'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import DataTable from 'components/DataTable'
import { columns1, columns2, columns3, columns4 } from './resultColumns'
import { Row, Col } from 'antd'

import './index.less'

const list1 = [
  {
    id: 1,
    programme: '宝昌电厂',
    pressure: '3700',
    flow: '177.6',
    calorific: '42.6',
    gasProportion: ['华安储气库90.61%', '坪山大鹏9.39%'],
  },
  {
    id: 2,
    programme: '钰湖电厂',
    pressure: '3735',
    flow: '177.6',
    calorific: '41.8',
    gasProportion: ['华安储气库68.27%', '求雨岭西二线24.64%', '坪山大鹏7.07%'],
  },
  {
    id: 3,
    programme: '南天电厂',
    pressure: '3695',
    flow: '88.8',
    calorific: '42.6',
    gasProportion: ['华安储气库81.14%', '坪山大鹏8.4%', '安托山大鹏10.45%'],
  },
  {
    id: 4,
    programme: '华电分布式',
    pressure: '3798',
    flow: '38.5',
    calorific: '42.6',
    gasProportion: ['华安储气库90.61%', '坪山大鹏9.39%'],
  },
]

const list2 = [
  {
    id: 1,
    programme: '宝昌电厂',
    pressure: '3714',
    flow: '177.6',
    calorific: '42.6',
    gasProportion: ['华安储气库100%'],
  },
  {
    id: 2,
    programme: '钰湖电厂',
    pressure: '3749',
    flow: '177.6',
    calorific: '40.92',
    gasProportion: ['华安储气库45.79%', '求雨岭西二线54.21%'],
  },
  {
    id: 3,
    programme: '南天电厂',
    pressure: '3709',
    flow: '88.8',
    calorific: '42.6',
    gasProportion: ['华安储气库25.91%', '安托山大鹏74.09%'],
  },
  {
    id: 4,
    programme: '华电分布式',
    pressure: '3798',
    flow: '38.5',
    calorific: '42.6',
    gasProportion: ['华安储气库100%'],
  },
]

const list3 = [
  {
    id: 1,
    programme: '宝昌电厂',
    pressure: '3762',
    flow: '177.6',
    calorific: '42.6',
    gasProportion: ['安托山大鹏18.02%', '迭福81.98%'],
  },
  {
    id: 2,
    programme: '钰湖电厂',
    pressure: '3793',
    flow: '177.6',
    calorific: '41.09',
    gasProportion: ['求雨岭西二线48.86% ', '迭福51.14%'],
  },
  {
    id: 3,
    programme: '南天电厂',
    pressure: '3778',
    flow: '88.8',
    calorific: '42.6',
    gasProportion: ['安托山大鹏100%'],
  },
  {
    id: 4,
    programme: '华电分布式',
    pressure: '3891',
    flow: '38.5',
    calorific: '42.6',
    gasProportion: ['迭福100%'],
  },
]

const list4 = [
  {
    id: 1,
    programme: '模型A',
    cost: 1735.422,
    profit: 971.653,
    dapengGas: 170.7,
    xierxianGas: 196.16,
    huaanGas: 406.59,
    diefuGas: 0,
    qiuyulingPressure: 3770,
    antuoshanPressure: 3945,
    pingshanPressure: 3800,
    diefuPressure: '/',
    cigaoyaLowest: 1344,
    cigaoyaHighest: 3700,
  },

  {
    id: 2,
    programme: '模型B',
    cost: 1774.756,
    profit: 932.319,
    dapengGas: 120,
    xierxianGas: 274.08,
    huaanGas: 379.37,
    diefuGas: 0,
    qiuyulingPressure: 3800,
    antuoshanPressure: 3945,
    pingshanPressure: '/',
    diefuPressure: '/',
    cigaoyaLowest: 1344,
    cigaoyaHighest: 3714,
  },
  {
    id: 3,
    programme: '模型C',
    cost: 1965.233,
    profit: 744.992,
    dapengGas: 120,
    xierxianGas: 266.79,
    huaanGas: 0,
    diefuGas: 387.56,
    qiuyulingPressure: 3900,
    antuoshanPressure: 3891,
    pingshanPressure: '/',
    diefuPressure: 3900,
    cigaoyaLowest: 1344,
    cigaoyaHighest: 3762,
  },
]

@connect(({}) => ({}))
export default class extends BaseComponent {
  componentDidMount() {}

  render() {
    let { checkboxSelectedKeys } = this.props

    let dataTableProps1 = {
      columns: columns1(),
      rowKey: 'id',
      dataItems: { list: list1 },
    }

    let dataTableProps2 = {
      columns: columns2(),
      rowKey: 'id',
      dataItems: { list: list2 },
    }

    let dataTableProps3 = {
      columns: columns3(),
      rowKey: 'id',
      dataItems: { list: list3 },
    }

    let newList4 = []
    for (let i = 0; i < list4.length; i++) {
      if (checkboxSelectedKeys.includes(i)) {
        newList4.push(list4[i])
      }
    }

    let dataTableProps4 = {
      columns: columns4(),
      rowKey: 'id',
      dataItems: { list: newList4 },
    }

    return (
      <>
        <div className='flexbox'>
          {checkboxSelectedKeys.includes(0) && (
            <DataTable {...dataTableProps1} style={{ marginRight:20 }} />
          )}
          {checkboxSelectedKeys.includes(1) && (
            <DataTable {...dataTableProps2}  style={{ marginRight:20 }}/>
          )}
          {checkboxSelectedKeys.includes(2) && (
            <DataTable {...dataTableProps3} />
          )}
        </div>
        {newList4.length > 0 && <DataTable {...dataTableProps4} style={{ marginTop: 30 }} />}
      </>
    )
  }
}
