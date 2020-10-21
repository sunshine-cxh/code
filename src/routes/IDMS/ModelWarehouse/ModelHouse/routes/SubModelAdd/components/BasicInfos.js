/*
 * @Descripttion : 模型新增页
 * @Author       : caojiarong
 * @Date         : 2020-08-25 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-26 18:59:45
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
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

@connect(({ subModelAdd, loading }) => ({
  subModelAdd,
  loading: loading.models.subModelAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    
  }

  state={
  }

  inputChangeHandler(val, key) { //-------------------
    const { dispatch } = this.props
    let res = val
    dispatch({
      type: 'patrolPlanAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
  }

  render() {
    let { getFieldDecorator } = this.props.form
    let { moduleList, details } = this.props.subModelAdd
    
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="模型编号">
            {getFieldDecorator('code', {initialValue:details.code || undefined
            })(<Input type="text" width="100%" disabled placeholder="自动生成" />)}
          </Item>

          <Item label="模型名称">
            {getFieldDecorator('name', {
              rules:[
                {
                  required: true,
                  message: '请输入模型名称' 
                }
              ],
              initialValue:details.name || undefined
            })(<Input type="text" width="100%" placeholder="模型名称" onChange={(e) => this.inputChangeHandler(e, 'name')} />)}
          </Item>

          <Item label="模块">
            {getFieldDecorator('module', {
              rules: [
                {
                  required: true,
                  message: '请选择所属模块',
                },
              ],
              initialValue: details.module ? details.module + '' : undefined
            })(<Select width="100%" placeholder="模块" options={moduleList}  onChange={(e) => this.inputChangeHandler(e, 'module')}/>)}
          </Item>

          <Item label="版本">
            {getFieldDecorator('version', {
              // rules: [
              //   {
              //     required: true,
              //     message: '请填写版本',
              //   },
              // ],
              initialValue:details.version || undefined
            })(
              <Input type="text" width="100%" placeholder="自动生成" disabled={true} />)}
          </Item>

          <Item label="备注">
          {
            getFieldDecorator('remark', {initialValue:details.remark || undefined})
            (<Input
              type="textarea" placeholder="备注"
              onChange={val => this.inputChangeHandler( val, 'remark')}
            />)
          }
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
