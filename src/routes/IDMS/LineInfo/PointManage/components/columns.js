/*
 * @Descripttion : 巡检巡检点管理列表model
 * @Author       : caojiarong
 * @Date         : 2020-08-17 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 16:36:24
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { EditableOper } from 'components/DataTable'
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

export const columnsData =(self)=>{
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
    title: '巡检点坐标',
    name: 'coordinate',
    tableItem: {},
  },
  {
    title: '所属路线',
    name: 'routeId',
    tableItem: {},
  },
  {
    title: '打卡方式',
    name: 'method',
    tableItem: {},
  },
  {
    title: '打卡范围',
    name: 'range',
    tableItem: {},
  },
  {
    title: '创建人',
    name: 'createdBy',
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
                <Button tooltip='编辑' onClick={e => self.handleEdit(record)}>
                  <Icon type='edit' />
                </Button>
                
                  <Button tooltip='删除' onClick={e => self.handleDelete(record.id)}>
                  <Icon type='delete' />
                </Button>
              </>
            )
          }
        </EditableOper>
      )
    },
  }
  ]};

export const filterColumns = (self)=>{
  return [
    {
      title: '巡检点编号',
      name: 'code',
      formItem: {
      }
    },
    {
      title: '巡检点名称',
      name: 'name',
      formItem: {}
    },
    { //TODO 管段下拉选择
      title: '所属路线',
      name: 'lineId',
      formItem: {}
    }
    ,
    { //TODO 管段下拉选择
      title: '打卡方式',
      name: 'lineId',
      formItem: {}
    }
  ]
}

export const modalFormColumns = (self)=>{
  return [
    {
      title: '巡检点编号',
      name: 'code',
      formItem: {
        disabled:true
      }
    },
    {
      title: '巡检点名称',
      name: 'name',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入巡检点名称',
          },
        ],
      }
    },
    {
      title: '巡检点坐标',
      name: 'coordinate',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入巡检点坐标',
          },
        ],
      }
    },
    {
      title: '打卡方式',
      name: 'method',
      formItem: {
        rules: [
          {
            required: true,
            message: '请选择打卡方式',
          },
        ],
        type:'select',
        dict:self.props.pointManage.checkMethodList
      }
    },
    {
      title: '打卡范围',
      name: 'range',
      formItem:{
        rules: [
          {
            required: true,
            message: '请输入打卡范围',
          },
        ],
      }
    },
    { //后端接口对接那数据
      title: '路线名称',
      name: 'routeId',
      formItem: {
        rules: [
          {
            required: true,
            message: '请选择路线名称',
          },
        ],
        type:'select',
        dict:self.props.pointManage.lineList
      }
    },
    {
      title: '备注',
      name: 'remark',
      formItem:{}
    },
  ]
}