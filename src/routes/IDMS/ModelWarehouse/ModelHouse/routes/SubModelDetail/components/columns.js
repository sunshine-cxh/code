/*
 * @Descripttion : 模型仓页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-03 17:05:41
 */
import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import {EditableOper} from 'components/DataTable'

export const fileInfoColumns =(self)=>{
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {}
    },
    {
      title: '文件大小',
      name: 'fileSize',
      tableItem: {},
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    }
  ]
};

export const baseInfoColumns = (self) =>{
  return [
    {
      title: '模型编号',
      name: 'code',
    },
    {
      title: '模型名称',
      name: 'name'
    },
    {  
      title: '模块',
      name: 'module',
    },
    {  
      title: '版本',
      name: 'version',
      
    },
    {  
      title: '创建人',
      name: 'createdName',
    },
    {  
      title: '创建时间',
      name: 'createdOn',
    },
    {  
      title: '更新人',
      name: 'modifiedName',
    },
    {  
      title: '存放路径',
      name: 'saveAddress',
      span:2
    },
    {  
      title: '更新时间',
      name: 'modifiedOn',
    },
    {  
      title: '备注',
      name: 'remark',
      span:2
    }
  ]
}

