/*
 * @Descripttion : 计算页面
 * @Author       : caojiarong
 * @Date         : 2020-08-25 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-31 11:16:00
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
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

@connect(({ subCaculate, loading }) => ({
  subCaculate,
  loading: loading.models.subCaculate,
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
    let { moduleList, details } = this.props.subCaculate
    
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">计算</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="选择模型">
            {getFieldDecorator('code', {initialValue:details.code || undefined
            })(<Select width="100%" placeholder="模块" options={moduleList}  onChange={(e) => this.inputChangeHandler(e, 'module')}/>)}
          </Item>

          <Item label="合同指定量">
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

          <Item label="影响系数">
            {getFieldDecorator('module', {
              rules: [
                {
                  required: true,
                  message: '请选择所属模块',
                },
              ],
              initialValue: details.module ? details.module + '' : undefined
            })(<Input type="text" width="100%" placeholder="影响系数" />)}
          </Item>

          <Item label="提气速率">
            {getFieldDecorator('version', {
              // rules: [
              //   {
              //     required: true,
              //     message: '请填写版本',
              //   },
              // ],
              initialValue:details.version || undefined
            })(
              <Input type="text" width="100%" placeholder="提气速率" />)}
          </Item>

          <Item label="季节">
            {getFieldDecorator('version', {
              // rules: [
              //   {
              //     required: true,
              //     message: '请填写版本',
              //   },
              // ],
              initialValue:details.version || undefined
            })(
              <Input type="text" width="100%" placeholder="季节" />)}
          </Item>
          
          <Item>
            <Checkbox value={1} style={{marginRight:30}}>
              是否节假日
            </Checkbox>
            <Checkbox value={2}>
              可中断供气
            </Checkbox>
          </Item>
          
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
