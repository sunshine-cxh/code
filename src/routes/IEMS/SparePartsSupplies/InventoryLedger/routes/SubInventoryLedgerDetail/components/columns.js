/*
 * @Descripttion : 库存台账详情表头信息
 * @Author       : caojiarong
 * @Date         : 2020-05-25 16:50:20
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 12:16:28
 */
import React from 'react'
 export const baseInfoColumns = (self) =>{
    return [
      {
        title: '编号',
        name: 'code',
        // render:(text,record)=>{
        //     return (<span style={{color: 'red'}}>{record.code}</span>)
        // },
        // span: 3
      },
      {
        title: '名称',
        name: 'name'
      },
      {
        title: '分类',
        name: 'categoryName'
      },
      {
        title: '品牌',
        name: 'brandName'
      },
      {
        title: '规格',
        name: 'standard'
      },
      {
        title: '单位',
        name: 'unitDesc'
      },
      {
        title: '所在仓库',
        name: 'warehouseName',
      },
      {
        title: '库存',
        name: 'totalAmount'
      },
    ]
 }


export const recordColumns = (self, expand, props) => {
  return [
    {
      title: '出/入库时间',
      name: `operateTime`,
      tableItem: {
      }
    },
    { 
      title: '方向',  
      name: 'isInDesc',
      tableItem: {
      }
    },
    {
      title: '类型',
      name: 'outInTypeDesc',
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
      title: '仓库',
      name: 'name',
      tableItem: {
      }
    },
    {
      title: '关联单号',
      name: 'code',
      tableItem: {
      }
    },
    {
      title: '操作人',  
      name: 'operatorName',
      tableItem: {
      }
    }
  ]
}


export const replaceColumns = (self, expand, props) => {
  return [
    {
      title: '出/更换时间',
      name: `processTime`,
      tableItem: {
      }
    },
    { 
      title: '更换原因',  
      name: 'recordTypeDesc',
      tableItem: {
      }
    },
    {
      title: '更换数量',
      name: 'num',
      tableItem: {
      }
    },
    { 
      title: '设备编号',
      name: 'deviceCode',
      tableItem: {
      }
    },
    {
      title: '设备名称',
      name: 'deviceName',
      tableItem: {
      }
    },
    {
      title: '关联单号',
      name: 'code',
      tableItem: {
      }
    },
    {
      title: '更换人',  
      name: 'processUserName',
      tableItem: {
      }
    }
  ]
}

export const deviceColumns = (self, expand, props) => {
  // TODO 还没对应相应的参数名
  return [
    {
      title: '设备编号',
      name: `processTime`,
      tableItem: {
      }
    },
    { 
      title: '设备名称',  
      name: 'recordTypeDesc',
      tableItem: {
      }
    },
    {
      title: '出厂编号',
      name: 'num',
      tableItem: {
      }
    },
    {
      title: '类别',
      name: 'deviceCode',
      tableItem: {
      }
    },
    {
      title: '品牌',
      name: 'deviceName',
      tableItem: {
      }
    },
    {
      title: '型号',
      name: 'code',
      tableItem: {
      }
    },
    {
      title: '需求量',  
      name: 'processUserName',
      tableItem: {
      }
    }
  ]
}
