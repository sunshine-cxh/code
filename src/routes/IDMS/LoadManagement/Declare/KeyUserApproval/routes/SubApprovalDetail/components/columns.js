/*
 * @Descripttion : 模型仓页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-02 14:46:37
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import {EditableOper} from 'components/DataTable'

export const weatherInfoColumns =(self)=>{

  return [
    {
      title: '天气',
      name: 'theWeather',
      tableItem: {},
    },
    {
      title: '温度',
      name: 'temperature',
      tableItem: {},
    },
    {
      title: '湿度',
      name: 'humidity',
      tableItem: {},
    },
    {
      title: '风速',
      name: 'windSpeed',
      tableItem: {},
    }
  ]
};

export const baseInfoColumns = (self) =>{
  return [
    {
      title: '申报单号',
      name: 'code',
    },
    {
      title: '申报周期类型',
      name: 'declareType'
    },
    {  
      title: '申报单位',
      name: 'departmentId',
    },
    {  
      title: '申报开始时间',
      name: 'gasStartTime',
      
    },
    {  
      title: '申报结束时间',
      name: 'gasEndTime',
    },
    {  
      title: '单价（元）',
      name: 'purchasePrice',
    },
    {  
      title: '申报用气量',
      name: 'declareConsumption',
    },
    {  
      title: '批准用气量',
      name: 'ratifyConsumption',
    },
    {  
      title: '参考批复量MAX',
      name: 'referenceConsumption',
    },
    {  
      title: '日指定量',
      name: 'assignAmount',
    },
    {  
      title: '提气速率（标方）',
      name: 'upliftRate',
    },
    {  
      title: '申请人',
      name: 'notifierId',
    },
    {  
      title: '审批人',
      name: 'approverName',
    },
    {  
      title: '备注',
      name: 'remark',
    }
  ]
}

