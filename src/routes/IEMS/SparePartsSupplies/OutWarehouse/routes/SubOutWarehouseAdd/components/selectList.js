/*
 * @Descripttion : 选择产品弹窗
 * @Author       : caojiarong
 * @Date         : 2020-05-20 10:28:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-06 15:10:38
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
import Tree from 'components/Tree'
const TreeNode = Tree.TreeNode
import SideLayout from 'components/SideLayout'
import { Layout } from 'antd'
import Panel from 'components/Panel'
const { Content } = Layout

@connect(({ outWarehouseAdd, loading }) => ({
  outWarehouseAdd,
  loading: loading.models.outWarehouseAdd
}))
export default class extends Component{
  state={
    keyword:''
  }
  searchHandler = (keyword)=> {
    const { outWarehouseAdd: { selectDataList,basicInfos }, dispatch } = this.props

    dispatch({
      type: 'outWarehouseAdd/getPageInfo',
      payload: {
        values: {
          keyword,
          entity:{
            warehouseId:basicInfos.warehouseId
          }
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { outWarehouseAdd: { selectDataList,basicInfos }, dispatch } = this.props
    dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        parameters: {},
      }
    })
    this.props.dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'outWarehouseAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
        values:{
          entity:{
            warehouseId:basicInfos.warehouseId
          }
        }
      }
    })
    this.setState({keyword:''})
  }
  handleCheck = (keys, e)=> {
    const { outWarehouseAdd: { selectDataList,basicInfos }, dispatch } = this.props
    this.props.dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        checkedKeys: keys
      }
    })
    dispatch({
      type: 'outWarehouseAdd/getPageInfo',
      payload: {
        values: {
          entity: {
            categoryId: keys,
            warehouseId:basicInfos.warehouseId
          }
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.title} key={item.id} {...item} />
    })
  }
  render (){
    let { dispatch, outWarehouseAdd, loading, productVisible, onChangeVisible } = this.props
    let { 
      appPageData, 
      selectDataList, 
      selectedRow, 
      selectedRowKeys, 
      addRow, 
      basicInfos
    } = outWarehouseAdd
    let {keyword} = this.state
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
            type: 'outWarehouseAdd/@change',
            payload: {
              selectedRow:[],
            },
          })

          // 更新keys
          dispatch({
            type: 'outWarehouseAdd/@change',
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
            productId:item.id,
            productCode: item.code,
            productName: item.name,
            unitId: item.unitId,
            unitName: item.unitDesc,
            standard: item.standard,
            brandId: item.brandId,
            brandName: item.brandDesc,
            totalAmount: item.totalAmount,
            price: item.price
          })
        })
        
        let list = [...addRow, ...items]
        appPageData.list = Format.newTableArr(appPageData.list, list, 'id')

        dispatch({
          type: 'outWarehouseAdd/@change',
          payload: {
            appPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      // className:'test',
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
          type: 'outWarehouseAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'outWarehouseAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'outWarehouseAdd/getPageInfo',
          payload: {
            values:{
              keyword,
              entity:{
                warehouseId:basicInfos.warehouseId
              }
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
                placeholder="产品编号 / 产品名称"
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
              {/* <SearchLayout {...searchLayoutProps}></SearchLayout> */}
            </Toolbar>
            <DataTable {...dataTableSelectProps} />
          </div>
      </ModalNormal>
    )
  }
}