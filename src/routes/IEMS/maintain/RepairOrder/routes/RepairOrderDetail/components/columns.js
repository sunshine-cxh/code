/*
 * @Descripttion : 巡检标准列表参数
 * @Author       : caojiarong
 * @Date         : 2020-06-02 10:50:20
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-28 14:54:36
 */
import React from 'react'

export const baseInfoColumns = (self) =>{
  
  return [
    {
      title: '报修单号',
      name: 'code',
    },
    {
      title: '报障时间',
      name: 'reportTime',
    },
    {  //TODO ---分类名称才对
      title: '报修人',
      name: 'reportUser'
    },
    {
      title: '报障部门',
      name: 'reportDepartment'
    },
    {
      title: '故障类型',
      name: 'faultTypeStr'
    },
    {
      title: '故障等级',
      name: 'faultLevelStr'
    },
    {
      title: '故障描述',
      name: 'content'
    },
    {
      title: '故障图片',
      name: 'imageList',
      render:(text,record)=>{
        return (
          <>
          </>
        )
      }
    }
  ]
}

export const deviceInfoColumns = (self) =>{
  
  return [
    {
      title: '设备名称',
      name: 'ledgerName',
    },
    {  //TODO ---存放地址字段是啥
      
      title: '存放地址',
      name: 'type',
    },
    {
      title: '设备编号',
      name: 'ledgerCode'
    },
    {
      title: '所属部门',
      name: 'reportDepartment'
    }
  ]
}
// 维修费用
export const createColumnsFree = (self, standardTypeList, props) => {
  return [
    {
      title: '名称',
      name: 'name',
      tableItem: {
        width: 120
      }
    },
    {
      title: '使用人',
      name: `useUser`,
      tableItem: {
        width: 100
      }
    },
    { 
      title: '单价',  
      name: 'price',
      tableItem: {
      }
    },
    { 
      title: '数量',  
      name: 'amount',
      tableItem: {
      }
    },
    { 
      title: '小计',  
      name: 'sumPrice',
      tableItem: {
        render:(text, record)=>{
          let sum = record.price * record.amount
          return (<span>{ sum.toFixed(2) }</span>)
        }
      }
    }
  ]
}


// 维修记录
export const createColumnsRecord = (self, expand) => {
  return [
    {
      title: '处理时间',
      name: 'processTime'
    },
    {  //TODO 缺少了processUserName
      title: '处理人',
      name: `processUserId`
    },
    { 
      title: '处理内容',  
      name: 'processContent'
    },
    {
      title: '动作',
      name: 'processAction'
    }
  ]
}