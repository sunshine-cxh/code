/*
 * @Descripttion : 重点用户申报model
 * @Author       : caojiarong
 * @Date         : 2020-08-27 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 15:32:11
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { EditableOper } from 'components/DataTable'

export const columnsData =(self)=>{

  return [
    {
      title: '申报类型',
      name: 'declareType',
      tableItem: {}
    },
    {
      title: '申报单位',
      name: 'departmentName',
      tableItem: {},
    },
    {
      title: '申报起始日期',
      name: 'gasStartTime',
      tableItem: {},
    },
    {
      title: '申报结束日期',
      name: 'gasEndTime',
      tableItem: {},
    },
    {
      title: '申报用气量',
      name: 'declareConsumption',
      tableItem: {},
    },
    {
      title: '实际用气量',
      name: 'actualConsumption',
      tableItem: {},
    },
    {
      title:'批准用气量',
      name:'ratifyConsumption',
      tableItem:{}
    },
    {
      title:'参考批复量MAX',
      name:'referenceConsumption',
      tableItem:{}
    },
    {
      title:'审批状态',
      name:'status',
      tableItem:{}
    },
    {
      title:'更新时间',
      name:'modifyOn',
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
                  {/* <Button tooltip='编辑' onClick={e => self.handleEdit(record)}>
                    <Icon type='edit' />
                  </Button>
                  <Button tooltip='删除' onClick={e => self.handleDelete(record)}>
                    <Icon type='delete' />
                  </Button> */}
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
      title: '公司名称',
      name: 'departmentId',
      formItem: {
        type:'select',
        dict:self.props.keyUserApproval.clientList
      }
    },
    {
      title: '申报状态',
      name: 'declareType',
      formItem: {
        type:'select',
        dict:[{code: 0, codeName: "待批准"},{code: 1, codeName: "已批准"},]
      }
    },
    {
      title:'创建时间',
      name:'time',
      formItem: {
        type: 'date~',
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


export const historyDataColumns =(self)=>{

  return [
    {
      title: '申报起始日期',
      name: 'declareTime',
      tableItem: {}
    },
    {
      title: '申报类型',
      name: 'declareType',
      tableItem: {}
    },
    {
      title: '重点用户',
      name: 'departmentName',
      tableItem: {},
    },
    {
      title: '申报用气量(Nm³)',
      name: 'declareConsumption',
      tableItem: {},
    },
    {
      title: '批复用气量(Nm³)',
      name: 'ratifyConsumption',
      tableItem: {
        width:180
      },
    },
    {
      title: '实际用气量(Nm³)',
      name: 'actualConsumption',
      tableItem: {
        width:180
      },
    },
    {
      title: '批复与实际偏差(Nm³)',
      name: 'deviation',
      tableItem: {
        width:180
      },
    }
  ]};

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