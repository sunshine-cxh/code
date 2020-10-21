/*
 * @Descripttion : 门站运算输出
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-05 10:58:19
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

export const dataColumns = (self,expand)=>{
  return [
    {
      title: '场站名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title:'实际流量',
      dataIndex: 'name',
      key: 'name',
    },{
      title:'仿真流量',
      dataIndex: 'name',
      key: 'name',
    },{
      title:'实际压力',
      dataIndex: 'name',
      key: 'name',
    },{
      title:'仿真压力',
      dataIndex: 'name',
      key: 'name',
    },
  ]
}

export const flowColumns = [
  {
    month: "09:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "10:00",
    '仿真': 60,
    '实时': 40,
  },
  {
    month: "11:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "12:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "13:00",
    '仿真': 30,
    '实时': 70,
  },
  {
    month: "14:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "15:00",
    '仿真': 60,
    '实时': 40,
  },
  {
    month: "16:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "17:00",
    '仿真': 30,
    '实时': 50,
  },
  {
    month: "18:00",
    '仿真': 40,
    '实时': 60,
  },
  {
    month: "19:00",
    '仿真': 60,
    '实时': 50,
  },
  {
    month: "20:00",
    '仿真': 40,
    '实时': 30,
  },
  {
    month: "21:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "22:00",
    '仿真': 60,
    '实时': 40,
  },
  {
    month: "23:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "24:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "01:00",
    '仿真': 30,
    '实时': 70,
  },
  {
    month: "02:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "03:00",
    '仿真': 60,
    '实时': 40,
  },
  {
    month: "04:00",
    '仿真': 40,
    '实时': 50,
  },
  {
    month: "05:00",
    '仿真': 30,
    '实时': 50,
  },
  {
    month: "06:00",
    '仿真': 40,
    '实时': 60,
  },
  {
    month: "07:00",
    '仿真': 60,
    '实时': 50,
  },
  {
    month: "08:00",
    '仿真': 40,
    '实时': 30,
  },
];

// 流量图表颜色预设值
export const FlowColorList=['#42BDFF','#FF9690','#CA9AFF','#3FDBC5']

// 温度图表颜色预设值
export const TemperatureColorList=['#4DCFA9','#0133A8','#FAD567','#3FDBC5']

// 压力图表颜色预设值
export const PressureColorList=['#42BDFF','#FF9690','#CA9AFF','#3FDBC5']

// 温度图表颜色预设值
export const TodayGasColorList=['l (90) 0:rgba(68, 246, 255, 0.5) 1:rgba(68, 246, 255, 0)', 'l (90) 0:rgba(223,168,138, 0.5) 1:rgba(223,168,138, 0)']
export const TodayGasColorList1=['rgba(68, 246, 255, 1)', 'rgba(223,168,138,1)']
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

