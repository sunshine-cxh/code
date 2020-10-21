/*
 * @Descripttion : 选择产品弹窗
 * @Author       : caojiarong
 * @Date         : 2020-05-20 10:28:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-23 14:04:17
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

function getNewArr(arrOld, arrNew, key){
  let arrSumNew = [],index = 0  //新的数组，重新赋值index，让数组对象里面的index于数组的下标一致 
  for(let z = 0;z<arrOld.length;z++){
      let mark = false
      arrNew.some((child)=>{
        mark = arrOld[z][key] === child[key]
        return mark
      })
      if(mark) {
          arrOld[z].index = index
          arrSumNew.push(arrOld[z])
          index ++
      }
  }
  for(let i = 0;i<arrNew.length;i++){
      let mark = false
      arrOld.some((child)=>{
        mark = arrNew[i][key] === child[key] 
        return mark
      })
      if(!mark) {
          arrNew[i].index = index
          arrSumNew.push(arrNew[i])
          index ++
      }
  }
  return arrSumNew
}


@connect(({ pickingApplyAdd, loading }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd
}))
export default class extends Component{
  searchHandler = (keyword)=> {
    const { pickingApplyAdd: { selectDataList }, dispatch } = this.props

    dispatch({
      type: 'pickingApplyAdd/getPageInfo',
      payload: {
        values: {
          keyword
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { pickingApplyAdd: { selectDataList }, dispatch } = this.props
    dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        parameters: {},
      }
    })
    this.props.dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'pickingApplyAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage()
      }
    })
  }
  handleCheck = (keys, e)=> {
    const { pickingApplyAdd: { selectDataList }, dispatch } = this.props
    this.props.dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        checkedKeys: keys
      }
    })
    dispatch({
      type: 'pickingApplyAdd/getPageInfo',
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
    let { dispatch, pickingApplyAdd, loading, visible, onChangeVisible } = this.props
    let { 
      appPageData, 
      selectDataList, 
      treeData, 
      selectedRow, 
      selectedRowKeys, 
      addRow, 
      parameters, 
      checkedKeys 
    } = pickingApplyAdd
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '添加产品',
      visible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      className:'filterModal',
      onCancel: () => {
        onChangeVisible(false)
        if(appPageData.list && appPageData.list.length <= 0){
          dispatch({
            type: 'pickingApplyAdd/@change',
            payload: {
              selectedRow:[],
            },
          })

          // 更新keys
          dispatch({
            type: 'pickingApplyAdd/@change',
            payload: {
              selectedRowKeys: [],
            },
          })
        }
        
      },


      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
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
            // standard: item.standard,
            brandId: item.brandId,
            brandName: item.brandDesc,
            // totalAmount: item.totalAmount,
            // price: item.price,
            sn:item.code,
            unit:item.unitId,
            name:item.name,
            num:item.totalAmount,
            brandDesc: item.brandDesc,
            unitDesc: item.unitDesc,
            // index: appPageData.list.length + index,
          })
        })
        
        let list = [...addRow, ...items]
        // appPageData.list = list
        appPageData.list = Format.newTableArr(appPageData.list, list, 'id')

        dispatch({
          type: 'pickingApplyAdd/@change',
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
          type: 'pickingApplyAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'pickingApplyAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'pickingApplyAdd/getPageInfo',
          payload: {
            selectDataList: selectDataList.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
        {/* <Layout> */}
          {/* <Content> */}
            <SideLayout
            sideContent={
              treeData.length > 0 && (
                <Tree
                onCheck={this.handleCheck}
                checkedKeys={  checkedKeys }
                checkable>
                  {this.renderTreeNodes(treeData)}
                </Tree>
              )
            }>
              <Panel header={null} className='modal-panel'>
                <Toolbar>
                  <Search
                    placeholder="产品编号 / 产品名称"
                    value={parameters.keyword}
                    onChange={(e) => {
                      dispatch({
                        type: 'pickingApplyAdd/@change',
                        payload: {
                          parameters: {
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
              </Panel>
              <DataTable {...dataTableSelectProps} />
            </SideLayout>
          {/* </Content> */}
        {/* </Layout> */}
      </ModalNormal>
    )
  }
}