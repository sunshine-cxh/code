/*
 * @Descripttion : 入库管理详情页
 * @Author       : caojiarong
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-28 11:14:26
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';

import { Form } from 'antd'
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

@connect(({ warehouseInventoryDetail, loading }) => ({
  warehouseInventoryDetail,
  loading: loading.models.warehouseInventoryDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
  }


  render() {
    const { warehouseInventoryDetail: { details } } = this.props
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
      //     <Item label="盘点仓库">
      //       <Input
      //         disabled
      //         width="100%" placeholder="暂无"
      //         value={details.warehouseName}
      //         disabled={true}
      //       />
      //     </Item>

      //     <Item label="盘点日期">
      //       <Input disabled width="100%" placeholder="暂无"
      //           value={details.operateTime}
      //       />
      //     </Item>
      //     <Item label="备注">
      //       <Input
      //         disabled
      //         type="textarea" placeholder="备注"
      //         value={details.remark}
      //       />
      //     </Item>
        
      //   </Form>
      // </section>
      <Descripttion {...baseInfoForm} className='base-info-content' />
    )
  }
}
