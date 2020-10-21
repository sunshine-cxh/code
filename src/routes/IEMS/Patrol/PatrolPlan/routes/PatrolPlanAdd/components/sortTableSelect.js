/*
 * @Descripttion : 选择巡检路线弹窗
 * @Author       : caojiarong
 * @Date         : 2020-06-09 10:28:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-01 11:33:58
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
@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd
}))
export default class extends Component{

  componentDidMount(){
    const { dispatch, patrolPlanAdd } = this.props
    let {deviceDataList} = patrolPlanAdd
    dispatch({
      type: 'patrolPlanAdd/getDeviceList',
      payload:{
        deviceDataList
      }
    })
  }

  searchHandler = (keyword)=> {
    const { patrolPlanAdd: { deviceDataList }, dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/getDeviceList',
      payload: {
        values: {
          keyword
        },
        deviceDataList: deviceDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { patrolPlanAdd: { deviceDataList }, dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        parametersDevice: {},
      }
    })
    this.props.dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'patrolPlanAdd/getDeviceList',
      payload: {
        deviceDataList: deviceDataList.startPage()
      }
    })
  }
  handleCheck = (keys, e)=> {
    const { patrolPlanAdd: { deviceDataList }, dispatch } = this.props
    this.props.dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        checkedKeys: keys
      }
    })
    dispatch({
      type: 'patrolPlanAdd/getDeviceList',
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
    let { dispatch, patrolPlanAdd, loading, visible, onChangeVisible } = this.props
    let { 
      selectDataList, 
      deviceDataList,
      selectedDeviceRow, 
      selectedDeviceRowKeys,
      parametersDevice,
      organizationTree
    } = patrolPlanAdd
    let selectedRow = selectedDeviceRow
    let selectedRowKeys = selectedDeviceRowKeys
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '选择设备',
      visible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
        if(selectDataList.list && selectDataList.list.length <= 0){
          dispatch({
            type: 'patrolPlanAdd/@change',
            payload: {
              selectedDeviceRow:[],
              selectedDeviceRowKeys: [],
            },
          })
        }
        
      },


      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        selectDataList.list = selectedDeviceRow
        
        dispatch({
          type: 'patrolPlanAdd/@change',
          payload: {
            selectDataList
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
      selectType: 'checkbox',
      onSelect: (keys, rows, currentRows, e) => {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of selectedDeviceRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            selectedDeviceRow.push(item)
          }
          
        }
        selectedDeviceRow = selectedDeviceRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'patrolPlanAdd/@change',
          payload: {
            selectedDeviceRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'patrolPlanAdd/@change',
          payload: {
            selectedDeviceRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'patrolPlanAdd/getDeviceList',
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
                  type: 'patrolPlanAdd/@change',
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