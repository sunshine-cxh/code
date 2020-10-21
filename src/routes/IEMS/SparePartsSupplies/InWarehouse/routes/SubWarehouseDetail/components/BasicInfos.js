/*
 * @Descripttion : 入库管理详情页
 * @Author       : caojiarong
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 12:29:16
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';

import { Form } from 'antd'
import {baseInfoReturnColumns, baseInfoColumns} from './columns'
import Descriptions from 'components/Descriptions'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

@connect(({ inWarehouseDetail, loading }) => ({
  inWarehouseDetail,
  loading: loading.models.inWarehouseDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    relateCode:false,
    receiveUser:false
  }

  changeColumns = (type) =>{
    if(type == 3){
      this.setState({
        relateCode:false,
        receiveUser:true
      })
    }else if(type == 2){
      this.setState({
        receiveUser:false,
        relateCode:true
      })
    }else{
      this.setState({
        receiveUser:false,
        relateCode:false
      })
    }
  }

  // componentDidUpdate(){
  //   const { inWarehouseDetail: { details } } = this.props
  //   this.changeColumns(details.outIntyp)
  // }
  

  render() {
    const { inWarehouseDetail: { details } } = this.props
    // let baseCloumns = details.outInType != 3 ? baseInfoColumns(this) : baseInfoReturnColumns(this)
    let baseCloumns = baseInfoColumns(this)
    // this.changeColumns(details.outIntyp)
    // 基本信息的表格
    let baseInfoForm = {
      columns:baseCloumns,
      dataItems: details,
      title: '基本信息',
    }
    return (
      <Descriptions {...baseInfoForm} className='base-info-content' />
    )
  }
}
