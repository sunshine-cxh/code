/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:34:15
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-09 17:40:02
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsStandard } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'

@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd,
}))
export default class extends Component {
  componentDidMount() {
    // let { dispatch } = this.props
    // dispatch({
    //   type: 'patrolPlanAdd/getAllOrganization',
    //   payload: {
    //     enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
    //   },
    // })
  }
  handleReload = () => {
    const {
      patrolPlanAdd: { standardPageData },
      dispatch,
      record
    } = this.props
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        standardParameter: {},
      },
    })
    dispatch({
      type: 'patrolPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            equipmentLedgerId: record.id
          }
        },
        pageData: standardPageData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      patrolPlanAdd: { standardPageData },
      dispatch,
      record
    } = this.props

    dispatch({
      type: 'patrolPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            name: keyword,
            equipmentLedgerId: record.id
          }
        },
        pageData: standardPageData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, patrolPlanAdd, loading, standardVisible, onChangeVisible, record } = this.props
    let {patrolStandardRow, patrolStandardRowKeys, standardParameter, standardPageData, selectDataList } = patrolPlanAdd
    let columnsProduct = createColumnsStandard(this)
    let modalNormalProps = {
      title: '巡检标准',
      visible: standardVisible,
      modalOpts: {
        width: 740,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        onChangeVisible(false)
        let { dispatch, patrolPlanAdd: { selectDataList } } = this.props
        let list = []
        selectDataList.list.forEach(item=> { 
          if(item.id === record.id) {
            list.push({
              ...item,
              standardName: patrolStandardRow[0].name,
              standardId: patrolStandardRow[0].id
            })
          } else {
            list.push(item)
          }
        })
        selectDataList.list = list
        dispatch({
          type: 'patrolPlanAdd/@change',
          payload: {
            selectDataList
          }
        })
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: standardPageData,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'radio',
      onSelect: (keys, rows, currentRows, e) => {
        dispatch({
          type: 'patrolPlanAdd/@change',
          payload: {
            patrolStandardRow: rows,
            patrolStandardRowKeys: keys,
          },
        })
      },
      selectedRowKeys: patrolStandardRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'patrolPlanAdd/getStandardInfo',
          payload: {
            values: {
              entity: {
                equipmentLedgerId: record.id
              }
            },
            pageData: standardPageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
        <div className="module-function-wrap">
          <Toolbar>
            <Search
              placeholder="标准名称"
              value={standardParameter.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'patrolPlanAdd/@change',
                  payload: {
                    standardParameter: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(keyword) => {
                this.searchHandler(keyword)
              }}
            />
            <Button type="primary2" className="toolbar-item" icon="reload" onClick={this.handleReload}>
              刷新
            </Button>
          </Toolbar>
          <DataTable {...dataTableSelectProps} />
        </div>
      </ModalNormal>
    )
  }
}
