/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-15 15:05:56
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-24 16:37:46
 * @FilePath     : \ilng-shuaizhen-admin\src\routes\Common\Account\Setting\components\ChangPassword.js
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import BaseComponent from 'components/BaseComponent'

const { Item } = Form
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
}

@connect(({ Account, loading, Content }) => ({
  Account,
  loading: loading.models.Account,
  Content,
}))
class Account extends BaseComponent {
  constructor(props) {
    super(props)
  }
  handleConfirmPassword(rules, value, callback) {
    let { getFieldsValue } = this.props.form
    let newPassword = getFieldsValue().newPassword
    let confirmPassword = getFieldsValue().confirmPassword

    if ((newPassword && newPassword !== value) || (confirmPassword && confirmPassword !== value)) {
      callback(new Error('两次密码输入不一致'))
    } else {
      callback()
    }
  }

  render() {
    const {
      form,
    } = this.props
    const { getFieldDecorator } = form
    return (
      <section className="block-wrap form-wrap">
        <Form {...formItemLayout}>
          <Item label="原始密码">
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '请输入旧密码' }],
            })(<Input type="password" width="100%" allowClear />)}
          </Item>
          <Item></Item>
          <Item label="新密码">
            {getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: '请输入新密码' },
                {
                  validator: (rules, value, callback) => {
                    this.handleConfirmPassword(rules, value, callback)
                  },
                },
              ],
            })(<Input type="password" width="100%" allowClear />)}
          </Item>
          <Item></Item>
          <Item label="确认新密码">
            {getFieldDecorator('confirmPassword', {
              rules: [
                { required: true, message: '请输入确认新密码' },
                {
                  validator: (rules, value, callback) => {
                    this.handleConfirmPassword(rules, value, callback)
                  },
                },
              ],
            })(<Input type="password" width="100%" allowClear />)}
          </Item>
        </Form>
      </section>
    )
  }
}
export default createForm()(Account)
