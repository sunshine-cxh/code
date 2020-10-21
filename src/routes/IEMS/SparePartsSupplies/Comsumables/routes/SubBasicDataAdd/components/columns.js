/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:30:12
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-23 14:01:15
 */

import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

function convertStandard(fileSize){
  if(fileSize < 1024 * 1024){
    let newStandard = (fileSize / 1024 ).toFixed(2)
    return newStandard + ' KB'
  }else if(fileSize > 1024 * 1024){
    let newStandard = (fileSize / ( 1024 * 1024 )).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createColumnsFile = (self) => {
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
              <Button tooltip="下载" type='text' style={{color: 'rgba(52, 132, 254, 1)'}} onClick={
                ()=> {
                  self.handleDownload(record)
                }
              }>{record.fileName}</Button>
              )
            }
          </EditableOper>
        )
      }
    },
    // {
    //   title: '文件类型',
    //   name: 'type',
    //   tableItem: {}
    // },
    {
      title: '文件大小',
      name: 'fileSize',
      tableItem: {
        render: (text, record)=> {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        }
      }
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {}
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <Button tooltip="删除" onClick={e => self.handleFileDelete(record)}>
                  <Icon type="delete" />
                </Button>
              )
            }
          </EditableOper>
        )
      }
    }
  ]
}