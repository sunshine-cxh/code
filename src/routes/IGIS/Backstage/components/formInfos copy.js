/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-28 15:30:02
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form,InputNumber  } from 'antd'
import Switch from 'components/Switch'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import BaseComponent from 'components/BaseComponent'
import Cascader from 'components/Cascader'
import moment from 'utils/moment'

const { Item } = Form
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}

@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
}))
class FormInfos extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      geographyBackstage: { formInfos, layerLists },
      form,
    } = this.props
    const { getFieldDecorator } = form
    let now = moment()
    if (formInfos.publishDate == undefined) {
      formInfos.publishDate = now
    }
    return (
      <section className="block-wrap form-wrap">
        <Form {...formItemLayout}>
          <Item label="对应图层">
            {getFieldDecorator('abstract', {
              initialValue: formInfos.abstract,
            })(<Input width="100%" allowClear placeholder="标题" />)}
          </Item>
          <Item label="对应图层">
            {getFieldDecorator('layerLists', {
              initialValue: formInfos.contentType,
            })(<Cascader width="100%" placeholder="管道类型" options={layerLists}
            fieldNames={{ label: 'title', value: 'key' }} />)}
          </Item>

          <Item label="管道名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '标题不能为空',
                },
              ],
              initialValue: formInfos.title,
            })(<Input width="100%" allowClear placeholder="管道名称" />)}
          </Item>

          <Item label="管径大小">
            {getFieldDecorator('caliber', {
              initialValue: formInfos.caliber,
            })(<InputNumber
              min={0}
              max={100}
              formatter={value => `${value}cm`}
              parser={value => value.replace('cm', '')}
            />)}
          </Item>

          <Item label="管壁厚度">
            {getFieldDecorator('thickness', {
              initialValue: formInfos.thickness,
            })(<InputNumber
              min={0}
              max={100}
              formatter={value => `${value}cm`}
              parser={value => value.replace('cm', '')}
            />)}
          </Item>

          <Item label="保质年限">
            {getFieldDecorator('Shelf', {
              initialValue: formInfos.Shelf,
            })(<InputNumber
              min={0}
              max={100}
              formatter={value => `${value}年`}
              parser={value => value.replace('年', '')}
            />)}
          </Item>
          <Item label="状态">
            {getFieldDecorator('isPublic', {
              valuePropName: 'checked',
              initialValue: formInfos.isPublic == 1 ? true : false,
            })(<Switch />)}
          </Item>
          <Item label="是否连通">
            {getFieldDecorator('isDisplay', {
              valuePropName: 'checked',
              initialValue: formInfos.isDisplay == 1 ? true : false,
            })(<Switch />)}
          </Item>
          <Item label="发布时间">
            {getFieldDecorator('publishDate', {
              initialValue: formInfos.publishDate && moment(formInfos.publishDate),
            })(<DatePicker format={'YYYY-MM-DD HH:mm:ss'} />)}
          </Item>
          <Item label="备注">
            {getFieldDecorator('keywords', {
              initialValue: formInfos.remark,
            })(<Input width="100%" allowClear placeholder="标题" />)}
          </Item>
        </Form>
      </section>
    )
  }
}
export default createForm()(FormInfos)
