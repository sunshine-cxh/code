/*
 * @Descripttion : 门站运算输出
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-07 15:08:57
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';


export const flowColumns = [
  {
    "hourTime": "0:00",
    "predictUseGas": 130,
    "actuallyUseGas": 160
  }
];
export const IntervalData = [
  {
    "stationName": "测试1",
    "gasVolume": 150
  }
];
// 流量图表颜色预设值
export const FlowColorList=['#42BDFF','#FF9690','#CA9AFF','#3FDBC5']

// 温度图表颜色预设值
export const TodayGasColorList=['l (90) 0:rgba(68, 246, 255, 0.5) 1:rgba(68, 246, 255, 0)', 'l (90) 0:rgba(220,168,140, 0.5) 1:rgba(220,168,140, 0)']
export const TodayGasColorList1=['rgba(68, 246, 255, 1)', 'rgba(255,176,113,1)']

// 压力图表颜色预设值
// export const gasColorList=['red','yellow','green','blue', 'red','yellow','green','blue','#ffdd86','#71fdff']
export const gasColorList=['#57b9e5','#9c3fee','#87f5ff','#f57acd', '#5595fd','#d1ffdc','#f88e7f','#92e8c0','#ffdd86','#71fdff'].reverse()

// 找出每一个type的下标，作为选择颜色的下标值
export function colorSet(typeList,type) {
  return typeList.findIndex(function(value, index, arr){
    return value == type
  })
}

export function colorSet2(typeList,stationName,type) {
  for(let item in typeList){
    let lists = filterList(typeList[item], 'stationName', 'applyGasVolume')
    if(typeList[item].stationName == stationName){
      return lists.findIndex(function(value){
        return value == type
      })
    }
  }
}

function filterList(obj={}, filterKey1,filterKey2){
  let arr = []
  for(let child in obj){
    if(child != filterKey1 && child != filterKey2){
      arr.push(child)
    }
  }
  return arr
}

// 过滤获取除filterKey外的所有key，并返回一个对象，用在图例--filterKey
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

// 过滤获取除filterKey外的所有key，并返回一个对象，用在图例--filterKey
export function getFilterNameArr(list=[], filterKey1,filterKey2){
  let arr = []
  if(list.length > 0){
    for(let item of list){
      for(let child in item){
        if(child != filterKey1 && child != filterKey2){
          arr.push(child)
        }
      }
    }
  }
  return arr
}

