/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-03 17:13:49
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
import Checkbox from 'components/Checkbox'
import DatePicker from 'components/DatePicker'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import $$ from 'cmn-utils'
import moment from 'moment'
import PageHelper from 'utils/pageHelper'
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

@connect(({ inventoryAdd, loading }) => ({
  inventoryAdd,
  loading: loading.models.inventoryAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
  }
  handleCheck = (keys) => {
    const {
      dispatch,
    } = this.props
    dispatch({
      type: 'inventoryAdd/getUserInfos',
      payload: {
        values: {
          entity: {
            orgIdList: [keys],
          },
        },
        userList: PageHelper.create().startPage(1,10000),
      },
    })
  }
  disabledStartDate = (current)=> {
    let { getFieldValue } = this.props.form
    let endTime = getFieldValue('planTimeEnd')
    if(endTime) {
      return current > endTime
    }
  }
  disabledEndDate = (current)=> {
    let { getFieldValue } = this.props.form
    let startTime = getFieldValue('planTimeStart')
    if(startTime) {
      return current < startTime
    }
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let { allUserList, organizationTree, details, userList } = this.props.inventoryAdd
    let list = []
    userList.list.forEach(item=> {
      list.push({
        label: item.realName,
        value: item.id,
        code: item.id,
        codeName: item.realName
      })
    })
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">盘点信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="计划开始时间">
            {getFieldDecorator('planTimeStart', {
              rules: [
                {
                  required: true,
                  message: '请输入计划开始时间',
                },
              ],
              initialValue: details.planTimeStart && moment(details.planTimeStart),
            })(<DatePicker width="100%" placeholder="计划开始时间" disabledDate={this.disabledStartDate}/>)}
          </Item>
          <Item label="计划结束时间">
            {getFieldDecorator('planTimeEnd', {
              rules: [
                {
                  required: true,
                  message: '请输入计划结束时间',
                },
              ],
              initialValue: details.planTimeEnd && moment(details.planTimeEnd),
            })(<DatePicker width="100%" placeholder="计划结束时间" disabledDate={this.disabledEndDate}/>)}
          </Item>
          <Item label="责任单位">
            {getFieldDecorator('organizationId', {
              rules: [
                {
                  required: true,
                  message: '请输入责任单位',
                },
              ],
              initialValue: details.organizationId,
            })(
              <TreeSelect
                width="100%"
                placeholder="责任单位"
                treeData={organizationTree}
                onChange={this.handleCheck}
              />
            )}
          </Item>
          <Item label="责任人">
            {getFieldDecorator('operatorId', {
              rules: [
                {
                  required: true,
                  message: '请输入责任人',
                },
              ],
              initialValue: details.operatorId,
            })(<Select width="100%" placeholder="责任人" options={list} />)}
          </Item>
          <Item label="备注">
            {getFieldDecorator('remark', {
              initialValue: details.remark,
            })(<Input type="textarea" width="100%" placeholder="备注" />)}
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
