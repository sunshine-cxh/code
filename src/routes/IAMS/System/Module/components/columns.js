import React from 'react'
import DataTable, { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import app from '@/index.js'

export const createColumns = (self, expand) => {
  let { clientList, moduleTypeTree, record, functionAuthority, toolbarSelectorValue } = expand

  moduleTypeTree = [{
    value: "0",
    title: "无"
  }].concat(moduleTypeTree)

  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '客户端',
      name: 'clientId',
      dict: clientList,
      formItem: {
        type: 'select',
        initialValue: toolbarSelectorValue,
        disabled: !!record,
        onChange: (form, value) => {
          app.dispatch({
            type: 'module/getModuleTypeTree',
            payload: {
              values: {
                clientId: value
              }
            }
          })
        }
      },
    },
    {
      title: '上级模块',
      name: 'parentId',
      dict: clientList,
      formItem: {
        type: 'treeSelect',
        initialValue: moduleTypeTree.length ? moduleTypeTree[0].value : '',
        treeData: moduleTypeTree,
      },
    },
    {
      title: '模块名称',
      name: 'moduleName',
      tableItem: {
        width: 300,
      },
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入模块名称'
          },
          {
            max: 50,
            message: '不能大于50个字符',
          }
        ]
      },
    },
    {
      title: 'URL',
      name: 'url',
      tableItem: {
      },
      formItem: {

      }
    },
    {
      title: '图标',
      name: 'icon',
      tableItem: {
      },
      formItem: {

      }
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {},
      formItem: {
        type: 'number',
        initialValue: !record && 0,
      }
    },
    {
      title: '备注',
      name: 'remark',
      formItem: {
        type: 'textarea',
        rules: [
          {
            max: 500,
            message: '不能大于500个字符',
          }
        ]
      },
      tableItem: {
        width: '20%',
        render: (text) => <span className='ellipsis-2'>{text}</span>,
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 120,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button
              // display={functionAuthority.indexOf('btnFunctionSetting') > -1}
              tooltip="功能"
              onClick={e => self.handleFunctionVisible(record)}
            >
              <Icon type="function" />
            </Button>
            <Button
              // display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={e => self.handleUpdate(record)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              // display={functionAuthority.indexOf('btnDelete') > -1}
              tooltip="删除"
              onClick={e => self.onDelete(record)}
            >
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        )
      }
    }
  ]
}

export const createFunctionColumns = (self, expand) => {
  let { editingKey } = expand
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '功能名称',
      name: 'functionName',
      tableItem: {
        width: 120,
        type: 'input',
        editing: (text, record) => record.id === editingKey,
        rules: [{ required: true, message: '请输入名称！' }]
      }
    },
    {
      title: '按钮ID',
      name: 'functionId',
      tableItem: {
        type: 'input',
        editing: (text, record) => record.id === editingKey,
        rules: [{ required: true, message: '按钮ID' }]
      }
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {
        width: 80,
        type: 'number',
        editing: (text, record) => record.id === editingKey,
      }
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {
        type: 'input',
        editing: (text, record) => record.id === editingKey,
      }
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              record.id === editingKey ? (
                <>
                  <Button tooltip="保存" onClick={e => self.handleFunctionSave(record, form)}>
                    <Icon type="save" />
                  </Button>
                  <Button tooltip="取消" onClick={e => self.handleCancelEdit()}>
                    <Icon type="cancle" />
                  </Button>
                </>
              ) : (
                  <>
                    <Button tooltip="修改" onClick={e => self.handleFunctionEdit(record)}>
                      <Icon type="edit" />
                    </Button>
                    <Button tooltip="删除" onClick={e => self.handleFunctionDelete(record)}>
                      <Icon type="delete" />
                    </Button>
                  </>
                )
            }
          </EditableOper>
        )
      }
    }
  ]
}
