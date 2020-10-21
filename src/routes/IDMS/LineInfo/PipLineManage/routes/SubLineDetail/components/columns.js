/*
 * @Descripttion : 巡检路线新增页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-18 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-21 17:00:10
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import {EditableOper} from 'components/DataTable'
// 路线状态
function getStatusName(status){
  switch ( parseInt(status) ){
    case 0:
      return '未启用'
    case 1:
      return '正常'
    case 2:
      return '报废'
  }
}

export const lineInfoColumns =(self)=>{

  return [
    {
      title: '巡检点编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '巡检点名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '所属路线',
      name: 'routeIdc',
      tableItem: {
        render:(text,record)=>{
          return (
            <span>{self.props.subLineDetail.details ? self.props.subLineDetail.details.name : text}</span>
          )
        }
      },
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '创建时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'declare',
      tableItem: {
        width: 80,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                </>
              )
            }
          </EditableOper>
        )
      },
    }
  ]
};

export const baseInfoColumns = (self) =>{
  return [
    {
      title: '管段编号',
      name: 'code',
    },
    {
      title: '管段名称',
      name: 'name'
    },
    {  
      title: '起始坐标',
      name: 'coordinate',
    },
    {  
      title: '终点坐标',
      name: 'coordinate',
    },
    {  
      title: '管段里程',
      name: 'pipelineMileage',
    },
    {  
      title: '路线数',
      name: 'routeNum',
    },
    {  
      title: '所属区域',
      name: 'area',
    },
    {  
      title: '管段状态',
      name: 'statusDsc',
    },
    // {  
    //   title: '备注',
    //   name: 'remark',
    // }
  ]
}

