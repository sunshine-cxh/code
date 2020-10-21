/*
 * @Descripttion : 新增基本信息
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 16:44:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-04 18:44:19
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'

const { Item } = Form
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

@connect(({ codeRuleAdd, loading, codeRule }) => ({
  codeRuleAdd,
  loading: loading.models.codeRuleAdd,
  codeRule,
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }

  state = {}

  render() {
    const {
      codeRuleAdd: { details },
      form: { getFieldDecorator },
      codeRule: { enterprises, codeRuleEntity, toolbarSelectorValue },
     
    } = this.props
    console.log("BasicForm -> render -> enterprises", enterprises)
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="公司">
            {getFieldDecorator('enterpriseId', {
              rules: [
                {
                  required: true,
                  message: '请选择公司',
                },
              ],
              initialValue: details.enterpriseId != null ? details.enterpriseId : toolbarSelectorValue ? toolbarSelectorValue : enterprises.length && enterprises[0].code,
            })(<Select width="100%" placeholder="公司" options={enterprises} />)}
          </Item>
          <Item label="规则名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入规则名称',
                },
              ],
              initialValue: details.name != null ? details.name : null,
            })(<Input width="100%" placeholder="规则名称" />)}
          </Item>

          <Item label="对应模块">
            {getFieldDecorator('enCode', {
              rules: [
                {
                  required: true,
                  message: '请选择模块',
                },
              ],
              initialValue: details.enCode != null ? details.enCode : codeRuleEntity.length > 0 && codeRuleEntity[0].code,
            })(<Select width="100%" placeholder="模块" options={codeRuleEntity} />)}
          </Item>

          <Item label="备注">
            {getFieldDecorator('remark', {
              initialValue: details.remark != null ? details.remark : null,
            })(<Input type="textarea" placeholder="备注" />)}
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicForm)
