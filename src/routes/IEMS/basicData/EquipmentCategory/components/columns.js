import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export default (self, expand) => {
  let { equipmentcategoryType, record, functionAuthority } = expand
  equipmentcategoryType = Format.selectTreeFormat(
    equipmentcategoryType,
    'id',
    'title'
  )
  equipmentcategoryType = [
    {
      value: '0',
      title: '无',
    },
  ].concat(equipmentcategoryType)
  let equipmentcategoryDict = Format.selectDictFormat(
    equipmentcategoryType,
    true
  )
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '类别编号',
      name: 'code',
      tableItem: {},
      searchItem: {
        group: 'abc',
      },
      formItem: {
        type: 'disabled',
        initialValue: '系统自动生成',
      },
    },
    {
      title: '上级类别',
      name: 'parentId',
      dict: equipmentcategoryDict,
      formItem: {
        type: 'treeSelect',
        initialValue: equipmentcategoryType.length
          ? equipmentcategoryType[0].value
          : '',
        treeData: equipmentcategoryType,
      },
    },
    {
      title: '类别名称',
      name: 'name',
      tableItem: {
        width: 300,
        align: 'left',
        className: 'table-tree-cell',
      },
      searchItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入类别名称',
          },
        ],
      },
    },
    
    {
      title: '类型',
      name: 'type',
      dict: [
        { code: 1, codeName: '设备' },
        { code: 2, codeName: '耗材' },
      ],
      formItem: {
        type: 'radio',
        initialValue: 1,
      },
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {},
      formItem: {
        type: 'number',
      },
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
      formItem: {
        type: 'textarea',
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button
              display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={(e) => self.onUpdate(record)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              display={functionAuthority.indexOf('btnDelete') > -1}
              tooltip="删除"
              onClick={(e) => self.onDelete(record)}
            >
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}
