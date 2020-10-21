/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-04 13:58:52
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-04 18:24:44
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
