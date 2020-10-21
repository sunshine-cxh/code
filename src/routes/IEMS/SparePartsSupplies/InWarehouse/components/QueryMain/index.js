import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Popover from 'components/Popover'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { Modal } from 'components/Modal'
import { createColumns, createFormColumns } from './columns'
import PageHelper from 'utils/pageHelper'
import { routesPrefix } from '../../../../config'
import '../../style/queryMain.less'
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ inWarehouse, loading }) => ({
  inWarehouse,
  loading: loading.models.inWarehouse
}))
export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
    keyword: ''
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'inWarehouse/init'
    })

    this.props.dispatch({
      type: 'inWarehouse/getWarehouse'
    })

    this.props.dispatch({
      type: 'inWarehouse/@change',
      payload: {
        popoverVisible: false
      }
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword) => {
    const { inWarehouse: { pageData }, dispatch } = this.props

    dispatch({
      type: 'inWarehouse/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 入库详情
  handleDetails = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'inWarehouse/getDetails',
      payload: {
        id: record.id,
        success: () => {
          // $$.setStore('equipment-inWarehouse-id', record.id)
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/inWarehouse/subWarehouseDetail`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }
  // 入库打印
  handlePrint = () => {
    alert("功能正在开发ing，敬请期待")
  }

  deleteFn = (id) => {
    const { dispatch, inWarehouse } = this.props
    let { pageData } = inWarehouse
    let { total } = pageData
    let pageNum = pageData.pageNum
    let leaveNum = (parseInt(total) - 1) % 10
    if (leaveNum === 0 && pageNum != 1) {
      pageNum--
    }
    dispatch({
      type: 'inWarehouse/revoke',
      payload: {
        id: id,
        success: () => {
          dispatch({
            type: 'inWarehouse/getPageInfo',
            payload: {
              pageData: pageData.jumpPage(pageNum, 10)
            }
          })
        }
      }
    })
  }

  // 删除确认提示
  handleDelete = (id) => {
    Modal.confirm({
      title: '注意',
      content: '是否要撤销该条记录？',
      onOk: () => {
        this.deleteFn(id)
      },
      onCancel() { },
    })
  }


  handleCheck = (record) => {
    this.onVisible(true)
  }
  onVisible = (visible) => {
    this.setState({
      visible
    })
  }
  // 新增入库管理
  handleAdd = () => {
    this.props.dispatch(routerRedux.push({
      pathname: routesPrefix + '/inWarehouse/subWarehouseAdd'
    }))
  }
  // 刷新
  handleReload = () => {
    const { inWarehouse: { pageData }, dispatch } = this.props
    dispatch({
      type: 'inWarehouse/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'inWarehouse/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({ keyword: '' })
  }
  render() {
    const { keyword } = this.state
    let { dispatch, inWarehouse, loading } = this.props
    let { pageData, popoverVisible, parameters, warehouseList } = inWarehouse
    let columns = createColumns(this, this.state.record)
    let formColumns = createFormColumns(this, warehouseList)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'inWarehouse/getPageInfo',
          payload: {
            value: {
              keyword
            },
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }) //表格有复选框选项
    }
    let filterLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          warehouseId: form.warehouseId,
          operateTimeStart: form.operateTime && form.operateTime[0] && form.operateTime[0].format('YYYY-MM-DD'),
          operateTimeEnd: form.operateTime && form.operateTime[1] && form.operateTime[1].format('YYYY-MM-DD')
        }
        const { inWarehouse: { pageData }, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'inWarehouse/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'inWarehouse/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage()
          }
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'inWarehouse/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    return (
      <div className="procurement-plan__query" onClick={() => {
        dispatch({
          type: 'inWarehouse/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        <section className="search-area">
          <Toolbar>
            <Search
              placeholder="入库单号 / 入库仓库"
              onSearch={this.searchHandler}
              value={keyword}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
            <Button
              type="primary2" className="toolbar-item"
              onClick={this.handleReload}
              icon="reload">
              刷新
              </Button>
            <Link to={`${routesPrefix}/inWarehouse/subWarehouseAdd`}>
              <Button
                type="primary2" className="toolbar-item"
                icon="plus">
                新增
                </Button>
            </Link>
            <SearchLayout {...filterLayoutProps}></SearchLayout>
          </Toolbar>
        </section>
        <DataTable {...dataTableProps} />
      </div>

    )
  }
}
