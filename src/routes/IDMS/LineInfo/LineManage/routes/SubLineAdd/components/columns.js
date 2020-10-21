/*
 * @Descripttion : 巡检路线新增页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-18 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 16:57:45
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

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
      name: 'pipelineName',
      tableItem: {},
    },
    {
      title: '管段里程',
      name: 'inspectionPointNum',
      tableItem: {},
    },
    {
      title: '起始坐标',
      name: 'status',
      tableItem: {},
    },
    {
      title: '终点坐标',
      name: 'createdName',
      tableItem: {},
    }
  ]
};

