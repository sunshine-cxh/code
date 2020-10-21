/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 18:44:25
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'


function convertStandard(fileSize) {
  if (fileSize < 1024 * 1024) {
    let newStandard = (fileSize / 1024).toFixed(2)
    return newStandard + ' KB'
  } else if (fileSize > 1024 * 1024) {
    let newStandard = (fileSize / (1024 * 1024)).toFixed(2)
    return newStandard + ' MB'
  }
}

export const baseInfoColumns = (self) => {
  let { standingBookDetail: { allUserList } } = self.props

  return [
    {
      title: '设备编号',
      name: 'code',
    },
    {
      title: '设备名称',
      name: 'name',
    },
    {
      title: '设备类别',
      name: 'cateName',
    },
    {
      title: '是否强制检定',
      name: 'isVerification',
      render: (text, record) => {
        if(record.isVerification === 1) {
          return '是'
        } else if(record.isVerification === 0) {
          return '否'
        }
        return null
      },
    },

    {
      title: '连接尺寸',
      name: 'connectionSize',
    },
    {
      title: '整定压力/设定压力',
      name: 'setPressure',
    },
    {
      title: '所属部门',
      name: 'orgName',
    },
    {
      title: '负责人',
      name: 'managerId',
      render: (text, record) => {
        let result = ''
        allUserList.forEach((item) => {
          if (item.code === record.managerId) {
            result = item.codeName
          }
        })
        return result
      },
    },
    {
      title: '设备所属',
      name: 'foreignTypeDesc',
    },
    {
      title: '设备状态',
      name: 'statusDesc',
    },
    {
      title: '安装位置',
      name: 'installationSite',
    },

    {
      title: '出厂编号',
      name: 'factorySn',
    },
    {
      title: '资产编号',
      name: 'assetSn',
    },

    {
      title: '品牌',
      name: 'brandName',
    },
    {
      title: '规格型号',
      name: 'modelCn',
    },
    {
      title: '计量单位',
      name: 'unitDesc',
    },
    {
      title: '供应商',
      name: 'supplierDesc',
    },

    {
      title: '购置日期',
      name: 'purchaseDate',
      render: (text, record)=> {
        return record.purchaseDate && record.purchaseDate.slice(0,10)
      }
    },
    {
      title: '购置金额',
      name: 'amountMoney',
    },
    {
      title: '保修期(到期日)',
      name: 'warrantyDate',
      render: (text, record)=> {
        return record.warrantyDate && record.warrantyDate.slice(0,10)
      }
    },
    {
      title: '投产日期',
      name: 'productDate',
      render: (text, record)=> {
        return record.productDate && record.productDate.slice(0,10)
      }
    },
    {
      title: '预计报废日期',
      name: 'scrapDate',
      render: (text, record)=> {
        return record.scrapDate && record.scrapDate.slice(0,10)
      }
    },
    {
      title: '创建人',
      name: 'createdName',
    },
    {
      title: '创建日期',
      name: 'createdOn',
      render: (text, record)=> {
        return record.createdOn && record.createdOn.slice(0,10)
      }
    },
    {
      title: '最后更新',
      name: 'modifiedName',
    },
    {
      title: '最后更新日期',
      name: 'modifiedOn',
      render: (text, record)=> {
        return record.modifiedOn && record.modifiedOn.slice(0,10)
      }
    },


    {
      title: '备注',
      name: 'remark',
    },
  ]
}

export const createCheckColumns = (self) => {
  return [
    {
      title: '审批人',
      name: 'auditorName',
      tableItem: {},
    },
    {
      title: '审批时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '审批意见',
      name: 'description',
      tableItem: {},
    },
    {
      title: '审批结果',
      name: 'resultAction',
      tableItem: {},
    },
  ]
}


export const createColumnsFile = (self) => {
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="下载"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleDownload(record)
                }}
              >
                {record.fileName}
              </Button>
            )}
          </EditableOper>
        ),
      },
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
        render: (text, record) => {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        }
      },
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    }
  ]
}

export const createParentColumns = (self) => {
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '设备所属',
      name: 'brandName',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 0)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createChildColumns = (self) => {
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '设备所属',
      name: 'brandName',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 0)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}

export const createConnectColumns = (self) => {
  return [
    {
      title: '耗材编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '品牌',
      name: 'brandDesc',
      tableItem: {},
    },
    {
      title: '分类',
      name: 'categoryDesc',
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unitDesc',
      tableItem: {},
    },
    {
      title: '库存',
      name: 'totalAmount',
      tableItem: {},
    },
    {
      title: '需求量',
      name: 'needNum',
      tableItem: {},
    },
    // {
    //   title: '操作',
    //   name: 'opereation',
    //   tableItem: {
    //     width: 150,
    //     align: 'center',
    //     render: (text, record) => (
    //       <EditableOper>
    //         {(form) => (
    //           <>
    //             <Button tooltip="详情" onClick={e => self.handleDetail(record, 9)}>
    //               <Icon type="detail" />
    //             </Button>
    //           </>
    //         )}
    //       </EditableOper>
    //     ),
    //   },
    // }
  ]
}

export const createInventoryColumns = (self) => {
  let statusArr = ['待执行', '执行中', '已盘点', '已过期']
  return [
    {
      title: '盘点单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '盘点时间',
      name: 'inventoryTime',
      tableItem: {},
    },
    {
      title: '盘点设备',
      name: 'ledgerStr',
      tableItem: {},
    },
    {
      title: '责任人',
      name: 'operatorName',
      tableItem: {},
    },
    {
      title: '状态',
      name: 'state',
      tableItem: {
        render: (text, record)=> {
          return statusArr[record.state]
        }
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 1)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createMoveColumns = (self) => {
  return [
    {
      title: '调拨单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'registerDate',
      tableItem: {},
    },
    {
      title: '涉及设备',
      name: 'ledgerStr',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '审批状态',
      name: 'isCommitDesc',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="查看审批进度"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleCheck(record, 1)
                }}
              >
                {record.isCommitDesc}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 2)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createScrapColumns = (self) => {
  return [
    {
      title: '报废单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '涉及设备',
      name: 'ledgerStr',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '审批状态',
      name: 'isCommitDesc',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="查看审批进度"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleCheck(record, 2)
                }}
              >
                {record.isCommitDesc}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 3)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createSellColumns = (self) => {
  return [
    {
      title: '变卖单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '涉及设备',
      name: 'ledgerStr',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '审批状态',
      name: 'isCommitDesc',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="查看审批进度"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleCheck(record, 3)
                }}
              >
                {record.isCommitDesc}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 4)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createRecipientsColumns = (self) => {
  return [
    {
      title: '领用归还',
      name: 'code',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '涉及设备',
      name: 'ledgerStr',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '领用/归还',
      name: 'collar',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 5)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const creatMaintenanceColumns = (self) => {
  return [
    {
      title: '养护计划编号',
      name: 'planCode',
      tableItem: {},
    },
    {
      title: '计划时间',
      name: 'planTime',
      tableItem: {},
    },
    {
      title: '执行时间',
      name: 'excuteTime',
      tableItem: {},
    },
    {
      title: '养护类型',
      name: 'curingType',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'devicedName',
      tableItem: {},
    },
    {
      title: '养护人',
      name: 'maintains',
      tableItem: {},
    },
    {
      title: '养护费用(元)',
      name: 'amount',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 6)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createFaultColumns = (self) => {
  return [
    {
      title: '维修单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '报障时间',
      name: 'reportTime',
      tableItem: {},
    },
    {
      title: '故障类型',
      name: 'faultTypeStr',
      tableItem: {},
    },
    {
      title: '故障等级',
      name: 'faultLevelStr',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'ledgerName',
      tableItem: {},
    },
    {
      title: '报修人',
      name: 'reportUser',
      tableItem: {},
    },
    {
      title: '状态',
      name: 'stateStr',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 7)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}
export const createInspectionColumns = (self) => {
  return [
    {
      title: '巡检计划单号',
      name: 'planCode',
      tableItem: {},
    },
    {
      title: '计划名称',
      name: 'planName',
      tableItem: {},
    },
    {
      title: '计划时间',
      name: 'planTimeStr',
      tableItem: {},
    },
    {
      title: '责任人',
      name: 'responseString',
      tableItem: {},
    },
    {
      title: '任务状态',
      name: 'state',
      tableItem: {},
    },
    {
      title: 'checkableNum',
      name: 'name',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={e => self.handleDetail(record, 8)}>
                  <Icon type="detail" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    }
  ]
}