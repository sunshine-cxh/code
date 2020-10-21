/*
 * @Descripttion : 选择产品弹窗
 * @Author       : caojiarong
 * @Date         : 2020-05-25 10:28:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 16:26:17
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
@connect(({ warehouseInventoryAdd, loading }) => ({
  warehouseInventoryAdd,
  loading: loading.models.warehouseInventoryAdd
}))
export default class extends Component{
  state={
    keyword:''
  }
  searchHandler = (keyword)=> {
    const { warehouseInventoryAdd: { selectDataList }, dispatch } = this.props

    dispatch({
      type: 'warehouseInventoryAdd/getPageInfo',
      payload: {
        values: {
          keyword
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { warehouseInventoryAdd: { selectDataList }, dispatch } = this.props
    dispatch({
      type: 'warehouseInventoryAdd/@change',
      payload: {
        parameters: {},
      }
    })
    this.props.dispatch({
      type: 'warehouseInventoryAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'warehouseInventoryAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage()
      }
    })
    this.setState({keyword:''})
  }
  handleCheck = (keys, e)=> {
    const { warehouseInventoryAdd: { selectDataList }, dispatch } = this.props
    this.props.dispatch({
      type: 'warehouseInventoryAdd/@change',
      payload: {
        checkedKeys: keys
      }
    })
    dispatch({
      type: 'warehouseInventoryAdd/getPageInfo',
      payload: {
        values: {
          entity: {
            categoryId: keys
          }
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }
  
  render (){
    let { dispatch, warehouseInventoryAdd, loading, productVisible, onChangeVisible } = this.props
    let { 
      appPageData, 
      selectDataList, 
      selectedRow, 
      selectedRowKeys, 
      addRow, 
    } = warehouseInventoryAdd
    let {keyword}=this.state
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '添加产品',
      visible: productVisible,  
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
        if(appPageData.list && appPageData.list.length <= 0){
          dispatch({
            type: 'warehouseInventoryAdd/@change',
            payload: {
              selectedRow:[],
            },
          })

          // 更新keys
          dispatch({
            type: 'warehouseInventoryAdd/@change',
            payload: {
              selectedRowKeys: [],
            },
          })
        }
      },

      // 新增、修改都会进到这个方法中
      onSubmit: (values) => {
        let selectedList = [],
          items = []
        selectedList = Object.values(selectedRow).flat()
        selectedList.forEach((item, index) => {
          items.push({
            id: item.id,
            productCode: item.code,
            productName: item.name,
            unitId: item.unitId,
            unitName: item.unitDesc,
            standard: item.standard,
            brandId: item.brandId,
            brandName: item.brandName,
            totalAmount: item.totalAmount,
            price: item.price
          })
        })
        
        let list = [...addRow, ...items]
        appPageData.list = Format.newTableArr(appPageData.list, list, 'id')

        dispatch({
          type: 'warehouseInventoryAdd/@change',
          payload: {
            appPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: selectDataList,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'checkbox',
      onSelect: (keys, rows, currentRows, e) => {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of selectedRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            selectedRow.push(item)
          }
          
        }
        selectedRow = selectedRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'warehouseInventoryAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'warehouseInventoryAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'warehouseInventoryAdd/getPageInfo',
          payload: {
            values:{
              keyword
            },
            selectDataList: selectDataList.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
          <div className="module-function-wrap">
            <Toolbar>
              <Search
                placeholder=" 产品编号 / 产品名称"
                value={keyword}
                onChange={(e) => {
                  this.setState({keyword:e.target.value})
                }}
                onSearch={(keyword) => {
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
            <DataTable {...dataTableSelectProps} />
          </div>
      </ModalNormal>
    )
  }
}