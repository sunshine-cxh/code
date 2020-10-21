/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-01 11:18:47
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form, InputNumber } from 'antd'
import Switch from 'components/Switch'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import BaseComponent from 'components/BaseComponent'
import TreeSelect from 'components/TreeSelect'
import moment from 'utils/moment'
import Format from 'utils/format'

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

const geometryType = [
  { code: 'Point', codeName: 'Point' },
  { code: 'Line', codeName: 'Line' },
  { code: 'Polygon', codeName: 'PoiPolygonnt' },
]
const dataSourceType = [
  { code: 'API', codeName: 'API' },
  { code: 'Datatable', codeName: 'Datatable' },
  { code: 'GeoJson', codeName: 'GeoJson' },
  { code: 'WMTS', codeName: 'WMTS' },
  { code: 'TMS', codeName: 'TMS' },
  { code: 'Tiles', codeName: 'Tiles' },
]

@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
}))
class FormInfos extends BaseComponent {
  constructor(props) {
    super(props)
  }

  mapTree(org) {
    const haveChildren = Array.isArray(org.children) && org.children.length > 0
    return {
      ...org,
      value: org.key,
      children: haveChildren ? org.children.map((i) => this.mapTree(i)) : [],
    }
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
    let layerList = layerLists.map((org) => this.mapTree(org))
    return (
      <section className="block-wrap form-wrap">
        <Form {...formItemLayout}>
          <Item label="对应图层">
            {getFieldDecorator('parentId', {
              initialValue: formInfos.parentId,
            })(<TreeSelect width="100%" placeholder="对应图层" treeData={layerList} />)}
          </Item>
          <Item label="图层名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '图层名称不能为空',
                },
              ],
              initialValue: formInfos.name,
            })(<Input width="100%" allowClear placeholder="标题" />)}
          </Item>
          <Item label="图层编号">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: '图层编号不能为空',
                },
              ],
              initialValue: formInfos.code,
            })(<Input width="100%" allowClear placeholder="管道名称" />)}
          </Item>

          <Item label="图标">
            {getFieldDecorator('ico', {
              initialValue: formInfos.ico,
            })(<Input width="100%" allowClear placeholder="图标" />)}
          </Item>

          <Item label="提交地址">
            {getFieldDecorator('formSubmitApi', {
              initialValue: formInfos.formSubmitApi,
            })(<Input width="100%" allowClear placeholder="提交地址" />)}
          </Item>

          <Item label="对应实体">
            {getFieldDecorator('formSubmitDTO', {
              initialValue: formInfos.formSubmitDTO,
            })(<Input width="100%" allowClear placeholder="对应实体" />)}
          </Item>
          <Item label="坐标类型">
            {getFieldDecorator('geometryType', {
              initialValue: formInfos.geometryType,
            })(<Select width="100%" placeholder="坐标类型" options={geometryType} />)}
          </Item>
          <Item label="数据源类型">
            {getFieldDecorator('dataSourceType', {
              initialValue: formInfos.dataSourceType,
            })(<Select width="100%" placeholder="数据源类型" options={dataSourceType} />)}
          </Item>
          <Item label="数据源">
            {getFieldDecorator('dataSource', {
              initialValue: formInfos.dataSource,
            })(<Input width="100%" type="textarea" allowClear placeholder="数据源" />)}
          </Item>

          <Item label="图层层级">
            {getFieldDecorator('Zindex', {
              initialValue: formInfos.Zindex,
            })(
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}级`}
                parser={(value) => value.replace('级', '')}
              />
            )}
          </Item>
          <Item label="状态">
            {getFieldDecorator('status', {
              initialValue: formInfos.status == 1 ? true : false,
            })(<Switch />)}
          </Item>
          <Item label="备注">
            {getFieldDecorator('keywords', {
              initialValue: formInfos.remark,
            })(<Input width="100%" allowClear placeholder="备注" />)}
          </Item>
        </Form>
      </section>
    )
  }
}
export default createForm()(FormInfos)
