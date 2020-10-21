/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-24 09:03:33
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Switch from 'components/Switch'
import Input from 'components/Input'
import BaseComponent from 'components/BaseComponent'
import UploadImage from './UploadImage'
import { Radio } from 'antd'

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

@connect(({ global,Account, loading, Content }) => ({
  global,
  Account,
  loading: loading.models.Account,
  Content,
}))
class Account extends BaseComponent {
  constructor(props) {
    super(props)
  }

  inputChangeHandler(val, key) {
    const { dispatch } = this.props

    dispatch({
      type: 'Account/basicInfosChange',
      payload: {
        val,
        key,
      },
    })
  }

  render() {
    const {
      global:{user} ,
      form,
    } = this.props

    const { getFieldDecorator } = form
    let options = [
      { label: '左侧', value: 1 },
      { label: '顶端', value: 2 },
    ]
    return (
      <section className="block-wrap form-wrap">
        <Form {...formItemLayout}>
          <Item label="登录账号">
            <p className="desc">{user.userAccount}</p>
          </Item>
          <Item label="账号类型">
            <p className="desc">{user.accountType}</p>
          </Item>
          <Item label="姓名">
            <p className="desc">{user.userName}</p>
          </Item>
          <Item label="角色">
            <p className="desc">{user.userRoleName}</p>
          </Item>
          <Item label="所在企业">
            <p className="desc">{user.enterpriseName}</p>
          </Item>
          <Item label="所在部门">
            <p className="desc">{user.enterpriseName}</p>
          </Item>
          <Item label="最后登录时间">
            <p className="desc">{user.lastLoginTime}</p>
          </Item>
          <Item label="账号创建时间">
            <p className="desc">{user.createdTime}</p>
          </Item>
          <Item label="联系电话" className="item-input">{getFieldDecorator('phone', { initialValue: user.phone })(<Input width="100%" allowClear maxLength={11} />)}</Item>
          <Item label="电子邮箱" className="item-input">
            {getFieldDecorator('email', {
              rules: [
                {
                  pattern: /\w+@[a-z0-9]+\.[a-z]{2,4}/,
                  message: '请输入正确的邮箱格式',
                },
              ],
              initialValue: user.email,
            })(<Input width="100%" allowClear />)}
          </Item>
          <Item label="微信" className="item-input">{getFieldDecorator('wechat', { initialValue: user.wechat })(<Input width="100%" allowClear />)}</Item>
          <Item label="QQ号码" className="item-input">{getFieldDecorator('qq', { initialValue: user.qq })(<Input width="100%" allowClear />)}</Item>

          {/* <Item label="系统菜单位置" className="item-input">
            {getFieldDecorator('menuPosition', { initialValue: user.menuPosition==null?1:basicInfos.menuPosition })(<Radio.Group options={options} width="100%" />)}
          </Item>
          <Item label="显示Tab页" className="item-input">{getFieldDecorator('isShowTab', { valuePropName: 'checked', initialValue: basicInfos.isShowTab==null?true:basicInfos.isShowTab })(<Switch />)}</Item> */}
          <Item label="头像" className="item-input">
            {/* {getFieldDecorator('isShowTab', { initialValue: true })(<UploadImage></UploadImage>)} */}
            <UploadImage></UploadImage>
            <span className="img-size">图片最大支持2M</span>
          </Item>
        </Form>
      </section>
    )
  }
}
export default createForm()(Account)
