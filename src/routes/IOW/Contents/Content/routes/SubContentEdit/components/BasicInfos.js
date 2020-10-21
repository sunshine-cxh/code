/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-28 16:22:29
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Switch from 'components/Switch'
import Input from 'components/Input'
import Select from 'components/Select'
import Editor from 'components/Editor'
import DatePicker from 'components/DatePicker'
import BaseComponent from 'components/BaseComponent'
import UploadImage from './UploadImage'
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

@connect(({ ContentEdit, loading, Content }) => ({
  ContentEdit,
  loading: loading.models.ContentEdit,
  Content,
}))
class SubContentEdit extends BaseComponent {
  constructor(props) {
    super(props)
  }

  inputChangeHandler(val, key) {
    const { dispatch } = this.props

    dispatch({
      type: 'ContentEdit/basicInfosChange',
      payload: {
        val,
        key,
      },
    })
  }

  render() {
    const {
      ContentEdit: { basicInfos, contentType },
      form,
    } = this.props
    const { getFieldDecorator } = form
    let now = moment()
    if (basicInfos.publishDate == undefined) {
      basicInfos.publishDate = now
    }
    return (
      <section className="block-wrap form-wrap">
        <Form {...formItemLayout}>
          <Item label="内容类型">
            {getFieldDecorator('contentType', {
              initialValue: basicInfos.contentType,
            })(<Select width="100%" placeholder="内容类型" options={contentType} />)}
          </Item>

          <Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '标题不能为空',
                },
              ],
              initialValue: basicInfos.title,
            })(<Input width="100%" allowClear placeholder="标题" />)}
          </Item>
          <Item label={basicInfos.contentType == '30' ? '工作地点' : '摘要'}>
            {getFieldDecorator('abstract', {
              initialValue: basicInfos.abstract,
            })(<Input type="textarea" width="100%" placeholder="最多不超过200字符" allowClear maxLength={200} autoSize={{ minRows: 3 }} />)}
          </Item>
          <Item label="关键字">
            {getFieldDecorator('keywords', {
              initialValue: basicInfos.keywords,
            })(<Input width="100%" allowClear type="textarea" placeholder="最多不超过200字符" maxLength={200} autoSize={{ minRows: 3 }} />)}
          </Item>
          <Item label="公开">
            {getFieldDecorator('isPublic', {
              valuePropName: 'checked',
              initialValue: basicInfos.isPublic == 1 ? true : false,
            })(<Switch />)}
          </Item>
          <Item label="首页显示">
            {getFieldDecorator('isDisplay', {
              valuePropName: 'checked',
              initialValue: basicInfos.isDisplay == 1 ? true : false,
            })(<Switch />)}
          </Item>

          <Item label="备注">
            {getFieldDecorator('keywords', {
              initialValue: basicInfos.remark,
            })(<Input type="textarea" autoSize={{ minRows: 3 }} placeholder="备注" allowClear />)}
          </Item>
          <Item label="banner图" className="img-upload">
            <UploadImage></UploadImage>
            <span className="img-size">图片最大支持2M</span>
          </Item>
          <Item label="发布时间">
            {getFieldDecorator('publishDate', {
              initialValue: basicInfos.publishDate && moment(basicInfos.publishDate),
            })(<DatePicker format={'YYYY-MM-DD HH:mm:ss'}/>)}
          </Item>
          <Item></Item>
          <Item label="详细内容" className="editor">
            {getFieldDecorator('detail', {
              rules: [
                {
                  required: true,
                  message: '详细内容不能为空',
                },
              ],
              initialValue: basicInfos.detail,
            })(<Editor width="100%"/>)}
          </Item>
        </Form>
      </section>
    )
  }
}
export default createForm()(SubContentEdit)
