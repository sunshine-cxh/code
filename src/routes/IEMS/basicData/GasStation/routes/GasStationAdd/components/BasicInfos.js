/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-29 16:03:38
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
import moment from 'moment';
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

@connect(({ gasstationAdd, loading }) => ({
  gasstationAdd,
  loading: loading.models.gasstationAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let { supplyList, details, addressList } = this.props.gasstationAdd
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="气化站编号">
            {getFieldDecorator('code', {
              initialValue: details.code,
            })(<Input width="100%" placeholder="系统自动生成" disabled/>)}
          </Item>
          <Item label="气化站名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入气化站名称',
                },
              ],
              initialValue: details.name,
            })(<Input width="100%" placeholder="气化站名称" />)}
          </Item>
          <Item label="X坐标">
            {getFieldDecorator('coordinateX', {
              initialValue: details.coordinateX,
            })(<InputNumber width="100%" placeholder="X坐标" />)}
          </Item>
          <Item label="Y坐标">
            {getFieldDecorator('coordinateY', {
              initialValue: details.coordinateY,
            })(<InputNumber width="100%" placeholder="Y坐标" />)}
          </Item>
          <Item label="储罐容积(m3)">
            {getFieldDecorator('tankVolume', {
              initialValue: details.tankVolume,
            })(<InputNumber width="100%" placeholder="储罐容积" />)}
          </Item>
          <Item label="储罐生产厂家">
            {getFieldDecorator('storageSupplierId', {
              initialValue: details.storageSupplierId,
            })(<Select width="100%" placeholder="储罐生产厂家" options={supplyList} />)}
          </Item>
          <Item label="气化器型号(台/m3/h)">
            {getFieldDecorator('gasModel', {
              initialValue: details.gasModel,
            })(<Input width="100%" placeholder="气化器型号" />)}
          </Item>
          <Item label="集成撬设备生产厂家">
            {getFieldDecorator('deviceSupplierId', {
              initialValue: details.deviceSupplierId,
            })(<Select width="100%" placeholder="集成撬设备生产厂家" options={supplyList} />)}
          </Item>
          <Item label="气化站运行压力(Mpa)">
            {getFieldDecorator('operatingPressure', {
              initialValue: details.operatingPressure,
            })(<InputNumber width="100%" placeholder="气化站运行压力"/>)}
          </Item>
          <Item label="气化站总输出压力(Mpa)">
            {getFieldDecorator('outputPressure', {
              initialValue: details.outputPressure,
            })(<InputNumber width="100%" placeholder="气化站总输出压力" />)}
          </Item>
          <Item label="运行介质">
            {getFieldDecorator('medium', {
              rules: [
                {
                  required: true,
                  message: '请输入运行介质',
                },
              ],
              initialValue: details.medium,
            })(<Input width="100%" placeholder="运行介质" />)}
          </Item>
          <Item label="工艺管道施工单位">
            {getFieldDecorator('processPipe', {
              initialValue: details.processPipe,
            })(<Input width="100%" placeholder="工艺管道施工单位" />)}
          </Item>
          <Item label="土建施工单位">
            {getFieldDecorator('civil', {
              initialValue: details.civil,
            })(<Input width="100%" placeholder="土建施工单位" />)}
          </Item>
          <Item label="气化站占地面积(㎡)">
            {getFieldDecorator('gasStationArea', {
              initialValue: details.gasStationArea,
            })(<InputNumber width="100%" placeholder="气化站占地面积" />)}
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
            })(<Cascader width="100%" placeholder="所属区域" fieldNames={{label: 'title'}} options={addressList}/>)}
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
            })(<Input width="100%" placeholder="详细地址"/>)}
          </Item>
          <Item label="投用日期">
            {getFieldDecorator('putUseDate', {
              initialValue: details.putUseDate && moment(details.putUseDate),
            })(<DatePicker width="100%" placeholder="投用日期" />)}
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
