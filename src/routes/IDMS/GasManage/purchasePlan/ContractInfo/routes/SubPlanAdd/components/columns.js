/*
 * @Descripttion : 合同新增页面model
 * @Author       : caojiarong
 * @Date         : 2020-09-01 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 19:20:28
 */
import React from 'react';
import DataTable,{EditableOper} from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
function convertStandard(fileSize){
  if(fileSize < 1024 * 1024){
    let newStandard = (fileSize / 1024 ).toFixed(2)
    return newStandard + ' KB'
  }else if(fileSize > 1024 * 1024){
    let newStandard = (fileSize / ( 1024 * 1024 )).toFixed(2)
    return newStandard + ' MB'
  }
}

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
      tableItem: {
        render:(text,record)=>{
        return <>{convertStandard(record.fileSize)}</>
        }
      },
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'operation',
      tableItem: {
        width: 80,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='删除' onClick={e => self.handleChildDelete(record)}>
                    <Icon type='delete' />
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