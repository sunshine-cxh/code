/*
 * @Descripttion : 路线新增页
 * @Author       : caojiarong
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 17:00:11
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

@connect(({ subLineAdd, loading }) => ({
  subLineAdd,
  loading: loading.models.subLineAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    
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
    let { selectTypeList, lineInfo, lineStatusList } = this.props.subLineAdd

    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">路线信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="路线编号">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: '请选择管段选取方式',
                },
              ],
            })(<Input type="text" width="100%" disabled placeholder="自动生成" />)}
          </Item>

          <Item label="路线名称">
            {getFieldDecorator('name', {
            })(<Input type="text" width="100%" placeholder="路线名称" onChange={(e) => this.inputChangeHandler(e, 'name')} />)}
          </Item>

          <Item label="选取方式">
            {getFieldDecorator('selectMethod', {
              rules: [
                {
                  required: true,
                  message: '请选择管段选取方式',
                },
              ],
            })(<Select width="100%" placeholder="选取方式" options={selectTypeList}  onChange={(e) => this.inputChangeHandler(e, 'selectMethod')}/>)}
          </Item>

          <Item label="管段信息">
            {getFieldDecorator('pipelineId', {
              rules: [
                {
                  required: true,
                  message: '请选择管段信息',
                },
              ],
            })(
            <Select 
              width="100%" 
              placeholder="管段信息" 
              options={lineInfo}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => this.inputChangeHandler(e, 'pipelineId')}
            />)}
          </Item>


          {/* TODO暂无 */}
          <Item label="路线状态">
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '请选择路线状态',
                },
              ],
            })(<Select width="100%" placeholder="路线状态" options={lineStatusList}  onChange={(e) => this.inputChangeHandler(e, 'status')}/>)}
          </Item>

          <Item label="备注">
          {
              getFieldDecorator('remark', {})
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
