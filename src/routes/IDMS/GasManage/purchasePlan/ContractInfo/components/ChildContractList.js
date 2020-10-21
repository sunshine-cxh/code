/*
 * @Descripttion : 选择产品弹窗
 * @Author       : caojiarong
 * @Date         : 2020-05-20 10:28:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 19:23:17
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Format from 'utils/format'
import DataTable from 'components/DataTable'
import  { childColumnsData } from './columns'
import { ModalNormal, Modal } from 'components/Modal'
import { routerRedux } from 'dva/router'
import { routePrefix } from '../../../../config'

@connect(({ contractInfo, loading }) => ({
  contractInfo,
  loading: loading.models.contractInfo
}))
export default class extends Component{
  state={
    parentId:''
  }

  handleEdit =(record)=>{
    const {dispatch}=this.props
    dispatch(routerRedux.push({
      pathname: `${routePrefix}/gasPurchasePlan/contractInfo/subContractAdd`,
      search: `id=${record.id}`,
    }))
  }

  handleChildDelete=(record)=>{
    Modal.confirm({
      title:'注意',
      content:'是否要删除这一项',
      onOk:()=>{
        this.deleteFn(record)
      }
    })
  }

  deleteFn=(record)=>{
    const {dispatch} =this.props
    let parentId=this.props.record.id
    dispatch({
      type:'contractInfo/deleteChildContract',
      payload:{
        id:record.id,
        success:()=>{
          dispatch({
            type:'contractInfo/getChildList',
            id:parentId
          })
        }
      }
    })
  }




  render (){
    let { dispatch, contractInfo, loading, childVisible, onChangeVisible } = this.props
    let { 
      childContractData, 
      childContractList
    } = contractInfo
    childContractData.list = childContractList
    let columnsProduct = childColumnsData(this)
    let modalNormalProps = {
      title: '补充协议',
      visible: childVisible,  
      modalOpts: {
        width: 1198,
      },
      // onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
      },

    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: childContractData,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      // selectType: 'checkbox',
    }
    return (
      <ModalNormal {...modalNormalProps}>
          <DataTable {...dataTableSelectProps} style={{margin: '10px 20px'}} />
      </ModalNormal>
    )
  }
}