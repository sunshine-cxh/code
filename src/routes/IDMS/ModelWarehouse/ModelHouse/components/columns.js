/*
 * @Descripttion : 模型仓管理列表model
 * @Author       : caojiarong
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-03 16:20:43
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { EditableOper } from 'components/DataTable'

export const columnsData =(self)=>{

  return [
    {
      title: '模型编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '模型名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '版本',
      name: 'version',
      tableItem: {},
    },
    {
      title: '模块',
      name: 'module',
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
      title:'存放路径',
      name:'saveAddress',
      tableItem:{}
    },
    {
      title: '操作',
      name: 'declare',
      tableItem: {
        width: 180,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                  <Button tooltip='编辑' onClick={e => self.handleEdit(record)}>
                    <Icon type='edit' />
                  </Button>
                  <Button tooltip='删除' onClick={e => self.handleDelete(record)}>
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
      title: '模型编号',
      name: 'code',
      formItem: {}
    },
    {
      title: '模型名称',
      name: 'name',
      formItem: {
        
      }
    },
    { //TODO 管段下拉选择
      title: '模块',
      name: 'module',
      formItem: {
        type:'select',
        dict:self.props.modelHouse.moduleList
      }
    },
    {
      title:'创建人',
      name:'createdName',
      formItem:{}
    },
    {
      title:'创建时间',
      name:'createdOn',
      formItem: {
        type: 'date',
        format: 'YYYY-MM-DD',
        allowClear: true
      }
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