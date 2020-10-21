/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 15:07:09
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import InputNumber from 'components/InputNumber'
import Select from 'components/Select'
import Cascader from 'components/Cascader'
import TreeSelect from 'components/TreeSelect'
import Checkbox from 'components/Checkbox'
import DatePicker from 'components/DatePicker'
import './index.less'
import BaseComponent from 'components/BaseComponent'
import $$ from 'cmn-utils'
import moment from 'moment'
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

@connect(({ gasuserAdd, loading }) => ({
  gasuserAdd,
  loading: loading.models.gasuserAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let { gasStationList, details, gasUserTypeList, addressList } = this.props.gasuserAdd
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="用气用户编号">
            {getFieldDecorator('code', {
              initialValue: details.code,
            })(<Input width="100%" placeholder="系统自动生成" disabled />)}
          </Item>
          <Item label="用气用户名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用气用户名称',
                },
              ],
              initialValue: details.name,
            })(<Input width="100%" placeholder="用气用户名称" />)}
          </Item>
          <Item label="用气用户类型">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请输入用气用户类型',
                },
              ],
              initialValue: details.type,
            })(<Select width="100%" placeholder="用气用户类型" options={gasUserTypeList} />)}
          </Item>
          <Item label="供气气化站">
            {getFieldDecorator('gasStationList', {
              initialValue: details.gasStationList,
            })(<Select width="100%" placeholder="供气气化站" options={gasStationList} mode="multiple" maxTagCount={1}/>)}
          </Item>
          <Item label="施工单位">
            {getFieldDecorator('constructionOrg', {
              initialValue: details.constructionOrg,
            })(<Input width="100%" placeholder="施工单位" />)}
          </Item>
          <Item label="通气日期">
            {getFieldDecorator('gasConveyDate', {
              initialValue: details.gasConveyDate && moment(details.gasConveyDate),
            })(<DatePicker width="100%" placeholder="通气日期" />)}
          </Item>
          <Item label="联系人">
            {getFieldDecorator('linkman', {
              initialValue: details.linkman,
            })(<Input width="100%" placeholder="联系人" />)}
          </Item>
          <Item label="联系电话">
            {getFieldDecorator('phone', {
              initialValue: details.phone,
            })(<Input width="100%" placeholder="联系电话" />)}
          </Item>
          <Item label="所属区域">
            {getFieldDecorator('districtId', {
              rules: [
                {
                  required: true,
                  message: '请输入所属区域',
                },
              ],
              initialValue: details.districtId ? details.districtId.split('/') : [],
            })(
              <Cascader
                width="100%"
                placeholder="所属区域"
                fieldNames={{ label: 'title' }}
                options={addressList}
              />
            )}
          </Item>
          <Item label="详细地址">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请输入详细地址',
                },
              ],
              initialValue: details.address,
            })(<Input width="100%" placeholder="详细地址" />)}
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
