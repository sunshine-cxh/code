/*
 * @Descripttion : 领料申请详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-19 15:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-28 11:09:43
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import {baseInfoColumns} from './columns'
import Descripttion from 'components/Descriptions'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

@connect(({ pickingApplyDetail, loading }) => ({
  pickingApplyDetail,
  loading: loading.models.pickingApplyDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
  }

  

  getFlowwork = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'pickingApplyDetail/getFlowwork',
      payload: {
      }
    })
  }
  
  componentDidMount() {
    this.getFlowwork()
  }

  render() {
    const { pickingApplyDetail: { details ,getFlowwork, flowWorkList} } = this.props
    let baseCloumns = baseInfoColumns(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns:baseCloumns,
      dataItems: details,
      title: '基本信息',
    }
    return (
      // <section className="basic-infos__wrapper">
      //   <p className='title-name'>基本信息</p>
      //   <Form {...formItemLayout}>
      //     {/* ------------- 接口还没有数据 --------------- */}
      //     <Item label="申请人">
      //       <Input
      //         width="100%" 
      //         value={basicInfos.createdName} 
      //         disabled/>
      //     </Item>
      //     <Item label="申请类型">
      //       <Select
      //         width="100%" placeholder="请选择申请类型"
      //         defaultValue={1}
      //         disabled={true}
      //         value={basicInfos.type}
      //         // options={pickingTypeList} 
      //         />
      //     </Item>
      //     <Item label="关联单号">
      //       <Input
      //         type="textarea" 
      //         placeholder="关联单号"
      //         disabled
      //         value={basicInfos.relateid}
      //         />
      //     </Item>
 
      //     <Item label="审批人">
            
      //       <Select
      //         placeholder="审批人"
      //         disabled
      //         value={basicInfos.flowSchemeDataList}
      //         width="100%" mode="multiple" expand="flow"
      //         options={ flowWorkList }
      //         />
      //     </Item>

      //     <Item label="备注">
      //       <Input
      //         type="textarea" 
      //         disabled
      //         placeholder="备注"
      //         value={basicInfos.remark}/>
      //     </Item>
          
      //   </Form>
      // </section>
      <Descripttion {...baseInfoForm} className='base-info-content' />
    )
  }
}
