/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:29:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 17:26:01
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
import DatePicker from 'components/DatePicker'
import Radio from 'components/Radio'
import InputNumber from 'components/InputNumber'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import $$ from 'cmn-utils'
import moment from 'utils/moment'
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
const checkUnitList = [
  {
    codeName: '月',
    code: 2,
  },
  {
    codeName: '年',
    code: 3,
  },
]
const belongType = [
  {
    code: 1,
    codeName: '气化站',
  },
  {
    code: 2,
    codeName: '用气用户',
  },
]
@connect(({ standingBookAdd, loading, standingBook }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
  standingBook,
}))
class standingBookAdd extends BaseComponent {
  componentDidMount() {
    let {
      dispatch,
      standingBookAdd: { details },
    } = this.props

    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'standingBookAdd',
        valueField: 'typeList',
        success: (res) => {
          console.log(res)
        },
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'standingBookAdd',
        valueField: 'supplyList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'standingBookAdd',
        valueField: 'unitList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getLocation',
      payload: {
        namespace: 'standingBookAdd',
        valueField: 'locationList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'standingBookAdd',
        valueField: 'brandList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'standingBookAdd',
        valueField: 'organizationTree',
        success: () => {},
      },
    })
  }
  state = {
    values: [],
  }
  handleRadioChange = (e) => {
    let {
      target: { value },
    } = e
    let {
      dispatch,
      standingBookAdd: { details },
    } = this.props
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        details: { ...details, ...{ isVerification: value } },
      },
    })
  }
  handleUnitChange = (value) => {
    if (value === 2) {
      this.setState({
        values: [
          {
            code: 1,
            codeName: 1,
          },
          {
            code: 2,
            codeName: 2,
          },
          {
            code: 3,
            codeName: 3,
          },
          {
            code: 4,
            codeName: 4,
          },
          {
            code: 5,
            codeName: 5,
          },
          {
            code: 6,
            codeName: 6,
          },
          {
            code: 7,
            codeName: 7,
          },
          {
            code: 8,
            codeName: 8,
          },
          {
            code: 9,
            codeName: 9,
          },
          {
            code: 10,
            codeName: 10,
          },
          {
            code: 11,
            codeName: 11,
          },
          {
            code: 12,
            codeName: 12,
          },
        ],
      })
    } else {
      this.setState({
        values: [
          {
            code: 1,
            codeName: 1,
          },
          {
            code: 2,
            codeName: 2,
          },
          {
            code: 3,
            codeName: 3,
          },
          {
            code: 4,
            codeName: 4,
          },
          {
            code: 5,
            codeName: 5,
          },
        ],
      })
    }
  }

  handleBelongChange = (value) => {
    let {
      dispatch,
      form: { setFieldsValue },
    } = this.props
    if (value === 1) {
      dispatch({
        type: 'standingBookAdd/getGasStationList',
      })
    } else if (value === 2) {
      dispatch({
        type: 'standingBookAdd/getGasUserList',
      })
    }
    setFieldsValue({ foreignId: '' })
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let {
      details,
      typeList,
      brandList,
      unitList,
      supplyList,
      organizationTree,
      allUserList,
      locationList,
      gasList,
    } = this.props.standingBookAdd
    let { values } = this.state

    let statusList = [
      {
        code: 2,
        codeName: '闲置',
      },
      {
        code: 3,
        codeName: '停用',
      },
      {
        code: 7,
        codeName: '正常',
      },
    ]
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="设备编号">
            {getFieldDecorator('code', {
              initialValue: details.code,
            })(<Input width="100%" placeholder="系统自动生成" disabled />)}
          </Item>
          <Item label="设备名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入设备名称',
                },
              ],
              initialValue: details.name,
            })(<Input width="100%" placeholder="设备名称" />)}
          </Item>
          <Item label="设备类别">
            {getFieldDecorator('cateId', {
              rules: [
                {
                  required: true,
                  message: '请选择设备类别',
                },
              ],
              initialValue: details.cateId,
            })(<TreeSelect width="100%" placeholder="设备类别" treeData={typeList} />)}
          </Item>
          <Item label="是否强制检定" className="item-inline-wrap" style={{ marginBottom: '0px' }}>
            <div style={{ marginLeft: 0, marginRight: '20px', width: '40%' }}>
              {getFieldDecorator('isVerification', {
                initialValue: details.isVerification || 0,
              })(
                <Radio.Group onChange={this.handleRadioChange}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )}
            </div>

            {details.isVerification ? (
              <>
                <div style={{ marginLeft: 0, marginRight: '20px', width: '30%' }}>
                  {getFieldDecorator('verificationUnit', {
                    initialValue: details.verificationUnit,
                  })(
                    <Select
                      width="100%"
                      placeholder="强制检定单位"
                      options={checkUnitList}
                      onChange={this.handleUnitChange}
                      allowClear
                    />
                  )}
                </div>
                <div style={{ marginLeft: 0, marginRight: '0px', width: '30%' }}>
                  {getFieldDecorator('verification', {
                    initialValue: details.verification,
                  })(<Select placeholder="强制检定值" options={values} allowClear width="100%" />)}
                </div>
              </>
            ) : null}
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
          <Item label="连接尺寸">
            {getFieldDecorator('connectionSize', {
              initialValue: details.connectionSize,
            })(<Input width="100%" placeholder="连接尺寸" />)}
          </Item>
          <Item label="整定压力/设定压力">
            {getFieldDecorator('setPressure', {
              initialValue: details.setPressure,
            })(<Input width="100%" placeholder="整定压力/设定压力" />)}
          </Item>
          <Item label="所属部门">
            {getFieldDecorator('orgId', {
              rules: [
                {
                  required: true,
                  message: '请选择所属部门',
                },
              ],
              initialValue: details.orgId,
            })(<TreeSelect width="100%" placeholder="所属部门" treeData={organizationTree} />)}
          </Item>
          <Item label="负责人">
            {getFieldDecorator('managerId', {
              rules: [
                {
                  required: true,
                  message: '请选择负责人',
                },
              ],
              initialValue: details.managerId,
            })(<Select width="100%" placeholder="负责人" options={allUserList} />)}
          </Item>
          <Item
            label="设备所属"
            className="item-inline-wrap"
            style={{ marginBottom: '0px' }}
          >
            <div style={{ marginLeft: 0, width: '40%' }}>
              {getFieldDecorator('foreignType', {
                rules: [
                  {
                    required: true,
                    message: '请选择设备所属类型',
                  },
                ],
                initialValue: details.foreignType,
              })(
                <Select
                  width="100%"
                  placeholder="设备所属类型"
                  options={belongType}
                  onChange={this.handleBelongChange}
                />
              )}
            </div>
            <div style={{ marginLeft: 0, width: '40%' }}>
              {getFieldDecorator('foreignId', {
                rules: [
                  {
                    required: true,
                    message: '请选择设备所属',
                  },
                ],
                initialValue: details.foreignId,
              })(<Select placeholder="请选择设备所属" options={gasList} allowClear width="100%" />)}
            </div>
          </Item>
          <Item label="设备状态">
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '请选择设备状态',
                },
              ],
              initialValue: details.status,
            })(<Select width="100%" placeholder="设备状态" options={statusList} />)}
          </Item>
          <Item label="安装位置">
            {getFieldDecorator('installationSite', {
              rules: [
                {
                  required: true,
                  message: '请选择安装位置',
                },
              ],
              initialValue: details.installationSite,
            })(<Input width="100%" placeholder="安装位置" />)}
          </Item>
          <Item label="出厂编号">
            {getFieldDecorator('factorySn', {
              initialValue: details.factorySn,
            })(<Input width="100%" placeholder="出厂编号" />)}
          </Item>
          <Item label="资产编号">
            {getFieldDecorator('assetSn', {
              initialValue: details.assetSn,
            })(<Input width="100%" placeholder="资产编号" />)}
          </Item>
          <Item label="品牌">
            {getFieldDecorator('brandId', {
              initialValue: details.brandId,
            })(<Select width="100%" placeholder="品牌" options={brandList} />)}
          </Item>
          <Item label="规格型号">
            {getFieldDecorator('modelCn', {
              initialValue: details.modelCn,
            })(<Input width="100%" placeholder="规格型号" />)}
          </Item>
          <Item label="计量单位">
            {getFieldDecorator('unitId', {
              initialValue: details.unitId,
            })(<Select width="100%" placeholder="计量单位" options={unitList} />)}
          </Item>
          <Item label="供应商">
            {getFieldDecorator('supplierId', {
              initialValue: details.supplierId,
            })(<Select width="100%" placeholder="供应商" options={supplyList} />)}
          </Item>

          <Item label="购置日期">
            {getFieldDecorator('purchaseDate', {
              initialValue: details.purchaseDate && moment(details.purchaseDate),
            })(<DatePicker width="100%" placeholder="购置日期" />)}
          </Item>

          <Item label="购置金额">
            {getFieldDecorator('amountMoney', {
              initialValue: details.amountMoney,
            })(<InputNumber width="100%" placeholder="购置金额" />)}
          </Item>
          <Item label="保修期(到期日)">
            {getFieldDecorator('warrantyDate', {
              initialValue: details.warrantyDate && moment(details.warrantyDate),
            })(<DatePicker width="100%" placeholder="保修期" />)}
          </Item>

          <Item label="投产日期">
            {getFieldDecorator('productDate', {
              initialValue: details.productDate && moment(details.productDate),
            })(<DatePicker width="100%" placeholder="投产日期" />)}
          </Item>
          <Item label="预计报废日期">
            {getFieldDecorator('scrapDate', {
              initialValue: details.scrapDate && moment(details.scrapDate),
            })(<DatePicker width="100%" placeholder="预计报废日期" />)}
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

export default createForm()(standingBookAdd)
