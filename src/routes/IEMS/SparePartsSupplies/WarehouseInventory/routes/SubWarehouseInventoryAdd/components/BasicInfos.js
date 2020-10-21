/*
 * @Descripttion : 新建仓库盘点页
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 10:22:35
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

let createForm = Form.create()
@connect(({ warehouseInventoryAdd, loading, warehouseInventory }) => ({
  warehouseInventoryAdd,
  loading: loading.models.warehouseInventoryAdd,
  warehouseInventory
}))
class warehouseInventoryAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible:false
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'warehouseInventoryAdd/getWarehouse',
      payload: {}
    }) 
  }

  initParams=()=>{
    const { dispatch } = this.props
    dispatch({
      type:'warehouseInventoryAdd/initParams',
      payload:{}
    })
  }

  inputChangeHandler(val, key) { 
    let {warehouseInventoryAdd: { flowSchemes: { list } }, dispatch, basicInfos} = this.props
    let res = val
    dispatch({
      type: 'warehouseInventoryAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
  }

  render() {
    let { warehouseInventoryAdd: { basicInfos, warehouseList,  flowSchemes: { list }  }, form } = this.props
    let { getFieldDecorator } = form
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="盘点仓库">
            {
              getFieldDecorator('warehouseId', {
                rules:[
                  {
                    required: true,
                    message: '请选择盘点仓库'
                  }
                ]
              })
              (<Select
                width="100%" placeholder="请选择盘点仓库"
                options={warehouseList}
                allowClear={true}
                onChange={val => this.inputChangeHandler(val, 'warehouseId')} />)
            }
            
          </Item>

          <Item label="盘点日期">
            {
              getFieldDecorator('operateTime', {
                rules:[
                  {
                    required: true,
                    message: '请选择盘点日期'
                  }
                ]
              })
              (<DatePicker width="100%" placeholder="盘点日期"
                onChange={val => {this.inputChangeHandler(val.format("YYYY-MM-DD"), 'operateTime')}} />)
            }
            
          </Item>

          <Item label="备注">
            {
              getFieldDecorator('remark')
              (<Input
                type="textarea" 
                placeholder="备注"
                onChange={val => this.inputChangeHandler(val, 'remark')}/>)
            }
            
          </Item>          
        </Form>
      </section>
    )
  }
}
export default createForm(warehouseInventoryAdd)