/*
 * @Descripttion : 合同信息列表model
 * @Author       : caojiarong
 * @Date         : 2020-09-01 14:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 18:50:25
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { EditableOper } from 'components/DataTable'

export const columnsData =(self)=>{

  return [
    {
      title: '合同编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '合同名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '交付点',
      name: 'deliveryAddrss',
      tableItem: {},
    },
    {
      title: '买方',
      name: 'buyer',
      tableItem: {},
    },
    {
      title: '卖方',
      name: 'seller',
      tableItem: {},
    },
    {
      title: '合同类型',
      name: 'contractType',
      tableItem: {},
    },
    {
      title:'合同起止时间',
      name:'startTime',
      tableItem:{
        render:(text,record)=>{
          return <>{record.startTime}~{record.endTime}</>
        }
      }
    },
    {
      title:'是否临时合同',
      name:'isTemp',
      tableItem:{
        render:(text,record)=>{
          return <>{record.isTemp ? '是' : '否'}</>
          }
      }
    },
    {
      title:'合同状态',
      name:'status',
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
                  <Button tooltip='增加补充协议' onClick={e => self.handleAdd(record)}>
                    <Icon type='plus' />
                  </Button>
                  <Button tooltip='查看补充协议' onClick={e => self.onChangeVisible(true,record.id)}>
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
      title: '合同类型',
      name: 'contractType',
      formItem: {
        type:'select',
        dict:self.props.contractInfo.agreementList
      }
    },
    {
      title: '合同状态',
      name: 'status',
      formItem: {
        type:'select',
        dict:self.props.contractInfo.agreementStatusList
      }
    },
    { //TODO 
      title: '买方',
      name: 'buyer',
      formItem: {
        type:'select',
        dict:self.props.contractInfo.buyerList
      }
    },
    { //TODO 
      title: '卖方',
      name: 'seller',
      formItem: {
        type:'select',
        dict:self.props.contractInfo.sellerList
      }
    },
    {
      title:'交付点',
      name:'liveryAddrss',
      formItem:{
        type:'select',
        dict:self.props.contractInfo.addressList
      }
    },
    {
      title:'临时合同',
      name:'isTemp',
      formItem: {
        type: 'select',
        dict: [{code:1,codeName:'是'},{code:0,codeName:'否'}]
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

export const childColumnsData =(self)=>{

  return [
    {
      title: '协议编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '协议名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '交付点',
      name: 'version',
      tableItem: {},
    },
    {
      title: '买方',
      name: 'buyer',
      tableItem: {},
    },
    {
      title: '卖方',
      name: 'seller',
      tableItem: {},
    },
    {
      title: '协议类型',
      name: 'status',
      tableItem: {},
    },
    {
      title:'合同起止时间',
      name:'date',
      tableItem:{
        render:(text,record)=>{
          return <>{record.startTime}~{record.endTime}</>
        }
      }
    },
    {
      title:'协议状态',
      name:'status',
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