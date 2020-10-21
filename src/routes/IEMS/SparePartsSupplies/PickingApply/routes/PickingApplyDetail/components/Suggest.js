/*
 * @Descripttion : 审批意见
 * @Author       : caojiarong
 * @Date         : 2020-07-01 13:58:52
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 10:31:00
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Input from 'components/Input'
import { Form } from 'antd'

let { Item } = Form

let createForm = Form.create()

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
class Suggest extends Component {
  render() {
    const { form, dispatch } = this.props
    const { getFieldDecorator } = form
    return (
      <Form {...formItemLayout}>
        <Item>
          {getFieldDecorator('auditOpinion', {
            rules: [
              {
                required: true,
                message: '请输入审批意见!',
              },
            ],
          })(<Input type="textarea" placeholder="审批意见"></Input>)}
        </Item>
      </Form>
    )
  }
}

export default createForm(Suggest)
