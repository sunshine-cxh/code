/*
 * @Descripttion : 库存台账
 * @Author       : caojiarong
 * @Date         : 2020-05-23 09:35:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:48:51
 */
 
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import { routerRedux } from 'dva/router'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import { Switch } from 'dva/router'
import { routesPrefix } from '../../../config'
const { Content } = Layout
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import SearchLayout from 'components/SearchLayout'
import { createFormColumns, createColumns} from './columns'
import Tree from 'components/Tree'
import $$ from 'cmn-utils'
const TreeNode = Tree.TreeNode
import SideLayout from 'components/SideLayout'
import '../style/index.less'

import PageHelper from 'utils/pageHelper'
let loaded = false
@connect(({ inventoryLedger, loading }) => ({
  inventoryLedger, 
  loading: loading.models.inventoryLedger,
}))
export default class extends BaseComponent {
  componentDidMount() {
    const { dispatch } = this.props
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'inventoryLedger/init'
      })
    }

    dispatch({
      type:'inventoryLedger/getWarehouse',
      payload:{}
    })
    
  }

  handleDetails = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'inventoryLedger/getDetails',
      payload: {
        id: record.code,
        success: ()=> {

          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/inventoryLedger/subInventoryLedgerDetail`,
              search: `id=${record.id}`,
            })
          )

        }
      }
    })
  }

  // 刷新
  handleReload = () => {
    const { inventoryLedger: {pageData}, dispatch } = this.props
    dispatch({
      type: 'inventoryLedger/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'inventoryLedger/getPageInfo',
      payload: {
        pageData: PageHelper.create()
      }
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { inventoryLedger: { pageData }, dispatch } = this.props

    dispatch({
      type: 'inventoryLedger/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: PageHelper.create()
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
  handleCheck = (keys)=> {
    const { inventoryLedger: { pageData }, dispatch } = this.props
    this.props.dispatch({
      type: 'inventoryLedger/@change',
      payload: {
        checkedKeys: keys
      }
    })
    dispatch({
      type: 'inventoryLedger/getPageInfo',
      payload: {
        values: {
          entity: {
            sparePartsIds: keys
          }
        },
        pageData: PageHelper.create()
      }
    })
  }
  render() {
    let {
    routerData: {
      childRoutes
    }, 
    inventoryLedger: {
      isCurrentRoute, 
      parameters, 
      pageData, 
      popoverVisible,
      treeData,
      checkedKeys,
      warehouseList
    }, 
    dispatch, 
    loading} = this.props
    let columns = createColumns(this)
    let formColumns = createFormColumns(this, warehouseList)
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form)=> {
        let forms = {
          warehouseId: form.warehouseId,
          code: form.productCode,
          name: form.productName,
          standard: form.standard
        }

        // 隐藏 popover
        dispatch({
          type: 'inventoryLedger/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'inventoryLedger/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: PageHelper.create()
          }
        })
      },
      popoverVisible,
      popoverChange: ()=> {
        dispatch({
          type: 'inventoryLedger/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'inventoryLedger/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }) //表格有复选框选项
    }
    return (
      <Layout className="page" onClick={()=> {
        dispatch({
          type: 'inventoryLedger/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        <Layout.Content>
          {isCurrentRoute ? 
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
                }
              >
              <Panel header={null}>
                <Toolbar>
                  <Search
                    placeholder="产品编号"
                    value={parameters.keyword}
                    onChange={(e)=> {
                      dispatch({
                        type: 'inventoryLedger/@change',
                        payload: {
                          parameters: {
                            keyword: e.target.value
                          },
                        }
                      })
                    }}
                    onSearch={this.searchHandler}
                    />
                  
                  <Button
                    type="primary2" className="toolbar-item"
                    onClick={this.handleReload}
                    icon="reload">
                      刷新
                  </Button>
                  {/* <Button
                    onClick={this.handleAdd}
                    type="primary2" className="toolbar-item"
                    icon="plus">
                      新增
                  </Button> */}
                  <SearchLayout {...searchLayoutProps}></SearchLayout>
                  {/* <Button
                    type="primary2" className="toolbar-item"
                    onClick={this.handleReload}
                    icon="reload">
                      导入
                  </Button>
                  <Button
                    type="primary2" className="toolbar-item"
                    onClick={this.handleReload}
                    icon="reload">
                      导出
                  </Button> */}
                </Toolbar>
                <DataTable {...dataTableProps} />
              </Panel>
              </SideLayout> : null
          }
          
          <Content>
            <Switch>{childRoutes}</Switch>
          </Content>
        </Layout.Content>
      </Layout>
    )
  }
}
