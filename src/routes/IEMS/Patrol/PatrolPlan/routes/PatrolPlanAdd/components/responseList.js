/*
 * @Descripttion : 选择责任人弹窗
 * @Author       : caojiarong
 * @Date         : 2020-06-09 10:28:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 16:11:33
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Format from 'utils/format'
import DataTable from 'components/DataTable'
import  { createColumnsResponse } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'

@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd
}))
export default class extends Component{
  searchHandler = (keyword)=> {
    const { patrolPlanAdd: { responserList }, dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/getResponseInfo',
      payload: {
        keyword,
        responserList: responserList.startPage()
      }
    })
    
  }

  handleReload = ()=> {
    const { patrolPlanAdd: { responserList }, dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        parametersResponse: {}
      }
    })
    this.props.dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'patrolPlanAdd/getResponseInfo',
      payload: {
        keyword:'',
        responserList: responserList.startPage()
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
    let { dispatch, patrolPlanAdd, loading, visible, onChangeVisible } = this.props
    let { 
      responserList, 
      selectedResponseRow,
      selectedResponseRowKeys,
      parametersResponse,
      appPageData
    } = patrolPlanAdd
    let columnsPeople = createColumnsResponse(this)
    let modalNormalProps = {
      title: '添加责任人',
      visible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
      },

      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        appPageData.list = selectedResponseRow
        dispatch({
          type: 'patrolPlanAdd/@change',
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
      columns: columnsPeople,
      dataItems: responserList,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'checkbox',
      onSelect: (keys, rows, currentRows, e) => {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of selectedResponseRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            selectedResponseRow.push(item)
          }
          
        }
        selectedResponseRow = selectedResponseRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'patrolPlanAdd/@change',
          payload: {
            selectedResponseRow,
            selectedResponseRowKeys: keys,
          },
        })
      },
      selectedRowKeys: selectedResponseRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'patrolPlanAdd/getResponseInfo',
          payload: {
            responserList: responserList.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
        <div className="module-function-wrap">
          <Toolbar>
            <Search
              placeholder="姓名"
              value={parametersResponse.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'patrolPlanAdd/@change',
                  payload: {
                    parametersResponse: {
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