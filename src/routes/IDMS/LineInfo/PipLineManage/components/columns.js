/*
 * @Descripttion : 巡检路线管理列表model
 * @Author       : caojiarong
 * @Date         : 2020-08-17 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-21 09:28:17
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { EditableOper } from 'components/DataTable'
// 状态
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
      title: '管段编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '管段名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '所属区域',
      name: 'area',
      tableItem: {},
    },
    {
      title: '路线数量',
      name: 'routeNum',
      tableItem: {},
    },
    {
      title: '路线状态',
      name: 'status',
      tableItem: {},
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
                  <Button tooltip='编辑' onClick={e => self.handleNewPoint(record)}>
                    <Icon type='edit' />
                  </Button>
                  <Button tooltip='作废' onClick={e => self.handleDelete(record)}>
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
      title: '管段编号',
      name: 'code',
      formItem: {}
    },
    {
      title: '管段名称',
      name: 'name',
      formItem: {}
    },
    { //TODO 管段下拉选择
      title: '所属区域',
      name: 'area',
      formItem: {}
    }
  ]
}

export const modalFormColumns = (self)=>{
  return [
    {
      title: '路线编号',
      name: 'code',
      formItem: {
        disabled:true
      }
    },
    {
      title: '路线名称',
      name: 'name',
      formItem: {
        disabled:true
      }
    },
    {
      title: '巡检点数量',
      name: 'inspectionPointNum',
      formItem: {
        type:'number'
      }
    },
    {
      title: '打卡方式',
      name: 'method',
      formItem: {
        type:'select',
        dict:[{code: 0, codeName: "全部"},{code: 1, codeName: "定点打卡"},{code: 2, codeName: "触点打卡"}]
      }
    },
    {
      title: '打卡范围',
      name: 'range',
      formItem:{
        type:'number'
      }
    }
  ]
}