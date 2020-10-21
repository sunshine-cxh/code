import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'
import { sortableHandle } from 'react-sortable-hoc'
import Format from 'utils/format'

const DragHandle = sortableHandle(() => (
  <Icon type="edit" style={{
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 600,
    color: '#04398c'
  }} />
));




export const createColumnsProduct = (self) => {
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {}
    },
    {
      title: '设备所属',
      name: 'cateId',
      tableItem: {
        render: (text, record) => {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '所属部门',
      name: `orgName`,
      tableItem: {}
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {}
    },
    {
      title: '安装位置',
      name: 'installationSite',
      tableItem: {}
    }
  ]
}
export const createColumnsStandard = (self) => {
  let { curingsPlanAdd: { standardTypeList, typeList }} = self.props
  return [
    {
      title: '标准编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '标准名称',
      name: `name`,
      tableItem: {}
    },
    {
      title: '类型',
      name: 'type',
      tableItem: {
        render: (text, record)=> {
          let name = ''
          standardTypeList.forEach(item=> {
            if(item.code == record.type) {
              name = item.codeName
            }
          })
          return name
        }
      }
    },
    {
      title: '设备类别',
      name: `cateId`,
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.cateId) {
            result = Format.getNameById(typeList, record.cateId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '要求',
      name: 'require',
      tableItem: {}
    }
  ]
}

export const warnTimeColumns = () => {
  return [
    { code: 1, codeName: '时' },
    { code: 2, codeName: '天' },
    { code: 3, codeName: '周' },
    { code: 4, codeName: '月' },
    { code: 5, codeName: '年' },
  ]
}

export const startColumns = () => {
  return [
    { code: true, codeName: '是' },
    { code: false, codeName: '否' }
  ]
}
