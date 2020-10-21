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

export const createColumns = (self) => {
  let { patrolPlanAdd: { allUserList, organizationTree } } = self.props
  return [
    {
      title: '',
      dataIndex: 'sort',
      width: 65,
      align: 'center',
      render: () => <DragHandle />,
    },
    {
      title: '设备编号',
      dataIndex: 'code',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '设备所属',
      dataIndex: 'hhh',
      render: (text, record) => {
        return `${record.foreignTypeDesc}/${record.foreignName}`
      }
    },
    {
      title: '所属部门',
      dataIndex: 'orgId',
      render: (text, record) => {
        let result = ''
        if (record.orgId) {
          result = Format.getNameById(organizationTree, record.orgId, 'value')
        }
        return result && result.title
      },
    },
    {
      title: '负责人',
      dataIndex: 'managerId',
      render: (text, record) => {
        let name = ''
        allUserList.forEach(item => {
          if (item.code === record.managerId) {
            name = item.codeName
          }
        })
        return name
      }
    },
    {
      title: '规格型号',
      dataIndex: 'modelCn',
    },
    {
      title: '安装位置',
      dataIndex: 'installationSite',
    },
    {
      title: '巡检标准',
      dataIndex: 'standardName',
      onCell: record => {
        return {
          onClick: event => {
            self.handleStandardSelect(true, record)
          }, // 点击行
        }
      }
    },
    {
      title: '操作',
      width: 65,
      align: 'center',
      render: (text, record) => (
        <EditableOper>
          {form =>
            (<>
              <Button tooltip="删除" onClick={e => self.handleDelete(record, 'detail')}>
                <Icon type="delete" />
              </Button>
            </>
            )
          }
        </EditableOper>
      )
    }
  ]
}
// 责任人
export const createColumnsApp = (self) => {
  let { patrolPlanAdd: { organizationTree } } = self.props
  return [
    {
      title: '姓名',
      name: 'realName',
      tableItem: {
        width: 120
      }
    },
    {
      title: '性别',
      name: `gender`,
      tableItem: {
        width: 100,
        render: (text, record) => {
          if(record.gender == 1) {
            return '男'
          } else if( record.gender == 0) {
            return '女'
          }
        },
      }
    },
    {
      title: '所属部门',
      name: 'orgId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.orgId) {
            result = Format.getNameById(organizationTree, record.orgId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {
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
              (<>
                <Button tooltip="删除" onClick={e => self.handleDelete(record, 'detail')}>
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

export const createColumnsResponse = (self) => {
  let { patrolPlanAdd: { allUserList, organizationTree } } = self.props
  return [
    {
      title: '姓名',
      name: 'realName',
      tableItem: {}
    },
    {
      title: '性别',
      name: `gender`,
      tableItem: {
        render: (text, record) => {
          if(record.gender == 1) {
            return '男'
          } else if( record.gender == 0) {
            return '女'
          }
        }
      }
    },
    {
      title: '所属部门',
      name: 'orgId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.orgId) {
            result = Format.getNameById(organizationTree, record.orgId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {}
    }
  ]
}

// 巡检路线
export const createColumnsPatrolLine = (self) => {
  let { patrolPlanAdd: { allUserList, organizationTree } } = self.props
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
      name: 'hhh',
      tableItem: {
        render: (text, record) => {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '所属部门',
      name: 'orgId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.orgId) {
            result = Format.getNameById(organizationTree, record.orgId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '负责人',
      name: 'managerId',
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
    },
    {
      title: '巡检标准',
      name: 'standardName',
      tableItem: {}
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (<>
                <Button tooltip="删除" onClick={e => self.handleDelete(record, 'detail')}>
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

export const createColumnsProduct = (self) => {
  let { patrolPlanAdd: { allUserList, organizationTree } } = self.props
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
      name: `orgId`,
      tableItem: {}
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.orgId) {
            result = Format.getNameById(organizationTree, record.orgId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '安装位置',
      name: 'installationSite',
      tableItem: {}
    }
  ]
}
export const createColumnsStandard = (self) => {
  let { patrolPlanAdd: { typeList }} = self.props
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
      name: 'typeDesc',
      tableItem: {}
    },
    {
      title: '设备类别',
      name: `cateId`,
      tableItem: {
        render:(text, record)=> {
          let result
          typeList.forEach(item=> {
            if(item.id === record.cateId) {
              result = item.title
            }
          })
          return result
        }
      }
    },
    {
      title: '要求',
      name: 'require',
      tableItem: {}
    }
  ]
}
export const patrolAndValidColumns = () => {
  return [
    { code: 1, codeName: '天' },
    { code: 2, codeName: '周' },
    { code: 3, codeName: '月' },
    // { code: 4, codeName: '时' },
  ]
}

export const warnTimeColumns = () => {
  return [
    { code: 1, codeName: '天' },
    { code: 2, codeName: '周' },
    { code: 3, codeName: '月' },
    { code: 4, codeName: '时' },
  ]
}

export const startColumns = () => {
  return [
    { code: true, codeName: '是' },
    { code: false, codeName: '否' }
  ]
}
