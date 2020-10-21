/*
 * @Descripttion : 门站运算输出
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-16 15:01:32
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const tempShowOption = (self, expand) =>{
  return [
  {
    value:true,
    label:'是'
  },{
    value:false,
    label:'否'
  }
]} 


export const flowColumns = [
  {
    month: "2019-01-09 00:00:00",
    thisYear: 40,
    lastyear: 50,
    beforeYear:30,
    lastyear1: 28,
    beforeYear1:17,
  },
  {
    month: "2019-02-09 00:00:00",
    thisYear: 60,
    lastyear: 40,
    beforeYear:60,
    lastyear1: 24,
    beforeYear1:18,
  },
  {
    month: "2019-03-09 00:00:00",
    thisYear: 40,
    lastyear: 50,
    beforeYear:60,
    lastyear1: 27,
    beforeYear1:18,
  },
  {
    month: "2019-04-09 00:00:00",
    thisYear: 40,
    lastyear: 50,
    beforeYear:60,
    lastyear1: 24,
    beforeYear1:16,
  },
  {
    month: "2019-05-09 00:00:00",
    thisYear: 30,
    lastyear: 70,
    beforeYear:40,
    lastyear1: 26,
    beforeYear1:13,
  },
  {
    month: "2019-06-09 00:00:00",
    thisYear: 40,
    lastyear: 50,
    beforeYear:60,
    lastyear1: 27,
    beforeYear1:11,
  },
  {
    month: "2019-07-09 00:00:00",
    thisYear: 60,
    lastyear: 40,
    beforeYear:50,
    lastyear1: 27,
    beforeYear1:16,
  },
  {
    month: "2019-08-09 00:00:00",
    thisYear: 40,
    lastyear: 50,
    beforeYear:60,
    lastyear1: 29,
    beforeYear1:10,
  },
  {
    month: "2019-09-09 00:00:00",
    thisYear: 30,
    lastyear: 50,
    beforeYear:30,
    lastyear1: 21,
    beforeYear1:10,
  },
  {
    month: "2019-10-09 00:00:00",
    thisYear: 40,
    lastyear: 60,
    beforeYear:60,
    lastyear1: 25,
    beforeYear1:15,
  },
  {
    month: "2019-11-09 00:00:00",
    thisYear: 60,
    lastyear: 50,
    beforeYear:80,
    lastyear1: 27,
    beforeYear1:16,
  },
  {
    month: "2019-12-09 00:00:00",
    thisYear: 40,
    lastyear: 30,
    beforeYear:60,
    lastyear1: 20,
    beforeYear1:18,
  },
];

// 流量图表颜色预设值
export const FlowColorList=['#8360c3','#2ebf91','#02F78E','#0083b0','#1488CC','#2B32B2','#ff4e50','#0575E6','#021b79']
// export const PressureColorList=['#8360c3','#2ebf91','#02F78E','#0083b0','#1488CC','#2B32B2','#ff4e50','#0575E6','#021b79']

// 压力图表颜色预设值
// ff4e50 93EDC7
export const PressureColorList=[
  'l (270) 0:#8360c3 1:#2ebf91',
  'l (270) 0:#1488CC 1:#2B32B2',
  'l (270) 0:#ff4e50 1:#f9d423',
  'l (270) 0:#0575E6 1:#021b79',
  'l (270) 0:#ff4e50 1:#93EDC7',

  'l (270) 0:#f8c390 1:#d279ee',
  'l (270) 0:#a16bfe 1:#bc3d2f',
  'l (270) 0:#deb2df 1:#a16bfe',
  'l (270) 0:#c1e3ff 1:#abc7ff',
  'l (270) 0:#02F78E 1:#0083b0',
  ]

// 温度图表颜色预设值
export const TemperatureColorList=['#4DCFA9','#0133A8','#FAD567','#3FDBC5']
// 找出每一个type的下标，作为选择颜色的下标值
export function colorSet(typeList,type) {
  return typeList.findIndex(function(value, index, arr){
    return value == type
  })
}

// 过滤获取除filterKey外的所有key，并返回一个对象，用在图例
export function getFilterName(list=[], filterKey){
  let arr = []
  if(list.length > 0){
    for(let item in list[0]){
      if(item != filterKey){
        arr.push(item)
      }
    }
  }
  return arr
}

