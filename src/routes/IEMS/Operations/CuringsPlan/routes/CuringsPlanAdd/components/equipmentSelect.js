/*
 * @Descripttion : 选择养护路线弹窗
 * @Author       : hezihua
 * @Date         : 2020-06-09 10:28:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:02:55
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Format from 'utils/format'
import DataTable from 'components/DataTable'
import  { createColumnsProduct } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import TreeSelect from 'components/TreeSelect'
@connect(({ curingsPlanAdd, loading }) => ({
  curingsPlanAdd,
  loading: loading.models.curingsPlanAdd
}))
export default class extends Component{

  componentDidMount(){
    const { dispatch, curingsPlanAdd } = this.props
    let {deviceDataList} = curingsPlanAdd
    dispatch({
      type: 'curingsPlanAdd/getDeviceList',
      payload:{
        deviceDataList
      }
    })
  }
  searchHandler = (keyword)=> {
    const { curingsPlanAdd: { deviceDataList }, dispatch } = this.props
    dispatch({
      type: 'curingsPlanAdd/getDeviceList',
      payload: {
        values: {
          keyword
        },
        deviceDataList: deviceDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { curingsPlanAdd: { deviceDataList }, dispatch } = this.props
    dispatch({
      type: 'curingsPlanAdd/@change',
      payload: {
        parametersDevice: {},
      }
    })
    this.props.dispatch({
      type: 'curingsPlanAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'curingsPlanAdd/getDeviceList',
      payload: {
        deviceDataList: deviceDataList.startPage()
      }
    })
  }
  handleCheck = (keys, e)=> {
    const { curingsPlanAdd: { deviceDataList }, dispatch } = this.props
    this.props.dispatch({
      type: 'curingsPlanAdd/@change',
      payload: {
        checkedKeys: keys
      }
    })
    dispatch({
      type: 'curingsPlanAdd/getDeviceList',
      payload: {
        values: {
          entity: {
            categoryId: keys
          }
        },
        deviceDataList: deviceDataList.startPage()
      }
    })
  }
  
  render (){
    let { dispatch, curingsPlanAdd, loading, equipmentVisible, onChangeVisible } = this.props
    let {
      deviceDataList,
      selectedDeviceRow, 
      selectedDeviceRowKeys,
      selectedDeviceRowLocal,
      selectedDeviceRowKeysLocal,
      parametersDevice,
      basicInfos
    } = curingsPlanAdd
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '选择设备',
      visible: equipmentVisible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectedDeviceRowLocal: selectedDeviceRow.length ? selectedDeviceRow : [],
            selectedDeviceRowKeysLocal: selectedDeviceRowKeys,
          },
        })
        onChangeVisible(false)
      },


      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectedDeviceRow: selectedDeviceRowLocal.length ? selectedDeviceRowLocal : [],
            selectedDeviceRowKeys: selectedDeviceRowKeysLocal,
            basicInfos: {
              ...basicInfos,
              equipmentCode: selectedDeviceRowLocal.length ? selectedDeviceRowLocal[0].code : undefined
            }
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: deviceDataList,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'radio',
      onSelect: (keys, rows, currentRows, e) => {
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectedDeviceRowKeysLocal: keys,
          },
        })
      },
      onSelectRow: (record, selected) => {
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectedDeviceRowLocal: [record],
          },
        })
      },
      selectedRowKeys: selectedDeviceRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'curingsPlanAdd/getDeviceList',
          payload: {
            deviceDataList: deviceDataList.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
        <div className="module-function-wrap">
          <Toolbar>
            <Search
              placeholder="设备编号 / 设备名称"
              value={parametersDevice.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'curingsPlanAdd/@change',
                  payload: {
                    parametersDevice: {
                      keyword: e.target.value
                    },
                  }
                })
              }}
              onSearch={keyword => {
                this.searchHandler(keyword)
              }}
            />
            <Button
              type="primary2"
              className="toolbar-item"
              icon="reload"
              onClick={this.handleReload}
            >
              刷新
            </Button>
            </Toolbar>
            <DataTable { ...dataTableSelectProps } />
          </div>
      </ModalNormal>
    )
  }
}