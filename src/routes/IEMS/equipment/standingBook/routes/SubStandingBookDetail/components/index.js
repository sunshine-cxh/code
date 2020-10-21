/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 16:34:41
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import Tabs from 'components/Tabs'
import BasicInfo from './BasicInfos'
import UploadImage from './UploadImage'
import { routesPrefix } from '../../../../../config'
import {
  createParentColumns,
  createChildColumns,
  createConnectColumns,
  createColumnsFile,
  createInventoryColumns,
  createMoveColumns,
  createScrapColumns,
  createSellColumns,
  createRecipientsColumns,
  creatMaintenanceColumns,
  createFaultColumns,
  createInspectionColumns,
} from './columns'
import downloadFile from 'utils/fileHandler'
import '../style/index.less'
import $$ from 'cmn-utils'
let { Item } = Form
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import CheckFlow from './CheckFlow'

@connect(({ standingBookDetail, loading }) => ({
  standingBookDetail,
  loading: loading.models.standingBookDetail,
}))
export default class standingBookDetail extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'standingBookDetail/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'standingBookDetail',
        valueField: 'brandList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'standingBookDetail',
        valueField: 'unitList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'standingBookDetail',
        valueField: 'supplyList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'standingBookDetail',
        valueField: 'allUserList',
        success: () => {},
      },
    })
  }
  state = {
    tabsActiveKey: '设备图片',
    visible: false
  }
  handleDownload = (record) => {
    downloadFile(record)
  }
  handleDetail = (record, type) => {
    let { dispatch } = this.props
    $$.setStore('pre-route-path', `${routesPrefix}/standingBook/substandingBookDetail`)
    switch (type) {
      case 0:
        dispatch({
          type: 'standingBookDetail/getDetails',
          payload: {
            id: record.id,
            success: ()=> {
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/standingBook/substandingBookDetail`,
                  search: `id=${record.id}`,
                })
              )
            }
          }
        })
        break
      case 1:
        dispatch(
          routerRedux.push({
            pathname: `${routesPrefix}/inventory/subInventoryDetail`,
            search: `id=${record.id}`,
          })
        )
        break
      case 2:
        dispatch(
          routerRedux.push({
            pathname: `${routesPrefix}/move/subMoveDetail`,
            search: `id=${record.id}`,
          })
        )
        break
      case 3:
        dispatch(
          routerRedux.push({
            pathname: `${routesPrefix}/scrap/subScrapDetail`,
            search: `id=${record.id}`,
          })
        )
        break
      case 4:
        dispatch(
          routerRedux.push({
            pathname: `${routesPrefix}/sell/subSellDetail`,
            search: `id=${record.id}`,
          })
        )
        break
      case 5:
        dispatch(
          routerRedux.push({
            pathname: `${routesPrefix}/recipients/subRecipientsDetail`,
            search: `id=${record.id}`,
          })
        )
        break
      case 6:
        // dispatch(
        //   routerRedux.push({
        //     pathname: `${routesPrefix}/inventory/subInventoryDetail`,
        //     search: `id=${record.id}`,
        //   })
        // )
        break
      case 7:
        dispatch(
          routerRedux.push({
            pathname: `${routesPrefix}/repairOrder/subRepairOrderDetail`,
            search: `id=${record.id}`,
          })
        )
        break
      case 8:
        // dispatch(
        //   routerRedux.push({
        //     pathname: `${routesPrefix}/inventory/subInventoryDetail`,
        //     search: `id=${record.id}`,
        //   })
        // )
        break
      case 9:
        // dispatch(
        //   routerRedux.push({
        //     pathname: `${routesPrefix}/inventory/subInventoryDetail`,
        //     search: `id=${record.id}`,
        //   })
        // )
        break
    }
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleAgree = (resultType) => {
    let { validateFields, getFieldValue } = this.form.props.form
    let {
      dispatch,
      location: { state },
      standingBookDetail: { details },
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        let auditOpinion = getFieldValue('auditOpinion')
        dispatch({
          type: 'standingBookDetail/postaudit',
          payload: {
            id: details.id,
            resultType,
            auditOpinion,
            success: () => {
              this.handleBack()
            },
          },
        })
      }
    })
  }
  onVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  handleCheck = (record, flowTypeString) => {
    const { dispatch } = this.props
    let typeTransfer = {
      1: 'EquipmentAllocation',
      2: 'EquipmentScrap',
      3: 'EquipmentSold'
    }
    dispatch({
      type: 'standingBookDetail/getauditflowchart',
      payload: {
        id: record.id,
        flowTypeString: typeTransfer[flowTypeString],
        success: () => {
          this.onVisible(true)
        },
      },
    })
  }
  handleGetRecord = (type, id) => {
    let {
      dispatch,
      standingBookDetail: { details },
    } = this.props
    dispatch({
      type: 'standingBookDetail/getRecord',
      payload: {
        pageData: PageHelper.create(),
        values: {
          entity: {
            type,
            id,
          },
        },
        success: () => {
          // this.handleBack()
        },
      },
    })
  }
  getPropsFn = (loading, columns, dataItems) => {
    return {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      dataItems,
    }
  }
  render() {
    const parentColumns = createParentColumns(this)
    const orderColumns = createChildColumns(this)
    const connectColumns = createConnectColumns(this)
    const fileColumns = createColumnsFile(this)
    const inventoryColumns = createInventoryColumns(this)
    const moveColumns = createMoveColumns(this)
    const scrapColumns = createScrapColumns(this)
    const sellColumns = createSellColumns(this)
    const recipientsColumns = createRecipientsColumns(this)
    const maintenanceColumns = creatMaintenanceColumns(this)
    const faultColumns = createFaultColumns(this)
    const inspectionColumns = createInspectionColumns(this)
    const {
      standingBookDetail: {
        childPageData,
        connectPageData,
        details,
        filePageData,
        recordPageData,
        parentPageData,
      },
      loading,
    } = this.props
    childPageData.list = details.childLedgers
    connectPageData.list = details.sparepartsList
    filePageData.list = details.fileList
    let parentTableProps = {
      loading,
      showNum: true,
      columns: parentColumns,
      rowKey: 'id',
      dataItems: parentPageData,
    }
    let childTableProps = {
      loading,
      showNum: true,
      columns: orderColumns,
      rowKey: 'id',
      dataItems: childPageData,
    }
    let connectTableProps = {
      loading,
      showNum: true,
      columns: connectColumns,
      rowKey: 'id',
      dataItems: connectPageData,
    }
    let fileTableProps = {
      loading,
      showNum: true,
      columns: fileColumns,
      rowKey: 'id',
      dataItems: filePageData,
    }

    let equipmentList = [
      { NodeName: '设备图片', NodeGasStreamComponent: '', content: <UploadImage></UploadImage> },
      {
        NodeName: '附件',
        NodeGasStreamComponent: '',
        content: <DataTable {...fileTableProps}></DataTable>,
      },
      {
        NodeName: '父设备',
        NodeGasStreamComponent: '',
        content: <DataTable {...parentTableProps}></DataTable>,
      },
      {
        NodeName: '子设备',
        NodeGasStreamComponent: '',
        content: <DataTable {...childTableProps}></DataTable>,
      },
      {
        NodeName: '关联备件',
        NodeGasStreamComponent: '',
        content: <DataTable {...connectTableProps}></DataTable>,
      },
      {
        NodeName: '盘点记录',
        NodeGasStreamComponent: '',
        content: (
          <DataTable {...this.getPropsFn(loading, inventoryColumns, recordPageData)}></DataTable>
        ),
      },
      {
        NodeName: '调拨转移',
        NodeGasStreamComponent: '',
        content: <DataTable {...this.getPropsFn(loading, moveColumns, recordPageData)}></DataTable>,
      },
      {
        NodeName: '设备报废',
        NodeGasStreamComponent: '',
        content: (
          <DataTable {...this.getPropsFn(loading, scrapColumns, recordPageData)}></DataTable>
        ),
      },
      {
        NodeName: '设备变卖',
        NodeGasStreamComponent: '',
        content: <DataTable {...this.getPropsFn(loading, sellColumns, recordPageData)}></DataTable>,
      },
      {
        NodeName: '领用归还',
        NodeGasStreamComponent: '',
        content: (
          <DataTable {...this.getPropsFn(loading, recipientsColumns, recordPageData)}></DataTable>
        ),
      },
      {
        NodeName: '养护记录',
        NodeGasStreamComponent: '',
        content: (
          <DataTable {...this.getPropsFn(loading, maintenanceColumns, recordPageData)}></DataTable>
        ),
      },
      {
        NodeName: '故障维修',
        NodeGasStreamComponent: '',
        content: (
          <DataTable {...this.getPropsFn(loading, faultColumns, recordPageData)}></DataTable>
        ),
      },
      {
        NodeName: '巡检记录',
        NodeGasStreamComponent: '',
        content: (
          <DataTable {...this.getPropsFn(loading, inspectionColumns, recordPageData)}></DataTable>
        ),
      },
    ]
    let { tabsActiveKey } = this.state
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
          <Tabs
            style={{ marginTop: 40 }}
            activeKey={tabsActiveKey}
            onChange={(value) => {
              this.setState({
                tabsActiveKey: value,
              })
            }}
            // this.handleGetRecord(1, details.id)
            onTabClick={(key, mouseevent) => {
              switch (key) {
                case '父设备':
                  //  this.handleGetRecord(1, details.id)
                  break
                case '盘点记录':
                  this.handleGetRecord(1, details.id)
                  break
                case '调拨转移':
                  this.handleGetRecord(2, details.id)
                  break
                case '设备报废':
                  this.handleGetRecord(3, details.id)
                  break
                case '设备变卖':
                  this.handleGetRecord(4, details.id)
                  break
                case '领用归还':
                  this.handleGetRecord(5, details.id)
                  break
                case '养护记录':
                  this.handleGetRecord(6, details.id)
                  break
                case '故障维修':
                  this.handleGetRecord(7, details.id)
                  break
                case '巡检记录':
                  this.handleGetRecord(8, details.id)
                  break
              }
            }}
          >
            {equipmentList.map((item, i) => {
              return (
                <div tab={item.NodeName} key={item.NodeName} className="tab-item">
                  {item.content}
                  {/* <Form
                    ref="wwww"
                    columns={columns}
                    record={item.NodeGasStreamComponent}
                    type="inline"
                    // onSubmit={this.onSubmit}
                    footer={false}
                    labelAlign="right"
                    // formItemLayout={formItemLayout}
                    {...formItemLayout}
                  /> */}
                </div>
              )
            })}
          </Tabs>
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleBack}>
            返回
          </Button>
        </section>
        <CheckFlow visible={this.state.visible} onVisible={this.onVisible}></CheckFlow>
      </SubPageLayout>
    )
  }
}
