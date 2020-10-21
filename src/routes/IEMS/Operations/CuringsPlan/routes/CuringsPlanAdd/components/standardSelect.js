/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:34:15
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:50:45
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

const cycletransfer = {
  1: '天',
  2: '月',
  3: '年',
}
@connect(({ curingsPlanAdd, loading }) => ({
  curingsPlanAdd,
  loading: loading.models.curingsPlanAdd,
}))
export default class extends Component {
  componentDidMount() {
    const { dispatch, curingsPlanAdd } = this.props
    let { standardPageData, selectedDeviceRowKeys } = curingsPlanAdd
    dispatch({
      type: 'curingsPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            equipmentLedgerId: selectedDeviceRowKeys[0],
          },
        },
        pageData: standardPageData.startPage(),
      },
    })
  }
  handleReload = () => {
    const {
      curingsPlanAdd: { standardPageData, selectedDeviceRowKeys },
      dispatch,
    } = this.props
    dispatch({
      type: 'curingsPlanAdd/@change',
      payload: {
        standardParameter: {},
      },
    })
    dispatch({
      type: 'curingsPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            equipmentLedgerId: selectedDeviceRowKeys[0],
          },
        },
        pageData: standardPageData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      curingsPlanAdd: { standardPageData, selectedDeviceRowKeys },
      dispatch,
    } = this.props

    dispatch({
      type: 'curingsPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            name: keyword,
            equipmentLedgerId: selectedDeviceRowKeys[0],
          },
        },
        pageData: standardPageData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, curingsPlanAdd, loading, standardVisible, onChangeVisible } = this.props
    let {
      selectStandardRowKeys,
      selectStandardRowKeysLocal,
      selectStandardRowLocal,
      standardParameter,
      standardPageData,
      basicInfos,
      selectedDeviceRowKeys,
      selectStandardRow,
    } = curingsPlanAdd
    let columnsProduct = createColumnsStandard(this)
    let modalNormalProps = {
      title: '标准选择',
      visible: standardVisible,
      modalOpts: {
        width: 740,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectStandardRowLocal: selectStandardRow ? selectStandardRow : [],
            selectStandardRowKeysLocal: selectStandardRowKeys,
          },
        })
        onChangeVisible(false)
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        let obj = {
          ...basicInfos,
          cycle: selectStandardRowLocal.length ? `${selectStandardRowLocal[0].cycle}` : undefined,
          cycleUnit: selectStandardRowLocal.length
            ? `${selectStandardRowLocal[0].cycleUnit}`
            : undefined,
        }
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectStandardRow: selectStandardRowLocal ? selectStandardRowLocal : [],
            selectStandardRowKeys: selectStandardRowKeysLocal,
            basicInfos: obj,
          },
        })
        onChangeVisible(false)
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
          type: 'curingsPlanAdd/@change',
          payload: {
            selectStandardRowKeysLocal: keys,
          },
        })
      },
      onSelectRow: (record, selected) => {
        let arr = []
        if (selected) {
          arr = [...selectStandardRowLocal, record]
        } else {
          arr = selectStandardRowLocal.filter((item) => {
            return item.id !== record.id
          })
        }
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectStandardRowLocal: arr,
          },
        })
      },
      selectedRowKeys: selectStandardRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'curingsPlanAdd/getStandardInfo',
          payload: {
            values: {
              entity: {
                equipmentLedgerId: selectedDeviceRowKeys[0],
              },
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
                  type: 'curingsPlanAdd/@change',
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
