import React from 'react'

export const columns = [
  {
    title: 'CO2',
    name: 'CO2',
    formItem: {},
  },
  {
    title: 'N2',
    name: 'N2',
    formItem: {},
  },
  {
    title: 'C1',
    name: 'C1',
    formItem: {},
  },
  {
    title: 'C2',
    name: 'C2',
    formItem: {},
  },
  {
    title: 'C3',
    name: 'C3',
    formItem: {},
  },
  {
    title: 'C4I',
    name: 'C4I',
    formItem: {},
  },
  {
    title: 'C4N',
    name: 'C4N',
    formItem: {},
  },
  {
    title: 'C5I',
    name: 'C5I',
    formItem: {},
  },
  {
    title: 'C5N',
    name: 'C5N',
    formItem: {},
  },
  {
    title: 'C6N',
    name: 'C6N',
    formItem: {},
  },
  {
    title: 'C7N',
    name: 'C7N',
    formItem: {},
  },
  {
    title: 'C8N',
    name: 'C8N',
    formItem: {},
  },
]

export const columnsAbnormalLeft = [
  {
    title: '管道名称',
    name: 'name',
    tableItem: {},
  },
  {
    title: '异常原因',
    name: 'reason',
    tableItem: {},
  },
  {
    title: '数值',
    name: 'num',
    tableItem: {
      render: (text) => {
        return <text style={{ color: 'red' }}>{text}</text>
      },
    },
  },
]

export const columnsAbnormalRight = [
  {
    title: '节点名称',
    name: 'name',
    tableItem: {},
  },
  {
    title: '压力（kpa）',
    name: 'pressure',
    tableItem: {
      render: (text) => {
        return <text style={{ color: 'red' }}>{text}</text>
      },
    },
  },
  {
    title: 'X坐标 (m)',
    name: 'x',
    tableItem: {},
  },
  {
    title: 'Y坐标 (m)',
    name: 'y',
    tableItem: {},
  },
]

export const columnsGisTop = [
  {
    title: '管道名称',
    name: 'name',
    tableItem: {},
  },
  {
    title: '流量（Nm³/hr）',
    name: 'flow',
    tableItem: {},
  },
  {
    title: '流速（m/s）',
    name: 'flowSpeed',
    tableItem: {},
  },
]

export const columnsGisBottom = [
  {
    title: '用户名称',
    name: 'name',
    tableItem: {},
  },
  {
    title: '用气量（Nm³/hr）',
    name: 'usegas',
    tableItem: {},
  },
  {
    title: '压力（KPa）',
    name: 'pressure',
    tableItem: {},
  },
]
